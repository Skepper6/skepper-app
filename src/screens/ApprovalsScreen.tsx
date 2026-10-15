import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomTabBar } from '../components/BottomTabBar';

export const ApprovalsScreen: React.FC = () => {
  const { approvals, pendingApprovalsCount, handleApproval } = useApp();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Leave' | 'Attendance' | 'Timesheets' | 'Expenses'>('All');

  const filters: ('All' | 'Leave' | 'Attendance' | 'Timesheets' | 'Expenses')[] = [
    'All',
    'Leave',
    'Attendance',
    'Timesheets',
    'Expenses',
  ];

  const filteredApprovals = approvals.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Timesheets') return item.type === 'Timesheet';
    if (activeFilter === 'Expenses') return item.type === 'Expense';
    return item.type === activeFilter;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] pb-[96px]">
      {/* Top Header */}
      <div className="px-5 pt-3 pb-2">
        <h1 className="text-xl font-extrabold text-[#14182B]">Approvals</h1>
        <p className="text-xs font-semibold text-[#5B6175] mt-0.5">
          {pendingApprovalsCount} {pendingApprovalsCount === 1 ? 'waiting for you' : 'waiting for you'}
        </p>
      </div>

      {/* Filter Tabs Bar (Horizontal scroller) */}
      <div className="px-5 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                isActive
                  ? 'bg-[#14182B] text-white'
                  : 'bg-white border border-[#D5D8E0] text-[#5B6175] hover:text-[#14182B]'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Cards List */}
      <div className="px-5 mt-2 space-y-3">
        {filteredApprovals.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[20px] p-4 border border-[#EEF0F3] shadow-xs space-y-3"
          >
            {/* Header row: Avatar, Info, Badge */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs text-[#14182B] shrink-0"
                  style={{ backgroundColor: item.avatarBg }}
                >
                  {item.initials}
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-[#14182B]">{item.employeeName}</h3>
                  <p className="text-[11px] font-semibold text-[#5B6175]">
                    {item.type} · {item.timeAgo}
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[#EAEFFE] text-[#2747D9]">
                {item.tag}
              </span>
            </div>

            {/* Details paragraph */}
            <p className="text-xs text-[#14182B] leading-relaxed font-medium">
              {item.details}
            </p>

            {/* Action buttons / Status badge */}
            <div className="pt-1">
              {item.status === 'pending' ? (
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => handleApproval(item.id, 'reject')}
                    className="flex-1 h-10 rounded-xl border border-[#D5D8E0] bg-white hover:bg-slate-50 text-[#C2382F] text-xs font-bold flex items-center justify-center cursor-pointer transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleApproval(item.id, 'approve')}
                    className="flex-1 h-10 rounded-xl bg-[#127A4B] hover:bg-[#0f673f] text-white text-xs font-bold flex items-center justify-center cursor-pointer transition-colors shadow-xs"
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <div
                  className={`w-full py-2 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1.5 ${
                    item.status === 'approved'
                      ? 'bg-[#E6F4EC] text-[#127A4B]'
                      : 'bg-[#FBE3E1] text-[#C2382F]'
                  }`}
                >
                  {item.status === 'approved' ? (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Approved</span>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 stroke-[2.5]" />
                      <span>Rejected</span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredApprovals.length === 0 && (
          <div className="p-8 text-center text-xs text-[#5B6175] font-semibold">
            No requests matching &quot;{activeFilter}&quot;
          </div>
        )}
      </div>

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
};
