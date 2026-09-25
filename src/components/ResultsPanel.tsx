import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Scan,
  Brain,
  ShieldCheck,
  Check,
  Zap,
} from 'lucide-react';
import { DetectionResult } from '../types';

interface ResultsPanelProps {
  result: DetectionResult;
  onRunAnother?: () => void;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result, onRunAnother }) => {
  const isSuccess = result.plateStatus === 'Detected';
  const isOcrFailed = result.plateStatus === 'OCR Failed';

  return (
    <div id="results-panel" className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isSuccess
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                : isOcrFailed
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : isOcrFailed ? (
              <AlertTriangle className="w-5 h-5" />
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
          </div>
          <div>
            <h3 className="text-white font-bold text-lg tracking-tight">
              Detection Result
            </h3>
            <p className="text-slate-400 text-xs font-mono">
              Timestamp: {result.timestamp} • Processed in {result.processingTimeSec}s
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide flex items-center space-x-1.5 ${
              isSuccess
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                : isOcrFailed
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isSuccess ? 'bg-emerald-400' : isOcrFailed ? 'bg-amber-400' : 'bg-rose-400'} animate-pulse`} />
            <span>Status: {result.plateStatus}</span>
          </span>

          {onRunAnother && (
            <button
              onClick={onRunAnother}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-colors"
            >
              Test New Image
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Core Visual Pipeline: Vehicle Image -> Detected Plate -> Recognized Number */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 1. Vehicle Image with Bounding Box */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
              <span className="flex items-center space-x-1 text-slate-300">
                <Scan className="w-3.5 h-3.5 text-cyan-400" />
                <span>1. Vehicle Image (Localized Bounding Box)</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                OpenCV Contour
              </span>
            </div>

            <div className="aspect-[16/11] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 relative group flex items-center justify-center shadow-inner">
              <img
                src={result.vehicleImageUrl}
                alt="Detected vehicle"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              {result.boundingBox && (
                <div className="absolute bottom-2 right-2 bg-slate-900/90 text-slate-300 text-[10px] font-mono px-2 py-1 rounded border border-slate-700 backdrop-blur-sm">
                  Box: [{result.boundingBox.x}, {result.boundingBox.y}, {result.boundingBox.width}x{result.boundingBox.height}]
                </div>
              )}
            </div>
          </div>

          {/* 2 & 3. Detected Plate & Recognized Number */}
          <div className="lg:col-span-6 space-y-5">
            {/* Cropped Plate Card */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                <span className="text-slate-300">2. Extracted Plate Region (ROI)</span>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                  2.5x Supersampled
                </span>
              </div>

              <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 flex items-center justify-center min-h-[90px] shadow-inner">
                {result.plateCropUrl ? (
                  <img
                    src={result.plateCropUrl}
                    alt="Cropped plate ROI"
                    className="max-h-20 object-contain rounded border border-slate-700/60 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-slate-500 text-xs italic">
                    No plate crop available
                  </span>
                )}
              </div>
            </div>

            {/* Prominent Vehicle Registration Number Card */}
            <div className="space-y-2">
              <div className="text-xs text-slate-400 font-medium flex items-center justify-between">
                <span className="text-slate-300">3. Recognized Registration Number</span>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
                  OCR Engine
                </span>
              </div>

              {isSuccess && result.recognizedText ? (
                <div className="p-4 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-emerald-500/50 shadow-lg relative overflow-hidden text-center">
                  <div className="absolute top-2 left-3 flex items-center space-x-1 text-[10px] font-bold text-blue-400 tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>IND HSRP</span>
                  </div>

                  <div className="my-2">
                    <span
                      id="recognized-registration-number"
                      className="font-mono font-black text-2xl sm:text-3xl text-emerald-300 tracking-widest px-4 py-1.5 rounded-lg bg-slate-950/80 border border-emerald-500/30 inline-block shadow-inner"
                    >
                      {result.recognizedText}
                    </span>
                  </div>

                  <p className="text-slate-400 text-xs">
                    Standardized alphanumeric vehicle registration number
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300 text-sm flex items-start space-x-2">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <p className="font-semibold text-amber-200">
                      Number plate detected, but text could not be recognized.
                    </p>
                    <p className="text-xs text-amber-400/80 mt-1">
                      Blur, low lighting, or reflection prevented OCR character extraction above the minimum confidence threshold.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Metric Cards Grid (Requested in Section 7) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Plate Status</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white">
              {result.plateStatus}
            </div>
            <span className="text-[10px] text-slate-500">OpenCV Localization</span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
              <Zap className="w-3.5 h-3.5 text-blue-400" />
              <span>Detection Conf.</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-blue-400 font-mono">
              {result.detectionConfidence}%
            </div>
            <span className="text-[10px] text-slate-500">Bounding Box Quality</span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
              <Check className="w-3.5 h-3.5 text-cyan-400" />
              <span>OCR Confidence</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono">
              {result.ocrConfidence}%
            </div>
            <span className="text-[10px] text-slate-500">Character Legibility</span>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl">
            <div className="flex items-center space-x-1.5 text-slate-400 text-xs mb-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Processing Time</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-purple-400 font-mono">
              {result.processingTimeSec}s
            </div>
            <span className="text-[10px] text-slate-500">End-to-End Pipeline</span>
          </div>
        </div>

        {/* Section 5: MACHINE LEARNING COMPONENT CARD */}
        <div className="bg-gradient-to-r from-purple-950/30 via-indigo-950/20 to-slate-900 border border-purple-800/40 rounded-xl p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-900/30 pb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <Brain className="w-4 h-4" />
              </div>
              <h4 className="text-white font-semibold text-sm sm:text-base">
                Machine Learning Classification Component
              </h4>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-400">Classification:</span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                  result.mlClassification.isPlate
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}
              >
                {result.mlClassification.label} ({(result.mlClassification.confidence * 100).toFixed(0)}%)
              </span>
            </div>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {result.mlClassification.explanation}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs font-mono">
            <div className="bg-slate-950/60 p-2 rounded border border-purple-900/30 text-slate-300">
              <span className="text-slate-400 block text-[10px]">Aspect Ratio (w/h):</span>
              <span className="text-purple-300 font-bold">{result.mlClassification.features.aspectRatio}:1</span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded border border-purple-900/30 text-slate-300">
              <span className="text-slate-400 block text-[10px]">Edge Density:</span>
              <span className="text-purple-300 font-bold">
                {(result.mlClassification.features.edgeDensity * 100).toFixed(1)}%
              </span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded border border-purple-900/30 text-slate-300">
              <span className="text-slate-400 block text-[10px]">Stroke Alternation:</span>
              <span className="text-purple-300 font-bold">
                {result.mlClassification.features.strokeAlternation}
              </span>
            </div>
            <div className="bg-slate-950/60 p-2 rounded border border-purple-900/30 text-slate-300">
              <span className="text-slate-400 block text-[10px]">Rectangularity:</span>
              <span className="text-purple-300 font-bold">
                {(result.mlClassification.features.rectangularity * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-400 border-t border-purple-900/20 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
            <span>
              <strong>Viva Note:</strong> OpenCV performs image preprocessing and candidate plate localization, while the ML classifier verifies true plates vs false positives (grilles, bumpers) and OCR decodes characters.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
