// Site survey feature module
export interface SiteSurveyData {
  roofType: string;
  shadowFreeAreaSqFt: number;
  tiltAngleDeg: number;
  orientation: string;
  discomName: string;
  sanctionedLoadKw: number;
  tariffCategory: string;
}

export { Leads as SiteSurveyFeature } from '../../pages/Leads';
