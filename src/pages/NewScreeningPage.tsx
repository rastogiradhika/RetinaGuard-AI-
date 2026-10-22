import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';

export const NewScreeningPage: React.FC = () => {
  const navigate = useNavigate();

  const [studyId, setStudyId] = useState('STUDY-2025-0982');
  const [eyeSide, setEyeSide] = useState<'OD' | 'OS'>('OD');
  const [consentConfirmed, setConsentConfirmed] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80'
  );
  const [fileName, setFileName] = useState('fundus_macula_OD.jpg');
  const [fileSize, setFileSize] = useState('4.2 MB');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        setUploadError('Invalid format. Only JPG, JPEG and PNG images are accepted.');
        return;
      }
      if (file.size > 15 * 1024 * 1024) {
        setUploadError('File exceeds maximum limit of 15 MB.');
        return;
      }
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setFileName('');
    setFileSize('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    if (!selectedFile) {
      setUploadError('Please select or upload a retinal fundus image before proceeding.');
      return;
    }
    if (!consentConfirmed) {
      setUploadError('Please confirm patient informed screening consent.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to image quality assessment for this study record
      navigate('/screening/RG-2025-0891/quality');
    }, 400);
  };

  return (
    <AuthLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="pb-6 border-b border-gray-200">
          <span className="text-[10px] font-mono tracking-widest text-[#000000] uppercase block font-semibold mb-1">
            Clinical Intake & Upload
          </span>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#000000]">
            New Retinal Screening
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Upload a retinal fundus image. The image will first undergo automated optical quality assessment before AI diabetic retinopathy grading.
          </p>
        </div>

        {/* Progress Steps Indicator */}
        <div className="bg-[#ffffff] border border-[#e0e0e0] p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-2.5 bg-[#000000] text-white flex items-center gap-2">
              <span className="font-semibold">01</span>
              <span>Upload Image Â· Active</span>
            </div>
            <div className="p-2.5 bg-gray-100 text-gray-500 flex items-center gap-2 border border-gray-200">
              <span className="font-semibold">02</span>
              <span>Quality Check Â· Pending</span>
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

        {uploadError && (
          <Alert type="warning">
            {uploadError}
          </Alert>
        )}

        {/* Form & Side Panel Grid */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Upload Card */}
          <div className="lg:col-span-2 bg-[#ffffff] sm:bg-white/90 p-6 sm:p-8 border border-[#e0e0e0] shadow-sm space-y-6">
            <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#000000] font-semibold">
                Screening Parameters
              </span>
              <span className="text-[10px] font-mono text-gray-500">
                ANONYMIZED CLINICAL STUDY
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                  Study ID (De-Identified)
                </label>
                <input
                  type="text"
                  required
                  value={studyId}
                  onChange={(e) => setStudyId(e.target.value)}
                  placeholder="e.g. STUDY-2025-0982"
                  className="w-full bg-[#ffffff] border border-[#e0e0e0] px-3.5 py-2 text-xs text-[#000000] font-mono focus:border-[#000000]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1.5 font-semibold">
                  Eye Side Examined
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEyeSide('OD')}
                    className={`py-2 text-xs font-mono uppercase tracking-wider border cursor-pointer transition-colors ${
                      eyeSide === 'OD'
                        ? 'border-[#000000] bg-[#000000]/10 text-[#000000] font-semibold'
                        : 'border-[#e0e0e0] bg-[#ffffff] text-gray-500 hover:border-black/30'
                    }`}
                  >
                    Right Eye (OD)
                  </button>
                  <button
                    type="button"
                    onClick={() => setEyeSide('OS')}
                    className={`py-2 text-xs font-mono uppercase tracking-wider border cursor-pointer transition-colors ${
                      eyeSide === 'OS'
                        ? 'border-[#000000] bg-[#000000]/10 text-[#000000] font-semibold'
                        : 'border-[#e0e0e0] bg-[#ffffff] text-gray-500 hover:border-black/30'
                    }`}
                  >
                    Left Eye (OS)
                  </button>
                </div>
              </div>
            </div>

            {/* Drag & Drop Upload Area */}
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-2 font-semibold">
                Retinal Fundus Image
              </label>

              {selectedFile ? (
                <div className="border border-[#e0e0e0] bg-[#ffffff] p-5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-black overflow-hidden flex-shrink-0 border border-gray-200">
                      <img src={selectedFile} alt="Fundus Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-semibold text-[#000000] truncate max-w-xs">{fileName}</div>
                      <div className="text-[11px] font-mono text-gray-500">Size: {fileSize}</div>
                      <div className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.2 inline-block border border-emerald-200">
                        Format Validated
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                    <label className="text-[11px] font-mono text-[#000000] uppercase underline cursor-pointer font-semibold">
                      Replace Image
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-[11px] font-mono text-red-700 uppercase underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[#e0e0e0] hover:border-[#000000] transition-colors p-8 text-center bg-[#ffffff]">
                  <svg className="w-10 h-10 text-gray-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-xs text-[#000000] font-medium mb-1">
                    Drag and drop fundus photograph here, or browse local files
                  </p>
                  <p className="text-[10px] font-mono text-gray-500 mb-4">
                    Supports JPG, JPEG and PNG Â· Maximum 15 MB
                  </p>
                  <label className="inline-block bg-[#000000] hover:bg-[#000000] text-white text-[11px] font-mono font-semibold uppercase px-5 py-2.5 cursor-pointer shadow-sm">
                    Browse Files
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Consent Confirmation */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#374151]">
                <input
                  type="checkbox"
                  checked={consentConfirmed}
                  onChange={(e) => setConsentConfirmed(e.target.checked)}
                  className="accent-[#000000] w-4 h-4 rounded-none mt-0.5"
                />
                <span>
                  I confirm that patient verbal/written screening consent has been verified as required by the public health camp protocol.
                </span>
              </label>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                className="w-full"
              >
                Assess Image Quality â†’
              </Button>
            </div>
          </div>

          {/* Side Panel Checklist */}
          <div className="space-y-6">
            <div className="bg-[#ffffff] sm:bg-white/90 p-6 border border-[#e0e0e0] shadow-sm space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#000000] font-semibold block border-b border-gray-200 pb-2">
                Image Preparation Checklist
              </span>

              <ul className="text-xs space-y-3 text-[#374151]">
                <li className="flex items-start gap-2">
                  <span className="text-[#000000] font-mono font-bold">âœ“</span>
                  <div>
                    <span className="font-semibold text-[#000000]">Sharpness / Focus:</span> Ensure retinal vascular arcades and optic disc margins are crisp without motion blur.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#000000] font-mono font-bold">âœ“</span>
                  <div>
                    <span className="font-semibold text-[#000000]">Illumination:</span> Avoid excessive corneal reflection glare or dark crescent shadows caused by poor alignment.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#000000] font-mono font-bold">âœ“</span>
                  <div>
                    <span className="font-semibold text-[#000000]">Retinal FOV:</span> Fovea should be centered within 1 disc diameter of image center for 45Â° posterior pole views.
                  </div>
                </li>
              </ul>

              <div className="p-3 bg-gray-100 border border-[#d9d9d9] text-[11px] text-gray-500 font-mono leading-snug">
                Note: Images that fail optical quality checks must be recaptured before AI diabetic retinopathy grading.
              </div>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};


