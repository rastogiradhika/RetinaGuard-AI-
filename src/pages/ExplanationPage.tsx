import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { screeningService } from '../services/screeningService';
import type { ScreeningSession } from '../types/screening';
import { GradCamViewer } from '../components/screening/GradCamViewer';
import { SeverityBadge } from '../components/screening/SeverityBadge';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const ExplanationPage: React.FC = () => {
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
        <LoadingSpinner label="Compiling Grad-CAM Saliency Maps..." />
      </AuthLayout>
    );
  }

  if (!session || !session.explanation) {
    return (
      <AuthLayout>
        <div className="text-center py-16 space-y-4">
          <p className="text-sm text-gray-500">Explanation artifact unavailable for this screening record.</p>
          <Link to="/dashboard" className="text-xs font-mono text-[#000000] uppercase underline">
            Return to Dashboard
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#000000] uppercase block font-semibold mb-1">
              Explainable Decision Support
            </span>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#000000]">
              Understand the Modelâ€™s Focus
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Screening ID: {session.id} Â· Model Version: RETINAGUARD v4.2.1 Â· Predicted Grade: Stage {session.stageResult}
            </p>
          </div>

          <SeverityBadge stage={session.stageResult} />
        </div>

        {/* Grad-CAM Viewer Component */}
        <GradCamViewer
          telemetry={session.explanation}
          fundusUrl={session.fundusImageUrl}
        />

        {/* Heatmap Interpretation Legend */}
        <div className="bg-[#ffffff] sm:bg-white/90 p-6 border border-[#e0e0e0] shadow-sm space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#000000] font-semibold block">
            Class Activation Saliency Legend
          </span>
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-red-600 rounded-none inline-block border border-black/20" />
              <span className="text-[#000000]">High Neural Attention (&gt;80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-yellow-400 rounded-none inline-block border border-black/20" />
              <span className="text-[#374151]">Moderate Attention (50â€“80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 bg-emerald-600 rounded-none inline-block border border-black/20" />
              <span className="text-gray-500">Background / Non-salient</span>
            </div>
          </div>
        </div>

        {/* Mandatory Limitation Statement from prompt 8 */}
        <div className="p-4 bg-gray-100 border border-[#d9d9d9] text-xs text-[#374151] leading-relaxed font-mono">
          <span className="text-[#000000] font-semibold block uppercase text-[10px] mb-1">
            Diagnostic Limitation Statement:
          </span>
          â€œGrad-CAM highlights image regions that influenced the model prediction. It does not independently confirm a lesion or establish a diagnosis.â€
        </div>

        {/* Three Required Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={() => navigate(`/screening/${session.id}/result`)}
          >
            â† Back to Screening Result
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={() => navigate('/screening/new')}
            >
              Screen Another Image
            </Button>
            <Link
              to={`/screening/${session.id}/report`}
              className="inline-flex items-center bg-[#000000] hover:bg-[#000000] text-white px-6 py-3 text-xs font-mono font-semibold tracking-wider uppercase transition-all shadow-md"
            >
              View Report â†’
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};


