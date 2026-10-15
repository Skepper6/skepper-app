import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { Play, Award, Shield, Lock, MessageSquare } from 'lucide-react';

export const LearningScreen: React.FC = () => {
  const { activeLearningTab, setActiveLearningTab, courses, showToast } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] px-5 pb-8">
      {/* Header */}
      <ScreenHeader title="Learning" />

      <div className="space-y-4">
        {/* Continue-Course Hero Card */}
        <div
          onClick={() => showToast('Resuming UX Foundations Module 4')}
          className="relative bg-[#1E2E7B] text-white rounded-[20px] p-5 overflow-hidden shadow-md cursor-pointer group"
        >
          {/* Abstract graphic banner art in top right */}
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-[#F2B544] opacity-90" />
          <div className="absolute top-8 right-16 w-12 h-1.5 rounded-full bg-white/30" />
          <div className="absolute top-12 right-20 w-16 h-1.5 rounded-full bg-white/30" />

          {/* White Play button icon */}
          <div className="absolute top-1/2 -translate-y-1/2 right-4 w-11 h-11 rounded-full bg-white text-[#1E2E7B] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>

          <div className="relative z-10 max-w-[210px]">
            <p className="text-[11px] font-bold text-slate-300">
              Continue · Module 4 of 6
            </p>
            <h2 className="text-base font-extrabold text-white mt-1 leading-snug">
              UX Foundations Certification
            </h2>

            {/* Amber Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-white/20 mt-4 overflow-hidden">
              <div className="h-full rounded-full bg-[#F2B544]" style={{ width: '62%' }} />
            </div>

            <p className="text-[11px] font-semibold text-slate-300 mt-2">
              62% complete · 1 h 40 min left
            </p>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2">
          {(['assigned', 'explore', 'completed'] as const).map((tab) => {
            const label =
              tab === 'assigned'
                ? 'Assigned · 3'
                : tab === 'explore'
                ? 'Explore'
                : 'Completed';
            const isActive = activeLearningTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveLearningTab(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#14182B] text-white shadow-xs'
                    : 'bg-white border border-[#D5D8E0] text-[#5B6175] hover:text-[#14182B]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Course List */}
        <div className="space-y-2.5">
          {activeLearningTab === 'assigned' &&
            courses.map((course, idx) => (
              <div
                key={course.id}
                onClick={() => showToast(`Opening course: ${course.title}`)}
                className="bg-white rounded-[18px] p-4 border border-[#EEF0F3] shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-[#2747D9]/30 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: course.iconBg }}
                  >
                    {idx === 0 && <Lock className="w-5 h-5 text-[#C2382F]" />}
                    {idx === 1 && <Shield className="w-5 h-5 text-[#A35A00]" />}
                    {idx === 2 && <MessageSquare className="w-5 h-5 text-[#2747D9]" />}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-[#14182B] leading-tight">
                      {course.title}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
                      {course.category} · {course.duration}
                    </p>
                  </div>
                </div>

                {course.badge && (
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                      course.badgeType === 'red'
                        ? 'bg-[#FBE3E1] text-[#C2382F]'
                        : course.badgeType === 'yellow'
                        ? 'bg-[#FFF4DE] text-[#A35A00]'
                        : 'bg-[#EAEFFE] text-[#2747D9]'
                    }`}
                  >
                    {course.badge}
                  </span>
                )}
              </div>
            ))}

          {activeLearningTab === 'explore' && (
            <div className="space-y-2.5">
              {[
                { title: 'Advanced Design Systems with Tokens', duration: '2 hours', cat: 'Design' },
                { title: 'Generative AI for Product Workflows', duration: '1.5 hours', cat: 'Tech' },
                { title: 'Effective Async Communication', duration: '30 min', cat: 'Soft Skills' },
              ].map((c, i) => (
                <div
                  key={i}
                  onClick={() => showToast(`Enrolled in ${c.title}`)}
                  className="bg-white rounded-[18px] p-4 border border-[#EEF0F3] shadow-xs flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h4 className="text-xs font-extrabold text-[#14182B]">{c.title}</h4>
                    <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
                      {c.cat} · {c.duration}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#2747D9] bg-[#EAEFFE] px-2.5 py-1 rounded-lg">
                    Enroll
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeLearningTab === 'completed' && (
            <div className="space-y-2.5">
              {[
                { title: 'Company Code of Conduct 2026', completedDate: 'Completed 12 Aug' },
                { title: 'Data Privacy & GDPR Fundamentals', completedDate: 'Completed 04 Jul' },
                { title: 'Figma to Code Workflow', completedDate: 'Completed 18 May' },
              ].map((c, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[18px] p-4 border border-[#EEF0F3] shadow-xs flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-extrabold text-[#14182B]">{c.title}</h4>
                    <p className="text-[11px] font-semibold text-[#127A4B] mt-0.5">
                      {c.completedDate}
                    </p>
                  </div>
                  <Award className="w-5 h-5 text-[#127A4B]" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certificates Earned Bottom Card */}
        <div className="bg-white rounded-[20px] p-4 border border-[#EEF0F3] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#E6F4EC] text-[#127A4B] flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-[#14182B]">3 certificates earned</h4>
            <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
              Shown on your profile
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
