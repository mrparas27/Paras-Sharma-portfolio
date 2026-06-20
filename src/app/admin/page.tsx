"use client";

import React, { useState, useEffect } from 'react';
import { getOpportunities, updateOpportunityStatus } from '@/app/actions/hire-me';
import { Search, Filter, ArrowUpDown, ChevronDown, RefreshCw, Cpu, Award } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date_desc'); // date_desc, date_asc, recruiter, company

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const data = await getOpportunities();
      setLeads(data);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const result = await updateOpportunityStatus(id, newStatus);
      if (result.success) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Metrics calculation
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New Lead').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const hiredLeads = leads.filter(l => l.status === 'Hired').length;

  // Filter and Search logic
  const filteredLeads = leads
    .filter(lead => {
      const matchSearch =
        lead.recruiter_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.role_offered?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchType = typeFilter === 'All' || lead.opportunity_type === typeFilter;
      const matchMode = modeFilter === 'All' || lead.work_mode === modeFilter;

      return matchSearch && matchStatus && matchType && matchMode;
    })
    .sort((a, b) => {
      if (sortBy === 'date_desc') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'date_asc') {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortBy === 'recruiter') {
        return (a.recruiter_name || '').localeCompare(b.recruiter_name || '');
      } else if (sortBy === 'company') {
        return (a.company_name || '').localeCompare(b.company_name || '');
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-cyber-dark text-gray-100 font-sans p-6 md:p-12 relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyber-purple/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-cyber-cyan/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
          <div>
            <h1 className="font-heading text-3xl md:text-5xl font-black text-white tracking-wide flex items-center gap-3">
              RECRUITER_LEADS_DASHBOARD <Award className="text-cyber-cyan animate-pulse" size={24} />
            </h1>
            <p className="text-xs text-gray-400 font-mono mt-1">
              Admin control console / Opportunity tracker leads
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              REFRESH_LOGS
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-xl bg-gradient-to-r from-cyber-cyan to-cyber-purple text-white transition-all cursor-pointer active:scale-95"
            >
              VIEW_PORTFOLIO
            </Link>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Card: Total Leads */}
          <div className="rounded-2xl glassmorphism p-6 border border-white/5 relative overflow-hidden flex flex-col justify-between h-28">
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Total Leads</div>
            <div className="text-3xl md:text-4xl font-heading font-black text-white">{loading ? '...' : totalLeads}</div>
            <div className="absolute top-2 right-2 text-gray-800 font-mono text-[10px]">L_ALL</div>
          </div>

          {/* Card: New Leads */}
          <div className="rounded-2xl glassmorphism p-6 border border-white/5 relative overflow-hidden flex flex-col justify-between h-28">
            <div className="text-[10px] font-mono text-cyber-cyan uppercase tracking-widest">New Leads</div>
            <div className="text-3xl md:text-4xl font-heading font-black text-cyber-cyan">{loading ? '...' : newLeads}</div>
            <div className="absolute top-2 right-2 text-cyan-950 font-mono text-[10px]">L_NEW</div>
          </div>

          {/* Card: Contacted Leads */}
          <div className="rounded-2xl glassmorphism p-6 border border-white/5 relative overflow-hidden flex flex-col justify-between h-28">
            <div className="text-[10px] font-mono text-cyber-purple uppercase tracking-widest">Contacted Leads</div>
            <div className="text-3xl md:text-4xl font-heading font-black text-cyber-purple">{loading ? '...' : contactedLeads}</div>
            <div className="absolute top-2 right-2 text-purple-950 font-mono text-[10px]">L_CONT</div>
          </div>

          {/* Card: Hired Leads */}
          <div className="rounded-2xl glassmorphism p-6 border border-white/5 relative overflow-hidden flex flex-col justify-between h-28">
            <div className="text-[10px] font-mono text-cyber-emerald uppercase tracking-widest">Hired Leads</div>
            <div className="text-3xl md:text-4xl font-heading font-black text-cyber-emerald">{loading ? '...' : hiredLeads}</div>
            <div className="absolute top-2 right-2 text-emerald-950 font-mono text-[10px]">L_HIRE</div>
          </div>
        </div>

        {/* FILTERS & SEARCH ROW */}
        <div className="rounded-2xl glassmorphism p-6 border border-white/5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar (Col 4) */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input
              type="text"
              placeholder="Search recruiter, company, role, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/30 border border-white/5 rounded-xl text-sm pl-10 pr-4 py-3 focus:outline-none focus:border-cyber-cyan/40 transition-colors text-white"
            />
          </div>

          {/* Filters (Col 8) */}
          <div className="md:col-span-8 flex flex-wrap gap-3 items-center justify-end">
            
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/5">
              <Filter size={12} className="text-cyber-cyan" />
              <span className="text-[10px] font-mono text-gray-400 uppercase mr-1">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="New Lead">New Lead</option>
                <option value="Contacted">Contacted</option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/5">
              <Filter size={12} className="text-cyber-purple" />
              <span className="text-[10px] font-mono text-gray-400 uppercase mr-1">Type:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Internship">Internship</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Consulting">Consulting</option>
              </select>
            </div>

            {/* Mode Filter */}
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/5">
              <Filter size={12} className="text-cyber-pink" />
              <span className="text-[10px] font-mono text-gray-400 uppercase mr-1">Mode:</span>
              <select
                value={modeFilter}
                onChange={(e) => setModeFilter(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="All">All Modes</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/5">
              <ArrowUpDown size={12} className="text-gray-400" />
              <span className="text-[10px] font-mono text-gray-400 uppercase mr-1">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="date_desc">Date Desc</option>
                <option value="date_asc">Date Asc</option>
                <option value="recruiter">Recruiter Name</option>
                <option value="company">Company Name</option>
              </select>
            </div>

          </div>
        </div>

        {/* LEADS TABLE */}
        <div className="rounded-2xl glassmorphism border border-white/5 overflow-hidden">
          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center space-y-4">
              <Cpu className="text-cyber-cyan animate-spin" size={32} />
              <span className="text-xs font-mono text-gray-400">PULLING_RECORDS_FROM_DB...</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center">
              <span className="text-xs font-mono text-gray-500">NO_LEADS_FOUND_MATCHING_CRITERIA</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-white/5 bg-black/25 text-[10px] font-mono tracking-widest text-gray-400 uppercase select-none">
                    <th className="px-6 py-4">Recruiter / Details</th>
                    <th className="px-6 py-4">Company</th>
                    <th className="px-6 py-4">Role Offered</th>
                    <th className="px-6 py-4">Opportunity Type</th>
                    <th className="px-6 py-4">Work Mode</th>
                    <th className="px-6 py-4">Submitted Date</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-gray-200">
                  {filteredLeads.map((lead) => {
                    const statusColors: Record<string, string> = {
                      'New Lead': 'text-cyber-cyan border-cyber-cyan/30 bg-cyber-cyan/5',
                      'Contacted': 'text-cyber-purple border-cyber-purple/30 bg-cyber-purple/5',
                      'Hired': 'text-cyber-emerald border-cyber-emerald/30 bg-cyber-emerald/5',
                      'Rejected': 'text-red-400 border-red-500/30 bg-red-500/5',
                    };

                    const statusClass = statusColors[lead.status] || 'text-gray-300 border-white/10 bg-white/5';

                    return (
                      <tr key={lead.id} className="hover:bg-white-[0.02] transition-colors group">
                        {/* Recruiter Details */}
                        <td className="px-6 py-4 max-w-[280px]">
                          <div className="font-semibold text-white">{lead.recruiter_name}</div>
                          <div className="text-[11px] text-gray-400 font-mono mt-0.5 truncate">{lead.email}</div>
                          {lead.phone && <div className="text-[10px] text-gray-500 font-mono truncate">{lead.phone}</div>}
                          {lead.full_name && <div className="text-[10px] text-gray-500 font-mono truncate">Intake: {lead.full_name}</div>}
                        </td>

                        {/* Company Details */}
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{lead.company_name}</div>
                          {lead.company_website ? (
                            <a
                              href={lead.company_website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-cyber-cyan hover:underline font-mono truncate max-w-[150px] inline-block mt-0.5"
                            >
                              {lead.company_website.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                          ) : (
                            <span className="text-[11px] text-gray-500 font-mono">No site link</span>
                          )}
                        </td>

                        {/* Role offered */}
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{lead.role_offered}</div>
                          {lead.salary_range && <div className="text-[11px] text-cyber-purple font-mono mt-0.5">{lead.salary_range}</div>}
                        </td>

                        {/* Opportunity type */}
                        <td className="px-6 py-4">
                          <span className="text-xs font-mono border border-white/10 bg-white/5 px-2.5 py-1 rounded-md text-gray-300">
                            {lead.opportunity_type}
                          </span>
                        </td>

                        {/* Work mode */}
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white text-xs">{lead.work_mode}</div>
                          {lead.location && <div className="text-[10px] text-gray-500 font-mono mt-0.5">{lead.location}</div>}
                        </td>

                        {/* Submitted Date */}
                        <td className="px-6 py-4 text-xs font-mono text-gray-400">
                          {new Date(lead.created_at).toLocaleDateString()}
                          <div className="text-[10px] text-gray-500 mt-0.5">
                            {new Date(lead.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </td>

                        {/* Status Change Selector */}
                        <td className="px-6 py-4 text-center">
                          <div className="relative inline-block w-36">
                            {updatingId === lead.id ? (
                              <div className="text-xs text-cyber-cyan font-mono py-1 animate-pulse">UPDATING...</div>
                            ) : (
                              <div className="flex items-center justify-center">
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                  className={`appearance-none w-full border rounded-lg text-xs font-semibold font-mono text-center py-2 px-3 focus:outline-none cursor-pointer pr-8 ${statusClass}`}
                                >
                                  <option value="New Lead">New Lead</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Hired">Hired</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                                <ChevronDown className="absolute right-3.5 pointer-events-none text-gray-400" size={12} />
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
