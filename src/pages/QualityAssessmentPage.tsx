import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { screeningService } from '../services/screeningService';
import type { ScreeningSession } from '../types/screening';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const QualityAssessmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<ScreeningSession | null>(null);
  const [loading, setLoading] = useState(true);
  // Toggle for testing both pass and fail states in the prototype
  const [simulatedFail, setSimulatedFail] = useState(false);

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
        <LoadingSpinner label="Evaluating Optical Quality Checks..." />
      </AuthLayout>
    );
  }

  if (!session) {
    return (
      <AuthLayout>
        <div className="text-center py-16 space-y-4">
          <p className="text-sm text-gray-500">Screening record not found or inaccessible.</p>
          <Link to="/dashboard" className="text-xs font-mono text-[#000000] uppercase underline">
            Return to Dashboard
          </Link>
        </div>
      </AuthLayout>
    );
  }

  const isPassing = !simulatedFail && session.quality.status === 'acceptable';

  return (
    <AuthLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#000000] uppercase block font-semibold mb-1">
              Automated Optical Gate
            </span>
            <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#000000]">
              Image Quality Check
            </h1>
            <p className="text-xs text-gray-500 font-mono mt-0.5">
              Study ID: {session.id} Â· Eye: {session.eyeExamined} Â· Device: {session.deviceModel}
            </p>
          </div>

          {/* Test toggle between Pass and Needs Recapture */}
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 border border-[#d9d9d9] text-[10px] font-mono">
            <span className="text-gray-500">Test Fixture:</span>
            <button
              type="button"
              onClick={() => setSimulatedFail(false)}
              className={`px-2 py-0.5 uppercase cursor-pointer ${!simulatedFail ? 'bg-[#000000] text-white font-semibold' : 'text-[#374151]'}`}
            >
              Pass
            </button>
            <button
              type="button"
              onClick={() => setSimulatedFail(true)}
              className={`px-2 py-0.5 uppercase cursor-pointer ${simulatedFail ? 'bg-red-800 text-white font-semibold' : 'text-[#374151]'}`}
            >
              Needs Recapture
            </button>
          </div>
        </div>

        {/* Progress Steps Indicator */}
        <div className="bg-[#ffffff] border border-[#e0e0e0] p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 flex items-center gap-2 border border-emerald-200">
              <span className="font-semibold">âœ“ 01</span>
              <span>Upload Image Â· Done</span>
            </div>
            <div className="p-2.5 bg-[#000000] text-white flex items-center gap-2">
              <span className="font-semibold">02</span>
              <span>Quality Check Â· Active</span>
            </div>
            <div className="p-2.5 bg-gray-100 text-gray-500 flex items-center gap-2 border border-gray-200">
              <span className="font-semibold">03</span>
              <span>AI Result Â· Pending</span>
            </div>
            <div className="p-2.5 bg-gray-100 text-gray-500 flex items-center gap-2 border border-gray-200">
              <span className="font-semibold">04</span>
              <span>Report Â· Pending</span>
            </div>
          </div>
        </div>

        {/* Quality Check Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Fundus Preview & Metadata */}
          <div className="bg-[#ffffff] sm:bg-white/90 p-6 border border-[#e0e0e0] shadow-sm space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500 block">
              Fundus Photograph Preview
            </span>
            <div className="aspect-[4/3] bg-black overflow-hidden border border-black/20">
              <img
                src={session.fundusImageUrl}
                alt="Fundus examination"
                className={`w-full h-full object-cover ${simulatedFail ? 'filter blur-[2px]' : ''}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-gray-500 pt-2 border-t border-gray-200">
              <div>Dimensions: <span className="text-[#000000]">2848 Ã— 2848 px</span></div>
              <div>Field: <span className="text-[#000000]">45Â° Posterior Pole</span></div>
              <div>Format: <span className="text-[#000000]">24-bit sRGB</span></div>
              <div>File Size: <span className="text-[#000000]">4.2 MB</span></div>
            </div>
          </div>

          {/* 3 Explicit Quality Checks */}
          <div className="bg-[#ffffff] sm:bg-white/90 p-6 sm:p-8 border border-[#e0e0e0] shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <span className="text-xs font-mono uppercase tracking-wider text-[#000000] font-semibold">
                Optical Assessment Summary
              </span>
              <span className={`px-2.5 py-1 text-xs font-mono font-semibold uppercase ${
                isPassing
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-red-50 text-red-900 border border-red-300'
              }`}>
                {isPassing ? 'Status: Pass' : 'Status: Needs Recapture'}
              </span>
            </div>

            {/* Check 1: Sharpness / Blur */}
            <div className="p-4 bg-[#ffffff] border border-[#e0e0e0] space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-[#000000]">1. Sharpness & Focus Fidelity</span>
                <span className={isPassing ? 'text-emerald-700 font-semibold' : 'text-red-700 font-semibold'}>
                  {isPassing ? 'âœ“ Pass (95%)' : 'âš  Defect Detected (48%)'}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                {isPassing
                  ? 'Retinal vascular borders and foveal avascular zone margins are sharply resolved.'
                  : 'Significant motion blur detected in temporal quadrant. Microaneurysm detection impeded.'}
              </p>
            </div>

            {/* Check 2: Brightness & Illumination */}
            <div className="p-4 bg-[#ffffff] border border-[#e0e0e0] space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-[#000000]">2. Brightness & Illumination Uniformity</span>
                <span className={isPassing ? 'text-emerald-700 font-semibold' : 'text-red-700 font-semibold'}>
                  {isPassing ? 'âœ“ Pass (93%)' : 'âš  Suboptimal (52%)'}
                </span>
              </div>
              <p className="text-[11px] text-gray-500">
                {isPassing
                  ? 'Balanced illumination across 45Â° posterior pole without blinding corneal flash reflex.'
                  : 'Uneven crescent illumination. Nasal half under-exposed due to pupil misalignment.'}
              </p>
            </div>

            {/* Check 3: Retinal Field of View & Centering */}
            <div className="p-4 bg-[#ffffff] border border-[#e0e0e0] space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-semibold text-[#000000]">3. Retinal Field of View & Macular Centration</span>
                <span className="text-emerald-700 font-semibold">âœ“ Pass (91%)</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Optic disc and macula both positioned within designated 45Â° standard diagnostic boundary.
              </p>
            </div>

            {/* Action Buttons depending on Pass vs Fail */}
            <div className="pt-4 border-t border-gray-200">
              {isPassing ? (
                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate(`/screening/${session.id}/result`)}
                    className="w-full"
                  >
                    Continue to AI Screening â†’
                  </Button>
                  <p className="text-[10px] font-mono text-center text-gray-500">
                    Image meets all optical quality criteria for automated neural inference.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-900 leading-snug">
                    <span className="font-semibold block font-mono uppercase text-[10px] mb-1">
                      Actionable Recapture Advice:
                    </span>
                    Instill lubricating drops or ask the patient to blink twice. Re-align pupil center in darkened room before capturing next exposure. AI grading blocked.
                  </div>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate('/screening/new')}
                    className="w-full"
                  >
                    Upload a New Image â†º
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};


