import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { Check, X, FileSignature } from 'lucide-react';

export const OnboardingScreen: React.FC = () => {
  const { onboardingTasks, toggleOnboardingTask, documents, signDocument } = useApp();
  const [signingDocId, setSigningDocId] = useState<string | null>(null);
  const [signatureName, setSignatureName] = useState('Priya Nair');

  const completedCount = onboardingTasks.filter((t) => t.completed).length;
  const totalCount = onboardingTasks.length;
  const percentDone = Math.round((completedCount / totalCount) * 100);

  const handleSignConfirm = () => {
    if (signingDocId) {
      signDocument(signingDocId);
      setSigningDocId(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] px-5 pb-8">
      {/* Header */}
      <ScreenHeader title="Onboarding" />

      <div className="space-y-4">
        {/* Welcome Aboard Progress Card (Blue #2747D9) */}
        <div className="bg-[#2747D9] text-white rounded-[20px] p-5 shadow-sm shadow-[#2747D9]/20">
          <p className="text-xs font-bold text-white/90">
            Welcome aboard — first 30 days
          </p>
          <h2 className="text-[26px] font-extrabold tracking-tight mt-1 text-white leading-tight">
            {completedCount} of {totalCount} tasks done
          </h2>

          {/* Yellow progress track */}
          <div className="w-full h-2 rounded-full bg-white/20 mt-3.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#F2B544] transition-all duration-300"
              style={{ width: `${percentDone}%` }}
            />
          </div>
        </div>

        {/* Checklist Section */}
        <div className="bg-white rounded-[20px] p-5 border border-[#EEF0F3] shadow-xs">
          <h3 className="text-sm font-extrabold text-[#14182B] mb-3">Checklist</h3>

          <div className="divide-y divide-[#EEF0F3]">
            {onboardingTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleOnboardingTask(task.id)}
                className="py-3.5 flex items-center gap-3 cursor-pointer group select-none first:pt-1 last:pb-1"
              >
                {/* Checkbox icon */}
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                    task.completed
                      ? 'bg-[#127A4B] text-white shadow-xs'
                      : 'border-2 border-[#D5D8E0] group-hover:border-[#2747D9] bg-white'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                <div className="min-w-0">
                  <h4
                    className={`text-xs font-extrabold transition-colors truncate ${
                      task.completed ? 'text-[#5B6175] line-through' : 'text-[#14182B]'
                    }`}
                  >
                    {task.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
                    {task.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents to sign section */}
        <div>
          <h3 className="text-sm font-extrabold text-[#14182B] mb-2.5">Documents to sign</h3>

          <div className="space-y-2.5">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-[18px] p-4 border border-[#EEF0F3] shadow-xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="px-2 py-1 rounded-lg bg-[#FBE3E1] text-[#C2382F] font-extrabold text-[11px] shrink-0">
                    PDF
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-[#14182B] truncate">{doc.title}</h4>
                    <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
                      {doc.category} · {doc.pagesOrDetail}
                    </p>
                  </div>
                </div>

                {doc.signed ? (
                  <span className="text-xs font-bold text-[#127A4B] px-3 py-1.5 rounded-xl bg-[#E6F4EC] flex items-center gap-1 shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Signed</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setSigningDocId(doc.id)}
                    className="bg-[#2747D9] hover:bg-[#1E37B3] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs cursor-pointer transition-colors shrink-0"
                  >
                    Sign
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Digital Signature Modal */}
      {signingDocId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-[390px] bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF0F3]">
              <div className="flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-[#2747D9]" />
                <h3 className="text-sm font-extrabold text-[#14182B]">E-Sign Document</h3>
              </div>
              <button
                onClick={() => setSigningDocId(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6175] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3.5">
              <p className="text-xs text-[#5B6175] leading-relaxed">
                By typing your legal name, you agree to execute this document electronically in
                accordance with company compliance policies.
              </p>

              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">
                  Full legal signature
                </label>
                <input
                  type="text"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#D5D8E0] text-sm font-bold text-[#14182B] focus:outline-none focus:border-[#2747D9]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#F4F5F7] text-[11px] text-[#5B6175]">
                Timestamp: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSigningDocId(null)}
                  className="flex-1 h-11 rounded-xl border border-[#D5D8E0] text-xs font-bold text-[#14182B]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSignConfirm}
                  className="flex-1 h-11 rounded-xl bg-[#2747D9] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Execute signature</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
