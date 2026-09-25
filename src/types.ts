export interface DetectionResult {
  id: string;
  timestamp: string;
  vehicleImageUrl: string;
  plateCropUrl: string | null;
  recognizedText: string;
  plateStatus: 'Detected' | 'Not Detected' | 'Multiple Detected' | 'OCR Failed';
  detectionConfidence: number;
  ocrConfidence: number;
  processingTimeSec: number;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  mlClassification: {
    isPlate: boolean;
    confidence: number;
    label: 'Number Plate' | 'Non-Number Plate';
    features: {
      aspectRatio: number;
      edgeDensity: number;
      strokeAlternation: number;
      rectangularity: number;
    };
    explanation: string;
  };
  pipelineSteps: {
    id: string;
    name: string;
    stage: string;
    description: string;
    imageUrl: string;
  }[];
  vehicleType?: string;
  errorMessage?: string;
}

export interface SampleVehicle {
  id: string;
  name: string;
  category: 'Car' | 'SUV' | 'Bike' | 'Commercial' | 'Challenging / Low Contrast';
  plateNumber: string;
  description: string;
  stateCode: string;
  generator: (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    plateBox: { x: number; y: number; width: number; height: number };
    plateNumber: string;
  };
}
