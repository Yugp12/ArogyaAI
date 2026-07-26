import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCommand } from '../context/CommandContext';
import {
  Users,
  X,
  Sliders,
  Check
} from 'lucide-react';
import { clsx } from 'clsx';

interface DoctorRoster {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  city: string;
  status: 'AVAILABLE' | 'ON_CALL' | 'IN_SURGERY' | 'ON_LEAVE';
  shiftSchedule: 'DAY' | 'EVENING' | 'NIGHT' | 'OFF';
  burnoutRisk: 'LOW' | 'MODERATE' | 'HIGH';
  weeklyHours: number;
  teleIcuAccess: boolean;
}

export const WorkforceManagementPage: React.FC = () => {
  const { addNotification } = useCommand();

  const [doctorsList, setDoctorsList] = useState<DoctorRoster[]>([
    {
      id: 'DOC-001',
      name: 'Dr. Arisudan Sengupta',
      specialty: 'Pulmonologist & Critical Care',
      hospital: 'AIIMS Apex Command Hub',
      city: 'New Delhi',
      status: 'AVAILABLE',
      shiftSchedule: 'DAY',
      burnoutRisk: 'LOW',
      weeklyHours: 42,
      teleIcuAccess: true
    },
    {
      id: 'DOC-002',
      name: 'Dr. Meera Vasudevan',
      specialty: 'Infectious Disease Specialist',
      hospital: 'Kozhikode Epidemic Command Node',
      city: 'Kozhikode',
      status: 'IN_SURGERY',
      shiftSchedule: 'NIGHT',
      burnoutRisk: 'HIGH',
      weeklyHours: 64,
      teleIcuAccess: true
    },
    {
      id: 'DOC-003',
      name: 'Dr. Rajesh Deshmukh',
      specialty: 'Neuro-ICU Specialist',
      hospital: 'NIMHANS Neuro-Infectious Hub',
      city: 'Bengaluru',
      status: 'ON_CALL',
      shiftSchedule: 'EVENING',
      burnoutRisk: 'MODERATE',
      weeklyHours: 50,
      teleIcuAccess: true
    },
    {
      id: 'DOC-004',
      name: 'Dr. Sunita Sharma',
      specialty: 'Epidemiologist & Triage Director',
      hospital: 'PGIMER Advanced Care Hub',
      city: 'Chandigarh',
      status: 'AVAILABLE',
      shiftSchedule: 'DAY',
      burnoutRisk: 'LOW',
      weeklyHours: 38,
      teleIcuAccess: false
    }
  ]);

  const [selectedDoctorForShift, setSelectedDoctorForShift] = useState<DoctorRoster | null>(null);

  const handleOpenShiftModal = (doc: DoctorRoster) => {
    setSelectedDoctorForShift(doc);
  };

  const handleSaveShiftChanges = (newStatus: DoctorRoster['status'], newShift: DoctorRoster['shiftSchedule'], newTeleIcu: boolean) => {
    if (!selectedDoctorForShift) return;

    setDoctorsList(prev =>
      prev.map(d => (d.id === selectedDoctorForShift.id ? {
        ...d,
        status: newStatus,
        shiftSchedule: newShift,
        teleIcuAccess: newTeleIcu,
        burnoutRisk: 'LOW',
        weeklyHours: newShift === 'OFF' ? 0 : 40
      } : d))
    );

    addNotification(`UPDATED DOCTOR ROSTER: ${selectedDoctorForShift.name} status updated to ${newStatus} (${newShift} SHIFT).`);
    setSelectedDoctorForShift(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 font-sans max-w-[1400px] mx-auto"
    >
      {/* Top Banner */}
      <div className="p-6 rounded-[18px] border border-emerald-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 light:from-slate-100 light:to-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[13px] font-mono font-bold uppercase tracking-wider">
              <Users className="w-4 h-4 text-emerald-400" />
              NATIONAL MEDICAL WORKFORCE & TELE-ICU COMMAND
            </span>
            <span className="text-[13px] font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-md border border-slate-700">
              ACTIVE SPECIALISTS: 1,480 ON DUTY
            </span>
          </div>

          <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight text-slate-100 light:text-slate-900 leading-none">
            Medical Workforce Shift & Tele-ICU Roster
          </h1>
          <p className="text-[15px] text-slate-400 light:text-slate-600 leading-relaxed">
            Real-time specialist doctor roster reallocation, Tele-ICU stream grants, and burnout mitigation controls.
          </p>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
      </div>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctorsList.map((doc) => (
          <div
            key={doc.id}
            className="p-6 rounded-[18px] border border-slate-800 light:border-slate-200 bg-slate-950/80 light:bg-white shadow-xl space-y-4 font-sans"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[13px] font-mono font-bold text-teal-400 uppercase">{doc.id} • {doc.specialty}</span>
                <h3 className="text-[22px] font-bold text-slate-100 light:text-slate-900 mt-0.5">{doc.name}</h3>
                <p className="text-[14px] text-slate-400">{doc.hospital} ({doc.city})</p>
              </div>

              <span
                className={clsx(
                  'px-3 py-1 rounded-xl text-[13px] font-mono font-bold border uppercase',
                  doc.status === 'AVAILABLE' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' :
                  doc.status === 'ON_CALL' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' :
                  doc.status === 'IN_SURGERY' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' :
                  'bg-amber-500/20 text-amber-400 border-amber-500/40'
                )}
              >
                {doc.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-[13px] pt-1 border-t border-slate-800">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block uppercase">Shift Timing</span>
                <span className="font-bold text-slate-100">{doc.shiftSchedule} SHIFT</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block uppercase">Weekly Hours</span>
                <span className={doc.weeklyHours > 60 ? 'font-bold text-rose-400' : 'font-bold text-teal-400'}>
                  {doc.weeklyHours} Hrs/Wk
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block uppercase">Tele-ICU Stream</span>
                <span className={doc.teleIcuAccess ? 'font-bold text-emerald-400' : 'font-bold text-slate-500'}>
                  {doc.teleIcuAccess ? 'GRANTED' : 'REVOKED'}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleOpenShiftModal(doc)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-bold text-[14px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>CHANGE SHIFT SCHEDULE & PERMISSIONS</span>
            </button>
          </div>
        ))}
      </div>

      {/* Doctor Shift Management Modal */}
      {selectedDoctorForShift && (
        <DoctorShiftModal
          doctor={selectedDoctorForShift}
          onClose={() => setSelectedDoctorForShift(null)}
          onSave={handleSaveShiftChanges}
        />
      )}
    </motion.div>
  );
};

const DoctorShiftModal: React.FC<{
  doctor: DoctorRoster;
  onClose: () => void;
  onSave: (status: DoctorRoster['status'], shift: DoctorRoster['shiftSchedule'], teleIcu: boolean) => void;
}> = ({ doctor, onClose, onSave }) => {
  const [status, setStatus] = useState<DoctorRoster['status']>(doctor.status);
  const [shift, setShift] = useState<DoctorRoster['shiftSchedule']>(doctor.shiftSchedule);
  const [teleIcu, setTeleIcu] = useState<boolean>(doctor.teleIcuAccess);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md font-sans">
      <div className="w-full max-w-xl rounded-[18px] border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-5 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-[22px] font-bold text-slate-100">Re-allocate Shift & Permissions</h3>
            <p className="text-[14px] text-slate-400">{doctor.name} • {doctor.specialty}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-200 bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-[14px]">
          <div>
            <label className="text-[13px] text-slate-400 block mb-1">Duty Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-[14px]"
            >
              <option value="AVAILABLE">AVAILABLE (On Duty)</option>
              <option value="ON_CALL">ON CALL (Tele-ICU Remote)</option>
              <option value="IN_SURGERY">IN SURGERY (Isolation Ward)</option>
              <option value="ON_LEAVE">ON LEAVE (Mandatory Rest)</option>
            </select>
          </div>

          <div>
            <label className="text-[13px] text-slate-400 block mb-1">Shift Timing Schedule</label>
            <select
              value={shift}
              onChange={(e) => setShift(e.target.value as any)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 font-mono text-[14px]"
            >
              <option value="DAY">DAY SHIFT (08:00 AM - 04:00 PM)</option>
              <option value="EVENING">EVENING SHIFT (04:00 PM - 12:00 AM)</option>
              <option value="NIGHT">NIGHT SHIFT (12:00 AM - 08:00 AM)</option>
              <option value="OFF">OFF DUTY (Rest Period)</option>
            </select>
          </div>

          <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={teleIcu}
              onChange={(e) => setTeleIcu(e.target.checked)}
              className="w-4 h-4 rounded accent-teal-500"
            />
            <div>
              <span className="font-bold text-slate-100">Grant Remote Tele-ICU Video Stream Access</span>
              <p className="text-[12px] text-slate-400">Allows remote patient monitoring and ICU ventilator control</p>
            </div>
          </label>
        </div>

        <button
          onClick={() => onSave(status, shift, teleIcu)}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black text-[15px] uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-teal-500/20 transition-all cursor-pointer"
        >
          <Check className="w-5 h-5" />
          <span>CONFIRM ROSTER RE-ALLOCATION</span>
        </button>
      </div>
    </div>
  );
};
