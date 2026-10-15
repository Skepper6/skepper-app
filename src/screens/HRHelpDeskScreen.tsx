import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { Search, Plus, X, Check, FileQuestion } from 'lucide-react';

export const HRHelpDeskScreen: React.FC = () => {
  const { hrCases, addHRCase, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Payroll');
  const [newDescription, setNewDescription] = useState('');

  const categories = ['Payroll', 'Leave policy', 'IT and assets', 'Letters'];

  const handleCategoryClick = (cat: string) => {
    showToast(`Viewing FAQs and policy guidelines for: ${cat}`);
  };

  const handleNewCaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    addHRCase({
      title: newTitle,
      category: newCategory,
      description: newDescription,
    });
    setNewTitle('');
    setNewDescription('');
    setShowNewCaseModal(false);
  };

  const filteredCases = hrCases.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] px-5 pb-8">
      {/* Header */}
      <ScreenHeader title="HR help desk" />

      <div className="space-y-4">
        {/* How can we help? Card */}
        <div className="bg-white rounded-[20px] p-5 border border-[#EEF0F3] shadow-xs space-y-3.5">
          <h2 className="text-base font-extrabold text-[#14182B]">How can we help?</h2>

          {/* Search FAQs */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#5B6175] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search policies and FAQs"
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D5D8E0] bg-[#F4F5F7] text-xs font-semibold text-[#14182B] focus:outline-none focus:border-[#2747D9] focus:bg-white transition-colors"
            />
          </div>

          {/* 4 Category Buttons (2x2 Grid) */}
          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className="h-12 rounded-xl border border-[#D5D8E0] bg-white hover:bg-slate-50 text-xs font-bold text-[#14182B] flex items-center justify-center cursor-pointer shadow-xs transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Raise a New Case Button */}
          <button
            type="button"
            onClick={() => setShowNewCaseModal(true)}
            className="w-full h-12 rounded-xl bg-[#2747D9] hover:bg-[#1E37B3] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-[#2747D9]/20 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Raise a new case</span>
          </button>
        </div>

        {/* My Cases Section */}
        <div>
          <h3 className="text-sm font-extrabold text-[#14182B] mb-2.5">My cases</h3>

          <div className="space-y-3">
            {filteredCases.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-[18px] p-4 border border-[#EEF0F3] shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-extrabold text-[#14182B]">{c.title}</h4>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg shrink-0 ${
                      c.status === 'In progress'
                        ? 'bg-[#EAEFFE] text-[#2747D9]'
                        : c.status === 'Awaiting you'
                        ? 'bg-[#FFF4DE] text-[#A35A00]'
                        : 'bg-[#E6F4EC] text-[#127A4B]'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <p className="text-[11px] font-semibold text-[#5B6175]">
                  {c.caseNumber} · {c.category} · {c.timeStr}
                </p>

                <p className="text-xs font-medium text-[#14182B] pt-1">
                  {c.lastMessage}
                </p>
              </div>
            ))}

            {filteredCases.length === 0 && (
              <div className="p-8 text-center text-xs text-[#5B6175] font-semibold">
                No cases found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Raise New Case Modal */}
      {showNewCaseModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-[390px] bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF0F3]">
              <div className="flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-[#2747D9]" />
                <h3 className="text-sm font-extrabold text-[#14182B]">Raise HR Ticket</h3>
              </div>
              <button
                onClick={() => setShowNewCaseModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6175] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleNewCaseSubmit} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Address proof letter request"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#D5D8E0] text-xs font-semibold focus:outline-none focus:border-[#2747D9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#D5D8E0] text-xs font-semibold focus:outline-none focus:border-[#2747D9] bg-white"
                >
                  <option value="Payroll">Payroll</option>
                  <option value="Leave policy">Leave policy</option>
                  <option value="IT and assets">IT and assets</option>
                  <option value="Letters">Letters</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Please specify details for the HR team..."
                  className="w-full p-2.5 rounded-xl border border-[#D5D8E0] text-xs font-medium focus:outline-none focus:border-[#2747D9]"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewCaseModal(false)}
                  className="flex-1 h-11 rounded-xl border border-[#D5D8E0] text-xs font-bold text-[#14182B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#2747D9] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Submit ticket</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
