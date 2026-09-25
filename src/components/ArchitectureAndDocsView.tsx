import React from 'react';
import {
  Workflow,
  BookOpen,
  Cpu,
  Brain,
  Layers,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  HelpCircle,
  FileCode,
} from 'lucide-react';

export const ArchitectureAndDocsView: React.FC = () => {
  const pipelineStages = [
    {
      step: 1,
      title: 'Input Image / Camera',
      desc: 'High-resolution vehicle image or real-time webcam frame acquisition.',
      tech: 'HTML5 Canvas / cv2.VideoCapture',
      color: 'blue',
    },
    {
      step: 2,
      title: 'Image Preprocessing',
      desc: 'Convert to Grayscale (cv2.cvtColor) and apply Bilateral/Gaussian filtering to suppress noise.',
      tech: 'cv2.bilateralFilter / cv2.GaussianBlur',
      color: 'cyan',
    },
    {
      step: 3,
      title: 'OpenCV Plate Detection',
      desc: 'Compute Sobel/Canny edge gradients and extract rectangular contours with aspect ratio ~2.0 - 5.5.',
      tech: 'cv2.Canny / cv2.findContours',
      color: 'emerald',
    },
    {
      step: 4,
      title: 'Plate Cropping',
      desc: 'Isolate Region of Interest (ROI) with bounding box coordinates and 2.5x supersampling.',
      tech: 'Numpy Array Slicing & Resizing',
      color: 'emerald',
    },
    {
      step: 5,
      title: 'Image Enhancement',
      desc: 'Dynamic Otsu binarization and contrast stretching to sharpen alphanumeric character glyphs.',
      tech: 'cv2.threshold(THRESH_OTSU)',
      color: 'amber',
    },
    {
      step: 6,
      title: 'ML Classification',
      desc: 'Feature vector scoring (Aspect ratio, edge density, vertical stroke frequency) to verify Number Plate vs Non-Plate.',
      tech: 'Scikit-Learn / RandomForest / SVM',
      color: 'purple',
    },
    {
      step: 7,
      title: 'OCR Character Recognition',
      desc: 'Optical character segmentation, regex pattern sanitization, and state-code formatting.',
      tech: 'Pytesseract / EasyOCR / Projection Profile',
      color: 'indigo',
    },
    {
      step: 8,
      title: 'Detected Vehicle Number',
      desc: 'Sanitized registration string (e.g., "TN 38 AB 1234") formatted according to high-security standards.',
      tech: 'Regular Expressions (re)',
      color: 'emerald',
    },
    {
      step: 9,
      title: 'Result + Confidence',
      desc: 'Annotated vehicle image, bounding box coordinates, detection % and OCR % confidence metrics.',
      tech: 'Telemetry & Audit Logs',
      color: 'blue',
    },
  ];

  return (
    <div id="architecture-and-docs-view" className="space-y-8">
      {/* Hero Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center space-x-3 text-cyan-400 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Student Mini-Project Documentation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Project Architecture & Technical Specification
        </h2>
        <p className="text-slate-400 text-sm max-w-3xl mt-2 leading-relaxed">
          Comprehensive project report documentation, system workflow diagrams, machine learning module details,
          and viva preparation guides for college evaluation.
        </p>
      </div>

      {/* 10. PROJECT ARCHITECTURE FLOWCHART */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Workflow className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-bold text-lg">
            System Workflow & Processing Pipeline
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pipelineStages.map((stage) => (
            <div
              key={stage.step}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 relative group hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-mono font-bold flex items-center justify-center border border-blue-500/30">
                  {stage.step}
                </span>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-800/40">
                  {stage.tech}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white tracking-tight">
                {stage.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 14. ABOUT PROJECT SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Statement & Objective */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-rose-400">
            <Cpu className="w-5 h-5" />
            <h3 className="text-white font-bold text-base">Problem Statement</h3>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Manual vehicle identification at parking lots, toll plazas, restricted campuses, and security checkpoints
            causes severe traffic congestion, human recording errors, and delays in tracking unauthorized vehicles.
            Traditional manual ledger logging is labor-intensive, unsearchable in real-time, and vulnerable to manipulation.
          </p>

          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-white font-bold text-sm mb-1.5 flex items-center space-x-2 text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Project Objective</span>
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Design and implement an automated, robust, and cost-effective vehicle number plate detection system that
              combines <strong>OpenCV morphological operations</strong> for localization, a <strong>Scikit-Learn machine learning classifier</strong> for candidate validation,
              and <strong>Optical Character Recognition (OCR)</strong> for automated alphanumeric extraction.
            </p>
          </div>
        </div>

        {/* Proposed Solution & Expected Output */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-white font-bold text-base">Proposed Solution</h3>
          </div>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            A modular two-stage hybrid approach:
            <br />
            <strong>Stage 1:</strong> OpenCV handles spatial computer vision (Grayscale, Bilateral smoothing, Canny edge detection, and contour polygon approximation) to locate candidate rectangular regions.
            <br />
            <strong>Stage 2:</strong> A Machine Learning feature classifier filters out false candidates (e.g. radiator grilles), followed by Otsu adaptive binarization and OCR to transcribe the registration number.
          </p>

          <div className="pt-2 border-t border-slate-800">
            <h4 className="text-white font-bold text-sm mb-1.5 text-blue-400">Expected Output</h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Localized bounding box drawn over vehicle number plate.</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Cropped and binarized Region of Interest (ROI) image.</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Formatted registration string (e.g., "TN 38 AB 1234").</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Detection confidence score and execution speed telemetry.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5 & 14. MACHINE LEARNING COMPONENT EXPLANATION */}
      <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/30 to-slate-900 border border-purple-800/40 rounded-2xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 text-purple-400">
          <Brain className="w-6 h-6" />
          <h3 className="text-white font-bold text-lg">
            Machine Learning Component: Plate vs. Non-Plate Classifier
          </h3>
        </div>

        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Standard OpenCV contour detection frequently detects multiple rectangular shapes on vehicles, such as front radiator grilles,
          fog lamp slots, air dams, roof carriers, and bumper lines. The role of the <strong>Machine Learning Component</strong> is to evaluate
          extracted feature vectors and classify whether the detected rectangular region is a genuine <strong>Number Plate</strong> or a <strong>Non-Number Plate</strong> false positive.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-purple-900/40">
            <h5 className="font-bold text-purple-300 text-xs mb-1">1. Geometric Aspect Ratio</h5>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Standard vehicle registration plates adhere to standardized aspect ratios (typically between 2.2:1 and 5.2:1). Square or extreme ratios are penalized.
            </p>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-purple-900/40">
            <h5 className="font-bold text-purple-300 text-xs mb-1">2. Edge Density & Internal Contrast</h5>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Calculates the ratio of gradient edges relative to total ROI area. Vehicle plates exhibit high edge density due to alphanumeric character strokes.
            </p>
          </div>
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-purple-900/40">
            <h5 className="font-bold text-purple-300 text-xs mb-1">3. Vertical Stroke Projection</h5>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Scans column-wise pixel variance. Alphanumeric text creates alternating high-frequency black/white transitions distinct from uniform bumper plastic.
            </p>
          </div>
        </div>
      </div>

      {/* 11. TECHNOLOGY STACK SPECIFICATION */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-bold text-lg">Technologies Used</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-blue-400 block mb-1">Frontend Layer</span>
            <p className="text-slate-300 text-xs">HTML5, Tailwind CSS, JavaScript / TypeScript, React Canvas Engine</p>
          </div>
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 block mb-1">Computer Vision</span>
            <p className="text-slate-300 text-xs">OpenCV (cv2), Bilateral Filtering, Canny Edge Detection, Contour PolyDP</p>
          </div>
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-purple-400 block mb-1">Machine Learning</span>
            <p className="text-slate-300 text-xs">Scikit-Learn, Random Forest, SVM Classifier, HOG Feature Extraction</p>
          </div>
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 block mb-1">OCR & Backend</span>
            <p className="text-slate-300 text-xs">Tesseract OCR, EasyOCR, Python Flask REST API, Pillow, NumPy</p>
          </div>
        </div>
      </div>

      {/* 15. FUTURE ENHANCEMENTS */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <h3 className="text-white font-bold text-lg">Future Scope & Enhancements</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {[
            {
              title: 'Multiple Vehicle Detection',
              desc: 'Simultaneous detection of multiple vehicles in multi-lane highway camera feeds using YOLOv8.',
            },
            {
              title: 'Automatic Vehicle Tracking',
              desc: 'DeepSORT tracking to maintain consistent vehicle identity across sequential video frames.',
            },
            {
              title: 'Regional RTO Database Sync',
              desc: 'Automatic lookup of registered vehicle owner, insurance status, and emission test validity.',
            },
            {
              title: 'Smart Parking Management',
              desc: 'Automatic gate arm opening, occupancy tracking, and QR/UPI parking fee invoicing.',
            },
            {
              title: 'Stolen Vehicle / Hotlist Alerts',
              desc: 'Instant push notifications to law enforcement when a flagged registration number is spotted.',
            },
            {
              title: 'Night & Rain Robustness',
              desc: 'Infrared (IR) illumination filter and deep super-resolution GANs for degraded weather.',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
              <h5 className="font-bold text-slate-200 mb-1 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>{item.title}</span>
              </h5>
              <p className="text-slate-400 leading-relaxed text-[11px]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini-Project Viva Q&A Guide */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 text-amber-400">
          <HelpCircle className="w-5 h-5" />
          <h3 className="text-white font-bold text-lg">
            College Mini-Project Viva Cheat Sheet
          </h3>
        </div>

        <div className="space-y-3 text-xs">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-1">
            <p className="font-bold text-slate-200">
              Q: What is the advantage of using Bilateral Filtering over Gaussian Blur in plate detection?
            </p>
            <p className="text-slate-400 leading-relaxed">
              <strong>Answer:</strong> Gaussian blur replaces each pixel with a weighted average of neighbors, blurring sharp edges indiscriminately. Bilateral filter accounts for both spatial distance and pixel color differences, preserving high-contrast text edges while eliminating surface grain and road glare.
            </p>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-1">
            <p className="font-bold text-slate-200">
              Q: How does Otsu's thresholding optimize OCR accuracy on cropped plates?
            </p>
            <p className="text-slate-400 leading-relaxed">
              <strong>Answer:</strong> Lighting on license plates varies due to shadows, headlights, and sunshine. Otsu binarization dynamically finds the mathematical threshold that minimizes intra-class variance between dark alphanumeric characters and the reflective background plate without manual tuning.
            </p>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-1">
            <p className="font-bold text-slate-200">
              Q: What role does Scikit-Learn play in this project?
            </p>
            <p className="text-slate-400 leading-relaxed">
              <strong>Answer:</strong> OpenCV localizes candidate bounding boxes based purely on geometric contours, causing false positives on grilles or bumpers. Scikit-Learn extracts feature vectors (aspect ratio, edge density, and vertical stroke alternation) to confirm whether the candidate is a true Number Plate before invoking OCR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
