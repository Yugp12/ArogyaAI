import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CommandProvider, useCommand } from './context/CommandContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { ArogyaCopilot } from './components/copilot/ArogyaCopilot';
import { ContainmentModal } from './components/common/ContainmentModal';
import { ExecutiveReportModal } from './components/report/ExecutiveReportModal';
import { CinematicIntro } from './components/intro/CinematicIntro';
import { WhatIfSimulatorModal } from './components/simulation/WhatIfSimulatorModal';
import { VoiceCommandHUD } from './components/voice/VoiceCommandHUD';
import { ThemeWaveRipple } from './components/theme/ThemeWaveRipple';
import { ThemeStudioModal } from './components/theme/ThemeStudioModal';
import { OverviewPage } from './pages/OverviewPage';
import { OutbreakSurveillancePage } from './pages/OutbreakSurveillancePage';
import { DiagnosticTriagePage } from './pages/DiagnosticTriagePage';
import { TeleIcuLogisticsPage } from './pages/TeleIcuLogisticsPage';
import { GenomicSurveillancePage } from './pages/GenomicSurveillancePage';
import { HospitalNodesPage } from './pages/HospitalNodesPage';
import { MedicineInventoryPage } from './pages/MedicineInventoryPage';
import { PatientManagementPage } from './pages/PatientManagementPage';
import { WorkforceManagementPage } from './pages/WorkforceManagementPage';
import { PredictiveForecastingPage } from './pages/PredictiveForecastingPage';
import { ResourceRedistributionPage } from './pages/ResourceRedistributionPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ExecutiveAnalyticsPage } from './pages/ExecutiveAnalyticsPage';
import { EnterpriseSettingsPage } from './pages/EnterpriseSettingsPage';
import { DistrictDigitalTwin } from './components/digitaltwin/DistrictDigitalTwin';
import { ReportsIntelligenceCenterPage } from './pages/ReportsIntelligenceCenterPage';
import { LoginPage } from './pages/LoginPage';
import { AnimatePresence, motion } from 'framer-motion';

const MainContent: React.FC = () => {
  const { activeTab } = useCommand();

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto">
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && <OverviewPage key="overview" />}
        {activeTab === 'intelligence' && <ReportsIntelligenceCenterPage key="intelligence" />}
        {activeTab === 'digitaltwin' && <DistrictDigitalTwin key="digitaltwin" />}
        {activeTab === 'settings' && <EnterpriseSettingsPage key="settings" />}
        {activeTab === 'analytics' && <ExecutiveAnalyticsPage key="analytics" />}
        {activeTab === 'copilot' && <AIAssistantPage key="copilot" />}
        {activeTab === 'redistribution' && <ResourceRedistributionPage key="redistribution" />}
        {activeTab === 'forecasting' && <PredictiveForecastingPage key="forecasting" />}
        {activeTab === 'patients' && <PatientManagementPage key="patients" />}
        {activeTab === 'outbreaks' && <OutbreakSurveillancePage key="outbreaks" />}
        {activeTab === 'triage' && <DiagnosticTriagePage key="triage" />}
        {activeTab === 'logistics' && <TeleIcuLogisticsPage key="logistics" />}
        {activeTab === 'inventory' && <MedicineInventoryPage key="inventory" />}
        {activeTab === 'workforce' && <WorkforceManagementPage key="workforce" />}
        {activeTab === 'genomics' && <GenomicSurveillancePage key="genomics" />}
        {activeTab === 'nodes' && <HospitalNodesPage key="nodes" />}
      </AnimatePresence>
    </div>
  );
};

export const DashboardLayout: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="h-screen max-h-screen overflow-hidden bg-slate-950 text-slate-100 light:bg-slate-50 light:text-slate-900 flex flex-col font-sans transition-colors duration-300"
    >
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <Sidebar />
        <MainContent />
      </div>

      <ArogyaCopilot />
      <ContainmentModal />
      <ExecutiveReportModal />
      <WhatIfSimulatorModal />
      <VoiceCommandHUD />
      <ThemeWaveRipple />
      <ThemeStudioModal />
    </motion.div>
  );
};

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useCommand();

  return (
    <>
      <CinematicIntro key="cinematic-intro" />
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <LoginPage key="login-page" />
        ) : (
          <DashboardLayout key="dashboard-layout" />
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <CommandProvider>
        <AppRouter />
      </CommandProvider>
    </ThemeProvider>
  );
}
