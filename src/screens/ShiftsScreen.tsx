import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { ArrowLeftRight, CalendarClock, X, Check } from 'lucide-react';

export const ShiftsScreen: React.FC = () => {
  const { shifts, selectedShiftDay, setSelectedShiftDay, showToast } = useApp();
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [swapColleague, setSwapColleague] = useState('Arjun Mehta');
  const [changeReason, setChangeReason] = useState('Doctor appointment in the morning');
  const [preferredShift, setPreferredShift] = useState('Late shift (12:00 – 9:00)');

  const currentShift = shifts.find((s) => s.dayNum === selectedShiftDay) || shifts[2];

  const handleSwapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSwapModal(false);
    showToast(`Swap shift request sent to ${swapColleague}`);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowRequestModal(false);
    showToast('Shift change request submitted to reporting manager');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] px-5 pb-8">
      {/* Header */}
      <ScreenHeader title="My shifts" />

      <div className="space-y-4">
        {/* 7-Day Week Selector */}
        <div className="grid grid-cols-7 gap-1">
          {shifts.map((s) => {
            const isSelected = selectedShiftDay === s.dayNum;
            return (
              <button
                key={s.dayNum}
                onClick={() => setSelectedShiftDay(s.dayNum)}
                className={`py-2 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#14182B] text-white shadow-sm'
                    : 'bg-white border border-[#EEF0F3] text-[#14182B] hover:bg-slate-50'
                }`}
              >
                <span className={`text-[10px] font-bold ${isSelected ? 'text-slate-300' : 'text-[#5B6175]'}`}>
                  {s.dayOfWeek}
                </span>
                <span className="text-sm font-extrabold mt-0.5">{s.dayNum}</span>
                <span
                  className={`w-1 h-1 rounded-full mt-1 ${
                    isSelected ? 'bg-white' : s.isOff ? 'bg-[#94A3B8]' : 'bg-[#2747D9]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Dynamic Shift Hero Card */}
        <div
          className={`rounded-[20px] p-5 text-white shadow-md transition-all ${
            currentShift.isOff
              ? 'bg-[#475569]'
              : currentShift.location === 'Remote'
              ? 'bg-[#0284C7]'
              : 'bg-[#2747D9]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white/90">{currentShift.dateStr}</span>
            <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white">
              {currentShift.location}
            </span>
          </div>

          <h2 className="text-[26px] font-extrabold tracking-tight mt-3 text-white leading-tight">
            {currentShift.shiftName}
          </h2>

          <div className="text-[32px] font-extrabold tracking-tight my-2 leading-none text-white">
            {currentShift.timeRange}
          </div>

          <p className="text-xs text-white/80 font-medium mt-3">
            {currentShift.breakInfo}
          </p>
        </div>

        {/* On Shift With You Card */}
        <div className="bg-white rounded-[20px] p-5 border border-[#EEF0F3] shadow-xs">
          <h3 className="text-sm font-extrabold text-[#14182B] mb-3">On shift with you</h3>

          {currentShift.coworkers.length > 0 ? (
            <div className="flex items-center gap-2">
              {currentShift.coworkers.map((cw, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs text-[#14182B]"
                  style={{ backgroundColor: cw.bg }}
                  title={cw.name}
                >
                  {cw.initials}
                </div>
              ))}
              {currentShift.extraCoworkersCount > 0 && (
                <div className="w-10 h-10 rounded-full bg-[#F4F5F7] border border-[#D5D8E0] flex items-center justify-center font-extrabold text-xs text-[#5B6175]">
                  +{currentShift.extraCoworkersCount}
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-[#5B6175] font-semibold">
              No coworkers scheduled (Rest day)
            </p>
          )}
        </div>

        {/* Need a Change? Card */}
        <div className="bg-white rounded-[20px] p-5 border border-[#EEF0F3] shadow-xs">
          <h3 className="text-sm font-extrabold text-[#14182B] mb-3">Need a change?</h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowSwapModal(true)}
              className="h-11 rounded-xl border border-[#2747D9] text-[#2747D9] hover:bg-[#2747D9]/5 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Swap shift</span>
            </button>

            <button
              onClick={() => setShowRequestModal(true)}
              className="h-11 rounded-xl border border-[#D5D8E0] text-[#14182B] hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <CalendarClock className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Request change</span>
            </button>
          </div>
        </div>
      </div>

      {/* Swap Shift Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-[390px] bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF0F3]">
              <h3 className="text-sm font-extrabold text-[#14182B]">Swap shift</h3>
              <button
                onClick={() => setShowSwapModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6175] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSwapSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Your shift</label>
                <div className="p-2.5 rounded-xl bg-[#F4F5F7] text-xs font-semibold text-[#14182B]">
                  {currentShift.dateStr} · {currentShift.shiftName} ({currentShift.timeRange})
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Select colleague</label>
                <select
                  value={swapColleague}
                  onChange={(e) => setSwapColleague(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#D5D8E0] text-xs font-semibold focus:outline-none focus:border-[#2747D9] bg-white"
                >
                  <option value="Arjun Mehta">Arjun Mehta (General shift)</option>
                  <option value="Sneha Kapoor">Sneha Kapoor (General shift)</option>
                  <option value="Vikram Rao">Vikram Rao (Late shift)</option>
                  <option value="Divya Shah">Divya Shah (Remote shift)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSwapModal(false)}
                  className="flex-1 h-11 rounded-xl border border-[#D5D8E0] text-xs font-bold text-[#14182B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#2747D9] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Send swap request</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Request Change Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-[390px] bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF0F3]">
              <h3 className="text-sm font-extrabold text-[#14182B]">Request shift change</h3>
              <button
                onClick={() => setShowRequestModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6175] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRequestSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Preferred shift</label>
                <select
                  value={preferredShift}
                  onChange={(e) => setPreferredShift(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#D5D8E0] text-xs font-semibold focus:outline-none focus:border-[#2747D9] bg-white"
                >
                  <option value="Late shift (12:00 – 9:00)">Late shift (12:00 – 9:00)</option>
                  <option value="Remote shift (10:00 – 7:00)">Remote shift (10:00 – 7:00)</option>
                  <option value="Early shift (8:00 – 5:00)">Early shift (8:00 – 5:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Reason</label>
                <textarea
                  rows={2}
                  value={changeReason}
                  onChange={(e) => setChangeReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D5D8E0] text-xs font-medium focus:outline-none focus:border-[#2747D9]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 h-11 rounded-xl border border-[#D5D8E0] text-xs font-bold text-[#14182B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#2747D9] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Submit to manager</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
