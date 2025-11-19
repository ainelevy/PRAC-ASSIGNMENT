export interface AnalysisResult {
  isPlant: boolean;
  diseaseName: string;
  healthStatus: 'Healthy' | 'Diseased' | 'Unknown';
  confidence: number;
  description: string;
  symptoms: string[];
  treatments: string[];
  preventativeMeasures: string[];
}

export interface ImageState {
  file: File | null;
  previewUrl: string | null;
  base64: string | null;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}