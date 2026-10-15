import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Wifi, Battery, Smartphone, Maximize2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const [deviceFrameMode, setDeviceFrameMode] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { toastMessage } = useApp();

  const screens = [
    { path: '/signin', name: '1. Sign in' },
    { path: '/', name: '2. Home' },
    { path: '/checkin', name: '3. Check in/out' },
    { path: '/attendance', name: '4. Attendance' },
    { path: '/timesheet', name: '5. Timesheet' },
    { path: '/leave', name: '6. Leave balance' },
    { path: '/apply-leave', name: '7. Apply leave' },
    { path: '/approvals', name: '8. Approvals' },
    { path: '/shifts', name: '9. Shifts' },
    { path: '/people', name: '10. People' },
    { path: '/profile', name: '11. Profile' },
    { path: '/performance', name: '12. Performance' },
    { path: '/onboarding', name: '13. Onboarding' },
    { path: '/learning', name: '14. Learning' },
    { path: '/hr-help', name: '15. HR help desk' },
  ];

  return (
    <div className="min-h-screen bg-[#DDE1E7] text-[#14182B] flex flex-col items-center justify-start lg:py-6 selection:bg-[#2747D9] selection:text-white">
      {/* Top Desktop Helper Header (Hidden on small mobile devices) */}
      <div className="hidden lg:flex items-center justify-between w-full max-w-5xl px-6 py-2 mb-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xs border border-white/60">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#2747D9] flex items-center justify-center text-white font-extrabold text-base shadow-sm">
            T.
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-[#14182B]">Teamora Mobile Preview</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#EAEFFE] text-[#2747D9]">
                390px Phone Frame
              </span>
            </div>
            <p className="text-[11px] text-[#5B6175]">Pixel-accurate HR mobile experience</p>
          </div>
        </div>

        {/* Quick jump to any of the 15 screens */}
        <div className="flex items-center gap-3">
          <label htmlFor="screen-switcher" className="text-xs font-bold text-[#5B6175]">
            Jump to screen:
          </label>
          <select
            id="screen-switcher"
            value={location.pathname}
            onChange={(e) => navigate(e.target.value)}
            className="text-xs font-bold bg-[#F4F5F7] text-[#14182B] border border-[#D5D8E0] rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#2747D9] cursor-pointer"
          >
            {screens.map((s) => (
              <option key={s.path} value={s.path}>
                {s.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-[#D5D8E0] bg-white text-[#14182B] hover:bg-slate-50 transition-colors shadow-xs"
            title="Toggle device bezel"
          >
            {deviceFrameMode ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-[#5B6175]" />
                <span>Full Height</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#2747D9]" />
                <span>Phone Bezel</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-6 z-50 animate-bounce bg-[#14182B] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20">
          <Sparkles className="w-4 h-4 text-[#F2B544]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main 390px Phone Container */}
      <div
        className={`w-full max-w-[390px] relative transition-all duration-300 ${
          deviceFrameMode
            ? 'h-[844px] max-h-[92vh] rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] ring-12 ring-[#1E2338] border-4 border-black/40 overflow-hidden'
            : 'min-h-screen sm:min-h-[844px] shadow-2xl rounded-none sm:rounded-[36px] overflow-hidden'
        } bg-[#F4F5F7] flex flex-col`}
      >
        {/* iOS Dynamic Island & Status Bar (Sticky at top) */}
        <div className="shrink-0 h-[48px] px-6 pt-3 flex items-center justify-between text-xs font-bold text-[#14182B] z-30 select-none bg-transparent">
          <span>9:41</span>
          {/* Dynamic Island pill */}
          <div className="w-[110px] h-[26px] bg-black rounded-full flex items-center justify-center gap-2 shadow-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222]" />
            <div className="w-2 h-2 rounded-full bg-[#0d1b2a]" />
          </div>
          <div className="flex items-center gap-1.5 text-[#14182B]">
            <span className="text-[10px] tracking-tight font-extrabold">5G</span>
            <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
            <Battery className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Scrollable Screen Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="shrink-0 h-[22px] flex items-center justify-center pointer-events-none bg-transparent z-40">
          <div className="w-[134px] h-[4.5px] bg-[#14182B]/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
