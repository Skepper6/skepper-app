import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomTabBar } from '../components/BottomTabBar';

export const AttendanceScreen: React.FC = () => {
  const { isCheckedIn, toggleCheckIn, isRegularized, regularizePunch } = useApp();
  const [selectedDay, setSelectedDay] = useState(14);
  const [showRegularizeModal, setShowRegularizeModal] = useState(false);
  const [regularizeReason, setRegularizeReason] = useState('Traffic delay at silk board junction');
  const [regularizeTime, setRegularizeTime] = useState('09:30 AM');

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Calendar dates layout for Oct 2026 (Oct 1 is Thursday -> 3 empty spots Mon..Wed)
  // Day status mapping:
  const dayStatus: Record<number, 'present' | 'late' | 'leave' | 'holiday'> = {
    1: 'present',
    2: 'holiday',
    5: 'present',
    6: 'present',
    7: 'late',
    8: 'present',
    9: 'leave',
    12: 'present',
    13: 'present',
    14: 'present',
  };

  const handleRegularizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    regularizePunch(regularizeReason, regularizeTime);
    setShowRegularizeModal(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] pb-[96px]">
      {/* Top Header */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[#14182B]">Attendance</h1>
        <button
          onClick={toggleCheckIn}
          className="bg-[#2747D9] hover:bg-[#1E37B3] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer transition-colors"
        >
          {isCheckedIn ? 'Check out' : 'Check in'}
        </button>
      </div>

      <div className="px-5 space-y-4">
        {/* 4 Stat Cards */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-white rounded-2xl p-2.5 text-center border border-[#EEF0F3] shadow-xs">
            <span className="text-xl font-extrabold text-[#127A4B] leading-none">8</span>
            <p className="text-[11px] font-bold text-[#5B6175] mt-1">Present</p>
          </div>

          <div className="bg-white rounded-2xl p-2.5 text-center border border-[#EEF0F3] shadow-xs">
            <span className="text-xl font-extrabold text-[#A35A00] leading-none">1</span>
            <p className="text-[11px] font-bold text-[#5B6175] mt-1">Late</p>
          </div>

          <div className="bg-white rounded-2xl p-2.5 text-center border border-[#EEF0F3] shadow-xs">
            <span className="text-xl font-extrabold text-[#6B3FC9] leading-none">1</span>
            <p className="text-[11px] font-bold text-[#5B6175] mt-1">On leave</p>
          </div>

          <div className="bg-white rounded-2xl p-2.5 text-center border border-[#EEF0F3] shadow-xs">
            <span className="text-xl font-extrabold text-[#14182B] leading-none">8.6h</span>
            <p className="text-[11px] font-bold text-[#5B6175] mt-1">Avg / day</p>
          </div>
        </div>

        {/* Monthly Calendar Card */}
        <div className="bg-white rounded-[20px] p-5 border border-[#EEF0F3] shadow-xs">
          {/* Month Navigator */}
          <div className="flex items-center justify-between mb-4">
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#14182B] hover:bg-slate-100">
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <h2 className="text-sm font-extrabold text-[#14182B]">October 2026</h2>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#14182B] hover:bg-slate-100">
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center mb-2">
            {daysOfWeek.map((day, idx) => (
              <span key={idx} className="text-xs font-bold text-[#5B6175]">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-y-1.5 text-center text-xs font-bold">
            {/* 3 Blank cells for Mon, Tue, Wed before Oct 1 (Thu) */}
            <div />
            <div />
            <div />

            {/* Oct 1 to 31 */}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => {
              const status = dayStatus[d];
              const isSelected = selectedDay === d;

              return (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`h-9 flex flex-col items-center justify-center rounded-xl cursor-pointer relative transition-all ${
                    isSelected
                      ? 'bg-[#2747D9] text-white shadow-xs'
                      : 'text-[#14182B] hover:bg-slate-100'
                  }`}
                >
                  <span className={`leading-none ${isSelected ? 'text-white' : ''}`}>{d}</span>
                  {/* Status Dot */}
                  {status && (
                    <span
                      className={`w-1 h-1 rounded-full mt-1 ${
                        isSelected
                          ? 'bg-white'
                          : status === 'present'
                          ? 'bg-[#127A4B]'
                          : status === 'late'
                          ? 'bg-[#A35A00]'
                          : status === 'leave'
                          ? 'bg-[#6B3FC9]'
                          : 'bg-[#2747D9]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-around mt-5 pt-4 border-t border-[#EEF0F3] text-[11px] font-bold text-[#5B6175]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#127A4B]" />
              <span>Present</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#A35A00]" />
              <span>Late</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6B3FC9]" />
              <span>Leave</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2747D9]" />
              <span>Holiday</span>
            </div>
          </div>
        </div>

        {/* Missed a punch card */}
        <div className="bg-white rounded-[20px] p-4 border border-[#EEF0F3] shadow-xs flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xs font-extrabold text-[#14182B]">Missed a punch?</h3>
            <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5 truncate">
              {isRegularized ? '7 Oct · Regularization pending approval' : '7 Oct · Late check-in at 10:02 AM'}
            </p>
          </div>

          <button
            onClick={() => setShowRegularizeModal(true)}
            disabled={isRegularized}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors shrink-0 ${
              isRegularized
                ? 'bg-slate-100 text-[#5B6175] border border-slate-200'
                : 'border border-[#2747D9] text-[#2747D9] hover:bg-[#2747D9]/5'
            }`}
          >
            {isRegularized ? 'Requested' : 'Regularize'}
          </button>
        </div>
      </div>

      {/* Regularize Modal */}
      {showRegularizeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-[390px] bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF0F3]">
              <h3 className="text-sm font-extrabold text-[#14182B]">Regularize attendance</h3>
              <button
                onClick={() => setShowRegularizeModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6175] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegularizeSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Date & Discrepancy</label>
                <div className="text-xs font-semibold p-2.5 rounded-xl bg-[#F4F5F7] text-[#14182B]">
                  7 Oct 2026 · Punch recorded: 10:02 AM
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Correct check-in time</label>
                <input
                  type="text"
                  value={regularizeTime}
                  onChange={(e) => setRegularizeTime(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#D5D8E0] text-xs font-semibold focus:outline-none focus:border-[#2747D9]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Reason</label>
                <textarea
                  rows={2}
                  value={regularizeReason}
                  onChange={(e) => setRegularizeReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D5D8E0] text-xs font-medium focus:outline-none focus:border-[#2747D9]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowRegularizeModal(false)}
                  className="flex-1 h-11 rounded-xl border border-[#D5D8E0] text-xs font-bold text-[#14182B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#2747D9] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Submit request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
};
