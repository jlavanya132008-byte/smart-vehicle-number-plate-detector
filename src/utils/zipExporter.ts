import JSZip from 'jszip';
import { PYTHON_PROJECT_FILES } from '../data/pythonProjectFiles';
import { SAMPLE_VEHICLES, renderSampleVehicleToDataUrl } from './sampleVehicles';

/**
 * Packages all Python code, requirements.txt, README.md,
 * and sample vehicle dataset images into a zip file for student download.
 */
export async function downloadPythonProjectZip(): Promise<void> {
  const zip = new JSZip();
  const rootFolder = zip.folder('vehicle_number_plate_detector');
  if (!rootFolder) return;

  // Add all code files
  for (const file of PYTHON_PROJECT_FILES) {
    rootFolder.file(file.filename, file.content);
  }

  // Add dataset folder with sample vehicle images
  const datasetFolder = rootFolder.folder('dataset');
  if (datasetFolder) {
    for (const sample of SAMPLE_VEHICLES) {
      try {
        const { dataUrl } = renderSampleVehicleToDataUrl(sample, 640, 440);
        // Extract base64 data
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        datasetFolder.file(`${sample.id}.png`, base64Data, { base64: true });
      } catch (err) {
        console.error('Failed adding sample image to zip:', err);
      }
    }
  }

  // Generate zip file and trigger browser download
  const blob = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'vehicle_number_plate_detector_python_project.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
