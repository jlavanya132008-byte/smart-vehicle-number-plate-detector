import React, { useState } from 'react';
import {
  History,
  Trash2,
  Download,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  ExternalLink,
  Search,
} from 'lucide-react';
import { DetectionResult } from '../types';

interface HistoryViewProps {
  history: DetectionResult[];
  onClearHistory: () => void;
  onSelectResult: (result: DetectionResult) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onClearHistory,
  onSelectResult,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredHistory = history.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.recognizedText.toLowerCase().includes(term) ||
      item.plateStatus.toLowerCase().includes(term) ||
      item.timestamp.toLowerCase().includes(term)
    );
  });

  // Export to CSV
  const handleExportCsv = () => {
    if (history.length === 0) return;

    const headers = [
      'ID',
      'Date & Time',
      'Plate Status',
      'Detected Number',
      'Detection Confidence (%)',
      'OCR Confidence (%)',
      'ML Classification',
      'Processing Time (sec)',
    ];

    const rows = history.map((item) => [
      item.id,
      item.timestamp,
      item.plateStatus,
      `"${item.recognizedText || 'N/A'}"`,
      item.detectionConfidence,
      item.ocrConfidence,
      item.mlClassification.label,
      item.processingTimeSec,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `vehicle_detection_log_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="detection-history-view" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-white font-bold text-lg flex items-center space-x-2">
            <History className="w-5 h-5 text-cyan-400" />
            <span>Vehicle Detection Log & History</span>
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Audit trail of processed vehicle images, localized bounding boxes, and OCR outputs.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {history.length > 0 && (
            <>
              <button
                id="export-history-csv-button"
                onClick={handleExportCsv}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-medium rounded-lg border border-slate-700 transition-colors flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Export CSV</span>
              </button>

              <button
                id="clear-history-button"
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all detection history?')) {
                    onClearHistory();
                  }
                }}
                className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 text-xs font-medium rounded-lg border border-rose-800 transition-colors flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Clear History</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Search & Counter Filter */}
      {history.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by plate number or status..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Showing {filteredHistory.length} of {history.length} records
          </div>
        </div>
      )}

      {/* Table Container */}
      {filteredHistory.length === 0 ? (
        <div className="py-14 text-center space-y-3 bg-slate-950/40 rounded-xl border border-slate-800/80">
          <div className="w-12 h-12 rounded-full bg-slate-800/80 text-slate-500 flex items-center justify-center mx-auto">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <p className="text-slate-300 font-medium text-sm">No detection records found</p>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            {searchTerm
              ? 'No records match your search filter. Try another keyword.'
              : 'Process a vehicle image or run live camera detection to generate log entries.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-3">Vehicle Thumb</th>
                <th className="py-3 px-3">Detected Plate</th>
                <th className="py-3 px-4">Detected Number</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Confidence</th>
                <th className="py-3 px-3">ML Verify</th>
                <th className="py-3 px-3">Speed</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredHistory.map((item) => {
                const isSuccess = item.plateStatus === 'Detected';
                const isOcrFailed = item.plateStatus === 'OCR Failed';

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-850/60 transition-colors cursor-pointer group"
                    onClick={() => onSelectResult(item)}
                  >
                    {/* Timestamp */}
                    <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                      {item.timestamp}
                    </td>

                    {/* Vehicle Thumbnail */}
                    <td className="py-3 px-3">
                      <div className="w-12 h-8 rounded bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
                        <img
                          src={item.vehicleImageUrl}
                          alt="Thumb"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </td>

                    {/* Cropped Plate ROI */}
                    <td className="py-3 px-3">
                      {item.plateCropUrl ? (
                        <div className="w-16 h-6 rounded bg-slate-950 overflow-hidden border border-slate-800 flex items-center justify-center">
                          <img
                            src={item.plateCropUrl}
                            alt="Plate crop"
                            className="max-h-full max-w-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ) : (
                        <span className="text-slate-600 font-mono text-[10px]">None</span>
                      )}
                    </td>

                    {/* Detected Number */}
                    <td className="py-3 px-4">
                      {item.recognizedText ? (
                        <span className="font-mono font-bold text-sm text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap">
                          {item.recognizedText}
                        </span>
                      ) : (
                        <span className="text-slate-500 italic text-[11px]">Unrecognized</span>
                      )}
                    </td>

                    {/* Plate/Result Status */}
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isSuccess
                            ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/50'
                            : isOcrFailed
                            ? 'bg-amber-950/60 text-amber-300 border border-amber-800/50'
                            : 'bg-rose-950/60 text-rose-300 border border-rose-800/50'
                        }`}
                      >
                        {isSuccess ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-amber-400" />
                        )}
                        <span>{item.plateStatus}</span>
                      </span>
                    </td>

                    {/* Confidence */}
                    <td className="py-3 px-3 font-mono text-slate-300">
                      <div>
                        Det: <strong className="text-blue-400">{item.detectionConfidence}%</strong>
                      </div>
                      <div className="text-slate-500 text-[10px]">
                        OCR: <strong className="text-cyan-400">{item.ocrConfidence}%</strong>
                      </div>
                    </td>

                    {/* ML Classification */}
                    <td className="py-3 px-3">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
                          item.mlClassification.isPlate
                            ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.mlClassification.label}
                      </span>
                    </td>

                    {/* Processing Time */}
                    <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">
                      {item.processingTimeSec}s
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectResult(item);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        title="View Full Result"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
