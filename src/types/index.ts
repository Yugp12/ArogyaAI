export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'STABLE';

export interface OutbreakData {
  id: string;
  region: string;
  state: string;
  lat: number;
  lng: number;
  disease: string;
  activeCases: number;
  r0Value: number;
  dailyIncrease: number;
  riskLevel: RiskLevel;
  icuOccupancyPct: number;
  oxygenReserveDays: number;
  lastUpdated: string;
}

export interface PatientTriage {
  id: string;
  patientId: string;
  name: string;
  age: number;
  gender: 'M' | 'F' | 'Other';
  hospital: string;
  riskScore: number; // 0 - 100
  triageLevel: RiskLevel;
  symptoms: string[];
  spO2: number;
  heartRate: number;
  bp: string;
  scanConfidence: number;
  diagnosis: string;
  aiRecommendation: string;
  timestamp: string;
}

export interface AmbulanceFleet {
  id: string;
  code: string;
  driver: string;
  type: 'ALS' | 'BLS' | 'Air-Ambulance';
  hospital: string;
  status: 'DISPATCHED' | 'EN_ROUTE' | 'STANDBY' | 'MAINTENANCE';
  etaMinutes: number;
  patientCondition: string;
  lat: number;
  lng: number;
}

export interface HospitalNode {
  id: string;
  name: string;
  city: string;
  state: string;
  totalBeds: number;
  availableIcuBeds: number;
  oxygenReservesPct: number;
  ventilatorsActive: number;
  teleIcuStreams: number;
  status: 'OPERATIONAL' | 'HIGH_DEMAND' | 'CRITICAL_SHORTAGE';
  lat: number;
  lng: number;
}

export interface GenomicVariant {
  lineage: string;
  name: string;
  riskScore: number;
  immuneEvasionPct: number;
  transmissibilityMultiplier: number;
  primaryMutations: string[];
  vaccineEfficacy: number;
  dominantRegions: string[];
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  metrics?: { label: string; value: string; status?: RiskLevel }[];
  actions?: string[];
}
