import type { DRStageNumber, DRSeverityMeta } from '../types/screening';

export const DR_STAGES: Record<DRStageNumber, DRSeverityMeta> = {
  0: {
    stage: 0,
    key: 'NO_DR',
    title: 'Stage 0 â€” No Apparent DR',
    shortLabel: 'No DR',
    description: 'No microaneurysms, hemorrhages, or exudates observed. Normal retinal vasculature.',
    referralPriority: 'Routine',
    recommendedAction: 'Schedule routine annual rescreening at primary health center. Reinforce glycemic control.',
    followUpInterval: '12 Months',
    badgeColor: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      text: 'text-emerald-700',
      border: 'border-emerald-200'
    }
  },
  1: {
    stage: 1,
    key: 'MILD_NPDR',
    title: 'Stage 1 â€” Mild NPDR',
    shortLabel: 'Mild NPDR',
    description: 'Isolated microaneurysms visible. Earliest clinically detectable stage of diabetic retinopathy.',
    referralPriority: 'Elective',
    recommendedAction: 'Advise strict glycemic and blood pressure management. Community follow-up in 6 to 9 months.',
    followUpInterval: '6â€“9 Months',
    badgeColor: {
      bg: 'bg-teal-50 text-[#000000] border-[#000000]/20',
      text: 'text-[#000000]',
      border: 'border-[#000000]/30'
    }
  },
  2: {
    stage: 2,
    key: 'MODERATE_NPDR',
    title: 'Stage 2 â€” Moderate NPDR',
    shortLabel: 'Moderate NPDR',
    description: 'Multiple microaneurysms, intraretinal dot-blot hemorrhages, and occasional hard lipid exudates.',
    referralPriority: 'Elective',
    recommendedAction: 'Refer to Taluk / Sub-District Hospital ophthalmology clinic. Comprehensive macular OCT suggested.',
    followUpInterval: '3â€“6 Months',
    badgeColor: {
      bg: 'bg-amber-50 text-amber-900 border-amber-300',
      text: 'text-amber-800',
      border: 'border-amber-300'
    }
  },
  3: {
    stage: 3,
    key: 'SEVERE_NPDR',
    title: 'Stage 3 â€” Severe NPDR',
    shortLabel: 'Severe NPDR',
    description: 'Extensive hemorrhages in 4 quadrants, venous beading, or prominent IRMA. High risk of near-term neovascularization.',
    referralPriority: 'Urgent',
    recommendedAction: 'Urgent referral to District Hospital / Tertiary Eye Institute within 2â€“4 weeks. Evaluate for early panretinal photocoagulation.',
    followUpInterval: '2â€“4 Weeks',
    badgeColor: {
      bg: 'bg-orange-50 text-orange-900 border-orange-300',
      text: 'text-orange-800',
      border: 'border-orange-300'
    }
  },
  4: {
    stage: 4,
    key: 'PROLIFERATIVE_DR',
    title: 'Stage 4 â€” Proliferative DR (PDR)',
    shortLabel: 'Proliferative DR',
    description: 'Active neovascularization on disc or elsewhere, preretinal/vitreous hemorrhages. Imminent risk of severe vision loss.',
    referralPriority: 'Immediate Emergency',
    recommendedAction: 'Expedited tertiary retina specialist referral. Patient requires prompt anti-VEGF therapy or panretinal laser.',
    followUpInterval: 'Immediate (<72 hrs)',
    badgeColor: {
      bg: 'bg-red-50 text-red-900 border-red-300',
      text: 'text-red-800',
      border: 'border-red-300'
    }
  }
};

export function getDRStageMeta(stage: DRStageNumber | undefined): DRSeverityMeta {
  if (stage === undefined || !(stage in DR_STAGES)) {
    return DR_STAGES[0];
  }
  return DR_STAGES[stage];
}

