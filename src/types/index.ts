export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  role: string;
  department: string;
  empId: string;
  joinDate: string;
  email: string;
  phone: string;
  location: string;
  birthday: string;
  bloodGroup: string;
  skills: string[];
  status: 'In office' | 'Remote' | 'On leave';
  avatarBg?: string;
}

export interface AttendanceStat {
  present: number;
  late: number;
  onLeave: number;
  avgDay: string;
}

export interface DayAttendance {
  day: number;
  dateStr: string;
  status: 'present' | 'late' | 'leave' | 'holiday' | 'weekend' | 'future';
  inTime?: string;
  outTime?: string;
  hours?: string;
}

export interface TimeEntry {
  id: string;
  title: string;
  project: string;
  billable: boolean;
  duration: string;
  color: string;
}

export interface LeaveBalanceItem {
  id: string;
  type: string;
  available: number;
  total: number;
  color: string;
  bgColor: string;
}

export interface LeaveRequest {
  id: string;
  type: string;
  days: number;
  dateRange: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  reason?: string;
}

export interface Holiday {
  id: string;
  month: string;
  day: string;
  name: string;
  dayOfWeek: string;
  type: string;
}

export interface ApprovalItem {
  id: string;
  employeeName: string;
  initials: string;
  avatarBg: string;
  type: 'Leave' | 'Attendance' | 'Timesheet' | 'Expense';
  timeAgo: string;
  tag: string;
  tagColor?: string;
  details: string;
  status: 'pending' | 'approved' | 'rejected';
  amount?: string;
}

export interface ShiftInfo {
  dayOfWeek: string;
  dayNum: number;
  dateStr: string;
  shiftName: string;
  timeRange: string;
  location: 'Office' | 'Remote' | 'Off';
  breakInfo: string;
  coworkers: { name: string; initials: string; bg: string }[];
  extraCoworkersCount: number;
  isOff?: boolean;
}

export interface GoalItem {
  id: string;
  title: string;
  progress: number;
  dueDate: string;
  weight: number;
  color: string;
}

export interface OnboardingTask {
  id: string;
  title: string;
  category: string;
  completed: boolean;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  pagesOrDetail: string;
  signed: boolean;
}

export interface CourseItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  badge?: string;
  badgeType?: 'red' | 'yellow' | 'blue';
  iconBg: string;
  completed?: boolean;
}

export interface HRCase {
  id: string;
  caseNumber: string;
  title: string;
  category: string;
  timeStr: string;
  status: 'In progress' | 'Awaiting you' | 'Resolved';
  lastMessage: string;
}
