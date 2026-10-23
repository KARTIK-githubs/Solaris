import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { Sidebar } from './components/common/Sidebar';
import { ConsentModal } from './components/common/ConsentModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { RegulationsPage } from './pages/RegulationsPage';
import { CommunityPage } from './pages/CommunityPage';
import { OptimiserPage } from './pages/OptimiserPage';
import { CreditAllocationPage } from './pages/CreditAllocationPage';
import { PartnersPage } from './pages/PartnersPage';
import { MonitoringPage } from './pages/MonitoringPage';
import { ReportsPage } from './pages/ReportsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';

const RouterView: React.FC = () => {
  const { currentPath } = useApp();

  const getSubtitle = () => {
    switch (currentPath) {
      case '/':
        return 'Public Showcase';
      case '/dashboard':
        return 'Main Dashboard';
      case '/onboarding':
        return 'Location & Profile Setup';
      case '/assessment':
        return 'Solar Feasibility Calculator';
      case '/regulations':
        return 'Regulatory Eligibility Checker';
      case '/community':
        return 'Community Solar Workspace';
      case '/optimiser':
        return 'Smart Affordability Optimiser';
      case '/credit-allocation':
        return 'Transparent Credit Allocation';
      case '/partners':
        return 'Installers & Financing Network';
      case '/monitoring':
        return 'Solar Telemetry & Monitoring';
      case '/reports':
        return 'Reports & Statutory Statements';
      case '/notifications':
        return 'Notifications Center';
      case '/settings':
        return 'Connection & Ledger Settings';
      case '/admin':
        return 'Administrative & Audit Console';
      case '/login':
        return 'Demo Role Switcher';
      default:
        if (currentPath.startsWith('/community')) {
          return 'Community Solar Workspace';
        }
        return 'Main Dashboard';
    }
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/':
        return <LandingPage />;
      case '/dashboard':
        return <DashboardPage />;
      case '/onboarding':
        return <OnboardingPage />;
      case '/assessment':
        return <AssessmentPage />;
      case '/regulations':
        return <RegulationsPage />;
      case '/community':
        return <CommunityPage />;
      case '/optimiser':
        return <OptimiserPage />;
      case '/credit-allocation':
        return <CreditAllocationPage />;
      case '/partners':
        return <PartnersPage />;
      case '/monitoring':
        return <MonitoringPage />;
      case '/reports':
        return <ReportsPage />;
      case '/notifications':
        return <NotificationsPage />;
      case '/settings':
        return <SettingsPage />;
      case '/admin':
        return <AdminPage />;
      case '/login':
        return <LoginPage />;
      default:
        if (currentPath.startsWith('/community')) {
          return <CommunityPage />;
        }
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#1C2930] flex flex-col antialiased selection:bg-[#9af4d8] selection:text-[#00725d]">
      <Header subtitle={getSubtitle()} />
      <Sidebar />
      <main className="flex-1 w-full pt-20 pb-20 md:pb-8 md:pl-72">
        {renderContent()}
      </main>
      <BottomNav />
      <ConsentModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <RouterView />
    </AppProvider>
  );
}
