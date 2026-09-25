import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileImage,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Car,
  CheckCircle2,
} from 'lucide-react';
import { SAMPLE_VEHICLES, renderSampleVehicleToDataUrl } from '../utils/sampleVehicles';
import { SampleVehicle } from '../types';

interface ImageUploadCardProps {
  onImageSelected: (
    imageDataUrl: string,
    knownPlateText?: string,
    knownBoxHint?: { x: number; y: number; width: number; height: number }
  ) => void;
  onDetectClicked: () => void;
  selectedImageDataUrl: string | null;
  isProcessing: boolean;
  processingStepLabel: string;
}

export const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  onImageSelected,
  onDetectClicked,
  selectedImageDataUrl,
  isProcessing,
  processingStepLabel,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('car-sedan-tn');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Drag & Drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    setErrorMessage(null);
    // Validate file type (JPG, JPEG, PNG)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid file format. Please upload a JPG, JPEG, or PNG image.');
      return;
    }

    // Limit size to 10MB
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('File size too large. Please select an image under 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setSelectedSampleId('');
        onImageSelected(event.target.result as string);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read uploaded image. Please try another file.');
    };
    reader.readAsDataURL(file);
  };

  // Load Sample Vehicle
  const handleSelectSample = (sample: SampleVehicle) => {
    setErrorMessage(null);
    setSelectedSampleId(sample.id);
    try {
      const { dataUrl, plateBox, plateNumber } = renderSampleVehicleToDataUrl(sample, 640, 440);
      onImageSelected(dataUrl, plateNumber, plateBox);
    } catch (err) {
      console.error('Failed rendering sample vehicle', err);
    }
  };

  return (
    <div id="image-upload-card" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center space-x-2">
            <FileImage className="w-5 h-5 text-blue-400" />
            <span>Select or Upload Vehicle Image</span>
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Upload vehicle photo (JPG, JPEG, PNG) or choose from preset college demonstration samples.
          </p>
        </div>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="self-start sm:self-auto px-3.5 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center space-x-1.5"
        >
          <UploadCloud className="w-4 h-4 text-blue-400" />
          <span>Browse Device</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
          id="vehicle-image-file-input"
        />
      </div>

      {/* Preset Demo Vehicles Carousel (Requirement 13) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-300 font-medium flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick Demo Vehicles (Click to test instantly):</span>
          </span>
          <span className="text-slate-500 font-mono text-[11px]">
            {SAMPLE_VEHICLES.length} available presets
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SAMPLE_VEHICLES.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                id={`sample-preset-${sample.id}`}
                onClick={() => handleSelectSample(sample)}
                className={`p-2 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-blue-950/60 border-blue-500 ring-1 ring-blue-500 shadow-md'
                    : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono">
                      {sample.category}
                    </span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-1 truncate">
                    {sample.plateNumber}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-1">
                  {sample.name.split(' - ')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Drag & Drop or Preview Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !selectedImageDataUrl && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl transition-all cursor-pointer overflow-hidden ${
          dragActive
            ? 'border-blue-500 bg-blue-950/30'
            : selectedImageDataUrl
            ? 'border-slate-700 bg-slate-950'
            : 'border-slate-700 hover:border-slate-600 bg-slate-950/60 hover:bg-slate-950'
        }`}
      >
        {selectedImageDataUrl ? (
          <div className="p-3 flex flex-col items-center justify-center relative group min-h-[220px]">
            <img
              src={selectedImageDataUrl}
              alt="Selected vehicle"
              className="max-h-56 max-w-full object-contain rounded-lg shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 right-3 bg-slate-900/80 text-slate-300 text-[11px] font-mono px-2 py-1 rounded border border-slate-700 backdrop-blur-sm flex items-center space-x-1">
              <Car className="w-3 h-3 text-cyan-400" />
              <span>Input Ready</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="mt-3 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-600 transition-colors"
            >
              Replace Image
            </button>
          </div>
        ) : (
          <div className="py-12 px-6 flex flex-col items-center justify-center text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">
                Drop your vehicle image here, or{' '}
                <span className="text-blue-400 underline">browse files</span>
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Supports JPG, JPEG, and PNG up to 10MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error notification if any */}
      {errorMessage && (
        <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Action Button: Detect Number Plate */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          id="detect-number-plate-button"
          onClick={onDetectClicked}
          disabled={!selectedImageDataUrl || isProcessing}
          className={`w-full sm:w-auto flex-1 py-3 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center space-x-2 transition-all shadow-lg ${
            !selectedImageDataUrl || isProcessing
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 active:scale-[0.99]'
          }`}
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin text-cyan-300" />
              <span>{processingStepLabel || 'Running OpenCV & OCR Pipeline...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-cyan-300" />
              <span>Detect Number Plate</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
