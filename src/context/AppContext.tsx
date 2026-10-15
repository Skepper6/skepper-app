import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  ApprovalItem,
  LeaveBalanceItem,
  LeaveRequest,
  Holiday,
  ShiftInfo,
  TimeEntry,
  GoalItem,
  OnboardingTask,
  DocumentItem,
  CourseItem,
  HRCase,
} from '../types';

interface AppContextType {
  // Auth state
  isAuthenticated: boolean;
  currentUser: UserProfile;
  login: (email?: string) => void;
  logout: () => void;

  // Active timer & check in/out
  isCheckedIn: boolean;
  checkInTime: string;
  checkOutTime: string | null;
  workSeconds: number;
  toggleCheckIn: () => void;
  formattedWorkTime: string;

  // Approvals
  approvals: ApprovalItem[];
  pendingApprovalsCount: number;
  handleApproval: (id: string, action: 'approve' | 'reject') => void;

  // Leave
  leaveBalances: LeaveBalanceItem[];
  leaveRequests: LeaveRequest[];
  holidays: Holiday[];
  applyLeave: (leave: { type: string; from: string; to: string; days: number; isHalfDay: boolean; reason: string }) => void;

  // Timesheet
  isTracking: boolean;
  timesheetSeconds: number;
  formattedTimesheetTime: string;
  toggleTimesheetTracking: () => void;
  timesheetEntries: TimeEntry[];
  addTimesheetEntry: (entry: Omit<TimeEntry, 'id'>) => void;
  weekSubmitted: boolean;
  submitWeek: () => void;

  // People
  people: UserProfile[];
  selectedEmployee: UserProfile | null;
  setSelectedEmployee: (emp: UserProfile | null) => void;

  // Shifts
  shifts: ShiftInfo[];
  selectedShiftDay: number;
  setSelectedShiftDay: (day: number) => void;

  // Onboarding
  onboardingTasks: OnboardingTask[];
  toggleOnboardingTask: (id: string) => void;
  documents: DocumentItem[];
  signDocument: (id: string) => void;

  // Learning
  activeLearningTab: 'assigned' | 'explore' | 'completed';
  setActiveLearningTab: (tab: 'assigned' | 'explore' | 'completed') => void;
  courses: CourseItem[];

  // HR Help Desk
  hrCases: HRCase[];
  addHRCase: (caseItem: { title: string; category: string; description: string }) => void;

  // Attendance Missed Punch regularize
  isRegularized: boolean;
  regularizePunch: (reason: string, time: string) => void;

  // Toast notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const defaultUser: UserProfile = {
  id: 'emp-1042',
  name: 'Priya Nair',
  initials: 'PN',
  role: 'Brand Designer',
  department: 'Design',
  empId: 'EMP-1042',
  joinDate: 'Mar 2023',
  email: 'priya.n@company.com',
  phone: '+91 98XXX XXX21',
  location: 'Bengaluru',
  birthday: '18 Jul',
  bloodGroup: 'B+',
  skills: ['Branding', 'Figma', 'Motion'],
  status: 'In office',
  avatarBg: '#F2B544',
};

const initialApprovals: ApprovalItem[] = [
  {
    id: 'appr-1',
    employeeName: 'Arjun Mehta',
    initials: 'AM',
    avatarBg: '#D8E2FD',
    type: 'Leave',
    timeAgo: '2h ago',
    tag: 'Casual',
    tagColor: '#2747D9',
    details: '2 days · 27–28 Oct. Visiting family for a wedding.',
    status: 'pending',
  },
  {
    id: 'appr-2',
    employeeName: 'Sneha Kapoor',
    initials: 'SK',
    avatarBg: '#E6F4EC',
    type: 'Attendance',
    timeAgo: '5h ago',
    tag: 'Regularize',
    tagColor: '#2747D9',
    details: 'Missed check-out on 12 Oct. Actual time out 6:45 PM.',
    status: 'pending',
  },
  {
    id: 'appr-3',
    employeeName: 'Vikram Rao',
    initials: 'VR',
    avatarBg: '#FFF4DE',
    type: 'Timesheet',
    timeAgo: 'Yesterday',
    tag: '40.0 h',
    tagColor: '#2747D9',
    details: 'Week of 5–11 Oct · 34 h billable across 3 projects.',
    status: 'pending',
  },
  {
    id: 'appr-4',
    employeeName: 'Meera Joshi',
    initials: 'MJ',
    avatarBg: '#F0E9FC',
    type: 'Expense',
    timeAgo: 'Yesterday',
    tag: '₹ 2,450',
    tagColor: '#2747D9',
    details: 'Client meeting travel · cab and lunch. 2 receipts attached.',
    status: 'pending',
    amount: '₹ 2,450',
  },
];

const initialPeople: UserProfile[] = [
  {
    id: 'p-1',
    name: 'Arjun Mehta',
    initials: 'AM',
    role: 'Senior Designer',
    department: 'Design',
    empId: 'EMP-1038',
    joinDate: 'Jan 2022',
    email: 'arjun.m@company.com',
    phone: '+91 98XXX XXX10',
    location: 'Bengaluru',
    birthday: '14 Oct',
    bloodGroup: 'O+',
    skills: ['UI Systems', 'Illustration', 'Design Systems'],
    status: 'In office',
    avatarBg: '#D8E2FD',
  },
  {
    id: 'p-2',
    name: 'Divya Shah',
    initials: 'DS',
    role: 'Frontend Engineer',
    department: 'Engineering',
    empId: 'EMP-1049',
    joinDate: 'Nov 2022',
    email: 'divya.s@company.com',
    phone: '+91 98XXX XXX44',
    location: 'Mumbai (Remote)',
    birthday: '03 Dec',
    bloodGroup: 'A+',
    skills: ['React', 'TypeScript', 'Tailwind'],
    status: 'Remote',
    avatarBg: '#E6F4EC',
  },
  {
    id: 'p-3',
    name: 'Karan Iyer',
    initials: 'KI',
    role: 'Account Manager',
    department: 'Sales',
    empId: 'EMP-1021',
    joinDate: 'Jul 2021',
    email: 'karan.i@company.com',
    phone: '+91 98XXX XXX99',
    location: 'Bengaluru',
    birthday: '29 Aug',
    bloodGroup: 'B+',
    skills: ['Enterprise Sales', 'Negotiation', 'CRM'],
    status: 'In office',
    avatarBg: '#FFF4DE',
  },
  {
    id: 'p-4',
    name: 'Meera Joshi',
    initials: 'MJ',
    role: 'HR Business Partner',
    department: 'HR',
    empId: 'EMP-1015',
    joinDate: 'Feb 2020',
    email: 'meera.j@company.com',
    phone: '+91 98XXX XXX12',
    location: 'Bengaluru',
    birthday: '12 Jan',
    bloodGroup: 'AB+',
    skills: ['People Ops', 'Talent', 'Compliance'],
    status: 'On leave',
    avatarBg: '#F0E9FC',
  },
  {
    id: 'p-5',
    name: 'Rahul Kumar',
    initials: 'RK',
    role: 'Design Lead',
    department: 'Design',
    empId: 'EMP-1004',
    joinDate: 'May 2019',
    email: 'rahul.k@company.com',
    phone: '+91 98XXX XXX05',
    location: 'Bengaluru',
    birthday: '05 May',
    bloodGroup: 'O-',
    skills: ['Design Strategy', 'Leadership', 'Product Design'],
    status: 'In office',
    avatarBg: '#D8E2FD',
  },
  {
    id: 'p-6',
    name: 'Sneha Kapoor',
    initials: 'SK',
    role: 'Motion Designer',
    department: 'Design',
    empId: 'EMP-1052',
    joinDate: 'Aug 2023',
    email: 'sneha.k@company.com',
    phone: '+91 98XXX XXX78',
    location: 'Pune (Remote)',
    birthday: '22 Apr',
    bloodGroup: 'A-',
    skills: ['After Effects', '3D Motion', 'Lottie'],
    status: 'Remote',
    avatarBg: '#E6F4EC',
  },
  {
    id: 'p-7',
    name: 'Vikram Rao',
    initials: 'VR',
    role: 'Backend Engineer',
    department: 'Engineering',
    empId: 'EMP-1033',
    joinDate: 'Sep 2021',
    email: 'vikram.r@company.com',
    phone: '+91 98XXX XXX34',
    location: 'Bengaluru',
    birthday: '19 Sep',
    bloodGroup: 'B-',
    skills: ['Node.js', 'PostgreSQL', 'Cloud Architecture'],
    status: 'In office',
    avatarBg: '#FFF4DE',
  },
];

const initialShifts: ShiftInfo[] = [
  {
    dayOfWeek: 'Mon',
    dayNum: 12,
    dateStr: 'Mon, 12 Oct',
    shiftName: 'General shift',
    timeRange: '9:30 – 6:30',
    location: 'Office',
    breakInfo: '1 hr break · Geo check-in required',
    coworkers: [
      { name: 'Arjun Mehta', initials: 'AM', bg: '#D8E2FD' },
      { name: 'Sneha Kapoor', initials: 'SK', bg: '#E6F4EC' },
      { name: 'Vikram Rao', initials: 'VR', bg: '#FFF4DE' },
    ],
    extraCoworkersCount: 6,
  },
  {
    dayOfWeek: 'Tue',
    dayNum: 13,
    dateStr: 'Tue, 13 Oct',
    shiftName: 'General shift',
    timeRange: '9:30 – 6:30',
    location: 'Office',
    breakInfo: '1 hr break · Geo check-in required',
    coworkers: [
      { name: 'Arjun Mehta', initials: 'AM', bg: '#D8E2FD' },
      { name: 'Rahul Kumar', initials: 'RK', bg: '#D8E2FD' },
      { name: 'Karan Iyer', initials: 'KI', bg: '#FFF4DE' },
    ],
    extraCoworkersCount: 7,
  },
  {
    dayOfWeek: 'Wed',
    dayNum: 14,
    dateStr: 'Wed, 14 Oct',
    shiftName: 'General shift',
    timeRange: '9:30 – 6:30',
    location: 'Office',
    breakInfo: '1 hr break · Geo check-in required',
    coworkers: [
      { name: 'Arjun Mehta', initials: 'AM', bg: '#D8E2FD' },
      { name: 'Sneha Kapoor', initials: 'SK', bg: '#E6F4EC' },
      { name: 'Vikram Rao', initials: 'VR', bg: '#FFF4DE' },
    ],
    extraCoworkersCount: 6,
  },
  {
    dayOfWeek: 'Thu',
    dayNum: 15,
    dateStr: 'Thu, 15 Oct',
    shiftName: 'Remote shift',
    timeRange: '10:00 – 7:00',
    location: 'Remote',
    breakInfo: '1 hr break · Virtual punch enabled',
    coworkers: [
      { name: 'Divya Shah', initials: 'DS', bg: '#E6F4EC' },
      { name: 'Sneha Kapoor', initials: 'SK', bg: '#E6F4EC' },
      { name: 'Vikram Rao', initials: 'VR', bg: '#FFF4DE' },
    ],
    extraCoworkersCount: 4,
  },
  {
    dayOfWeek: 'Fri',
    dayNum: 16,
    dateStr: 'Fri, 16 Oct',
    shiftName: 'Late shift',
    timeRange: '12:00 – 9:00',
    location: 'Office',
    breakInfo: '1 hr break · Dinner allowance included',
    coworkers: [
      { name: 'Vikram Rao', initials: 'VR', bg: '#FFF4DE' },
      { name: 'Karan Iyer', initials: 'KI', bg: '#FFF4DE' },
      { name: 'Arjun Mehta', initials: 'AM', bg: '#D8E2FD' },
    ],
    extraCoworkersCount: 5,
  },
  {
    dayOfWeek: 'Sat',
    dayNum: 17,
    dateStr: 'Sat, 17 Oct',
    shiftName: 'Week off',
    timeRange: 'No work scheduled',
    location: 'Off',
    breakInfo: 'Rest & recharge',
    coworkers: [],
    extraCoworkersCount: 0,
    isOff: true,
  },
  {
    dayOfWeek: 'Sun',
    dayNum: 18,
    dateStr: 'Sun, 18 Oct',
    shiftName: 'Week off',
    timeRange: 'No work scheduled',
    location: 'Off',
    breakInfo: 'Rest & recharge',
    coworkers: [],
    extraCoworkersCount: 0,
    isOff: true,
  },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserProfile>(defaultUser);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Live timer for check-in: 04:36:12 initially (4*3600 + 36*60 + 12 = 16572)
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkInTime] = useState('09:12 AM');
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [workSeconds, setWorkSeconds] = useState(16572);

  // Live timer for timesheet: 01:24:08 initially (1*3600 + 24*60 + 8 = 5048)
  const [isTracking, setIsTracking] = useState(true);
  const [timesheetSeconds, setTimesheetSeconds] = useState(5048);
  const [weekSubmitted, setWeekSubmitted] = useState(false);

  // Approvals list
  const [approvals, setApprovals] = useState<ApprovalItem[]>(initialApprovals);

  // Leave balances & requests
  const [leaveBalances, setLeaveBalances] = useState<LeaveBalanceItem[]>([
    { id: 'casual', type: 'Casual', available: 5, total: 8, color: '#2747D9', bgColor: '#EAEFFE' },
    { id: 'sick', type: 'Sick', available: 6, total: 7, color: '#127A4B', bgColor: '#E6F4EC' },
    { id: 'earned', type: 'Earned', available: 3.5, total: 15, color: '#6B3FC9', bgColor: '#F0E9FC' },
    { id: 'compoff', type: 'Comp off', available: 0, total: 2, color: '#A35A00', bgColor: '#FFF4DE' },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: 'lr-1', type: 'Casual leave', days: 2, dateRange: '22 – 23 Oct', status: 'Pending', reason: 'Family function out of town.' },
    { id: 'lr-2', type: 'Sick leave', days: 1, dateRange: '9 Oct', status: 'Approved', reason: 'Flu recovery.' },
    { id: 'lr-3', type: 'Earned leave', days: 3, dateRange: '15 – 17 Sep', status: 'Approved', reason: 'Annual travel.' },
  ]);

  const holidays: Holiday[] = [
    { id: 'h-1', month: 'NOV', day: '01', name: 'Diwali', dayOfWeek: 'Sunday', type: 'Company holiday' },
    { id: 'h-2', month: 'DEC', day: '25', name: 'Christmas', dayOfWeek: 'Friday', type: 'Company holiday' },
  ];

  // Timesheet entries
  const [timesheetEntries, setTimesheetEntries] = useState<TimeEntry[]>([
    { id: 'te-1', title: 'Homepage wireframes', project: 'Website redesign', billable: true, duration: '3:10', color: '#2747D9' },
    { id: 'te-2', title: 'Client review call', project: 'Product launch', billable: true, duration: '1:00', color: '#0EA5E9' },
    { id: 'te-3', title: 'Team stand-up', project: 'Internal', billable: false, duration: '0:30', color: '#94A3B8' },
    { id: 'te-4', title: 'Brand deck edits', project: 'Product launch', billable: true, duration: '1:20', color: '#0EA5E9' },
  ]);

  // People
  const [people] = useState<UserProfile[]>(initialPeople);
  const [selectedEmployee, setSelectedEmployee] = useState<UserProfile | null>(null);

  // Shifts
  const [shifts] = useState<ShiftInfo[]>(initialShifts);
  const [selectedShiftDay, setSelectedShiftDay] = useState<number>(14);

  // Onboarding
  const [onboardingTasks, setOnboardingTasks] = useState<OnboardingTask[]>([
    { id: 'ot-1', title: 'Upload ID and address proof', category: 'Personal documents', completed: true },
    { id: 'ot-2', title: 'Add bank details for payroll', category: 'Payroll', completed: true },
    { id: 'ot-3', title: 'Meet your buddy, Arjun', category: 'Day 1 · Design floor', completed: true },
    { id: 'ot-4', title: 'Complete security training', category: 'Learning · 20 min', completed: false },
    { id: 'ot-5', title: 'Read the leave policy', category: 'Policies', completed: false },
    { id: 'ot-6', title: 'Set first 30-day goals', category: 'With your manager', completed: false },
  ]);

  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: 'doc-1', title: 'Employment agreement', category: 'HR', pagesOrDetail: '4 pages', signed: false },
    { id: 'doc-2', title: 'IT asset declaration', category: 'IT', pagesOrDetail: 'Laptop, ID card', signed: false },
  ]);

  // Learning
  const [activeLearningTab, setActiveLearningTab] = useState<'assigned' | 'explore' | 'completed'>('assigned');
  const [courses] = useState<CourseItem[]>([
    { id: 'c-1', title: 'Information security basics', category: 'Mandatory', duration: '20 min', badge: 'Due 20 Oct', badgeType: 'red', iconBg: '#FBE3E1' },
    { id: 'c-2', title: 'POSH awareness', category: 'Mandatory', duration: '30 min', badge: 'Due 31 Oct', badgeType: 'yellow', iconBg: '#FFF4DE' },
    { id: 'c-3', title: 'Giving great feedback', category: 'Suggested by manager', duration: '45 min', badge: 'New', badgeType: 'blue', iconBg: '#EAEFFE' },
  ]);

  // HR Help Desk
  const [hrCases, setHrCases] = useState<HRCase[]>([
    {
      id: 'hrc-1',
      caseNumber: '#CS-2187',
      title: 'Salary certificate for visa',
      category: 'Letters',
      timeStr: 'Today',
      status: 'In progress',
      lastMessage: 'HR: Draft ready, sending for signature by tomorrow.',
    },
    {
      id: 'hrc-2',
      caseNumber: '#CS-2154',
      title: 'Reimbursement not credited',
      category: 'Payroll',
      timeStr: '3 days ago',
      status: 'Awaiting you',
      lastMessage: 'Finance: Please re-upload the cab receipt.',
    },
    {
      id: 'hrc-3',
      caseNumber: '#CS-2099',
      title: 'Laptop charger replacement',
      category: 'IT and assets',
      timeStr: '2 weeks ago',
      status: 'Resolved',
      lastMessage: 'IT: Collected from the front desk.',
    },
  ]);

  // Attendance Regularize
  const [isRegularized, setIsRegularized] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Live timer tick for work hours
  useEffect(() => {
    if (!isCheckedIn) return;
    const interval = setInterval(() => {
      setWorkSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCheckedIn]);

  // Live timer tick for timesheet tracking
  useEffect(() => {
    if (!isTracking) return;
    const interval = setInterval(() => {
      setTimesheetSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatSecondsToHHMMSS = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formattedWorkTime = formatSecondsToHHMMSS(workSeconds);
  const formattedTimesheetTime = formatSecondsToHHMMSS(timesheetSeconds);

  const toggleCheckIn = () => {
    if (isCheckedIn) {
      setIsCheckedIn(false);
      setCheckOutTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      showToast('Checked out successfully!');
    } else {
      setIsCheckedIn(true);
      setCheckOutTime(null);
      showToast('Checked in successfully!');
    }
  };

  const toggleTimesheetTracking = () => {
    setIsTracking((prev) => !prev);
    showToast(isTracking ? 'Timesheet tracker paused' : 'Timesheet tracker resumed');
  };

  const login = (email?: string) => {
    setIsAuthenticated(true);
    if (email) {
      setCurrentUser((prev) => ({ ...prev, email }));
    }
    showToast('Signed in as Priya Nair');
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Signed out');
  };

  const handleApproval = (id: string, action: 'approve' | 'reject') => {
    setApprovals((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' } : item))
    );
    showToast(action === 'approve' ? 'Request approved' : 'Request rejected');
  };

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'pending').length;

  const applyLeave = (leave: { type: string; from: string; to: string; days: number; isHalfDay: boolean; reason: string }) => {
    const newReq: LeaveRequest = {
      id: `lr-${Date.now()}`,
      type: `${leave.type} leave`,
      days: leave.isHalfDay ? 0.5 : leave.days,
      dateRange: `${leave.from} – ${leave.to}`,
      status: 'Pending',
      reason: leave.reason,
    };
    setLeaveRequests((prev) => [newReq, ...prev]);

    // deduct from balance
    const matchType = leave.type.toLowerCase();
    setLeaveBalances((prev) =>
      prev.map((b) => {
        if (b.type.toLowerCase() === matchType) {
          return { ...b, available: Math.max(0, b.available - (leave.isHalfDay ? 0.5 : leave.days)) };
        }
        return b;
      })
    );
    showToast('Leave request submitted to Rahul Kumar');
  };

  const addTimesheetEntry = (entry: Omit<TimeEntry, 'id'>) => {
    setTimesheetEntries((prev) => [{ ...entry, id: `te-${Date.now()}` }, ...prev]);
    showToast('Time entry logged');
  };

  const submitWeek = () => {
    setWeekSubmitted(true);
    showToast('Week submitted for manager approval');
  };

  const toggleOnboardingTask = (id: string) => {
    setOnboardingTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const signDocument = (id: string) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, signed: true } : doc))
    );
    showToast('Document digitally signed');
  };

  const addHRCase = (caseItem: { title: string; category: string; description: string }) => {
    const newCase: HRCase = {
      id: `hrc-${Date.now()}`,
      caseNumber: `#CS-${Math.floor(2000 + Math.random() * 900)}`,
      title: caseItem.title,
      category: caseItem.category,
      timeStr: 'Just now',
      status: 'In progress',
      lastMessage: `HR: Case received. Assigned to ${caseItem.category} team.`,
    };
    setHrCases((prev) => [newCase, ...prev]);
    showToast('HR case ticket submitted');
  };

  const regularizePunch = (reason: string, time: string) => {
    setIsRegularized(true);
    showToast(`Regularization for 7 Oct (${time}) submitted for approval`);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        isCheckedIn,
        checkInTime,
        checkOutTime,
        workSeconds,
        toggleCheckIn,
        formattedWorkTime,
        approvals,
        pendingApprovalsCount,
        handleApproval,
        leaveBalances,
        leaveRequests,
        holidays,
        applyLeave,
        isTracking,
        timesheetSeconds,
        formattedTimesheetTime,
        toggleTimesheetTracking,
        timesheetEntries,
        addTimesheetEntry,
        weekSubmitted,
        submitWeek,
        people,
        selectedEmployee,
        setSelectedEmployee,
        shifts,
        selectedShiftDay,
        setSelectedShiftDay,
        onboardingTasks,
        toggleOnboardingTask,
        documents,
        signDocument,
        activeLearningTab,
        setActiveLearningTab,
        courses,
        hrCases,
        addHRCase,
        isRegularized,
        regularizePunch,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
