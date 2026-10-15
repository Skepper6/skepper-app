import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Download, CheckCircle2, ChevronRight, Edit3 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/ScreenHeader';

export const ProfileScreen: React.FC = () => {
  const { currentUser, selectedEmployee, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'About' | 'Job' | 'Files' | 'Pay'>('About');

  // If a colleague was selected from People directory, show their profile, otherwise currentUser
  const user = selectedEmployee || currentUser;
  const isMe = user.id === currentUser.id;

  const handleAction = (type: string) => {
    showToast(`Opening ${type} with ${user.name}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] pb-8">
      {/* Dark Top Hero Header */}
      <div className="bg-[#14182B] text-white px-5 pt-2 pb-6 rounded-b-[28px] shadow-sm">
        <ScreenHeader
          title=""
          dark={true}
          rightAction={
            isMe ? (
              <button
                onClick={() => showToast('Profile edit mode enabled')}
                className="w-[44px] h-[44px] rounded-xl bg-[#1E2338] border border-white/10 flex items-center justify-center text-white hover:bg-[#2A314D] transition-colors"
                title="Edit Profile"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            ) : null
          }
        />

        <div className="flex flex-col items-start mt-1">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-extrabold text-[#14182B] shadow-md mb-3"
            style={{ backgroundColor: user.avatarBg || '#F2B544' }}
          >
            {user.initials}
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
            {user.name}
          </h1>
          <p className="text-xs font-semibold text-slate-300 mt-0.5">
            {user.role} · {user.department}
          </p>
          <p className="text-[11px] font-medium text-slate-400 mt-1">
            {user.empId} · Joined {user.joinDate}
          </p>
        </div>
      </div>

      <div className="px-5 -mt-3 space-y-4">
        {/* Contact Action Cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => handleAction('Phone Call')}
            className="bg-white rounded-2xl p-3 border border-[#EEF0F3] shadow-xs flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <Phone className="w-5 h-5 text-[#2747D9] stroke-[2.2]" />
            <span className="text-xs font-bold text-[#14182B]">Call</span>
          </button>

          <button
            onClick={() => handleAction('Email')}
            className="bg-white rounded-2xl p-3 border border-[#EEF0F3] shadow-xs flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <Mail className="w-5 h-5 text-[#2747D9] stroke-[2.2]" />
            <span className="text-xs font-bold text-[#14182B]">Email</span>
          </button>

          <button
            onClick={() => handleAction('Chat')}
            className="bg-white rounded-2xl p-3 border border-[#EEF0F3] shadow-xs flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-[#2747D9] stroke-[2.2]" />
            <span className="text-xs font-bold text-[#14182B]">Chat</span>
          </button>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="bg-white rounded-xl p-1 border border-[#EEF0F3] shadow-xs grid grid-cols-4 gap-1">
          {(['About', 'Job', 'Files', 'Pay'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#14182B] text-white shadow-xs'
                    : 'text-[#5B6175] hover:text-[#14182B]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Tab Content Cards */}
        <div className="bg-white rounded-[20px] p-5 border border-[#EEF0F3] shadow-xs space-y-3.5">
          {activeTab === 'About' && (
            <div className="divide-y divide-[#EEF0F3] text-xs">
              <div className="flex items-center justify-between pb-3">
                <span className="font-bold text-[#5B6175]">Work email</span>
                <span className="font-extrabold text-[#14182B]">{user.email}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-bold text-[#5B6175]">Phone</span>
                <span className="font-extrabold text-[#14182B]">{user.phone}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-bold text-[#5B6175]">Location</span>
                <span className="font-extrabold text-[#14182B]">{user.location}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-bold text-[#5B6175]">Birthday</span>
                <span className="font-extrabold text-[#14182B]">{user.birthday}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-bold text-[#5B6175]">Blood group</span>
                <span className="font-extrabold text-[#14182B]">{user.bloodGroup}</span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="font-bold text-[#5B6175]">Skills</span>
                <span className="font-extrabold text-[#14182B]">{user.skills.join(', ')}</span>
              </div>
            </div>
          )}

          {activeTab === 'Job' && (
            <div className="divide-y divide-[#EEF0F3] text-xs">
              <div className="flex items-center justify-between pb-3">
                <span className="font-bold text-[#5B6175]">Employee ID</span>
                <span className="font-extrabold text-[#14182B]">{user.empId}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-bold text-[#5B6175]">Department</span>
                <span className="font-extrabold text-[#14182B]">{user.department}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-bold text-[#5B6175]">Reporting manager</span>
                <span className="font-extrabold text-[#14182B]">Rahul Kumar</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="font-bold text-[#5B6175]">Employment type</span>
                <span className="font-extrabold text-[#14182B]">Full-time Permanent</span>
              </div>
              <div className="flex items-center justify-between pt-3">
                <span className="font-bold text-[#5B6175]">Shift timing</span>
                <span className="font-extrabold text-[#14182B]">General (9:30 – 6:30)</span>
              </div>
            </div>
          )}

          {activeTab === 'Files' && (
            <div className="space-y-2.5">
              {[
                { name: 'Employment Agreement.pdf', size: '2.4 MB', date: 'Mar 2023' },
                { name: 'Non-Disclosure Agreement.pdf', size: '1.1 MB', date: 'Mar 2023' },
                { name: 'Identity Proof (Aadhaar).pdf', size: '820 KB', date: 'Mar 2023' },
                { name: 'Form 16 Tax Statement.pdf', size: '1.8 MB', date: 'Jul 2026' },
              ].map((file, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#F4F5F7]"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-[#14182B] truncate">{file.name}</p>
                    <p className="text-[10px] font-semibold text-[#5B6175]">
                      {file.size} · {file.date}
                    </p>
                  </div>
                  <button
                    onClick={() => showToast(`Downloaded ${file.name}`)}
                    className="w-8 h-8 rounded-lg bg-white border border-[#D5D8E0] flex items-center justify-center text-[#2747D9] hover:bg-slate-50 cursor-pointer shrink-0"
                    title="Download file"
                  >
                    <Download className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Pay' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#EAEFFE] border border-[#2747D9]/20 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-[#2747D9] uppercase">Bank Account</p>
                  <p className="text-xs font-extrabold text-[#14182B] mt-0.5">HDFC Bank ··· 4019</p>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white text-[#127A4B]">
                  Verified
                </span>
              </div>

              <div className="space-y-2">
                {[
                  { month: 'October 2026', gross: '₹ 1,45,000', net: '₹ 1,28,400' },
                  { month: 'September 2026', gross: '₹ 1,45,000', net: '₹ 1,28,400' },
                  { month: 'August 2026', gross: '₹ 1,45,000', net: '₹ 1,28,400' },
                ].map((slip, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F4F5F7]"
                  >
                    <div>
                      <p className="text-xs font-extrabold text-[#14182B]">{slip.month}</p>
                      <p className="text-[10px] font-semibold text-[#5B6175]">
                        Gross: {slip.gross} · Net: <span className="font-bold text-[#127A4B]">{slip.net}</span>
                      </p>
                    </div>
                    <button
                      onClick={() => showToast(`Downloading payslip for ${slip.month}`)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-[#D5D8E0] text-[11px] font-bold text-[#2747D9] hover:bg-slate-50 cursor-pointer flex items-center gap-1"
                    >
                      <Download className="w-3 h-3 stroke-[2.5]" />
                      <span>PDF</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
