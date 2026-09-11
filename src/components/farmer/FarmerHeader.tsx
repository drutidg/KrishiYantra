'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sprout, Bell, ChevronDown } from 'lucide-react';
import { getStoredUser } from '@/lib/auth';

interface FarmerHeaderProps {
  locationMode?: boolean;
  locationText?: string;
  hasUnreadAlerts?: boolean;
  userInitial?: string;
}

export const FarmerHeader: React.FC<FarmerHeaderProps> = ({
  locationMode = false,
  locationText = 'Mandya, Karnataka',
  hasUnreadAlerts = true,
  userInitial = 'R',
}) => {
  const [initial, setInitial] = useState(userInitial);

  useEffect(() => {
    const user = getStoredUser();
    if (user?.name) {
      setInitial(user.name.trim().charAt(0).toUpperCase());
    }
  }, [userInitial]);

  return (
    <header className="flex items-center justify-between py-2 px-0.5 select-none">
      {/* Brand on Left */}
      <Link href="/farmer/dashboard" className="flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-xl bg-[#065F46] text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-800 transition-colors shrink-0">
          <Sprout className="w-5 h-5 text-emerald-200" />
        </div>
        <div>
          <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-none flex items-center gap-1">
            KrishiYantra
          </h1>
          {!locationMode && (
            <p className="text-[10px] font-medium text-emerald-800 tracking-tight mt-0.5">
              Connecting Farmers to Markets
            </p>
          )}
        </div>
      </Link>

      {/* Middle Location Picker (if locationMode enabled) */}
      {locationMode && (
        <button
          type="button"
          onClick={() => alert('Location selector: Mandya, Karnataka')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 text-[11px] font-semibold text-slate-700 transition-colors"
        >
          <span className="text-emerald-700">📍</span>
          <span>{locationText}</span>
          <ChevronDown className="w-3 h-3 text-slate-500" />
        </button>
      )}

      {/* Right Controls: Bell and Avatar */}
      <div className="flex items-center gap-2">
        <Link
          href="/farmer/notifications"
          className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="Alerts & Notifications"
        >
          <Bell className="w-5 h-5 text-slate-700" />
          {hasUnreadAlerts && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          )}
        </Link>

        <Link
          href="/farmer/profile"
          className="w-8 h-8 rounded-full bg-[#065F46] text-white flex items-center justify-center font-bold text-xs shadow-xs hover:ring-2 hover:ring-emerald-300 transition-all shrink-0"
        >
          {initial}
        </Link>
      </div>
    </header>
  );
};
