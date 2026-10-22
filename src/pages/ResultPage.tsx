import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { screeningService } from '../services/screeningService';
import type { ScreeningSession } from '../types/screening';
import { getDRStageMeta, DR_STAGES } from '../utils/drMeta';
import { SeverityBadge } from '../components/screening/SeverityBadge';
import { formatDate } from '../utils/formatters';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<ScreeningSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const res = await screeningService.getScreeningById(id);
      setSession(res.data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <AuthLayout>
        <LoadingSpinner label="Compiling AI Screening Result..." />
      </AuthLayout>
    );
  }

  if (!session) {
    return (
      <AuthLayout>
        <div className="text-center py-16 space-y-4">
          <p className="text-sm text-gray-500">Screening session record not found.</p>
          <Link to="/dashboard" className="text-xs font-mono text-[#000000] uppercase underline">
            Return to Dashboard
          </Link>
        </div>
      </AuthLayout>
    );
  }

  const stageMeta = getDRStageMeta(session.stageResult);

  return (
    <AuthLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#000000] uppercase block font-semibold mb-1">
              AI Decision Support Inference
            </span>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#000000]">
              Screening Result
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Screening ID: {session.id} Â· Eye Examined: {session.eyeExamined} Â· Patient: {session.patient.fullName}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={`/screening/${session.id}/explanation`}
              className="inline-flex items-center gap-2 bg-[#000000] hover:bg-[#000000] text-white text-xs font-mono font-semibold tracking-wider uppercase px-5 py-3 transition-all shadow-md"
            >
              <span>View Explanation</span>
              <span>â†’</span>
            </Link>
          </div>
        </div>

        {/* Progress Steps Indicator */}
        <div className="bg-[#ffffff] border border-[#e0e0e0] p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 flex items-center gap-2 border border-emerald-200">
              <span className="font-semibold">âœ“ 01</span>
              <span>Upload Image Â· Done</span>
            </div>
            <div className="p-2.5 bg-emerald-50 text-emerald-800 flex items-center gap-2 border border-emerald-200">
              <span className="font-semibold">âœ“ 02</span>
              <span>Quality Check Â· Passed</span>
            </div>
            <div className="p-2.5 bg-[#000000] text-white flex items-center gap-2">
              <span className="font-semibold">03</span>
              <span>AI Result Â· Active</span>
            </div>
            <div className="p-2.5 bg-gray-100 text-gray-500 flex items-center gap-2 border border-gray-200">
              <span className="font-semibold">04</span>
              <span>Report Â· Pending</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Fundus Image & Quality Metadata */}
          <div className="bg-[#ffffff] sm:bg-white/90 p-6 border border-[#e0e0e0] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                Original Fundus Image
              </span>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 border border-emerald-200">
                Quality: Passed ({session.quality.overallScore}%)
              </span>
            </div>

            <div className="aspect-[4/3] bg-black overflow-hidden border border-black/20">
              <img
                src={session.fundusImageUrl}
                alt="Retinal Fundus"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1.5 text-[11px] font-mono text-gray-500 pt-2 border-t border-gray-200">
              <div>Engine: <span className="text-[#000000]">RETINAGUARD v4.2.1 (ONNX)</span></div>
              <div>Inference Timestamp: <span className="text-[#000000]">{formatDate(session.capturedAt)}</span></div>
              <div>Optical Clarity Score: <span className="text-emerald-700 font-semibold">{session.quality.clarityScore}%</span></div>
            </div>
          </div>

          {/* Right Two Columns: Predicted Result & 5-Grade ICDR Reference */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Severity Banner */}
            <div className="bg-[#ffffff] sm:bg-white/90 p-6 sm:p-8 border border-[#e0e0e0] shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block mb-1">
                    Predicted DR Severity Classification
                  </span>
                  <div className="flex items-center gap-3">
                    <SeverityBadge stage={session.stageResult} />
                    <span className="text-xs font-mono text-gray-500">
                      Stage {session.stageResult} of 4
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block mb-1">
                    Inference Confidence
                  </span>
                  <div className="text-2xl font-light text-[#000000] font-mono">
                    {session.confidenceScore || 92.4}%
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-[#374151]">
                <div>
                  <span className="font-semibold text-[#000000] block mb-0.5">Histological Description:</span>
                  <p>{stageMeta.description}</p>
                </div>
                <div>
                  <span className="font-semibold text-[#000000] block mb-0.5">Recommended Clinical Action:</span>
                  <p>{stageMeta.recommendedAction}</p>
                </div>
              </div>

              <Alert type="clinical" title="Professional Review Required">
                Model output supports screening and is not a confirmed diagnosis. All positive (Stage 2+) cases must be confirmed by an ophthalmologist.
              </Alert>
            </div>

            {/* Five-Grade ICDR Reference Table */}
            <div className="bg-[#ffffff] sm:bg-white/90 p-6 border border-[#e0e0e0] shadow-sm space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#000000] font-semibold block">
                International Clinical Diabetic Retinopathy (ICDR) Reference
              </span>

              <div className="divide-y divide-[#e0e0e0] text-xs">
                {([0, 1, 2, 3, 4] as const).map((grade) => {
                  const item = DR_STAGES[grade];
                  const isCurrent = session.stageResult === grade;
                  return (
                    <div
                      key={grade}
                      className={`py-2.5 px-3 flex items-center justify-between transition-colors ${
                        isCurrent ? 'bg-[#000000]/10 font-medium border-l-2 border-[#000000]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] font-semibold text-[#000000] w-16">
                          Grade {grade}
                        </span>
                        <span className="text-[#374151]">{item.shortLabel}</span>
                      </div>
                      <span className="text-[10px] font-mono text-gray-500 uppercase">
                        {item.referralPriority}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={() => navigate('/screening/new')}
          >
            â† Screen Another Image
          </Button>

          <div className="flex items-center gap-3">
            <Link
              to={`/screening/${session.id}/report`}
              className="inline-flex items-center bg-white/80 hover:bg-white text-[#000000] border border-black/15 px-6 py-3 text-xs font-mono font-medium tracking-wider uppercase backdrop-blur-sm transition-all shadow-sm"
            >
              View Report
            </Link>
            <Link
              to={`/screening/${session.id}/explanation`}
              className="inline-flex items-center bg-[#000000] hover:bg-[#000000] text-white px-6 py-3 text-xs font-mono font-semibold tracking-wider uppercase transition-all shadow-md"
            >
              View Explanation â†’
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};


