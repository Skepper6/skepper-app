import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paperclip, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/ScreenHeader';

export const ApplyLeaveScreen: React.FC = () => {
  const navigate = useNavigate();
  const { applyLeave } = useApp();

  const [leaveType, setLeaveType] = useState('Casual');
  const [fromDate, setFromDate] = useState('Thu, 22 Oct');
  const [toDate, setToDate] = useState('Fri, 23 Oct');
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [reason, setReason] = useState('Family function out of town.');
  const [hasAttachment, setHasAttachment] = useState(false);

  const leaveOptions = [
    { label: 'Casual · 5', value: 'Casual', balance: 5 },
    { label: 'Sick · 6', value: 'Sick', balance: 6 },
    { label: 'Earned · 3.5', value: 'Earned', balance: 3.5 },
    { label: 'Comp off · 0', value: 'Comp off', balance: 0 },
    { label: 'Work from home', value: 'WFH', balance: 99 },
  ];

  const currentOption = leaveOptions.find((o) => o.value === leaveType) || leaveOptions[0];
  const requestedDays: number = isHalfDay ? 0.5 : 2;
  const balanceAfter = Math.max(0, currentOption.balance - requestedDays);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyLeave({
      type: leaveType,
      from: fromDate,
      to: toDate,
      days: requestedDays,
      isHalfDay,
      reason,
    });
    navigate('/leave');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] px-5 pb-8">
      {/* Header */}
      <ScreenHeader title="Apply leave" />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Leave Type Chips */}
        <div>
          <label className="block text-xs font-bold text-[#14182B] mb-2">Leave type</label>
          <div className="flex flex-wrap gap-2">
            {leaveOptions.map((opt) => {
              const isSelected = leaveType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setLeaveType(opt.value)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#2747D9] text-white shadow-xs'
                      : 'bg-white border border-[#D5D8E0] text-[#14182B] hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Date Inputs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#14182B] mb-1.5">From</label>
            <input
              type="text"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full h-12 px-3.5 rounded-xl border border-[#D5D8E0] bg-white text-xs font-bold text-[#14182B] focus:outline-none focus:border-[#2747D9]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#14182B] mb-1.5">To</label>
            <input
              type="text"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full h-12 px-3.5 rounded-xl border border-[#D5D8E0] bg-white text-xs font-bold text-[#14182B] focus:outline-none focus:border-[#2747D9]"
            />
          </div>
        </div>

        {/* Days Calculation & Half Day */}
        <div className="bg-white rounded-xl p-4 border border-[#EEF0F3] shadow-xs flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold text-[#14182B]">
              {requestedDays} working {requestedDays === 1 ? 'day' : 'days'}
            </h4>
            <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
              Balance after: {balanceAfter} {balanceAfter === 1 ? 'day' : 'days'}
            </p>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isHalfDay}
              onChange={(e) => setIsHalfDay(e.target.checked)}
              className="w-4 h-4 rounded text-[#2747D9] focus:ring-[#2747D9] border-[#D5D8E0]"
            />
            <span className="text-xs font-bold text-[#14182B]">Half day</span>
          </label>
        </div>

        {/* Reason */}
        <div>
          <label className="block text-xs font-bold text-[#14182B] mb-1.5">Reason</label>
          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-[#D5D8E0] bg-white text-xs font-medium text-[#14182B] focus:outline-none focus:border-[#2747D9]"
            placeholder="Provide context for your leave..."
            required
          />
        </div>

        {/* Attach Document Button */}
        <div>
          <button
            type="button"
            onClick={() => setHasAttachment(!hasAttachment)}
            className={`w-full py-3 rounded-xl border border-dashed flex items-center justify-center gap-2 text-xs font-bold cursor-pointer transition-colors ${
              hasAttachment
                ? 'border-[#127A4B] bg-[#E6F4EC] text-[#127A4B]'
                : 'border-[#D5D8E0] bg-white hover:bg-slate-50 text-[#5B6175]'
            }`}
          >
            {hasAttachment ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Wedding_invite.pdf attached (remove)</span>
              </>
            ) : (
              <>
                <Paperclip className="w-4 h-4 stroke-[2.2]" />
                <span>Attach document (optional)</span>
              </>
            )}
          </button>
        </div>

        {/* Approver Info Row */}
        <div className="flex items-center gap-2.5 px-1 py-1">
          <div className="w-7 h-7 rounded-full bg-[#EAEFFE] text-[#2747D9] font-extrabold text-[10px] flex items-center justify-center shrink-0">
            RK
          </div>
          <p className="text-xs text-[#5B6175]">
            Goes to <span className="font-extrabold text-[#14182B]">Rahul Kumar</span> (Reporting
            manager)
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full h-[50px] rounded-[14px] bg-[#2747D9] hover:bg-[#1E37B3] text-white font-bold text-sm shadow-md shadow-[#2747D9]/20 flex items-center justify-center cursor-pointer transition-colors"
          >
            Submit request
          </button>
        </div>
      </form>
    </div>
  );
};
