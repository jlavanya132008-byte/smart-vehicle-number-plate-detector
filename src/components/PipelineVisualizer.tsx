import React, { useState } from 'react';
import { Layers, Eye, ChevronRight, Info } from 'lucide-react';
import { DetectionResult } from '../types';

interface PipelineVisualizerProps {
  steps: DetectionResult['pipelineSteps'];
}

export const PipelineVisualizer: React.FC<PipelineVisualizerProps> = ({ steps }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);

  if (!steps || steps.length === 0) {
    return null;
  }

  const currentStep = steps[selectedStepIndex] || steps[0];

  return (
    <div id="opencv-pipeline-visualizer" className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-base sm:text-lg">
              OpenCV Image Processing Pipeline Stages
            </h3>
            <p className="text-slate-400 text-xs">
              Step-by-step mathematical transformation from raw pixel matrix to isolated binarized characters
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 self-start sm:self-auto text-xs text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-800/40">
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Click any stage below to inspect</span>
        </div>
      </div>

      {/* Stage Thumbnails Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 my-5">
        {steps.map((step, idx) => {
          const isSelected = idx === selectedStepIndex;
          return (
            <button
              key={step.id}
              id={`pipeline-step-btn-${idx}`}
              onClick={() => setSelectedStepIndex(idx)}
              className={`flex flex-col items-center p-2 rounded-xl border text-left transition-all relative group ${
                isSelected
                  ? 'bg-blue-950/50 border-blue-500 ring-2 ring-blue-500/30 shadow-lg'
                  : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800 relative">
                <img
                  src={step.imageUrl}
                  alt={step.name}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="mt-2 w-full">
                <div className="text-[11px] font-mono text-cyan-400 font-medium truncate">
                  {step.stage}
                </div>
                <div className="text-xs font-semibold text-slate-200 truncate">
                  {step.name}
                </div>
              </div>

              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  ✓
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Enlarged Step Inspector */}
      {currentStep && (
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-5 items-center">
          <div className="w-full md:w-1/2 aspect-[16/10] bg-slate-950 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center p-2 relative shadow-inner">
            <img
              src={currentStep.imageUrl}
              alt={currentStep.name}
              className="max-h-full max-w-full object-contain rounded"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-sm text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-800/50">
              Stage {selectedStepIndex + 1} of {steps.length}
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-3 text-left">
            <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <span>{currentStep.stage}</span>
              <ChevronRight className="w-3 h-3" />
              <span>cv2 function</span>
            </div>

            <h4 className="text-lg font-bold text-white tracking-tight">
              {currentStep.name}
            </h4>

            <p className="text-slate-300 text-sm leading-relaxed">
              {currentStep.description}
            </p>

            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs text-slate-400">
              <span className="bg-slate-800 px-2 py-1 rounded font-mono">
                {selectedStepIndex === 0 && 'cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)'}
                {selectedStepIndex === 1 && 'cv2.bilateralFilter(gray, 11, 17, 17)'}
                {selectedStepIndex === 2 && 'cv2.Canny(filtered, 30, 200)'}
                {selectedStepIndex === 3 && 'cv2.findContours(edges, cv2.RETR_TREE)'}
                {selectedStepIndex === 4 && 'crop = original[y:y+h, x:x+w]'}
                {selectedStepIndex === 5 && 'cv2.threshold(crop, 0, 255, cv2.THRESH_OTSU)'}
              </span>
              <span className="text-slate-500 italic py-1">
                Student viva demonstration ready
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
