"use server";

import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

// Define opportunity schema with Zod
const OpportunitySchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  companyName: z.string().min(1, "Company name is required"),
  recruiterName: z.string().min(2, "Recruiter name must be at least 2 characters"),
  roleOffered: z.string().min(2, "Role offered must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  linkedinProfile: z.string().optional(),
  companyWebsite: z.string().optional(),
  opportunityType: z.enum(['Internship', 'Full-Time', 'Contract', 'Freelance', 'Consulting']),
  joiningDate: z.string().optional(),
  salaryRange: z.string().optional(),
  workMode: z.enum(['Remote', 'Hybrid', 'Onsite']),
  location: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  honeypot: z.string().optional(), // Anti-spam hidden field
});

// Simple in-memory rate limiter per email (clears on restart, but prevents instant form spam)
const SUBMISSION_TIMESTAMPS: Record<string, number> = {};
const RATE_LIMIT_COOLDOWN = 60 * 1000; // 1 minute cooldown

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function submitOpportunity(prevState: any, formData: FormData): Promise<FormState> {
  try {
    // Parse form entries
    const rawData = {
      fullName: formData.get('fullName') as string,
      companyName: formData.get('companyName') as string,
      recruiterName: formData.get('recruiterName') as string,
      roleOffered: formData.get('roleOffered') as string,
      email: formData.get('email') as string,
      phone: (formData.get('phone') as string) || undefined,
      linkedinProfile: (formData.get('linkedinProfile') as string) || undefined,
      companyWebsite: (formData.get('companyWebsite') as string) || undefined,
      opportunityType: formData.get('opportunityType') as string,
      joiningDate: (formData.get('joiningDate') as string) || undefined,
      salaryRange: (formData.get('salaryRange') as string) || undefined,
      workMode: formData.get('workMode') as string,
      location: (formData.get('location') as string) || undefined,
      message: formData.get('message') as string,
      honeypot: formData.get('fax_number') as string, // hidden honeypot input is named fax_number
    };

    // 1. Honeypot check
    if (rawData.honeypot) {
      console.warn("Spam detected via honeypot field. Rejecting silently.");
      return {
        success: true,
        message: "✅ Opportunity Submitted Successfully",
      };
    }

    // 2. Schema Validation
    const validated = OpportunitySchema.safeParse(rawData);
    if (!validated.success) {
      return {
        success: false,
        message: "Validation failed. Please check form inputs.",
        errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const data = validated.data;

    // 3. Rate Limit Check
    const now = Date.now();
    const lastSubmission = SUBMISSION_TIMESTAMPS[data.email];
    if (lastSubmission && now - lastSubmission < RATE_LIMIT_COOLDOWN) {
      const waitSeconds = Math.ceil((RATE_LIMIT_COOLDOWN - (now - lastSubmission)) / 1000);
      return {
        success: false,
        message: `Too many submissions. Please wait ${waitSeconds} seconds before trying again.`,
      };
    }
    SUBMISSION_TIMESTAMPS[data.email] = now;

    // Build opportunity payload
    const opportunityId = crypto.randomUUID();
    const createdAt = new Date().toISOString();
    const newOpportunity = {
      id: opportunityId,
      created_at: createdAt,
      full_name: data.fullName,
      company_name: data.companyName,
      recruiter_name: data.recruiterName,
      role_offered: data.roleOffered,
      email: data.email,
      phone: data.phone || null,
      linkedin_profile: data.linkedinProfile || null,
      company_website: data.companyWebsite || null,
      opportunity_type: data.opportunityType,
      joining_date: data.joiningDate || null,
      salary_range: data.salaryRange || null,
      work_mode: data.workMode,
      location: data.location || null,
      message: data.message,
      status: 'New Lead',
    };

    // 4. Save to Database (Supabase or Local JSON DB Fallback)
    let dbSuccess = false;
    const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('opportunities').insert(newOpportunity);
        if (!error) {
          dbSuccess = true;
          console.log(`Opportunity ${opportunityId} successfully saved to Supabase.`);
        } else {
          console.error("Supabase insert error:", error);
        }
      } catch (err) {
        console.error("Error connecting to Supabase:", err);
      }
    }

    // Local JSON DB fallback if Supabase fails or is not configured
    if (!dbSuccess) {
      try {
        const fs = await import('fs');
        const path = await import('path');
        const dbPath = path.join(process.cwd(), 'opportunities_db.json');
        let currentDB: any[] = [];
        if (fs.existsSync(dbPath)) {
          const content = fs.readFileSync(dbPath, 'utf-8');
          currentDB = JSON.parse(content);
        }
        currentDB.push(newOpportunity);
        fs.writeFileSync(dbPath, JSON.stringify(currentDB, null, 2), 'utf-8');
        console.log(`Opportunity ${opportunityId} successfully saved to local file DB (opportunities_db.json).`);
      } catch (err) {
        console.error("Error writing to local JSON DB:", err);
      }
    }

    // 5. Send Email Notifications (Resend or Local Email Log File Fallback)
    const resendApiKey = process.env.RESEND_API_KEY;
    const emailToParasSubject = '🚀 New Opportunity Received - Portfolio Lead';
    const emailToParasBody = `
New recruiter inquiry received.

Candidate:
Paras Sharma

Recruiter Details:

Name:
${data.recruiterName}

Company:
${data.companyName}

Role:
${data.roleOffered}

Opportunity Type:
${data.opportunityType}

Work Mode:
${data.workMode}

Location:
${data.location || 'N/A'}

Salary:
${data.salaryRange || 'N/A'}

Email:
${data.email}

Phone:
${data.phone || 'N/A'}

LinkedIn:
${data.linkedinProfile || 'N/A'}

Message:
${data.message}

Submitted At:
${createdAt}
`;

    const autoReplySubject = 'Thank You for Contacting Paras Sharma';
    const autoReplyBody = `
Hello ${data.recruiterName},

Thank you for reaching out regarding a potential opportunity.

I have successfully received your message and will review the details shortly.

I appreciate your interest in my profile and look forward to connecting with you.

Best Regards,

Paras Sharma
AI Engineer | Data Scientist | Software Developer

Email:
mr.paras.gautam@gmail.com

LinkedIn:
https://www.linkedin.com/in/parassharma27/

Portfolio:
https://paras-sharma-portfolio.vercel.app
`;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        
        // Email to Paras
        await resend.emails.send({
          from: 'Portfolio Lead <onboarding@resend.dev>',
          to: 'mr.paras.gautam@gmail.com',
          subject: emailToParasSubject,
          text: emailToParasBody,
        });

        // Auto-reply to recruiter
        await resend.emails.send({
          from: 'Paras Sharma <onboarding@resend.dev>',
          to: data.email,
          subject: autoReplySubject,
          text: autoReplyBody,
        });
        
        console.log("Resend emails dispatched successfully.");
      } catch (err) {
        console.error("Resend delivery failed:", err);
      }
    } else {
      // Mock email log file fallback
      try {
        const fs = await import('fs');
        const path = await import('path');
        const emailLogPath = path.join(process.cwd(), 'emails_sent_log.txt');
        const logContent = `
========================================
TIMESTAMP: ${createdAt}
----------------------------------------
EMAIL TO PARAS:
Subject: ${emailToParasSubject}
Body:
${emailToParasBody}
----------------------------------------
AUTO-REPLY TO RECRUITER (${data.email}):
Subject: ${autoReplySubject}
Body:
${autoReplyBody}
========================================
\n\n`;
        fs.appendFileSync(emailLogPath, logContent, 'utf-8');
        console.log("Resend API key missing. Emails successfully saved to mock log (emails_sent_log.txt).");
      } catch (err) {
        console.error("Error writing to email log file:", err);
      }
    }

    return {
      success: true,
      message: "✅ Opportunity Submitted Successfully",
    };

  } catch (err) {
    console.error("Unhandled error submitting opportunity:", err);
    return {
      success: false,
      message: "An error occurred on the server. Please try again later.",
    };
  }
}

export async function getOpportunities(): Promise<any[]> {
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('opportunities')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data;
      console.error("Supabase select error:", error);
    } catch (err) {
      console.error("Error reading from Supabase:", err);
    }
  }

  // Fallback to local JSON DB
  try {
    const fs = await import('fs');
    const path = await import('path');
    const dbPath = path.join(process.cwd(), 'opportunities_db.json');
    if (fs.existsSync(dbPath)) {
      const content = fs.readFileSync(dbPath, 'utf-8');
      const data = JSON.parse(content);
      return data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  } catch (err) {
    console.error("Error reading from local JSON DB:", err);
  }
  return [];
}

export async function updateOpportunityStatus(id: string, status: string): Promise<{ success: boolean }> {
  const isSupabaseConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('opportunities')
        .update({ status })
        .eq('id', id);
      if (!error) {
        console.log(`Opportunity ${id} status updated to ${status} in Supabase.`);
        return { success: true };
      }
      console.error("Supabase update error:", error);
    } catch (err) {
      console.error("Error updating status in Supabase:", err);
    }
  }

  // Fallback to local JSON DB
  try {
    const fs = await import('fs');
    const path = await import('path');
    const dbPath = path.join(process.cwd(), 'opportunities_db.json');
    if (fs.existsSync(dbPath)) {
      const content = fs.readFileSync(dbPath, 'utf-8');
      const data = JSON.parse(content);
      const index = data.findIndex((item: any) => item.id === id);
      if (index !== -1) {
        data[index].status = status;
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Opportunity ${id} status updated to ${status} in local JSON DB.`);
        return { success: true };
      }
    }
  } catch (err) {
    console.error("Error updating local JSON DB status:", err);
  }
  return { success: false };
}
