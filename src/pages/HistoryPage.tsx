import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { screeningService } from '../services/screeningService';
import type { ScreeningSession } from '../types/screening';
import { SeverityBadge } from '../components/screening/SeverityBadge';
import { formatDate } from '../utils/formatters';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const HistoryPage: React.FC = () => {
  const [screenings, setScreenings] = useState<ScreeningSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchId, setSearchId] = useState('');
  const [eyeFilter, setEyeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');

  useEffect(() => {
    async function load() {
      const res = await screeningService.getAllScreenings();
      setScreenings(res.data);
      setLoading(false);
    }
    load();
  }, []);

  const handleClearFilters = () => {
    setSearchId('');
    setEyeFilter('all');
    setStatusFilter('all');
    setGradeFilter('all');
  };

  const filtered = screenings.filter((s) => {
    const matchesId =
      s.id.toLowerCase().includes(searchId.toLowerCase()) ||
      s.patient.fullName.toLowerCase().includes(searchId.toLowerCase());
    const matchesEye = eyeFilter === 'all' || s.eyeExamined === eyeFilter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesGrade = gradeFilter === 'all' || s.stageResult?.toString() === gradeFilter;
    return matchesId && matchesEye && matchesStatus && matchesGrade;
  });

  return (
    <AuthLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#000000] uppercase block font-semibold mb-1">
              Authorized Registry Access
            </span>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#000000]">
              Screening History
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Review authorized screening records, optical gate audits, and tele-referral documentation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1 bg-gray-100 text-[#000000] border border-gray-200">
              Total Records: {screenings.length}
            </span>
            <Link
              to="/screening/new"
              className="inline-flex items-center gap-2 bg-[#000000] hover:bg-[#000000] text-white text-xs font-mono font-semibold tracking-wider uppercase px-4 py-2.5 shadow-sm"
            >
              + New Scan
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#ffffff] sm:bg-white/90 p-5 border border-[#e0e0e0] shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-500 mb-1 font-semibold">
                Search Study ID
              </label>
              <input
                type="text"
                placeholder="e.g. RG-2025"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#e0e0e0] px-3 py-2 text-xs text-[#000000] font-mono focus:border-[#000000]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-500 mb-1 font-semibold">
                Eye Side
              </label>
              <select
                value={eyeFilter}
                onChange={(e) => setEyeFilter(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#e0e0e0] px-3 py-2 text-xs text-[#000000] font-mono focus:border-[#000000]"
              >
                <option value="all">All Eyes</option>
                <option value="OD">Right Eye (OD)</option>
                <option value="OS">Left Eye (OS)</option>
                <option value="OU">Bilateral (OU)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-500 mb-1 font-semibold">
                Workflow Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#e0e0e0] px-3 py-2 text-xs text-[#000000] font-mono focus:border-[#000000]"
              >
                <option value="all">All Statuses</option>
                <option value="referred_to_hospital">Referred to Hospital</option>
                <option value="signed_off">Signed Off (Routine)</option>
                <option value="quality_failed">Quality Failed (Recapture)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-gray-500 mb-1 font-semibold">
                DR Severity Grade
              </label>
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#e0e0e0] px-3 py-2 text-xs text-[#000000] font-mono focus:border-[#000000]"
              >
                <option value="all">All Grades</option>
                <option value="0">Grade 0 (No DR)</option>
                <option value="1">Grade 1 (Mild DR)</option>
                <option value="2">Grade 2 (Moderate DR)</option>
                <option value="3">Grade 3 (Severe NPDR)</option>
                <option value="4">Grade 4 (Proliferative DR)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-200">
            <span className="text-[11px] font-mono text-gray-500">
              Showing {filtered.length} of {screenings.length} authorized screening studies
            </span>
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-[10px] font-mono uppercase text-[#000000] hover:underline font-semibold cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-[#ffffff] sm:bg-white/90 border border-[#e0e0e0] shadow-sm">
          {loading ? (
            <LoadingSpinner label="Loading screening audit records..." />
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <p className="text-xs text-gray-500 font-mono">No matching screening records found.</p>
              <button
                onClick={handleClearFilters}
                className="text-xs font-mono text-[#000000] uppercase underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#e0e0e0] bg-gray-100/40 font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Study ID</th>
                    <th className="py-3 px-4">Screening Date</th>
                    <th className="py-3 px-4">Eye</th>
                    <th className="py-3 px-4">Image Quality</th>
                    <th className="py-3 px-4">Screening Status</th>
                    <th className="py-3 px-4">DR Grade</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0e0e0]">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-black/[0.01]">
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#000000]">
                        {item.id}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-gray-500">
                        {formatDate(item.capturedAt)}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-[#000000]">
                        {item.eyeExamined}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        {item.quality.status === 'acceptable' ? (
                          <span className="text-emerald-700">âœ“ Pass ({item.quality.overallScore}%)</span>
                        ) : (
                          <span className="text-red-700">âš  Recapture</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[10px] uppercase text-gray-500">
                        {item.status.replace(/_/g, ' ')}
                      </td>
                      <td className="py-3.5 px-4">
                        <SeverityBadge stage={item.stageResult} />
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <Link
                          to={`/screening/${item.id}/result`}
                          className="font-mono text-[10px] uppercase font-semibold text-[#000000] hover:underline"
                        >
                          Result
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link
                          to={`/screening/${item.id}/explanation`}
                          className="font-mono text-[10px] uppercase font-semibold text-[#000000] hover:underline"
                        >
                          Grad-CAM
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link
                          to={`/screening/${item.id}/report`}
                          className="font-mono text-[10px] uppercase font-semibold text-gray-500 hover:underline"
                        >
                          Report
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


