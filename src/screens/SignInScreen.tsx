import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ScanFace } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SignInScreen: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('priya.n@company.com');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/');
  };

  const handleSSO = () => {
    login(email);
    navigate('/');
  };

  const handleFaceID = () => {
    login(email);
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-6 pt-4 pb-8 bg-white">
      {/* Brand Header */}
      <div>
        <div className="flex items-center gap-2.5 pt-2">
          <div className="w-[34px] h-[34px] rounded-xl bg-[#2747D9] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
            T.
          </div>
          <span className="text-xl font-extrabold text-[#14182B] tracking-tight">Teamora</span>
        </div>

        {/* Hero Typography */}
        <div className="mt-10">
          <h1 className="text-[32px] font-extrabold leading-[1.18] text-[#14182B] tracking-tight">
            Your workday,
            <br />
            all in one place.
          </h1>
          <p className="mt-3 text-sm text-[#5B6175] font-medium leading-relaxed">
            Attendance, leave, timesheets, goals and HR help
            <br />
            — right from your phone.
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#14182B] mb-1.5">
              Work email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] px-4 rounded-[14px] border border-[#D5D8E0] text-[#14182B] text-sm font-semibold focus:outline-none focus:border-[#2747D9] focus:ring-2 focus:ring-[#2747D9]/20 transition-all bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#14182B] mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[50px] px-4 rounded-[14px] border border-[#D5D8E0] text-[#14182B] text-sm font-semibold focus:outline-none focus:border-[#2747D9] focus:ring-2 focus:ring-[#2747D9]/20 transition-all bg-white tracking-widest"
              required
            />
          </div>

          <div className="flex justify-end pt-0.5">
            <button
              type="button"
              onClick={() => alert('Password reset link sent to ' + email)}
              className="text-xs font-bold text-[#2747D9] hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-[50px] mt-2 rounded-[14px] bg-[#2747D9] hover:bg-[#1E37B3] text-white font-bold text-sm shadow-md shadow-[#2747D9]/20 flex items-center justify-center cursor-pointer transition-colors"
          >
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="w-full border-t border-[#EEF0F3]" />
          <span className="absolute bg-white px-3 text-xs font-semibold text-[#5B6175]">or</span>
        </div>

        {/* SSO & Biometrics */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSSO}
            className="flex-1 h-[50px] rounded-[14px] border border-[#D5D8E0] bg-white hover:bg-slate-50 text-[#14182B] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
          >
            <Lock className="w-4 h-4 text-[#14182B] stroke-[2.2]" />
            <span>Company SSO</span>
          </button>
          <button
            type="button"
            onClick={handleFaceID}
            className="w-[50px] h-[50px] rounded-[14px] border border-[#D5D8E0] bg-white hover:bg-slate-50 text-[#14182B] flex items-center justify-center cursor-pointer shadow-xs transition-colors"
            title="Sign in with Face ID"
          >
            <ScanFace className="w-5 h-5 text-[#14182B] stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Workspace Link */}
      <div className="mt-8 text-center">
        <p className="text-xs font-medium text-[#5B6175]">
          Workspace:{' '}
          <span className="font-semibold text-[#14182B] underline decoration-[#D5D8E0]">
            [yourcompany].teamora.app
          </span>
        </p>
      </div>
    </div>
  );
};
