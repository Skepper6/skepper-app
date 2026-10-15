import React from 'react';
import { Power, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/ScreenHeader';

export const CheckInOutScreen: React.FC = () => {
  const {
    isCheckedIn,
    checkInTime,
    checkOutTime,
    formattedWorkTime,
    toggleCheckIn,
  } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] px-5 pb-8">
      {/* Header */}
      <ScreenHeader title="Check in / out" />

      <div className="space-y-4">
        {/* Map Card with Geofence */}
        <div className="relative h-[155px] rounded-[20px] overflow-hidden border border-[#D5D8E0] bg-[#DEE5DE] shadow-xs">
          {/* Stylized vector map graphics */}
          <svg className="w-full h-full absolute inset-0 opacity-80" viewBox="0 0 350 155" fill="none">
            {/* Grid road layout */}
            <rect width="350" height="155" fill="#E2EADE" />
            <path d="M-10 40 H360" stroke="#FFFFFF" strokeWidth="18" />
            <path d="M-10 115 H360" stroke="#FFFFFF" strokeWidth="18" />
            <path d="M90 -10 V165" stroke="#FFFFFF" strokeWidth="18" />
            <path d="M250 -10 V165" stroke="#FFFFFF" strokeWidth="18" />
            <path d="M-10 80 L360 80" stroke="#EEF2EC" strokeWidth="10" />
            {/* Geofence circular dashed radius */}
            <circle cx="175" cy="77" r="54" fill="#2747D9" fillOpacity="0.08" stroke="#2747D9" strokeWidth="1.5" strokeDasharray="4 3" />
            {/* Center Office Pin */}
            <circle cx="175" cy="77" r="7" fill="#2747D9" />
            <circle cx="175" cy="77" r="14" fill="#2747D9" fillOpacity="0.25" />
          </svg>

          {/* Floating geofence status badge */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl p-2.5 px-3.5 border border-[#EEF0F3] shadow-xs flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#127A4B] animate-pulse shrink-0" />
            <div className="min-w-0">
              <h4 className="text-xs font-extrabold text-[#14182B] leading-tight">
                Inside office geofence
              </h4>
              <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5 truncate">
                HSR Layout, Bengaluru · 40 m
              </p>
            </div>
          </div>
        </div>

        {/* Working Hours & Main Action Card */}
        <div className="bg-white rounded-[20px] p-6 border border-[#EEF0F3] shadow-xs flex flex-col items-center">
          <p className="text-xs font-bold text-[#5B6175]">Working hours today</p>
          <div className="text-[40px] font-extrabold text-[#14182B] tracking-tight tabular-nums my-3 leading-none">
            {formattedWorkTime}
          </div>

          {/* Big Action Button */}
          <div className="my-3 flex items-center justify-center">
            <button
              onClick={toggleCheckIn}
              className={`w-[136px] h-[136px] rounded-full flex flex-col items-center justify-center gap-1 text-white font-extrabold shadow-lg cursor-pointer transition-transform active:scale-95 ${
                isCheckedIn
                  ? 'bg-gradient-to-b from-[#D32F2F] to-[#C2382F] shadow-[#C2382F]/30 hover:brightness-105'
                  : 'bg-gradient-to-b from-[#10B981] to-[#059669] shadow-[#10B981]/30 hover:brightness-105'
              }`}
            >
              <Power className="w-7 h-7 stroke-[3]" />
              <span className="text-sm font-extrabold mt-1">
                {isCheckedIn ? 'Check out' : 'Check in'}
              </span>
            </button>
          </div>

          {/* Verification & Shift Badges */}
          <div className="flex items-center gap-2 mt-3">
            <span className="px-3 py-1.5 rounded-full bg-[#F0E9FC] text-[#6B3FC9] text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
              Selfie verified
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#EAEFFE] text-[#2747D9] text-xs font-bold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
              Shift 9:30–6:30
            </span>
          </div>
        </div>

        {/* Today's Entries Card */}
        <div className="bg-white rounded-[20px] p-5 border border-[#EEF0F3] shadow-xs">
          <h3 className="text-sm font-extrabold text-[#14182B] mb-3">Today&apos;s entries</h3>

          <div className="space-y-3 divide-y divide-[#EEF0F3]">
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-bold text-[#127A4B]">In</span>
              <span className="text-xs font-bold text-[#14182B]">{checkInTime} · Office</span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-xs font-bold text-[#A35A00]">Break</span>
              <span className="text-xs font-bold text-[#14182B]">01:05 – 01:40 PM</span>
            </div>

            <div className="flex items-center justify-between pt-3">
              <span className="text-xs font-bold text-[#5B6175]">Out</span>
              <span className="text-xs font-bold text-[#14182B]">{checkOutTime || '—'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
