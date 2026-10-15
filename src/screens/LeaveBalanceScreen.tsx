import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomTabBar } from '../components/BottomTabBar';

export const LeaveBalanceScreen: React.FC = () => {
  const navigate = useNavigate();
  const { leaveBalances, leaveRequests, holidays } = useApp();

  // Helper to render SVG circular progress ring
  const renderRing = (current: number, total: number, color: string) => {
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(1, Math.max(0, current / total));
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 40 40">
        {/* Track */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="#EEF0F3"
          strokeWidth="3.5"
          fill="none"
        />
        {/* Progress */}
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          fill="none"
        />
      </svg>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] pb-[96px]">
      {/* Top Header */}
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[#14182B]">Leave</h1>
        <button
          onClick={() => navigate('/apply-leave')}
          className="bg-[#2747D9] hover:bg-[#1E37B3] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-xs cursor-pointer flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Apply</span>
        </button>
      </div>

      <div className="px-5 space-y-4">
        {/* 4 Ring Cards in 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {leaveBalances.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[20px] p-4 border border-[#EEF0F3] shadow-xs flex items-center gap-3"
            >
              <div className="shrink-0">{renderRing(item.available, item.total, item.color)}</div>
              <div>
                <div className="text-xl font-extrabold text-[#14182B] leading-none">
                  {item.available}
                </div>
                <p className="text-[11px] font-bold text-[#5B6175] mt-1">
                  {item.type} · of {item.total}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* My Requests Section */}
        <div>
          <h3 className="text-sm font-extrabold text-[#14182B] mb-2.5">My requests</h3>
          <div className="space-y-2.5">
            {leaveRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white rounded-[18px] p-4 border border-[#EEF0F3] shadow-xs flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-extrabold text-[#14182B]">
                    {req.type} · {req.days} {req.days === 1 ? 'day' : 'days'}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
                    {req.dateRange}
                  </p>
                </div>

                <span
                  className={`text-xs font-bold px-3 py-1 rounded-lg shrink-0 ${
                    req.status === 'Pending'
                      ? 'bg-[#FFF4DE] text-[#A35A00]'
                      : req.status === 'Approved'
                      ? 'bg-[#E6F4EC] text-[#127A4B]'
                      : 'bg-[#FBE3E1] text-[#C2382F]'
                  }`}
                >
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Holidays Section */}
        <div>
          <h3 className="text-sm font-extrabold text-[#14182B] mb-2.5">Upcoming holidays</h3>
          <div className="space-y-2.5">
            {holidays.map((h) => (
              <div
                key={h.id}
                className="bg-white rounded-[18px] p-4 border border-[#EEF0F3] shadow-xs flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#EAEFFE] flex flex-col items-center justify-center text-[#2747D9] shrink-0">
                  <span className="text-[10px] font-bold uppercase leading-none">{h.month}</span>
                  <span className="text-base font-extrabold mt-0.5 leading-none">{h.day}</span>
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-[#14182B]">{h.name}</h4>
                  <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
                    {h.dayOfWeek} · {h.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
};
