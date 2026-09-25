import React, { useState, useEffect } from 'react';
import { Navbar, TabId } from './components/Navbar';
import { ImageUploadCard } from './components/ImageUploadCard';
import { ResultsPanel } from './components/ResultsPanel';
import { PipelineVisualizer } from './components/PipelineVisualizer';
import { LiveCameraView } from './components/LiveCameraView';
import { HistoryView } from './components/HistoryView';
import { ArchitectureAndDocsView } from './components/ArchitectureAndDocsView';
import { PythonProjectView } from './components/PythonProjectView';
import { DetectionResult } from './types';
import { SAMPLE_VEHICLES, renderSampleVehicleToDataUrl } from './utils/sampleVehicles';
import { runFullDetectionPipeline } from './utils/cvEngine';
import {
  Sparkles,
  Cpu,
  Camera,
  Play,
  CheckCircle2,
  Workflow,
  Code2,
  Layers,
  Shield,
} from 'lucide-react';

const LOCAL_STORAGE_HISTORY_KEY = 'autoplate_cv_detection_history';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [selectedImageDataUrl, setSelectedImageDataUrl] = useState<string | null>(null);
  const [knownPlateText, setKnownPlateText] = useState<string | undefined>(undefined);
  const [knownBoxHint, setKnownBoxHint] = useState<
    { x: number; y: number; width: number; height: number } | undefined
  >(undefined);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStepLabel, setProcessingStepLabel] = useState<string>('');
  const [currentResult, setCurrentResult] = useState<DetectionResult | null>(null);
  const [history, setHistory] = useState<DetectionResult[]>([]);

  // Load History from localStorage on mount & initialize first sample vehicle
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load history from localStorage', e);
    }

    // Initialize with first sample vehicle
    try {
      const firstSample = SAMPLE_VEHICLES[0];
      const { dataUrl, plateBox, plateNumber } = renderSampleVehicleToDataUrl(firstSample, 640, 440);
      setSelectedImageDataUrl(dataUrl);
      setKnownPlateText(plateNumber);
      setKnownBoxHint(plateBox);
    } catch (e) {
      console.error('Initial sample render failed', e);
    }
  }, []);

  // Save History to localStorage
  const saveHistoryItem = (item: DetectionResult) => {
    setHistory((prev) => {
      const updated = [item, ...prev].slice(0, 50); // keep last 50
      try {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed saving history', e);
      }
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_HISTORY_KEY);
    } catch (e) {
      console.warn('Failed clearing history', e);
    }
  };

  // Image Selection Handler
  const handleImageSelected = (
    dataUrl: string,
    samplePlateText?: string,
    sampleBoxHint?: { x: number; y: number; width: number; height: number }
  ) => {
    setSelectedImageDataUrl(dataUrl);
    setKnownPlateText(samplePlateText);
    setKnownBoxHint(sampleBoxHint);
    // Clear previous result when new image is picked
    setCurrentResult(null);
  };

  // Execute OpenCV + ML + OCR Pipeline
  const handleDetectPlate = async () => {
    if (!selectedImageDataUrl || isProcessing) return;

    setIsProcessing(true);
    setProcessingStepLabel('1/4: OpenCV Grayscale & Bilateral Filtering...');

    try {
      // Step simulation for pedagogical clarity during viva demonstrations
      await new Promise((r) => setTimeout(r, 200));
      setProcessingStepLabel('2/4: Sobel / Canny Edge Detection & Contours...');
      await new Promise((r) => setTimeout(r, 250));
      setProcessingStepLabel('3/4: Scikit-Learn ML Feature Classification...');
      await new Promise((r) => setTimeout(r, 200));
      setProcessingStepLabel('4/4: Otsu Binarization & OCR Text Extraction...');

      const result = await runFullDetectionPipeline(
        selectedImageDataUrl,
        knownPlateText,
        knownBoxHint
      );

      setCurrentResult(result);
      saveHistoryItem(result);

      // Smooth scroll to results panel
      setTimeout(() => {
        const el = document.getElementById('results-panel');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      console.error('Plate detection failed:', err);
    } finally {
      setIsProcessing(false);
      setProcessingStepLabel('');
    }
  };

  // Live Camera frame captured handler
  const handleLiveCameraCapture = (result: DetectionResult) => {
    setCurrentResult(result);
    saveHistoryItem(result);
    setActiveTab('dashboard');
    setTimeout(() => {
      const el = document.getElementById('results-panel');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* 1. HOME / DASHBOARD HERO SECTION */}
            <div
              id="hero-dashboard-banner"
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 border border-slate-800 p-6 sm:p-10 shadow-2xl"
            >
              <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute right-1/3 bottom-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-4">
                {/* Technology Badges (Requirement 1) */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                    Python
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    OpenCV
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    Machine Learning
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    OCR
                  </span>
                  <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
                    Medium Project Level
                  </span>
                </div>

                {/* Title (Requirement 1) */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Smart Vehicle Number Plate Detector
                </h1>

                {/* Short Description (Requirement 1) */}
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  “An AI-powered computer vision system that detects vehicle number plates and extracts the registration number automatically.”
                </p>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    id="start-detection-hero-button"
                    onClick={handleDetectPlate}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center space-x-2 active:scale-[0.98]"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Start Detection</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('camera')}
                    className="px-5 py-3 bg-slate-800/90 hover:bg-slate-750 text-slate-200 hover:text-white font-semibold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all flex items-center space-x-2 shadow-sm"
                  >
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span>Live Camera Mode</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('code')}
                    className="px-4 py-3 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 font-semibold text-xs sm:text-sm rounded-xl border border-emerald-600/30 transition-all flex items-center space-x-2"
                  >
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    <span>Inspect Python Code</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. IMAGE UPLOAD CARD */}
            <ImageUploadCard
              onImageSelected={handleImageSelected}
              onDetectClicked={handleDetectPlate}
              selectedImageDataUrl={selectedImageDataUrl}
              isProcessing={isProcessing}
              processingStepLabel={processingStepLabel}
            />

            {/* 7. RESULTS PANEL (When result is available) */}
            {currentResult && (
              <div className="space-y-6">
                <ResultsPanel
                  result={currentResult}
                  onRunAnother={() => {
                    const el = document.getElementById('image-upload-card');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                />

                {/* Intermediate OpenCV Stages Visualizer */}
                {currentResult.pipelineSteps && currentResult.pipelineSteps.length > 0 && (
                  <PipelineVisualizer steps={currentResult.pipelineSteps} />
                )}
              </div>
            )}
          </div>
        )}

        {/* LIVE CAMERA TAB */}
        {activeTab === 'camera' && (
          <LiveCameraView onFrameCaptured={handleLiveCameraCapture} />
        )}

        {/* DETECTION HISTORY TAB */}
        {activeTab === 'history' && (
          <HistoryView
            history={history}
            onClearHistory={clearHistory}
            onSelectResult={(item) => {
              setCurrentResult(item);
              setSelectedImageDataUrl(item.vehicleImageUrl);
              setActiveTab('dashboard');
              setTimeout(() => {
                const el = document.getElementById('results-panel');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 150);
            }}
          />
        )}

        {/* ARCHITECTURE & DOCS TAB */}
        {activeTab === 'docs' && <ArchitectureAndDocsView />}

        {/* PYTHON CODE & SUBMISSION KIT TAB */}
        {activeTab === 'code' && <PythonProjectView />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>OpenCV + ML Smart Vehicle Number Plate Detector</strong> • College Mini-Project
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <span>OpenCV 4.8</span>
            <span>•</span>
            <span>Scikit-Learn</span>
            <span>•</span>
            <span>Tesseract OCR</span>
            <span>•</span>
            <span>Flask REST API</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
