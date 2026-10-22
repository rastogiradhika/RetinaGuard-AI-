import React from 'react';
import { Link } from 'react-router-dom';
import { PublicLayout } from '../components/layout/PublicLayout';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Capture and Upload',
      desc: 'A frontline community worker or vision technician captures a 45Â° non-mydriatic retinal fundus photograph and submits it to the system.',
      input: 'Fundus camera photo (JPG/PNG)',
      output: 'Validated image file & Study ID',
    },
    {
      step: '02',
      title: 'Image Quality Assessment',
      desc: 'An automated optical gate inspects focus sharpness, brightness uniformity, and macular centering before inference.',
      input: 'Raw fundus pixel tensor',
      output: 'Pass or Needs Recapture status',
    },
    {
      step: '03',
      title: 'AI-Assisted Grading',
      desc: 'When quality checks pass, the deep neural model classifies the image into one of five ICDR diabetic retinopathy severity stages.',
      input: 'Verified clear fundus photo',
      output: 'Predicted DR stage (Grade 0â€“4)',
    },
    {
      step: '04',
      title: 'Grad-CAM Explanation',
      desc: 'Gradient-weighted class activation maps highlight visual regions (microaneurysms, hemorrhages) that drove the prediction.',
      input: 'Convolutional feature activations',
      output: 'Saliency heatmap overlay',
    },
    {
      step: '05',
      title: 'Screening Report',
      desc: 'Findings, quality scores, and Grad-CAM visualizations are compiled into a tele-referral slip for professional review.',
      input: 'Combined triage metrics',
      output: 'Printable referral document',
    },
  ];

  return (
    <PublicLayout>
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 sm:py-24 space-y-20">
        {/* Page Title */}
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#000000] block mb-3 font-semibold">
            Methodology & Protocol
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#111111] leading-tight">
            How the Screening Workflow Works
          </h1>
          <p className="mt-4 text-[#111111]/75 font-normal text-base leading-relaxed">
            A structured five-step workflow designed to protect clinical safety, reject poor-quality fundus exposures, and supply transparent reasoning for every automated prediction.
          </p>
        </div>

        {/* Five-Step Horizontal / Vertical Workflow Grid */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((item) => (
              <div
                key={item.step}
                className="bg-[#ffffff] p-6 border border-[#e0e0e0] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded bg-[#000000]/10 flex items-center justify-center text-[#000000] mb-4 font-mono text-xs font-semibold">
                    {item.step}
                  </div>
                  <h3 className="text-base font-medium tracking-tight text-[#111111] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#111111]/70 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e0e0e0] space-y-1.5 text-[10px] font-mono">
                  <div>
                    <span className="text-gray-500 block uppercase">Input:</span>
                    <span className="text-[#000000] font-medium">{item.input}</span>
                  </div>
                  <div>
                    <span className="text-[#000000] block uppercase font-semibold">Output:</span>
                    <span className="text-[#000000] font-medium">{item.output}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "What this system does not do" Section */}
        <div className="bg-[#ffffff] border border-[#e0e0e0] p-8 sm:p-12 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-red-800 font-semibold block mb-1">
              Ethical & Safety Scope
            </span>
            <h2 className="text-2xl font-light text-[#000000]">
              What This System Does Not Do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#374151] leading-relaxed">
            <div className="p-4 bg-white/70 border border-[#e0e0e0]">
              <span className="font-mono text-[10px] uppercase text-red-800 font-semibold block mb-1">
                Not a Confirmed Diagnosis
              </span>
              <p>
                AI output is an assistive triage estimation. It cannot replace a comprehensive dilated slit-lamp fundus biomicroscopy by an ophthalmologist.
              </p>
            </div>

            <div className="p-4 bg-white/70 border border-[#e0e0e0]">
              <span className="font-mono text-[10px] uppercase text-red-800 font-semibold block mb-1">
                Grad-CAM Is Not Histology
              </span>
              <p>
                Grad-CAM highlights mathematical attention gradients in neural feature layers; it does not prove the presence of an individual micro-lesion.
              </p>
            </div>

            <div className="p-4 bg-white/70 border border-[#e0e0e0]">
              <span className="font-mono text-[10px] uppercase text-red-800 font-semibold block mb-1">
                No Grading on Poor Images
              </span>
              <p>
                Images failing optical clarity or pupil centering gates are halted immediately. The system never forces an AI prediction on blurry photos.
              </p>
            </div>

            <div className="p-4 bg-white/70 border border-[#e0e0e0]">
              <span className="font-mono text-[10px] uppercase text-red-800 font-semibold block mb-1">
                Evaluation on Held-Out Data
              </span>
              <p>
                Reported model metrics are valid only when evaluated on properly documented, independent held-out clinical test sets.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <Link
            to="/model-performance"
            className="text-xs font-mono text-[#000000] hover:underline uppercase tracking-wider font-semibold"
          >
            â† View Model Performance & Benchmarks
          </Link>
          <Link
            to="/screening/new"
            className="bg-[#000000] hover:bg-[#000000] text-white text-xs font-mono uppercase px-6 py-3 tracking-wider shadow-sm"
          >
            Start New Screening â†’
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};


