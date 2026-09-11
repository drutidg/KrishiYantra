'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Tractor,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { setStoredUser } from '@/lib/auth';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { LanguageProvider } from '@/lib/language-context';

export default function LoginPage() {
  const router = useRouter();

  // Form State
  const [aadhaarRaw, setAadhaarRaw] = useState('');
  const [consent, setConsent] = useState(false);

  // Flow State: 'FORM' | 'SUCCESS'
  const [step, setStep] = useState<'FORM' | 'SUCCESS'>('FORM');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Authenticated farmer info for success screen
  const [verifiedFarmerName, setVerifiedFarmerName] = useState('Ravi Kumar');

  // Format Aadhaar visually as "XXXX XXXX XXXX" (4-4-4)
  const formatAadhaarDisplay = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 12);
    const parts = [];
    for (let i = 0; i < digits.length; i += 4) {
      parts.push(digits.substring(i, i + 4));
    }
    return parts.join(' ');
  };

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '').slice(0, 12);
    setAadhaarRaw(rawDigits);
    setError(null);
  };

  // Safe JSON response parser
  const parseJsonResponse = async (res: Response) => {
    try {
      const text = await res.text();
      return text ? JSON.parse(text) : {};
    } catch {
      return {};
    }
  };

  // Submit Aadhaar-only verification
  const handleAadhaarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Validate Aadhaar Number
    if (!aadhaarRaw || aadhaarRaw.length !== 12) {
      setError('Please enter a valid 12-digit Aadhaar number.');
      return;
    }

    // 2. Validate Consent
    if (!consent) {
      setError('Please consent to Aadhaar-based identity verification.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/auth/aadhaar-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aadhaar: aadhaarRaw,
          consent: true,
        }),
      });

      const data = await parseJsonResponse(res);

      if (res.ok && data.success && data.user) {
        setVerifiedFarmerName(data.user.name || 'Ravi Kumar');
        setStoredUser(data.user);
        setStep('SUCCESS');

        // Transition smoothly to Farmer Dashboard
        setTimeout(() => {
          router.push('/farmer/dashboard');
        }, 1200);
      } else {
        setError(data.message || 'Aadhaar verification failed. Please try again.');
      }
    } catch {
      setError('Error communicating with authentication service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // One-click Demo Farmer Login
  const handleDemoFarmer = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'FARMER' }),
      });
      const data = await parseJsonResponse(res);
      if (res.ok && data.success && data.user) {
        setStoredUser(data.user);
        router.push('/farmer/dashboard');
      } else {
        setError(data.message || data.error || 'Failed to login as demo farmer');
      }
    } catch (e: any) {
      setError(e.message || 'Demo farmer login error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // One-click Demo Staff Login
  const handleDemoStaff = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'STAFF' }),
      });
      const data = await parseJsonResponse(res);
      if (res.ok && data.success && data.user) {
        setStoredUser(data.user);
        router.push('/staff/dashboard');
      } else {
        setError(data.message || data.error || 'Failed to login as demo staff');
      }
    } catch (e: any) {
      setError(e.message || 'Demo staff login error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F9FBF7] flex flex-col justify-between p-4 sm:p-6">
        <div className="max-w-[400px] w-full mx-auto">
          {/* Top Bar with Logo & Language Selector */}
          <div className="flex items-center justify-between py-2 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#065F46] text-white flex items-center justify-center shadow-xs">
                <Tractor className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">KrishiYantra</span>
            </div>
            <LanguageSelector />
          </div>

          {/* Main Login Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg">
            {/* Card Header */}
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-black tracking-wider uppercase mb-2.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Secure Farmer Authentication</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Sign In to KrishiYantra</h2>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Verify your Aadhaar to securely access procurement centers and manage your bookings.
              </p>
            </div>

            {/* Error Message Box */}
            {error && (
              <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl font-semibold leading-snug">
                {error}
              </div>
            )}

            {/* FORM STEP */}
            {step === 'FORM' && (
              <form onSubmit={handleAadhaarSubmit} className="space-y-4">
                {/* Field: AADHAAR NUMBER */}
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Aadhaar Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <CreditCard className="w-4 h-4 text-slate-500" />
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatAadhaarDisplay(aadhaarRaw)}
                      onChange={handleAadhaarChange}
                      placeholder="Enter 12-digit Aadhaar number"
                      maxLength={14} // 12 digits + 2 spaces
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 transition-all tracking-wider"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Enter your 12-digit Aadhaar number (e.g. 1234 5678 1234)
                  </p>
                </div>

                {/* CONSENT CHECKBOX */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        setError(null);
                      }}
                      className="mt-0.5 w-4 h-4 rounded-md text-emerald-700 border-slate-300 focus:ring-emerald-600 cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 font-medium leading-tight">
                      I consent to Aadhaar-based identity verification.
                    </span>
                  </label>
                </div>

                {/* PRIMARY ACTION BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-2xl bg-[#065F46] hover:bg-emerald-900 active:scale-98 text-white font-extrabold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <Lock className="w-4 h-4" />
                  <span>{loading ? 'Verifying Aadhaar...' : '🔐 Verify Aadhaar & Continue'}</span>
                </button>

                {/* Security Note & SIH Demo Badge */}
                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="flex items-start gap-2 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>
                      <strong>Secure Farmer Verification:</strong> Your Aadhaar is used only for identity verification and secure access.
                    </span>
                  </div>

                  <div className="p-2 bg-emerald-50/80 rounded-xl border border-emerald-200/70 text-[10px] text-emerald-900 flex items-center justify-between">
                    <span className="font-semibold">SIH Prototype • Demo Verification Mode</span>
                    <span className="px-1.5 py-0.5 bg-emerald-200/80 text-emerald-950 font-bold rounded-md text-[9px]">
                      Simulated
                    </span>
                  </div>
                </div>
              </form>
            )}

            {/* SUCCESS STATE */}
            {step === 'SUCCESS' && (
              <div className="py-8 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 animate-bounce" />
                </div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Identity Verified</h3>
                <p className="text-xs font-semibold text-emerald-800">
                  Welcome back, {verifiedFarmerName}!
                </p>
                <p className="text-[11px] text-slate-400">
                  Redirecting to your KrishiYantra dashboard...
                </p>
              </div>
            )}

            {/* Instant Demo Authentications Divider */}
            {step === 'FORM' && (
              <>
                <div className="relative my-5">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-slate-400 font-extrabold tracking-wider text-[10px]">
                      OR INSTANT DEMO ACCESS
                    </span>
                  </div>
                </div>

                {/* 1-Click Demo Buttons */}
                <div className="space-y-2.5">
                  <button
                    type="button"
                    onClick={handleDemoFarmer}
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 active:scale-98 border border-emerald-300 text-emerald-950 font-bold text-xs flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="w-8 h-8 rounded-full bg-[#065F46] text-white flex items-center justify-center font-black text-xs">
                        R
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-slate-900">Demo Farmer (Ravi Kumar)</div>
                        <div className="text-[10px] text-emerald-800 font-medium">Token B-104 • Live queue #4</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-800" />
                  </button>

                  <button
                    type="button"
                    onClick={handleDemoStaff}
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-2xl bg-slate-50 hover:bg-slate-100 active:scale-98 border border-slate-300 text-slate-900 font-bold text-xs flex items-center justify-between transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-black text-xs">
                        S
                      </div>
                      <div>
                        <div className="font-extrabold text-sm text-slate-900">Demo Staff (Center Operator)</div>
                        <div className="text-[10px] text-slate-500 font-medium">Call Next • Complete • Analytics</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center py-4 text-xs text-slate-400">
          KrishiYantra Hackathon Edition • Secure Government-Compatible Interface
        </div>
      </div>
    </LanguageProvider>
  );
}

