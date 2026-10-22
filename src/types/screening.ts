export type DRStageNumber = 0 | 1 | 2 | 3 | 4;

export type DRStageKey = 
  | 'NO_DR' 
  | 'MILD_NPDR' 
  | 'MODERATE_NPDR' 
  | 'SEVERE_NPDR' 
  | 'PROLIFERATIVE_DR';

export interface DRSeverityMeta {
  stage: DRStageNumber;
  key: DRStageKey;
  title: string;
  shortLabel: string;
  description: string;
  referralPriority: 'Routine' | 'Elective' | 'Urgent' | 'Immediate Emergency';
  recommendedAction: string;
  followUpInterval: string;
  badgeColor: {
    bg: string;
    text: string;
    border: string;
  };
}

export type QualityStatus = 'acceptable' | 'suboptimal' | 'unusable';

export interface ImageQualityMetrics {
  status: QualityStatus;
  overallScore: number; // 0 - 100
  clarityScore: number; // 0 - 100
  macularCenteringScore: number; // 0 - 100
  illuminationUniformity: number; // 0 - 100
  focusSharpness: number; // 0 - 100
  mediaOpacityDetected: boolean; // e.g. cataract obstruction
  pupillaryDilationAdequate: boolean;
  artifacts: string[];
  canProceedToInference: boolean;
  recommendations: string[];
}

export interface PredictiveBiomarker {
  id: string;
  type: 'microaneurysm' | 'hemorrhage' | 'hard_exudate' | 'cotton_wool_spot' | 'neovascularization' | 'venous_beading';
  label: string;
  quadrant: 'Superior Temporal' | 'Inferior Temporal' | 'Superior Nasal' | 'Inferior Nasal' | 'Macula Central';
  confidence: number;
  clinicalSignificance: string;
  locationRatio?: { x: number; y: number }; // normalized 0..1 coordinates
}

export interface GradCamTelemetry {
  heatmapUrl: string;
  originalImageUrl: string;
  blendedOverlayUrl: string;
  targetLayer: string; // e.g. "Conv5_Block3_out"
  peakActivationQuadrants: string[];
  saliencyResolution: string; // "512x512"
  biomarkers: PredictiveBiomarker[];
}

export type ScreeningStatus = 
  | 'draft'
  | 'image_captured'
  | 'quality_verified'
  | 'quality_failed'
  | 'inference_completed'
  | 'referred_to_hospital'
  | 'signed_off';

export interface ScreeningPatient {
  id: string;
  abhaId?: string; // Ayushman Bharat Health Account ID
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contactPhone?: string;
  villageOrTown: string;
  district: string;
  state: string;
  knownDiabetesYears?: number;
  hypertensionHistory?: boolean;
}

export interface ScreeningSession {
  id: string;
  patient: ScreeningPatient;
  eyeExamined: 'OD' | 'OS' | 'OU'; // OD = Right Eye, OS = Left Eye, OU = Both
  capturedAt: string;
  healthCenterName: string;
  operatorName: string;
  operatorRole: 'Vision Technician' | 'ASHA Worker' | 'Medical Officer' | 'Ophthalmologist';
  deviceModel: string;
  fundusImageUrl: string;
  quality: ImageQualityMetrics;
  stageResult?: DRStageNumber;
  confidenceScore?: number; // 0 - 100
  explanation?: GradCamTelemetry;
  status: ScreeningStatus;
  referralHospital?: string;
  clinicianReviewNotes?: string;
  isDemoRecord: boolean; // Must be true for mock datasets
}

export interface ScreeningStats {
  totalScreened: number;
  stage0NoDR: number;
  stage1Mild: number;
  stage2Moderate: number;
  stage3Severe: number;
  stage4Proliferative: number;
  actionableReferred: number;
  opticalRetakeRate: number;
}
