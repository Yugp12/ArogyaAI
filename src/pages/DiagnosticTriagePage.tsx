import React from 'react';
import { motion } from 'framer-motion';
import { DiagnosticScanView } from '../components/triage/DiagnosticScanView';
import { PatientRiskTable } from '../components/triage/PatientRiskTable';

export const DiagnosticTriagePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <DiagnosticScanView />
      <PatientRiskTable />
    </motion.div>
  );
};
