import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../context/CommandContext';
import { useTheme } from '../context/ThemeContext';
import { AnimatedBackgroundCanvas } from '../components/auth/AnimatedBackgroundCanvas';
import { ConnectedHospitalsAnimation } from '../components/auth/ConnectedHospitalsAnimation';
import {
  Activity,
  Eye,
  EyeOff,
  Lock,
  Mail,
  CheckCircle2,
  Sparkles,
  Fingerprint,
  Sun,
  Moon,
  Building,
  KeyRound,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { clsx } from 'clsx';

// Registered Authorized Government & WHO Officer Database
const VALID_OFFICIAL_ACCOUNTS = [
  {
    email: 'a.sengupta@mohfw.gov.in',
    password: 'admin123',
    role: 'National Director of Epidemic Surveillance'
  },
  {
    email: 'director@arogya.gov.in',
    password: 'admin123',
    role: 'Apex Health Commander'
  },
  {
    email: 'doctor@arogya.gov.in',
    password: 'doctor123',
    role: 'Tele-ICU Specialist Doctor'
  },
  {
    email: 'officer.mohfw@nic.in',
    password: 'gov123',
    role: 'Ministry Health Secretary'
  }
];

export const LoginPage: React.FC = () => {
  const { setIsAuthenticated, setUserRole, addNotification } = useCommand();
  const { theme, toggleTheme } = useTheme();

  const [authMode, setAuthMode] = useState<'standard' | 'gov' | 'otp'>('standard');
  const [email, setEmail] = useState('a.sengupta@mohfw.gov.in');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [biometricScanning, setBiometricScanning] = useState(false);

  // Email format validation regex
  const isValidEmailFormat = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // 1. Check for empty fields
    if (!cleanEmail || !cleanPassword) {
      setErrorMsg('Please enter both official email and security password.');
      return;
    }

    // 2. Validate email format
    if (!isValidEmailFormat(cleanEmail)) {
      setErrorMsg('Invalid email format. Must be a valid official email address (e.g. officer@arogya.gov.in).');
      return;
    }

    // 3. Strict Credential Verification against registered accounts database
    const matchingAccount = VALID_OFFICIAL_ACCOUNTS.find(
      acc => acc.email.toLowerCase() === cleanEmail && acc.password === cleanPassword
    );

    if (!matchingAccount) {
      setErrorMsg('❌ ACCESS DENIED: Invalid email address or incorrect password. Please check your official credentials.');
      addNotification(`SECURITY ALERT: Failed login attempt for ${cleanEmail}. Invalid credentials.`);
      return;
    }

    // Auth Successful
    setLoading(true);
    setUserRole(matchingAccount.role);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      addNotification(`AUTHENTICATED SUCCESSFUL: Welcome Commander. Signed in as ${matchingAccount.email} (${matchingAccount.role}).`);

      setTimeout(() => {
        setIsAuthenticated(true);
      }, 900);
    }, 1100);
  };

  const handleQuickFill = (accEmail: string, accPass: string) => {
    setEmail(accEmail);
    setPassword(accPass);
    setErrorMsg('');
  };

  const handleBiometricAuth = () => {
    setBiometricScanning(true);
    setErrorMsg('');
    setTimeout(() => {
      setBiometricScanning(false);
      setSuccess(true);
      setUserRole('Chief Medical Director');
      addNotification('BIOMETRIC AUTH SUCCESSFUL: WebAuthn FIDO2 Face ID / Fingerprint verified.');
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 900);
    }, 1400);
  };

  const handleQuickGovAuth = () => {
    setEmail('officer.mohfw@nic.in');
    setPassword('gov123');
    setErrorMsg('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setUserRole('Ministry Health Secretary');
      addNotification('GOV.IN NIC SSO AUTHENTICATED: Clearance Level 5 granted.');
      setTimeout(() => {
        setIsAuthenticated(true);
      }, 900);
    }, 1100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 light:from-slate-50 light:via-sky-50 light:to-blue-100 text-slate-100 light:text-slate-900 font-sans"
    >
      <AnimatedBackgroundCanvas />

      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-2xl border border-slate-800/80 light:border-slate-300 bg-slate-900/80 light:bg-white/80 backdrop-blur-xl text-slate-300 light:text-slate-800 hover:scale-105 transition-all shadow-xl cursor-pointer"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
        </button>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-teal-500 to-emerald-400 p-0.5 shadow-2xl shadow-blue-500/30">
              <div className="w-full h-full bg-slate-950 light:bg-white rounded-[14px] flex items-center justify-center">
                <Activity className="w-6 h-6 text-teal-400 light:text-teal-600 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-[10px] font-mono font-extrabold tracking-widest text-teal-400 light:text-teal-700 uppercase bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                GOVERNMENT OF INDIA & WHO PLATFORM
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-100 light:text-slate-900 mt-0.5 font-sans">
                Arogya<span className="text-blue-500 light:text-blue-600">AI</span>
              </h1>
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-amber-400 light:text-amber-600 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              "Predict. Prevent. Protect."
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-200 light:text-slate-800 leading-snug">
              National Epidemic Command & AI Predictive Triage Core
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 leading-relaxed max-w-lg">
              Enterprise healthcare intelligence connecting 28 state health departments, premier apex institutes, and WHO outbreak surveillance grids.
            </p>
          </div>

          <ConnectedHospitalsAnimation />
        </div>

        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full rounded-3xl border border-slate-800/90 light:border-white/80 bg-slate-900/85 light:bg-white/85 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.4)] space-y-5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 light:border-slate-200">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/60 light:bg-slate-100 border border-slate-800 light:border-slate-300">
                <button
                  type="button"
                  onClick={() => setAuthMode('standard')}
                  className={clsx(
                    'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer',
                    authMode === 'standard'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 light:hover:text-slate-800'
                  )}
                >
                  Standard Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('gov')}
                  className={clsx(
                    'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer',
                    authMode === 'gov'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 light:hover:text-slate-800'
                  )}
                >
                  <Building className="w-3.5 h-3.5" />
                  Gov.in SSO
                </button>
              </div>

              <span className="text-[10px] font-mono text-teal-400 font-bold bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/30">
                SSL 256-BIT ENCRYPTED
              </span>
            </div>

            {/* Error Message Box */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-xs text-rose-400 font-semibold flex items-start gap-2 shadow-md"
              >
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Demo Authorized Account Quick Fill Chips */}
            <div className="p-3 rounded-2xl bg-slate-950/60 light:bg-slate-100 border border-slate-800/80 light:border-slate-300 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400">
                <span className="flex items-center gap-1 text-teal-400">
                  <Info className="w-3 h-3" /> AUTHORIZED DEMO CREDENTIALS
                </span>
                <span>Click to Auto-Fill</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => handleQuickFill('a.sengupta@mohfw.gov.in', 'admin123')}
                  className="px-2.5 py-1 rounded-lg bg-teal-500/15 hover:bg-teal-500/25 text-teal-300 border border-teal-500/30 font-bold transition-all cursor-pointer"
                >
                  👑 Admin: a.sengupta@mohfw.gov.in (pass: admin123)
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('doctor@arogya.gov.in', 'doctor123')}
                  className="px-2.5 py-1 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 font-bold transition-all cursor-pointer"
                >
                  👨‍⚕️ Doctor: doctor@arogya.gov.in (pass: doctor123)
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 light:text-slate-700 flex items-center justify-between">
                  <span>Official Email Address</span>
                  <span className="text-[10px] font-mono text-slate-500">MOHFW / WHO / NIC Domain</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="officer@arogya.gov.in"
                    className="w-full pl-10 pr-4 py-3 text-xs bg-slate-950/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 light:text-slate-700 flex items-center justify-between">
                  <span>Security Credentials</span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter security password"
                    className="w-full pl-10 pr-10 py-3 text-xs bg-slate-950/80 light:bg-slate-100 border border-slate-800 light:border-slate-300 rounded-xl text-slate-100 light:text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400 light:text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-950 cursor-pointer"
                  />
                  <span>Remember Session</span>
                </label>

                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link dispatched to registered MoHFW email.'); }} className="text-blue-400 light:text-blue-600 hover:underline font-semibold">
                  Forgot Password?
                </a>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading || success}
                className={clsx(
                  'w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer font-mono',
                  success
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                    : 'bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-blue-600/30 glow-teal'
                )}
              >
                {loading ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin text-white" />
                    <span>VERIFYING SECURITY CREDENTIALS...</span>
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                    <span>CREDENTIALS VERIFIED! REDIRECTING...</span>
                  </>
                ) : (
                  <>
                    <span>SIGN IN TO AROGYAAI COMMAND</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>

            <div className="relative flex items-center justify-center my-3">
              <div className="w-full border-t border-slate-800 light:border-slate-300" />
              <span className="absolute bg-slate-900 light:bg-white px-3 text-[10px] font-mono text-slate-500 uppercase">
                OR SINGLE CLICK AUTHORIZATION
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={handleQuickGovAuth}
                className="p-2.5 rounded-xl bg-slate-950/80 light:bg-slate-100 hover:bg-slate-800 border border-slate-800 light:border-slate-300 flex flex-col items-center justify-center gap-1 transition-all text-slate-300 light:text-slate-800 cursor-pointer"
              >
                <Building className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-bold font-mono">NIC Gov.in</span>
              </button>

              <button
                type="button"
                onClick={handleBiometricAuth}
                className="p-2.5 rounded-xl bg-slate-950/80 light:bg-slate-100 hover:bg-slate-800 border border-slate-800 light:border-slate-300 flex flex-col items-center justify-center gap-1 transition-all text-slate-300 light:text-slate-800 cursor-pointer"
              >
                <Fingerprint className={`w-4 h-4 text-teal-400 ${biometricScanning ? 'animate-ping' : ''}`} />
                <span className="text-[10px] font-bold font-mono">Biometric</span>
              </button>

              <button
                type="button"
                onClick={handleQuickGovAuth}
                className="p-2.5 rounded-xl bg-slate-950/80 light:bg-slate-100 hover:bg-slate-800 border border-slate-800 light:border-slate-300 flex flex-col items-center justify-center gap-1 transition-all text-slate-300 light:text-slate-800 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-bold font-mono">Google Health</span>
              </button>

              <button
                type="button"
                onClick={handleQuickGovAuth}
                className="p-2.5 rounded-xl bg-slate-950/80 light:bg-slate-100 hover:bg-slate-800 border border-slate-800 light:border-slate-300 flex flex-col items-center justify-center gap-1 transition-all text-slate-300 light:text-slate-800 cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-purple-400" />
                <span className="text-[10px] font-bold font-mono">MS Health</span>
              </button>
            </div>

            <div className="pt-2 text-center text-[10px] text-slate-500 font-mono">
              RESTRICTED SYSTEM • Government of India & WHO Operational Access Only
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
