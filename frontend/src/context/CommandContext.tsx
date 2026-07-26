import React, { createContext, useContext, useState } from 'react';
import type { PatientTriage, OutbreakData } from '../types';
import { mockPatients, mockOutbreaks } from '../data/mockData';

export type NavTab = 'overview' | 'intelligence' | 'digitaltwin' | 'redistribution' | 'forecasting' | 'patients' | 'outbreaks' | 'triage' | 'logistics' | 'inventory' | 'workforce' | 'analytics' | 'copilot' | 'genomics' | 'nodes' | 'settings';
export type ModalType = null | 'copilot' | 'protocol' | 'report' | 'scan' | 'biometric' | 'barcode' | 'newPatient' | 'whatif' | 'reportDetail';

interface CommandContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  showIntro: boolean;
  setShowIntro: (val: boolean) => void;
  userRole: string;
  setUserRole: (role: string) => void;
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  selectedPatient: PatientTriage | null;
  setSelectedPatient: (patient: PatientTriage | null) => void;
  selectedOutbreak: OutbreakData | null;
  setSelectedOutbreak: (outbreak: OutbreakData | null) => void;
  emergencyLockdown: boolean;
  setEmergencyLockdown: (val: boolean) => void;
  notifications: string[];
  addNotification: (msg: string) => void;
  logout: () => void;
  triggerCinematicIntro: () => void;
}

const CommandContext = createContext<CommandContextType | undefined>(undefined);

export const CommandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<string>('National Director');
  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [selectedPatient, setSelectedPatient] = useState<PatientTriage | null>(mockPatients[0]);
  const [selectedOutbreak, setSelectedOutbreak] = useState<OutbreakData | null>(mockOutbreaks[0]);
  const [emergencyLockdown, setEmergencyLockdown] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<string[]>([
    'AI OS DIRECTIVE: PHC-12 has 91% probability of insulin shortage within 4 days.',
    'AI OS DIRECTIVE: Reallocate 1 Pulmonologist from CHC-3. Expected savings ₹1.8 Lakh.',
    'CRITICAL: Nipah Subtype-4B case surge detected in Kozhikode Vector Zone.'
  ]);

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev.slice(0, 9)]);
  };

  const triggerCinematicIntro = () => {
    setShowIntro(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <CommandContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        showIntro,
        setShowIntro,
        userRole,
        setUserRole,
        activeTab,
        setActiveTab,
        activeModal,
        setActiveModal,
        selectedPatient,
        setSelectedPatient,
        selectedOutbreak,
        setSelectedOutbreak,
        emergencyLockdown,
        setEmergencyLockdown,
        notifications,
        addNotification,
        logout,
        triggerCinematicIntro
      }}
    >
      {children}
    </CommandContext.Provider>
  );
};

export const useCommand = () => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error('useCommand must be used within a CommandProvider');
  }
  return context;
};
