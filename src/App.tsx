import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { PhoneFrame } from './components/PhoneFrame';

// All 15 Screens
import { SignInScreen } from './screens/SignInScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CheckInOutScreen } from './screens/CheckInOutScreen';
import { AttendanceScreen } from './screens/AttendanceScreen';
import { TimesheetScreen } from './screens/TimesheetScreen';
import { LeaveBalanceScreen } from './screens/LeaveBalanceScreen';
import { ApplyLeaveScreen } from './screens/ApplyLeaveScreen';
import { ApprovalsScreen } from './screens/ApprovalsScreen';
import { ShiftsScreen } from './screens/ShiftsScreen';
import { PeopleScreen } from './screens/PeopleScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { PerformanceScreen } from './screens/PerformanceScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { LearningScreen } from './screens/LearningScreen';
import { HRHelpDeskScreen } from './screens/HRHelpDeskScreen';

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <PhoneFrame>
          <Routes>
            <Route path="/signin" element={<SignInScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/checkin" element={<CheckInOutScreen />} />
            <Route path="/attendance" element={<AttendanceScreen />} />
            <Route path="/timesheet" element={<TimesheetScreen />} />
            <Route path="/leave" element={<LeaveBalanceScreen />} />
            <Route path="/apply-leave" element={<ApplyLeaveScreen />} />
            <Route path="/approvals" element={<ApprovalsScreen />} />
            <Route path="/shifts" element={<ShiftsScreen />} />
            <Route path="/people" element={<PeopleScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/performance" element={<PerformanceScreen />} />
            <Route path="/onboarding" element={<OnboardingScreen />} />
            <Route path="/learning" element={<LearningScreen />} />
            <Route path="/hr-help" element={<HRHelpDeskScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PhoneFrame>
      </HashRouter>
    </AppProvider>
  );
}
