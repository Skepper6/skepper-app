import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { Check, X, Star } from 'lucide-react';

export const PerformanceScreen: React.FC = () => {
  const { showToast } = useApp();
  const [showSelfReviewModal, setShowSelfReviewModal] = useState(false);
  const [rating, setRating] = useState(4);
  const [reviewComments, setReviewComments] = useState(
    'Delivered 5 brand identity iterations, established new icon grid, and mentored Sneha on Figma animations.'
  );
  const [submittedReview, setSubmittedReview] = useState(false);

  const goals = [
    {
      title: 'Ship 6 brand identity projects',
      progress: 83,
      due: 'Due 31 Dec · Weight 30%',
      barColor: '#127A4B',
    },
    {
      title: 'Build reusable motion library',
      progress: 60,
      due: 'Due 30 Nov · Weight 25%',
      barColor: '#2747D9',
    },
    {
      title: 'Mentor 2 junior designers',
      progress: 75,
      due: 'Due 31 Dec · Weight 20%',
      barColor: '#2747D9',
    },
    {
      title: 'Complete UX certification',
      progress: 25,
      due: 'Due 15 Nov · Weight 25%',
      barColor: '#A35A00',
    },
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedReview(true);
    setShowSelfReviewModal(false);
    showToast('Self-review submitted to manager');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] px-5 pb-8">
      {/* Header */}
      <ScreenHeader title="Performance" />

      <div className="space-y-4">
        {/* Appraisal Due Banner (Cream / light amber) */}
        <div className="bg-[#FFF4DE] rounded-[20px] p-5 border border-[#F2B544]/20 shadow-xs">
          <span className="text-[10px] font-extrabold tracking-wider text-[#A35A00] uppercase">
            APPRAISAL · H2 2026
          </span>
          <h2 className="text-base font-extrabold text-[#14182B] mt-1 leading-snug">
            {submittedReview ? 'Self-review submitted' : 'Self-review due in 17 days'}
          </h2>
          <p className="text-xs text-[#5B6175] font-medium mt-1 leading-relaxed">
            {submittedReview
              ? 'Your manager Rahul Kumar is currently evaluating your ratings.'
              : 'Rate your goals and skills before 31 Oct. Your manager reviews next.'}
          </p>

          {!submittedReview && (
            <button
              onClick={() => setShowSelfReviewModal(true)}
              className="mt-3.5 px-4 py-2.5 rounded-xl bg-[#14182B] hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
            >
              Start self-review
            </button>
          )}
        </div>

        {/* Goals On Track Card */}
        <div className="bg-white rounded-[20px] p-5 border border-[#EEF0F3] shadow-xs flex items-center gap-4">
          {/* Circular 68% SVG Ring */}
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="20"
                stroke="#EEF0F3"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                stroke="#2747D9"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 20}
                strokeDashoffset={2 * Math.PI * 20 * (1 - 0.68)}
                fill="none"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-[#14182B]">68%</span>
          </div>

          <div>
            <h3 className="text-sm font-extrabold text-[#14182B]">Goals on track</h3>
            <p className="text-xs font-semibold text-[#5B6175] mt-0.5">
              4 goals · 1 needs attention
            </p>
          </div>
        </div>

        {/* My Goals Section */}
        <div>
          <h3 className="text-sm font-extrabold text-[#14182B] mb-2.5">My goals</h3>

          <div className="space-y-3">
            {goals.map((goal, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[18px] p-4 border border-[#EEF0F3] shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-extrabold text-[#14182B]">{goal.title}</h4>
                  <span className="text-xs font-extrabold text-[#14182B] tabular-nums">
                    {goal.progress}%
                  </span>
                </div>

                {/* Progress track */}
                <div className="w-full h-1.5 rounded-full bg-[#EEF0F3] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${goal.progress}%`,
                      backgroundColor: goal.barColor,
                    }}
                  />
                </div>

                <p className="text-[11px] font-semibold text-[#5B6175] mt-2">
                  {goal.due}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Self-Review Modal */}
      {showSelfReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-[390px] bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF0F3]">
              <h3 className="text-sm font-extrabold text-[#14182B]">H2 2026 Self-review</h3>
              <button
                onClick={() => setShowSelfReviewModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6175] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1.5">
                  Overall rating (1–5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'text-[#F2B544] fill-[#F2B544]'
                            : 'text-[#D5D8E0]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-[#14182B] ml-2">
                    {rating} / 5 ({rating >= 4 ? 'Exceeds Expectations' : 'Meets Expectations'})
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">
                  Key accomplishments & self reflection
                </label>
                <textarea
                  rows={3}
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D5D8E0] text-xs font-medium focus:outline-none focus:border-[#2747D9]"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowSelfReviewModal(false)}
                  className="flex-1 h-11 rounded-xl border border-[#D5D8E0] text-xs font-bold text-[#14182B]"
                >
                  Save draft
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#2747D9] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Submit appraisal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
