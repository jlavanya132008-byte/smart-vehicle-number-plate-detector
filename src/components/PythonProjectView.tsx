import React, { useState } from 'react';
import {
  Code2,
  Download,
  Copy,
  Check,
  FolderTree,
  Terminal,
  FileText,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { PYTHON_PROJECT_FILES, ProjectFile } from '../data/pythonProjectFiles';
import { downloadPythonProjectZip } from '../utils/zipExporter';

export const PythonProjectView: React.FC = () => {
  const [activeFile, setActiveFile] = useState<ProjectFile>(PYTHON_PROJECT_FILES[0]);
  const [copied, setCopied] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      await downloadPythonProjectZip();
    } catch (err) {
      console.error('Failed downloading zip:', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div id="python-project-view" className="space-y-6">
      {/* Header with Download Action */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <Code2 className="w-4 h-4" />
            <span>Python Source Code & Submission Kit</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Complete Student Mini-Project Files
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Beginner-friendly, thoroughly commented Python scripts with OpenCV, Scikit-Learn ML classifier,
            Tesseract OCR engine, and Flask server ready for college submission and local execution.
          </p>
        </div>

        <button
          id="download-complete-project-zip-button"
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all flex items-center space-x-2 self-start sm:self-auto flex-shrink-0 active:scale-[0.98]"
        >
          <Download className="w-4 h-4" />
          <span>{isZipping ? 'Generating Zip...' : 'Download Project (.zip)'}</span>
        </button>
      </div>

      {/* Quick Setup Instructions Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-slate-300 font-mono">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>Quick Run in Terminal:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono text-cyan-300">
          <code className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
            pip install -r requirements.txt
          </code>
          <span className="text-slate-600">→</span>
          <code className="bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
            python app.py
          </code>
        </div>
      </div>

      {/* Project Structure & Code Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: File Tree */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
          <div className="flex items-center space-x-2 text-slate-300 font-semibold text-xs border-b border-slate-800 pb-3">
            <FolderTree className="w-4 h-4 text-blue-400" />
            <span>Project Folder Structure</span>
          </div>

          <div className="space-y-1 font-mono text-xs">
            <div className="text-slate-400 px-2 py-1 font-bold flex items-center space-x-1.5">
              <span>📁 vehicle_number_plate_detector/</span>
            </div>

            <div className="pl-3 space-y-1">
              {PYTHON_PROJECT_FILES.map((file) => {
                const isSelected = activeFile.filename === file.filename;
                return (
                  <button
                    key={file.filename}
                    onClick={() => setActiveFile(file)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      {file.language === 'python' ? (
                        <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                      ) : (
                        <FileText className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span className="truncate">{file.filename}</span>
                    </div>

                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded uppercase font-sans ${
                        isSelected ? 'bg-blue-700 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {file.language}
                    </span>
                  </button>
                );
              })}

              <div className="pt-2 text-slate-500 text-[11px] px-2.5 flex items-center space-x-1.5">
                <span>📁 dataset/ (4 test images)</span>
              </div>
            </div>
          </div>

          {/* Description of active file */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-bold text-slate-200">{activeFile.filename}</div>
            <p className="leading-relaxed">{activeFile.description}</p>
          </div>
        </div>

        {/* Right Pane: Code Viewer */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
          {/* File Tab Header */}
          <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 font-mono text-xs text-slate-200">
              <FileCode className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">{activeFile.filename}</span>
              <span className="text-slate-500">
                ({activeFile.content.split('\n').length} lines)
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center space-x-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Syntax Code Box */}
          <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto max-h-[580px] leading-relaxed select-text">
            <pre className="tab-4">
              <code>{activeFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
