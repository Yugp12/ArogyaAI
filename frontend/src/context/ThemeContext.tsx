import React, { createContext, useContext, useEffect, useState } from 'react';

export type AIEnvironment = 'day' | 'night';

interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  environment: AIEnvironment;
  setEnvironment: (env: AIEnvironment) => void;
  cycleNextEnvironment: () => void;
  isWaveActive: boolean;
  triggerWaveSequence: (targetEnv?: AIEnvironment) => void;
  showStudioModal: boolean;
  setShowStudioModal: (val: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [environment, setEnvironmentState] = useState<AIEnvironment>(() => {
    const saved = localStorage.getItem('arogya_ai_env');
    return (saved === 'day' || saved === 'night') ? (saved as AIEnvironment) : 'night';
  });

  const [showStudioModal, setShowStudioModal] = useState(false);

  const isLight = environment === 'day';
  const theme: 'dark' | 'light' = isLight ? 'light' : 'dark';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-day', 'theme-night', 'dark', 'light');

    if (isLight) {
      root.classList.add('theme-day', 'light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('theme-night', 'dark');
      root.style.colorScheme = 'dark';
    }

    localStorage.setItem('arogya_ai_env', environment);
  }, [environment, isLight]);

  const toggleTheme = () => {
    setEnvironmentState(prev => (prev === 'day' ? 'night' : 'day'));
  };

  const cycleNextEnvironment = () => {
    toggleTheme();
  };

  const triggerWaveSequence = (targetEnv?: AIEnvironment) => {
    if (targetEnv) setEnvironmentState(targetEnv);
    else toggleTheme();
  };

  const setEnvironment = (env: AIEnvironment) => {
    setEnvironmentState(env);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        environment,
        setEnvironment,
        cycleNextEnvironment,
        isWaveActive: false,
        triggerWaveSequence,
        showStudioModal,
        setShowStudioModal
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
