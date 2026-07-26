import React from 'react';
import { motion } from 'framer-motion';
import { FleetTracker } from '../components/logistics/FleetTracker';

export const TeleIcuLogisticsPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <FleetTracker />
    </motion.div>
  );
};
