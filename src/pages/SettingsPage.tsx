import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { useAuth } from '../app/useAuth';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';

export const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.name || 'Sunita Devi');
  const [workEmail, setWorkEmail] = useState(user?.email || 'sunita.devi@phc.malur.gov.in');
  const [language, setLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY (Indian Standard)');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  return (
    <AuthLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="pb-6 border-b border-gray-200">
          <span className="text-[10px] font-mono tracking-widest text-[#000000] uppercase block font-semibold mb-1">
            Configuration & Station Governance
          </span>
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-[#000000]">
            Station Settings
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Manage account credentials, regional preferences, audit session logs, and system metadata.
          </p>
        </div>

        {savedSuccess && (
          <Alert type="success">
            Account preferences saved to local station profile.
          </Alert>
        )}

        {/* Section 1: Account */}
        <form onSubmit={handleSaveAccount} className="bg-[#ffffff] sm:bg-white/90 p-6 sm:p-8 border border-[#e0e0e0] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="text-sm font-mono uppercase tracking-wider text-[#000000] font-semibold">
              01 Â· Account Information
            </h2>
            <span className="text-[10px] font-mono text-gray-500">
              STATION CREDENTIALS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1 font-semibold">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#e0e0e0] px-3.5 py-2 text-xs text-[#000000] focus:border-[#000000]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1 font-semibold">
                Work Email
              </label>
              <input
                type="email"
                value={workEmail}
                onChange={(e) => setWorkEmail(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#e0e0e0] px-3.5 py-2 text-xs text-[#000000] font-mono focus:border-[#000000]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1 font-semibold">
                Assigned Clinical Role (Read-Only)
              </label>
              <input
                type="text"
                disabled
                value={`${(user?.role || 'vision_technician').replace('_', ' ').toUpperCase()} Â· ${user?.healthCenter || 'Primary Health Centre Malur'}`}
                className="w-full bg-gray-100 border border-[#e0e0e0] px-3.5 py-2 text-xs text-gray-500 font-mono cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button type="submit" variant="primary" size="sm">
              Save Account Changes
            </Button>
          </div>
        </form>

        {/* Section 2: Preferences */}
        <div className="bg-[#ffffff] sm:bg-white/90 p-6 sm:p-8 border border-[#e0e0e0] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="text-sm font-mono uppercase tracking-wider text-[#000000] font-semibold">
              02 Â· Regional Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1 font-semibold">
                Interface Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#e0e0e0] px-3 py-2 text-xs text-[#000000] focus:border-[#000000]"
              >
                <option value="English">English</option>
                <option value="Kannada">à²•à²¨à³à²¨à²¡ (Kannada)</option>
                <option value="Hindi">à¤¹à¤¿à¤¨à¥à¤¦à¥€ (Hindi)</option>
                <option value="Tamil">à®¤à®®à®¿à®´à¯ (Tamil)</option>
                <option value="Telugu">à°¤à±†à°²à±à°—à± (Telugu)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-1 font-semibold">
                Date & Time Format
              </label>
              <select
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
                className="w-full bg-[#ffffff] border border-[#e0e0e0] px-3 py-2 text-xs text-[#000000] font-mono focus:border-[#000000]"
              >
                <option value="DD/MM/YYYY (Indian Standard)">DD/MM/YYYY (Indian Standard Time)</option>
                <option value="YYYY-MM-DD (ISO 8601)">YYYY-MM-DD (ISO 8601)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Security & Session */}
        <div className="bg-[#ffffff] sm:bg-white/90 p-6 sm:p-8 border border-[#e0e0e0] shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <h2 className="text-sm font-mono uppercase tracking-wider text-[#000000] font-semibold">
              03 Â· Session Security & Data Protection
            </h2>
            <button
              onClick={handleSignOut}
              className="text-xs font-mono uppercase text-red-700 hover:underline font-semibold cursor-pointer"
            >
              Sign Out of Station
            </button>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-[#374151]">
            <div className="p-4 bg-gray-100 border border-[#d9d9d9] space-y-1">
              <span className="font-mono text-[10px] uppercase font-semibold text-[#000000] block">
                Responsible Handling of Retinal Data
              </span>
              <p>
                Patient retinal fundus images contain unique biometric vascular markers. Frontline screeners must maintain confidentiality and process scans exclusively under institutional clinical review agreements.
              </p>
            </div>
            <div className="text-[11px] font-mono text-gray-500">
              Active Session Token: <span className="text-[#000000]">AUTH-EXP-SESSION-LOCAL-SANDBOX</span> Â· Encryption: AES-GCM
            </div>
          </div>
        </div>

        {/* Section 4: Application Information */}
        <div className="bg-[#ffffff] p-6 border border-[#e0e0e0] text-xs font-mono text-gray-500 space-y-2">
          <div className="flex items-center justify-between">
            <span>Frontend Prototype Version:</span>
            <span className="text-[#000000] font-semibold">v1.0.0 (React 19 + TypeScript)</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Inference Model Engine:</span>
            <span className="text-[#000000] font-semibold">RETINAGUARD v4.2.1 ONNX</span>
          </div>
          <div className="pt-2 border-t border-gray-200 text-[10px] text-center text-gray-400">
            NOT A STANDALONE MEDICAL DEVICE Â· RESEARCH & CLINICAL TRIAGE DECISION SUPPORT ONLY
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};


