import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/common/Button';

export const SimulationPage: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [isSimulating, setIsSimulating] = useState(false);

  const steps = [
    { num: 1, title: 'Field Acquisition', desc: 'Capturing non-mydriatic 45Â° fundus image in rural camp' },
    { num: 2, title: 'Optical Quality Gate', desc: 'Validating illumination, focus, pupil aperture, and motion blur' },
    { num: 3, title: 'Neural Inference', desc: 'Quantized ONNX model classifies 5 ICDR disease severity stages' },
    { num: 4, title: 'Grad-CAM Attention', desc: 'Computing spatial activation gradients over convolutional layers' },
    { num: 5, title: 'Tele-Triage Output', desc: 'ABHA referral slip generated for district ophthalmology clinic' },
  ];

  const handleNextStep = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setStep((prev) => (prev < 5 ? prev + 1 : 1));
      setIsSimulating(false);
    }, 400);
  };

  return (
    <AuthLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="pb-6 border-b border-gray-200">
          <span className="text-[10px] font-mono tracking-widest text-[#000000] uppercase block font-semibold mb-1">
            Training & Demonstration Sandbox
          </span>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#000000]">
            Rural Screening Workflow Simulation
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Step-by-step simulator for training vision technicians, ASHA workers, and district supervisors.
          </p>
        </div>

        {/* Steps Progress Header */}
        <div className="grid grid-cols-5 gap-2">
          {steps.map((s) => (
            <div
              key={s.num}
              onClick={() => setStep(s.num)}
              className={`p-3 border text-left cursor-pointer transition-all ${
                step === s.num
                  ? 'border-[#000000] bg-[#000000] text-white shadow-sm'
                  : step > s.num
                  ? 'border-[#000000] bg-[#000000]/5 text-[#000000]'
                  : 'border-[#e0e0e0] bg-[#ffffff] text-gray-500'
              }`}
            >
              <div className="text-[10px] font-mono font-semibold">0{s.num}</div>
              <div className="text-[11px] font-medium mt-1 truncate">{s.title}</div>
            </div>
          ))}
        </div>

        {/* Active Step Panel */}
        <div className="bg-[#ffffff] sm:bg-white/90 p-8 border border-[#e0e0e0] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <span className="text-[10px] font-mono text-[#000000] uppercase font-semibold">
                Step 0{step} of 05
              </span>
              <h2 className="text-xl font-medium text-[#000000] mt-0.5">
                {steps[step - 1].title}
              </h2>
            </div>
            <span className="font-mono text-xs text-gray-500">
              Status: <span className="text-emerald-700 font-semibold">SIMULATED ACTIVE</span>
            </span>
          </div>

          <p className="text-sm text-[#374151] leading-relaxed">
            {steps[step - 1].desc}
          </p>

          <div className="p-6 bg-gray-100 border border-[#d9d9d9] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#000000] font-semibold">
                Telemetry Log
              </span>
              <div className="text-xs font-mono text-[#000000]">
                {step === 1 && '>> Captured frame resolution: 2848x2848, Format: RGB, Camera ID: Remidio-091'}
                {step === 2 && '>> Quality gate score: 94.2%, Clarity: 94%, Macula centration: 91%, Dilation: OK'}
                {step === 3 && '>> Inference completed in 320ms. Classified Stage: 2 (Moderate NPDR), Confidence: 92.4%'}
                {step === 4 && '>> Grad-CAM layer Conv5_Residual_Out. 3 Saliency hotspots localized in temporal arcades'}
                {step === 5 && '>> ABHA referral generated. Transmitted encrypted payload to District Hospital Minto'}
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={handleNextStep}
              isLoading={isSimulating}
              className="flex-shrink-0"
            >
              {step === 5 ? 'Restart Simulator â†º' : 'Simulate Next Stage â†’'}
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs font-mono">
          <Link to="/dashboard" className="text-gray-500 hover:text-[#000000] uppercase">
            â† Return to Dashboard
          </Link>
          <Link to="/screening/new" className="text-[#000000] font-semibold uppercase hover:underline">
            Test on Real Fundus Scan â†’
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};


