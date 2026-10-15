import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Clock, Calendar, CheckSquare, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomTabBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pendingApprovalsCount } = useApp();

  const tabs = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Attendance', path: '/attendance', icon: Clock },
    { name: 'Leave', path: '/leave', icon: Calendar },
    {
      name: 'Approvals',
      path: '/approvals',
      icon: CheckSquare,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
    },
    { name: 'People', path: '/people', icon: Users },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EEF0F3] h-[84px] px-3 pb-5 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;

        return (
          <button
            key={tab.name}
            onClick={() => navigate(tab.path)}
            className="flex-1 flex flex-col items-center justify-center py-1 relative min-h-[44px] cursor-pointer"
          >
            <div className="relative">
              <Icon
                className={`w-[22px] h-[22px] transition-colors stroke-[2] ${
                  isActive ? 'text-[#2747D9] stroke-[2.3]' : 'text-[#5B6175]'
                }`}
              />
              {tab.badge !== undefined && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#A35A00] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {tab.badge}
                </span>
              )}
            </div>
            <span
              className={`text-[11px] mt-1 tracking-tight font-bold transition-colors ${
                isActive ? 'text-[#2747D9]' : 'text-[#5B6175]'
              }`}
            >
              {tab.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};
