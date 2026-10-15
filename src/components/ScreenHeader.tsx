import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
  dark?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  showBack = true,
  rightAction,
  dark = false,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`flex items-center justify-between pb-4 pt-1 ${dark ? 'text-white' : 'text-[#14182B]'}`}>
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className={`w-[44px] h-[44px] rounded-xl flex items-center justify-center transition-colors shadow-xs ${
              dark
                ? 'bg-[#1E2338] text-white hover:bg-[#2A314D] border border-white/10'
                : 'bg-white text-[#14182B] hover:bg-slate-50 border border-[#D5D8E0]'
            }`}
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
        <div>
          <h1 className={`text-xl font-extrabold tracking-tight ${dark ? 'text-white' : 'text-[#14182B]'}`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-xs mt-0.5 font-medium ${dark ? 'text-slate-300' : 'text-[#5B6175]'}`}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {rightAction && <div className="shrink-0">{rightAction}</div>}
    </div>
  );
};
