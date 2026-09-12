'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Building2, CheckCircle2, CreditCard, Eye, EyeOff, Leaf, LockKeyhole, Phone, UserRound } from 'lucide-react';
import { setStoredUser } from '@/lib/auth';

type PortalRole = 'FARMER' | 'VENDOR';

interface PortalAuthFormProps {
  role: PortalRole;
}

export function PortalAuthForm({ role }: PortalAuthFormProps) {
  const router = useRouter();
  const isFarmer = role === 'FARMER';
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [village, setVillage] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(false);
  const [createdCustomerId, setCreatedCustomerId] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [consent, setConsent] = useState(false);

  const parseResponse = async (response: Response) => {
    try {
      return await response.json();
    } catch {
      return {};
    }
  };

  const finishLogin = (user: any) => {
    setStoredUser(user);
    router.push(isFarmer ? '/farmer/booking' : '/staff/dashboard');
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setCreated(false);

    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/password-login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, aadhaar, password, village, email, role }),
      });
      const data = await parseResponse(response);
      if (!response.ok || !data.success || !data.user) {
        setError(data.message || 'Please check your details and try again.');
        return;
      }
      if (mode === 'signup') {
        setCreated(true);
        setCreatedCustomerId(data.user.customerId || '');
        setMode('login');
        setPassword('');
        setName('');
      } else {
        finishLogin(data.user);
      }
    } catch {
      setError('The authentication service is unavailable. Make sure the app server is running.');
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      const data = await parseResponse(response);
      if (!response.ok || !data.success || !data.user) {
        setError(data.message || 'Demo login failed.');
        return;
      }
      finishLogin(data.user);
    } catch {
      setError('The authentication service is unavailable.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#edf4ee] px-4 py-6 text-slate-900 sm:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
        <section className={`relative overflow-hidden bg-[#124734] text-white sm:p-12 ${isFarmer ? 'pl-4 pr-8 pt-8 pb-8' : 'p-8'}`}>
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[22px] border-lime-300/20" />
          <div className="relative flex h-full flex-col justify-between gap-12">
            <div>
              <div className="mb-10 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-lime-300 text-emerald-950"><Leaf className="h-6 w-6" /></div>
                <div><p className="text-lg font-black tracking-tight">KrishiYantra</p><p className="text-xs text-emerald-100/75">Mandi operations, made clear</p></div>
              </div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">{isFarmer ? 'Farmer portal' : 'Vendor portal'}</p>
              <h1 className={`${isFarmer ? 'max-w-none text-3xl' : 'max-w-md text-4xl sm:text-5xl'} break-words font-black leading-[1.05]`}>{isFarmer ? <>Plan your mandi visit with <span className="whitespace-nowrap">confidence.</span></> : 'Run your procurement desk with control.'}</h1>
              <p className="mt-6 max-w-md text-sm leading-7 text-emerald-50/75">{isFarmer ? 'Book a slot, follow your token, and see live waiting times before you travel.' : 'Manage queues, center capacity, schedules, and farmer support from one operational view.'}</p>
            </div>
            <div className="grid gap-3 text-sm text-emerald-50/85 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4"><CheckCircle2 className="mb-3 h-5 w-5 text-lime-300" /><p className="font-bold">Live queue visibility</p><p className="mt-1 text-xs text-emerald-100/65">Updates from the counter in real time.</p></div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-4"><CheckCircle2 className="mb-3 h-5 w-5 text-lime-300" /><p className="font-bold">Secure local accounts</p><p className="mt-1 text-xs text-emerald-100/65">Credentials are stored as salted hashes.</p></div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center justify-between">
              <div><p className="text-sm font-bold text-emerald-700">{isFarmer ? 'Farmer access' : 'Vendor access'}</p><h2 className="mt-1 text-3xl font-black tracking-tight">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2></div>
              {isFarmer ? <Leaf className="h-8 w-8 text-emerald-700" /> : <Building2 className="h-8 w-8 text-emerald-700" />}
            </div>

            <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-sm font-bold">
              <button type="button" onClick={() => { setMode('login'); setError(''); }} className={`rounded-lg px-4 py-3 ${mode === 'login' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'}`}>Log in</button>
              <button type="button" onClick={() => { setMode('signup'); setError(''); }} className={`rounded-lg px-4 py-3 ${mode === 'signup' ? 'bg-white text-emerald-800 shadow-sm' : 'text-slate-500'}`}>Sign up</button>
            </div>

            {created && <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">Account created. {createdCustomerId && <>Your customer ID is <span className="font-black">{createdCustomerId}</span>. </>}Log in with your new credentials.</div>}
            {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div>}

            <form onSubmit={submit} className="space-y-4">
              {mode === 'signup' && <label className="block text-sm font-bold text-slate-700">Full name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-600 focus:bg-white" placeholder={isFarmer ? 'Your name' : 'Business or operator name'} /></label>}
              {mode === 'signup' && <label className="block text-sm font-bold text-slate-700">Email <span className="font-normal text-slate-400">(optional)</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-600 focus:bg-white" placeholder="name@example.com" /></label>}
              {mode === 'signup' && isFarmer && <label className="block text-sm font-bold text-slate-700">Mobile number<div className="relative mt-2"><Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" /><input required inputMode="numeric" maxLength={10} value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 font-medium outline-none focus:border-emerald-600 focus:bg-white" placeholder="10-digit mobile number" /></div></label>}
              {isFarmer ? <><label className="block text-sm font-bold text-slate-700">Aadhaar number<div className="relative mt-2"><CreditCard className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" /><input required inputMode="numeric" maxLength={12} value={aadhaar} onChange={(event) => setAadhaar(event.target.value.replace(/\D/g, '').slice(0, 12))} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 font-medium outline-none focus:border-emerald-600 focus:bg-white" placeholder="12-digit Aadhaar number" /></div></label><label className="flex items-start gap-2 text-xs font-medium text-slate-600"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5" />I consent to Aadhaar identity verification.</label></> : <label className="block text-sm font-bold text-slate-700">Mobile number<div className="relative mt-2"><Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" /><input required inputMode="numeric" maxLength={10} value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 font-medium outline-none focus:border-emerald-600 focus:bg-white" placeholder="10-digit mobile number" /></div></label>}
              {mode === 'signup' && isFarmer && <label className="block text-sm font-bold text-slate-700">Village<input value={village} onChange={(event) => setVillage(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-medium outline-none focus:border-emerald-600 focus:bg-white" placeholder="Your village" /></label>}
              <label className="block text-sm font-bold text-slate-700">Password<div className="relative mt-2"><LockKeyhole className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" /><input required type={showPassword ? 'text' : 'password'} minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 font-medium outline-none focus:border-emerald-600 focus:bg-white" placeholder="At least 6 characters" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-slate-400" aria-label="Toggle password visibility">{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></label>
              <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#124734] px-4 py-3.5 text-sm font-black text-white transition hover:bg-emerald-900 disabled:opacity-60">{loading ? 'Please wait...' : mode === 'login' ? 'Log in securely' : 'Create account'}<ArrowRight className="h-4 w-4" /></button>
            </form>

            <button type="button" disabled={loading} onClick={demoLogin} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-100 disabled:opacity-60"><UserRound className="h-4 w-4" />Use demo {isFarmer ? 'farmer' : 'vendor'} account</button>
            <button type="button" onClick={() => router.push('/login')} className="mt-6 w-full text-center text-xs font-bold text-slate-500 hover:text-emerald-800">Switch portal</button>
          </div>
        </section>
      </div>
    </main>
  );
}
