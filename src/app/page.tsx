'use client';

import React from 'react';
import Link from 'next/link';
import {
  Tractor,
  Clock,
  CalendarCheck,
  BellRing,
  MapPin,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Smartphone,
  ChevronRight,
  Users,
} from 'lucide-react';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { LanguageProvider } from '@/lib/language-context';

export default function LandingPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#F9FBF7] text-[#1F2937]">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-md">
                <Tractor className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight text-emerald-950">
                  KrishiYantra
                </h1>
                <p className="text-[11px] font-semibold text-emerald-700 hidden sm:block">
                  Agricultural Procurement Queue & Slot Platform
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSelector />
              <Link
                href="/login"
                className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-emerald-950 bg-emerald-100/70 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-200"
              >
                Sign In
              </Link>
              <Link
                href="/staff/login"
                className="hidden sm:inline-flex items-center gap-1 px-3.5 py-2 text-xs font-bold text-gray-700 hover:text-gray-950 transition-colors"
              >
                Staff Portal
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-10 pb-16 px-4 bg-gradient-to-b from-emerald-50/60 to-transparent">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 border border-emerald-300/80 text-emerald-900 text-xs font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Now live for Kharif & Rabi procurement season</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
                Know your slot.{' '}
                <span className="text-emerald-800 underline decoration-amber-400 decoration-4 underline-offset-4">
                  Skip the wait.
                </span>
              </h2>

              <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
                KrishiYantra helps farmers find nearby procurement centers, book convenient slots, track live queues in real time, and arrive right when it’s their turn.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-base shadow-lg shadow-emerald-900/20 active:scale-95 transition-all"
                >
                  <span>Find a Procurement Center</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/staff/login"
                  className="inline-flex items-center justify-center px-5 py-3.5 rounded-2xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm border border-gray-300 shadow-sm transition-all"
                >
                  Staff Login
                </Link>
              </div>

              {/* Trust Metric Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg border-t border-gray-200">
                <div>
                  <div className="text-2xl font-black text-emerald-900">~25 min</div>
                  <div className="text-xs text-gray-500 font-medium">Avg wait time</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-900">0 Queue</div>
                  <div className="text-xs text-gray-500 font-medium">Road bottlenecks</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-900">100%</div>
                  <div className="text-xs text-gray-500 font-medium">Predictable slots</div>
                </div>
              </div>
            </div>

            {/* Right Hero Visual: Farmer Mobile + Staff Preview */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Mobile Device Mockup */}
                <div className="bg-white rounded-[36px] p-4 border-[6px] border-gray-900 shadow-2xl relative z-10">
                  {/* Speaker bar */}
                  <div className="w-24 h-4 bg-gray-900 rounded-full mx-auto mb-3" />

                  {/* Screen Content Preview */}
                  <div className="bg-gray-50 rounded-2xl p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-900">Namaste, Ravi 👋</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        🟢 Center Open
                      </span>
                    </div>

                    {/* Token Card */}
                    <div className="bg-emerald-900 text-white p-3.5 rounded-xl shadow-md">
                      <div className="text-[10px] text-emerald-200 uppercase font-semibold">
                        Your Token • Shivapur APMC
                      </div>
                      <div className="text-3xl font-black text-white my-0.5">B-104</div>
                      <div className="flex items-center justify-between text-xs text-emerald-100 mt-2 pt-2 border-t border-emerald-800/80">
                        <span>Position: <strong className="text-amber-300">#4</strong></span>
                        <span>Wait: <strong>~25 min</strong></span>
                      </div>
                    </div>

                    {/* Proximity alert */}
                    <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-900">
                      <BellRing className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Turn approaching: 3 farmers ahead</span>
                    </div>

                    {/* Button */}
                    <div className="w-full py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold text-center">
                      Track Live Queue
                    </div>
                  </div>
                </div>

                {/* Staff Dashboard Floater Preview */}
                <div className="hidden sm:block absolute -bottom-6 -left-12 bg-white rounded-2xl p-3.5 border border-gray-200 shadow-xl z-20 w-64">
                  <div className="text-[11px] font-bold text-gray-700 mb-1">Staff Queue Desk</div>
                  <div className="flex items-center justify-between text-xs py-1 border-b border-gray-100">
                    <span className="font-bold text-purple-700">B-101 • Suresh</span>
                    <span className="text-[10px] bg-purple-100 text-purple-900 px-1.5 rounded">Processing</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 text-gray-600">
                    <span>B-104 • Ravi Kumar</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 rounded">#4 Waiting</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-Step How It Works */}
        <section className="py-16 px-4 bg-white border-y border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Simple 4-Step Journey
              </span>
              <h3 className="text-3xl font-black text-gray-900 mt-1">
                How KrishiYantra Works
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Designed for low-bandwidth phones with zero complicated paperwork.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  title: 'Find',
                  desc: 'See nearby procurement centers and current waiting times.',
                  icon: MapPin,
                  bg: 'bg-emerald-50 text-emerald-800',
                },
                {
                  step: '02',
                  title: 'Book',
                  desc: 'Choose a convenient procurement slot.',
                  icon: CalendarCheck,
                  bg: 'bg-amber-50 text-amber-800',
                },
                {
                  step: '03',
                  title: 'Track',
                  desc: 'Follow your token and live queue position.',
                  icon: Clock,
                  bg: 'bg-blue-50 text-blue-800',
                },
                {
                  step: '04',
                  title: 'Arrive',
                  desc: 'Get notified when your turn is approaching.',
                  icon: BellRing,
                  bg: 'bg-purple-50 text-purple-800',
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="p-6 rounded-2xl border border-gray-200 bg-[#F9FBF7] hover:border-emerald-300 transition-all hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${item.bg}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-black text-gray-400">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-[#F9FBF7]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Key Advantages
              </span>
              <h3 className="text-3xl font-black text-gray-900 mt-1">
                Built for Farmers & Center Staff
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Less Waiting</h4>
                <p className="text-sm text-gray-600">
                  Farmers know expected waiting times before travelling, saving valuable tractor fuel and hours in heat.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Better Planning</h4>
                <p className="text-sm text-gray-600">
                  Book a confirmed slot instead of waiting blindly overnight outside mandis.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Live Updates</h4>
                <p className="text-sm text-gray-600">
                  Queue information updates in real time via WebSockets and automatic fallbacks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold mb-3">
                  <BellRing className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Simple Notifications</h4>
                <p className="text-sm text-gray-600">
                  Farmers receive automated SMS alerts when their token is 3 positions away.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm md:col-span-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-1">Better Center Operations</h4>
                <p className="text-sm text-gray-600">
                  Staff can control throughput, prevent overcrowding, rebalance load across mandis, and access daily operational analytics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-emerald-950 text-white py-12 px-4 border-t border-emerald-900">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Tractor className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-lg">KrishiYantra</span>
              </div>
              <p className="text-xs text-emerald-300 mt-1">
                "Turn unpredictable procurement-center waiting into a predictable appointment."
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-emerald-300 font-semibold">
              <Link href="/login" className="hover:text-white">Farmer Login</Link>
              <span>•</span>
              <Link href="/staff/login" className="hover:text-white">Staff Dashboard</Link>
            </div>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  );
}
