import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, GitFork, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BottomTabBar } from '../components/BottomTabBar';
import { UserProfile } from '../types';

export const PeopleScreen: React.FC = () => {
  const navigate = useNavigate();
  const { people, setSelectedEmployee } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDept, setActiveDept] = useState('All');
  const [showOrgChart, setShowOrgChart] = useState(false);

  const departments = ['All · 48', 'Design', 'Engineering', 'Sales', 'HR'];

  const filteredPeople = people.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept =
      activeDept === 'All' ||
      activeDept === 'All · 48' ||
      p.department.toLowerCase() === activeDept.toLowerCase();

    return matchesSearch && matchesDept;
  });

  const handleSelectEmployee = (emp: UserProfile) => {
    setSelectedEmployee(emp);
    navigate('/profile');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F4F5F7] pb-[96px]">
      {/* Top Header */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-[#14182B]">People</h1>
        <button
          onClick={() => setShowOrgChart(!showOrgChart)}
          className="border border-[#D5D8E0] bg-white hover:bg-slate-50 text-[#14182B] text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer transition-colors"
        >
          {showOrgChart ? (
            <>
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>List view</span>
            </>
          ) : (
            <>
              <GitFork className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Org chart</span>
            </>
          )}
        </button>
      </div>

      {showOrgChart ? (
        /* Org Chart Interactive View */
        <div className="px-5 py-3 space-y-4">
          <div className="bg-white rounded-[20px] p-5 border border-[#EEF0F3] shadow-xs">
            <h3 className="text-xs font-extrabold text-[#5B6175] uppercase tracking-wider mb-3">
              Leadership Hierarchy
            </h3>

            {/* Level 1: CEO */}
            <div className="flex flex-col items-center">
              <div className="bg-[#14182B] text-white p-3 rounded-xl text-center w-48 shadow-sm">
                <p className="text-xs font-extrabold">Aarav Sharma</p>
                <p className="text-[10px] text-slate-300">Chief Executive Officer</p>
              </div>

              {/* Connecting line */}
              <div className="w-0.5 h-6 bg-[#D5D8E0]" />

              {/* Level 2: Leads */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <div
                  onClick={() => handleSelectEmployee(people[4])}
                  className="bg-[#EAEFFE] border border-[#2747D9]/30 p-2.5 rounded-xl text-center cursor-pointer hover:shadow-xs transition-shadow"
                >
                  <p className="text-xs font-extrabold text-[#14182B]">Rahul Kumar</p>
                  <p className="text-[10px] text-[#2747D9] font-bold">Design Lead</p>
                  <p className="text-[9px] text-[#5B6175] mt-1">4 reports</p>
                </div>

                <div
                  onClick={() => handleSelectEmployee(people[3])}
                  className="bg-[#F0E9FC] border border-[#6B3FC9]/30 p-2.5 rounded-xl text-center cursor-pointer hover:shadow-xs transition-shadow"
                >
                  <p className="text-xs font-extrabold text-[#14182B]">Meera Joshi</p>
                  <p className="text-[10px] text-[#6B3FC9] font-bold">HR Business Partner</p>
                  <p className="text-[9px] text-[#5B6175] mt-1">2 reports</p>
                </div>
              </div>

              {/* Direct Reports */}
              <div className="w-full mt-4 pt-3 border-t border-[#EEF0F3]">
                <p className="text-[11px] font-bold text-[#5B6175] mb-2">
                  Rahul Kumar&apos;s Team (You are here):
                </p>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4F5F7]">
                    <span className="text-xs font-bold text-[#14182B]">Priya Nair (You)</span>
                    <span className="text-[10px] font-semibold text-[#5B6175]">Brand Designer</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4F5F7]">
                    <span className="text-xs font-bold text-[#14182B]">Arjun Mehta</span>
                    <span className="text-[10px] font-semibold text-[#5B6175]">Senior Designer</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-[#F4F5F7]">
                    <span className="text-xs font-bold text-[#14182B]">Sneha Kapoor</span>
                    <span className="text-[10px] font-semibold text-[#5B6175]">Motion Designer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Search Box */}
          <div className="px-5 my-2">
            <div className="relative">
              <Search className="w-4 h-4 text-[#5B6175] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, role or skill"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#D5D8E0] bg-white text-xs font-semibold text-[#14182B] focus:outline-none focus:border-[#2747D9]"
              />
            </div>
          </div>

          {/* Department Filter Chips */}
          <div className="px-5 py-1.5 overflow-x-auto no-scrollbar flex items-center gap-2">
            {departments.map((dept) => {
              const isActive =
                activeDept === dept ||
                (dept === 'All · 48' && (activeDept === 'All' || activeDept === 'All · 48'));
              return (
                <button
                  key={dept}
                  onClick={() => setActiveDept(dept.startsWith('All') ? 'All' : dept)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-[#14182B] text-white'
                      : 'bg-white border border-[#D5D8E0] text-[#5B6175] hover:text-[#14182B]'
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          {/* People List */}
          <div className="px-5 mt-2 space-y-2">
            {filteredPeople.map((emp) => (
              <button
                key={emp.id}
                onClick={() => handleSelectEmployee(emp)}
                className="w-full bg-white rounded-[16px] p-3.5 border border-[#EEF0F3] shadow-xs flex items-center justify-between hover:border-[#2747D9]/30 transition-all cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-xs text-[#14182B] shrink-0"
                    style={{ backgroundColor: emp.avatarBg || '#D8E2FD' }}
                  >
                    {emp.initials}
                  </div>
                  <div>
                    <h3 className="text-xs font-extrabold text-[#14182B]">{emp.name}</h3>
                    <p className="text-[11px] font-semibold text-[#5B6175] mt-0.5">
                      {emp.role} · {emp.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      emp.status === 'In office'
                        ? 'bg-[#127A4B]'
                        : emp.status === 'Remote'
                        ? 'bg-[#2747D9]'
                        : 'bg-[#6B3FC9]'
                    }`}
                  />
                  <span className="text-[11px] font-bold text-[#5B6175]">{emp.status}</span>
                </div>
              </button>
            ))}

            {filteredPeople.length === 0 && (
              <div className="p-8 text-center text-xs text-[#5B6175] font-semibold">
                No colleagues match &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        </>
      )}

      {/* Bottom Tab Bar */}
      <BottomTabBar />
    </div>
  );
};
