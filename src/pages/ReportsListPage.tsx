import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { screeningService } from '../services/screeningService';
import type { ScreeningSession } from '../types/screening';
import { formatDate } from '../utils/formatters';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const ReportsListPage: React.FC = () => {
  const [screenings, setScreenings] = useState<ScreeningSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function load() {
      const res = await screeningService.getAllScreenings();
      setScreenings(res.data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = screenings.filter((s) => {
    const matchesId = s.id.toLowerCase().includes(searchId.toLowerCase()) ||
      s.patient.fullName.toLowerCase().includes(searchId.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesId && matchesStatus;
  });

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#000000] uppercase block font-semibold mb-1">
              Tele-Ophthalmology Documentation
            </span>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#000000]">
              Screening Reports
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Review and transmit official referral documentation for tertiary retinal clinics.
            </p>
          </div>

          <span className="font-mono text-xs px-2.5 py-1 bg-[#000000]/10 text-[#000000] border border-[#000000]/20 font-semibold">
            Demo Sandbox Archive
          </span>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#ffffff] sm:bg-white/90 p-4 border border-[#e0e0e0]">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Filter by Study ID or patient name..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full bg-[#ffffff] border border-[#e0e0e0] px-3.5 py-2 text-xs text-[#000000] font-mono focus:border-[#000000]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-gray-500">Report Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#ffffff] border border-[#e0e0e0] px-3 py-2 text-xs text-[#000000] font-mono focus:border-[#000000]"
            >
              <option value="all">All Reports</option>
              <option value="referred_to_hospital">Hospital Referral</option>
              <option value="signed_off">Signed Off (Routine)</option>
            </select>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-[#ffffff] sm:bg-white/90 border border-[#e0e0e0] shadow-sm">
          {loading ? (
            <LoadingSpinner label="Loading reports directory..." />
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-xs font-mono text-gray-500">
              No reports match the selected criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#e0e0e0] bg-gray-100/40 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Study ID</th>
                    <th className="py-3 px-4">Screening Date</th>
                    <th className="py-3 px-4">Eye</th>
                    <th className="py-3 px-4">Result Availability</th>
                    <th className="py-3 px-4">Report Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0e0e0]">
                  {filtered.map((session) => (
                    <tr key={session.id} className="hover:bg-black/[0.01]">
                      <td className="py-4 px-4 font-mono font-semibold text-[#000000]">
                        {session.id}
                      </td>
                      <td className="py-4 px-4 font-mono text-gray-500">
                        {formatDate(session.capturedAt)}
                      </td>
                      <td className="py-4 px-4 font-mono text-[#000000]">
                        {session.eyeExamined}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                          Stage {session.stageResult ?? 0} Classified
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-[11px] text-gray-500">
                        {session.referralHospital ? (
                          <span className="text-amber-800 font-medium">Referred ({session.referralHospital.split(',')[0]})</span>
                        ) : (
                          <span className="text-emerald-700">Routine Archive</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Link
                          to={`/screening/${session.id}/report`}
                          className="font-mono text-[10px] uppercase font-semibold text-[#000000] hover:underline"
                        >
                          Open Report
                        </Link>
                        <span className="text-gray-300">|</span>
                        <button
                          onClick={() => window.print()}
                          className="font-mono text-[10px] uppercase font-semibold text-[#000000] hover:underline cursor-pointer"
                        >
                          Download PDF
                        </button>
                        <span className="text-gray-300">|</span>
                        <Link
                          to={`/screening/${session.id}/result`}
                          className="font-mono text-[10px] uppercase font-semibold text-gray-500 hover:underline"
                        >
                          View Screening
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AuthLayout>
  );
};


