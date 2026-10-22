import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../app/useAuth';
import type { UserRole } from '../types/user';
import { Button } from '../components/common/Button';
import { Alert } from '../components/common/Alert';

export const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail]           = useState('sunita.devi@retinaguard.icmr.in');
  const [password, setPassword]     = useState('â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole]             = useState<UserRole>('vision_technician');
  const [error, setError]           = useState<string | null>(null);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Please provide a valid clinical work email or username.');
      return;
    }
    try {
      const success = await login(email, role);
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Authentication rejected by health network gateway.');
      }
    } catch {
      setError('Unable to reach primary health centre authentication server.');
    }
  };

  const handleQuickDemo = async (demoEmail: string, demoRole: UserRole) => {
    setEmail(demoEmail);
    setRole(demoRole);
    await login(demoEmail, demoRole);
    navigate(from, { replace: true });
  };

  const inputClass =
    'w-full bg-white border border-black/20 px-4 py-3 text-xs text-black placeholder-black/30 focus:border-black focus:outline-none transition-all font-mono';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-white selection:text-black">

      {/* Header */}
      <header className="border-b border-white/10 px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" strokeDasharray="2 3" strokeOpacity="0.35" strokeWidth="1.2" />
            <circle cx="20" cy="20" r="13" strokeOpacity="0.7" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="8" strokeWidth="2" />
            <circle cx="20" cy="20" fill="white" r="3" />
            <path d="M7 20H1M39 20H33M20 7V1M20 39V33" strokeLinecap="round" strokeWidth="1.5" />
          </svg>
          <span className="text-sm font-semibold text-white">
            RetinaGuard <span className="font-mono text-[10px] px-1.5 py-0.5 bg-white text-black font-bold">AI</span>
          </span>
        </Link>
        <Link to="/" className="text-[11px] font-mono text-white/40 hover:text-white uppercase tracking-wider transition-colors">
          â† Homepage
        </Link>
      </header>

      {/* Main two-column split */}
      <main className="flex-1 flex">
        {/* Left â€” hero / info panel with eye image */}
        <div className="hidden lg:flex relative w-1/2 flex-col justify-end overflow-hidden">
          <img
            src="/hero-eye.jpg"
            alt="Macro eye photograph"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="relative z-10 p-16 pb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="label-mono text-white/50">Authorized Personnel Portal</span>
            </div>
            <h1 className="text-5xl font-light text-white leading-tight tracking-tight mb-6">
              Welcome back to<br />
              <span className="font-semibold">clearer screening.</span>
            </h1>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              Connect your fundus imaging station to the clinical decision support engine.
              Designed for ASHA workers, vision technicians, and reviewing ophthalmologists.
            </p>
            <div className="mt-10 pt-8 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/25">
              <span>ICMR-AI DECISION SUPPORT</span>
              <span>NHA / ABHA READY</span>
            </div>
          </div>
        </div>

        {/* Right â€” sign-in form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-[#F7F7F8]">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <span className="label-mono text-gray-400 block mb-2">Frontline Station Sign-In</span>
              <h2 className="text-3xl font-light text-black">Access Workspace</h2>
            </div>

            {error && (
              <Alert type="warning" className="mb-6">{error}</Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-2 font-semibold">
                  Work Email or Username
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@phc.kolar.gov.in"
                  className={inputClass}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-gray-500 font-semibold">
                    Station Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[10px] font-mono text-gray-500 hover:text-black uppercase transition-colors"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-500 mb-2 font-semibold">
                  Assigned Clinical Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className={inputClass}
                >
                  <option value="vision_technician">Vision Technician (Primary Screener)</option>
                  <option value="asha_worker">ASHA Worker (Field Camp)</option>
                  <option value="medical_officer">Medical Officer (PHC Triage)</option>
                  <option value="ophthalmologist">Ophthalmologist (District Reviewer)</option>
                </select>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isLoading}>
                  Sign In to Screening Station
                </Button>
              </div>
            </form>

            {/* Demo profiles */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="label-mono text-gray-400 text-[9px]">Development Demo Mode</span>
                <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  Ready to test
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('sunita.devi@phc.malur.gov.in', 'vision_technician')}
                  className="p-3 border border-gray-200 text-left hover:border-black hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="text-xs font-semibold text-black">Sunita Devi</div>
                  <div className="text-[9px] font-mono text-gray-400">Vision Tech Â· PHC Malur</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemo('dr.arvind@minto.gov.in', 'ophthalmologist')}
                  className="p-3 border border-gray-200 text-left hover:border-black hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="text-xs font-semibold text-black">Dr. Arvind S.</div>
                  <div className="text-[9px] font-mono text-gray-400">Retina Specialist Â· Minto</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 py-5 px-6 text-center text-[9px] font-mono text-white/20">
        AUTHORIZED SCREENING PERSONNEL ONLY Â· DIGITAL HEALTH MISSION COMPLIANT
      </footer>
    </div>
  );
};

