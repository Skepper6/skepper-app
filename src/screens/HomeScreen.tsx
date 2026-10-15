import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CalendarPlus,
  Clock,
  ArrowLeftRight,
  Target,
  GraduationCap,
  MessageSquare,
  FileText,
  Users,
  Megaphone,
  Gift,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomTabBar } from '../components/BottomTabBar';

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    isCheckedIn,
    formattedWorkTime,
    toggleCheckIn,
    pendingApprovalsCount,
    showToast,
  } = useApp();

  const [wished, setWished] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const quickActions = [
    { label: 'Leave', icon: CalendarPlus, path: '/leave', color: '#2747D9' },
    { label: 'Timesheet', icon: Clock, path: '/timesheet', color: '#2747D9' },
    { label: 'Shifts', icon: ArrowLeftRight, path: '/shifts', color: '#2747D9' },
    { label: 'Goals', icon: Target, path: '/performance', color: '#2747D9' },
    { label: 'Learning', icon: GraduationCap, path: '/learning', color: '#2747D9' },
    { label: 'HR help', icon: MessageSquare, path: '/hr-help', color: '#2747D9' },
    { label: 'Documents', icon: FileText, path: '/onboarding', color: '#2747D9' },
    { label: 'People', icon: Users, path: '/people', color: '#2747D9' },
  ];

  const handleSendWishes = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWished(true);
    showToast('Birthday wish sent to Arjun Mehta!');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] pb-[96px]">
      {/* Top Header */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/profile')}
            className="w-10 h-10 rounded-full bg-[#F2B544] text-[#14182B] font-extrabold text-sm flex items-center justify-center shadow-xs cursor-pointer hover:opacity-90 transition-opacity"
            title="View Profile"
          >
            {currentUser.initials}
          </button>
          <div>
            <p className="text-[11px] font-semibold text-[#5B6175] leading-none">
              Wednesday, 14 Oct
            </p>
            <h2 className="text-[17px] font-extrabold text-[#14182B] leading-snug mt-0.5">
              Good morning, Priya
            </h2>
          </div>
        </div>

        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="w-10 h-10 rounded-full bg-white border border-[#D5D8E0] flex items-center justify-center relative text-[#14182B] hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 stroke-[2.2]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#C2382F] absolute top-2 right-2 ring-2 ring-white" />
        </button>
      </div>

      {/* Notifications Drawer (if open) */}
      {showNotifications && (
        <div className="mx-5 mb-3 p-3.5 bg-white rounded-2xl border border-[#EEF0F3] shadow-md animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-[#EEF0F3]">
            <span className="text-xs font-bold text-[#14182B]">Notifications (2)</span>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-[11px] font-semibold text-[#5B6175] hover:text-[#14182B]"
            >
              Close
            </button>
          </div>
          <div className="space-y-2 mt-2">
            <p className="text-xs text-[#14182B]">
              <span className="font-bold">Appraisal Review:</span> Self-review due in 17 days.
            </p>
            <p className="text-xs text-[#14182B]">
              <span className="font-bold">New Course:</span> UX Foundations module unlocked.
            </p>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <div className="px-5 space-y-4">
        {/* Live Check-in Card (Blue) */}
        <div className="bg-[#2747D9] text-white rounded-[20px] p-5 shadow-sm shadow-[#2747D9]/20">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-bold backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              {isCheckedIn ? 'Checked in · Office, Bengaluru' : 'Checked out'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-xs">
              General shift
            </span>
          </div>

          <div className="my-3">
            <div className="text-[38px] font-extrabold tracking-tight tabular-nums leading-none">
              {formattedWorkTime}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={toggleCheckIn}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center cursor-pointer transition-colors shadow-xs ${
                isCheckedIn
                  ? 'bg-white text-[#2747D9] hover:bg-slate-100'
                  : 'bg-[#10B981] text-white hover:bg-[#059669]'
              }`}
            >
              {isCheckedIn ? 'Check out' : 'Check in'}
            </button>
            <button
              onClick={() => navigate('/checkin')}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-center border border-white/30 text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              View log
            </button>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div>
          <h3 className="text-base font-extrabold text-[#14182B] mb-2.5">Quick actions</h3>
          <div className="grid grid-cols-4 gap-2.5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="bg-white rounded-2xl p-3 border border-[#EEF0F3] shadow-xs flex flex-col items-center justify-center gap-1.5 hover:border-[#2747D9]/30 hover:shadow-sm transition-all cursor-pointer group min-h-[74px]"
                >
                  <Icon className="w-5 h-5 text-[#2747D9] stroke-[2.2] group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-[#14182B] tracking-tight">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two Stat Cards (Side-by-side) */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => navigate('/leave')}
            className="bg-white rounded-[20px] p-4 border border-[#EEF0F3] shadow-xs text-left cursor-pointer hover:border-[#2747D9]/30 transition-all"
          >
            <p className="text-xs font-bold text-[#5B6175]">Leave balance</p>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[26px] font-extrabold text-[#14182B] leading-none">14.5</span>
              <span className="text-xs font-semibold text-[#5B6175]">days</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/approvals')}
            className="bg-white rounded-[20px] p-4 border border-[#EEF0F3] shadow-xs text-left cursor-pointer hover:border-[#A35A00]/30 transition-all"
          >
            <p className="text-xs font-bold text-[#5B6175]">Pending approvals</p>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-[26px] font-extrabold text-[#A35A00] leading-none">
                {pendingApprovalsCount}
              </span>
            </div>
          </button>
        </div>

        {/* Feed Section */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-base font-extrabold text-[#14182B]">Feed</h3>
            <button
              onClick={() => showToast('Displaying all company announcements')}
              className="text-xs font-bold text-[#2747D9] hover:underline cursor-pointer"
            >
              See all
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Feed Item 1: Announcement */}
            <div className="bg-white rounded-[20px] p-4 border border-[#EEF0F3] shadow-xs flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFF4DE] text-[#A35A00] flex items-center justify-center shrink-0">
                <Megaphone className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#14182B] truncate">
                  Office closed 1–3 Nov for Diwali
                </h4>
                <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
                  HR Team · 2h ago
                </p>
              </div>
            </div>

            {/* Feed Item 2: Birthday */}
            <div className="bg-white rounded-[20px] p-4 border border-[#EEF0F3] shadow-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#E6F4EC] text-[#127A4B] flex items-center justify-center shrink-0">
                  <Gift className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#14182B] truncate">
                    Arjun Mehta&apos;s birthday today
                  </h4>
                  <button
                    onClick={handleSendWishes}
                    disabled={wished}
                    className={`text-[11px] font-bold mt-0.5 flex items-center gap-1 cursor-pointer ${
                      wished ? 'text-[#127A4B]' : 'text-[#2747D9] hover:underline'
                    }`}
                  >
                    {wished ? (
                      <>
                        <Check className="w-3 h-3 stroke-[2.5]" />
                        <span>Wishes sent</span>
                      </>
                    ) : (
                      'Send wishes'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
};
