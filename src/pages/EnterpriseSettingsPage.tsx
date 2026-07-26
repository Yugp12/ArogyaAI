import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../context/CommandContext';
import { useTheme } from '../context/ThemeContext';
import {
  Settings,
  User,
  Bell,
  ShieldCheck,
  Users,
  Palette,
  Globe,
  Key,
  FileCode,
  Laptop,
  Save,
  Copy,
  Moon,
  Sun
} from 'lucide-react';
import { clsx } from 'clsx';

type SettingTab = 'profile' | 'notifications' | 'security' | 'roles' | 'theme' | 'language' | 'api' | 'audit' | 'devices';

export const EnterpriseSettingsPage: React.FC = () => {
  const { addNotification } = useCommand();
  const { theme, toggleTheme } = useTheme();

  const [activeSubTab, setActiveSubTab] = useState<SettingTab>('profile');
  const [userName, setUserName] = useState('Dr. Arisudan Sengupta');
  const [userTitle, setUserTitle] = useState('National Director of Epidemic Surveillance');
  const [email, setEmail] = useState('a.sengupta@mohfw.gov.in');
  const [phone, setPhone] = useState('+91 98765-43210');
  const [apiKey] = useState('ag_live_9941_x820_k2991_mohfw');

  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [biometricSSO, setBiometricSSO] = useState(true);

  const tabs: { id: SettingTab; label: string; icon: React.ElementType }[] = [
    { id: 'profile', label: 'Official Profile', icon: User },
    { id: 'notifications', label: 'Emergency Alerts', icon: Bell },
    { id: 'security', label: 'Security & 2FA', icon: ShieldCheck },
    { id: 'roles', label: 'Roles & RBAC', icon: Users },
    { id: 'theme', label: 'Theme & Styling', icon: Palette },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'api', label: 'API Keys & Webhooks', icon: Key },
    { id: 'audit', label: 'System Audit Logs', icon: FileCode },
    { id: 'devices', label: 'Connected Devices', icon: Laptop }
  ];

  const auditLogs = [
    { time: '10:44:01', user: 'Dr. Sengupta', action: 'Approved LMO Convoy Airlift to Kozhikode Node', ip: '10.0.4.12' },
    { time: '10:22:15', user: 'System AI', action: 'Triggered Tele-ICU Diversion Protocol for PGIMER', ip: '10.0.1.99' },
    { time: '09:45:00', user: 'Dr. Sundaram', action: 'Updated WGS Sequencing Lineage for Dengue Delta', ip: '10.0.8.44' },
    { time: '08:15:30', user: 'Admin Security', action: 'Biometric WebAuthn Key re-validated for Command Console', ip: '10.0.4.12' }
  ];

  const devices = [
    { name: 'Delhi Apex Command Terminal #01', type: 'Desktop Workstation', location: 'AIIMS Delhi', status: 'ACTIVE SESSION' },
    { name: 'iPad Pro Tele-ICU Field Unit', type: 'Mobile Tablet', location: 'Kozhikode Vector Zone', status: 'SYNCED' },
    { name: 'National Director Mobile Hub', type: 'Smartphone App', location: 'New Delhi', status: 'ACTIVE' }
  ];

  const handleSave = () => {
    addNotification('SETTINGS SAVED: Enterprise configuration updated across National Health Grid.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans"
    >
      <div className="p-6 rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl">
        <div>
          <h1 className="text-xl font-extrabold text-slate-100 light:text-slate-900 flex items-center gap-2">
            <Settings className="w-5 h-5 text-teal-400" />
            Enterprise Command Center System Configuration
          </h1>
          <p className="text-xs text-slate-400 light:text-slate-500 mt-1">
            Role-based access controls, security keys, API integrations, and system audit logs
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer font-mono shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-3 backdrop-blur-md shadow-xl space-y-1 shrink-0 font-sans text-xs">
          {tabs.map(t => {
            const Icon = t.icon;
            const isActive = activeSubTab === t.id;

            return (
              <button
                key={t.id}
                onClick={() => setActiveSubTab(t.id)}
                className={clsx(
                  'w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl font-bold transition-all text-left cursor-pointer',
                  isActive
                    ? 'bg-teal-500/10 text-teal-400 light:bg-teal-50 light:text-teal-700 border border-teal-500/30'
                    : 'text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-800/40'
                )}
              >
                <Icon className={clsx('w-4 h-4 shrink-0', isActive && 'text-teal-400')} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-8 rounded-3xl border border-slate-800 light:border-slate-200 bg-slate-900/80 light:bg-white p-6 backdrop-blur-md shadow-xl space-y-6 font-sans text-xs">
          {activeSubTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <User className="w-4 h-4 text-teal-400" /> Government Official Profile
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 light:text-slate-700 font-semibold">Full Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 light:text-slate-700 font-semibold">Official Designation</label>
                  <input
                    type="text"
                    value={userTitle}
                    onChange={(e) => setUserTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 light:text-slate-700 font-semibold">Ministry Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 light:text-slate-700 font-semibold">Direct Phone</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <Bell className="w-4 h-4 text-teal-400" /> Emergency Alert Notifications
              </h3>

              <div className="space-y-3 font-mono">
                <div className="p-3.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100 light:text-slate-900 font-sans">SMS Critical Outbreak Alerts</div>
                    <div className="text-[10px] text-slate-400">Direct mobile alert dispatch for R0 &gt; 2.0 spikes</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={smsAlerts}
                    onChange={() => setSmsAlerts(!smsAlerts)}
                    className="w-5 h-5 rounded accent-teal-500"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100 light:text-slate-900 font-sans">WhatsApp Emergency Dispatch</div>
                    <div className="text-[10px] text-slate-400">Automated PDF briefing send to WHO & MoHFW contacts</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={whatsappAlerts}
                    onChange={() => setWhatsappAlerts(!whatsappAlerts)}
                    className="w-5 h-5 rounded accent-teal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" /> Security & Authentication
              </h3>

              <div className="space-y-3 font-mono">
                <div className="p-3.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100 light:text-slate-900 font-sans">Two-Factor Authentication (2FA)</div>
                    <div className="text-[10px] text-slate-400">TOTP Authenticator & Hardware Security Keys</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={twoFactor}
                    onChange={() => setTwoFactor(!twoFactor)}
                    className="w-5 h-5 rounded accent-teal-500"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100 light:text-slate-900 font-sans">WebAuthn Biometric Fingerprint / Face ID</div>
                    <div className="text-[10px] text-slate-400">FIDO2 Biometric token binding</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={biometricSSO}
                    onChange={() => setBiometricSSO(!biometricSSO)}
                    className="w-5 h-5 rounded accent-teal-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'roles' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" /> Role-Based Access Control (RBAC) Matrix
              </h3>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100 font-sans">National Director</div>
                    <div className="text-[10px] text-slate-400">Full Executive Permissions & Containment Lockdown Trigger</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">LEVEL 5 FULL</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-100 font-sans">Tele-ICU Specialist Doctor</div>
                    <div className="text-[10px] text-slate-400">EHR Access, Patient Triage & High-Flow Oxygen Controls</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">LEVEL 4 CLINICAL</span>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'theme' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <Palette className="w-4 h-4 text-teal-400" /> Theme & Interface Appearance
              </h3>

              <div className="p-4 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 flex items-center justify-between font-mono">
                <div>
                  <div className="font-bold text-slate-100 light:text-slate-900 font-sans">Command Center Theme</div>
                  <div className="text-[10px] text-slate-400">Currently: {theme === 'dark' ? 'Dark Sci-Fi Mode' : 'Enterprise Light Mode'}</div>
                </div>

                <button
                  onClick={toggleTheme}
                  className="px-4 py-2 rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border border-teal-500/30 font-bold flex items-center gap-2 cursor-pointer"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
                  <span>Toggle Theme</span>
                </button>
              </div>
            </div>
          )}

          {activeSubTab === 'language' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-400" /> Language & Regional Localization
              </h3>

              <div className="space-y-2">
                <label className="text-slate-300 light:text-slate-700 font-semibold">Primary Interface Language</label>
                <select className="w-full px-3.5 py-2.5 bg-slate-950 light:bg-slate-100 border border-slate-800 rounded-xl text-slate-100 light:text-slate-900 focus:outline-none focus:border-teal-500">
                  <option>English (India / International)</option>
                  <option>Hindi (हिंदी)</option>
                  <option>Tamil (தமிழ்)</option>
                  <option>Malayalam (മലയാളം)</option>
                  <option>Bengali (বাংলা)</option>
                  <option>Marathi (मराठी)</option>
                </select>
              </div>
            </div>
          )}

          {activeSubTab === 'api' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-teal-400" /> Production API Keys & Webhooks
              </h3>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 font-mono space-y-2">
                <div className="text-[10px] text-slate-400">PRODUCTION LIVE API KEY</div>
                <div className="flex items-center justify-between text-teal-300 font-bold">
                  <span>{apiKey}</span>
                  <button
                    onClick={() => addNotification('COPIED: Production API key copied to clipboard.')}
                    className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'audit' && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2 font-sans">
                <FileCode className="w-4 h-4 text-teal-400" /> Chronological System Audit Stream
              </h3>

              <div className="space-y-2">
                {auditLogs.map((log, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-slate-200 font-sans font-bold">{log.action}</div>
                      <div className="text-[10px] text-slate-400">{log.user} • IP: {log.ip}</div>
                    </div>
                    <span className="text-[10px] text-teal-400">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'devices' && (
            <div className="space-y-4 font-mono text-xs">
              <h3 className="text-base font-bold text-slate-100 light:text-slate-900 flex items-center gap-2 font-sans">
                <Laptop className="w-4 h-4 text-teal-400" /> Active Connected Hardware Terminals
              </h3>

              <div className="space-y-2">
                {devices.map((dev, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-slate-200 font-sans font-bold">{dev.name}</div>
                      <div className="text-[10px] text-slate-400">{dev.type} • Location: {dev.location}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {dev.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
