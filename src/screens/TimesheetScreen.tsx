import React, { useState } from 'react';
import { Plus, Pause, Play, Check, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenHeader } from '../components/ScreenHeader';

export const TimesheetScreen: React.FC = () => {
  const {
    isTracking,
    formattedTimesheetTime,
    toggleTimesheetTracking,
    timesheetEntries,
    addTimesheetEntry,
    weekSubmitted,
    submitWeek,
  } = useApp();

  const [selectedDayChip, setSelectedDayChip] = useState('Wed');
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newProject, setNewProject] = useState('Website redesign');
  const [newDuration, setNewDuration] = useState('1:00');
  const [newBillable, setNewBillable] = useState(true);

  const days = [
    { day: 'Mon', hours: '8.5' },
    { day: 'Tue', hours: '9.0' },
    { day: 'Wed', hours: '6.0' },
    { day: 'Thu', hours: '–' },
    { day: 'Fri', hours: '–' },
    { day: 'Sat', hours: '–' },
    { day: 'Sun', hours: '–' },
  ];

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    addTimesheetEntry({
      title: newTitle,
      project: newProject,
      billable: newBillable,
      duration: newDuration,
      color: newBillable ? '#2747D9' : '#94A3B8',
    });
    setNewTitle('');
    setShowAddLogModal(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] px-5 pb-8">
      {/* Header with + button */}
      <ScreenHeader
        title="Timesheet"
        rightAction={
          <button
            onClick={() => setShowAddLogModal(true)}
            className="w-[44px] h-[44px] rounded-xl bg-[#2747D9] hover:bg-[#1E37B3] text-white flex items-center justify-center shadow-xs cursor-pointer transition-colors"
            title="Log new time"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        }
      />

      <div className="space-y-4">
        {/* Dark Running-Timer Card */}
        <div className="bg-[#14182B] rounded-[20px] p-5 text-white shadow-md relative flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">
              Tracking now · Website redesign
            </p>
            <h3 className="text-base font-extrabold text-white mt-0.5">
              Homepage wireframes
            </h3>
            <div className="text-[34px] font-extrabold tracking-tight tabular-nums mt-2 leading-none text-white">
              {formattedTimesheetTime}
            </div>
          </div>

          {/* Yellow Play/Pause Button */}
          <button
            onClick={toggleTimesheetTracking}
            className="w-[52px] h-[52px] rounded-full bg-[#F2B544] hover:bg-[#e6a836] text-[#14182B] flex items-center justify-center shrink-0 cursor-pointer shadow-md transition-transform active:scale-95"
            title={isTracking ? 'Pause timer' : 'Resume timer'}
          >
            {isTracking ? (
              <Pause className="w-6 h-6 fill-current stroke-none" />
            ) : (
              <Play className="w-6 h-6 fill-current stroke-none ml-1" />
            )}
          </button>
        </div>

        {/* Weekly Hours Progress Card */}
        <div className="bg-white rounded-[20px] p-5 border border-[#EEF0F3] shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#14182B]">This week</h3>
            <div className="text-sm font-extrabold text-[#14182B] tabular-nums">
              32.5 <span className="text-xs font-semibold text-[#5B6175]">/ 40 h</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-[#EEF0F3] my-3.5 overflow-hidden">
            <div className="h-full rounded-full bg-[#2747D9] transition-all" style={{ width: '81.25%' }} />
          </div>

          {/* Day chips */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map((item) => {
              const isActive = selectedDayChip === item.day;
              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedDayChip(item.day)}
                  className={`py-2 rounded-xl text-center flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-[#2747D9] text-white shadow-xs'
                      : 'bg-[#F4F5F7] text-[#14182B] hover:bg-slate-200'
                  }`}
                >
                  <span className={`text-[10px] font-bold ${isActive ? 'text-white/80' : 'text-[#5B6175]'}`}>
                    {item.day}
                  </span>
                  <span className="text-xs font-extrabold mt-0.5">{item.hours}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* List of Time Logs */}
        <div className="space-y-2.5">
          {timesheetEntries.map((log) => (
            <div
              key={log.id}
              className="bg-white rounded-[16px] p-4 border border-[#EEF0F3] shadow-xs flex items-center justify-between"
            >
              <div className="flex items-start gap-3">
                {/* Colored accent indicator */}
                <div
                  className="w-1 h-8 rounded-full shrink-0 mt-0.5"
                  style={{ backgroundColor: log.color }}
                />
                <div>
                  <h4 className="text-xs font-extrabold text-[#14182B]">{log.title}</h4>
                  <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
                    {log.project} · {log.billable ? 'Billable' : 'Non-billable'}
                  </p>
                </div>
              </div>

              <div className="text-xs font-extrabold text-[#14182B] tabular-nums">
                {log.duration}
              </div>
            </div>
          ))}
        </div>

        {/* Submit Week Button */}
        <div className="pt-2">
          <button
            onClick={submitWeek}
            disabled={weekSubmitted}
            className={`w-full h-[50px] rounded-[14px] font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs ${
              weekSubmitted
                ? 'bg-[#127A4B] text-white cursor-default'
                : 'bg-[#2747D9] hover:bg-[#1E37B3] text-white shadow-[#2747D9]/20'
            }`}
          >
            {weekSubmitted ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Week submitted for approval</span>
              </>
            ) : (
              'Submit week for approval'
            )}
          </button>
        </div>
      </div>

      {/* Add Log Modal */}
      {showAddLogModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center">
          <div className="w-full max-w-[390px] bg-white rounded-t-3xl p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF0F3]">
              <h3 className="text-sm font-extrabold text-[#14182B]">Add time entry</h3>
              <button
                onClick={() => setShowAddLogModal(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#5B6175] hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Task description</label>
                <input
                  type="text"
                  placeholder="e.g. Design review with client"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#D5D8E0] text-xs font-semibold focus:outline-none focus:border-[#2747D9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#14182B] mb-1">Project</label>
                <select
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#D5D8E0] text-xs font-semibold focus:outline-none focus:border-[#2747D9] bg-white"
                >
                  <option value="Website redesign">Website redesign</option>
                  <option value="Product launch">Product launch</option>
                  <option value="Design system">Design system</option>
                  <option value="Internal">Internal</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#14182B] mb-1">Hours (HH:MM)</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-[#D5D8E0] text-xs font-semibold focus:outline-none focus:border-[#2747D9]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#14182B] mb-1">Billable?</label>
                  <button
                    type="button"
                    onClick={() => setNewBillable(!newBillable)}
                    className={`w-full h-10 rounded-xl text-xs font-bold border transition-colors ${
                      newBillable
                        ? 'bg-[#EAEFFE] text-[#2747D9] border-[#2747D9]'
                        : 'bg-slate-100 text-[#5B6175] border-slate-200'
                    }`}
                  >
                    {newBillable ? 'Yes · Billable' : 'No · Internal'}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLogModal(false)}
                  className="flex-1 h-11 rounded-xl border border-[#D5D8E0] text-xs font-bold text-[#14182B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-[#2747D9] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Save entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
