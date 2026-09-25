import { SampleVehicle } from '../types';

/**
 * Procedurally generates realistic vehicle images with plates onto an HTML Canvas
 * and returns the canvas data URL along with ground-truth coordinates.
 */
export const SAMPLE_VEHICLES: SampleVehicle[] = [
  {
    id: 'car-sedan-tn',
    name: 'Sedan (Tamil Nadu) - TN 38 AB 1234',
    category: 'Car',
    plateNumber: 'TN 38 AB 1234',
    stateCode: 'TN',
    description: 'Clean front-facing white sedan with standard high-security registration plate (HSRP).',
    generator: (ctx, width, height) => {
      // Background gradient (road & daylight)
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#e2e8f0');
      skyGrad.addColorStop(0.5, '#cbd5e1');
      skyGrad.addColorStop(0.52, '#64748b');
      skyGrad.addColorStop(1, '#334155');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Road markings
      ctx.strokeStyle = '#f8fafc';
      ctx.setLineDash([20, 15]);
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(width / 2, height * 0.7);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Sedan Body (White metallic)
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 10;

      // Cabin / Windshield
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(width * 0.28, height * 0.44);
      ctx.lineTo(width * 0.35, height * 0.25);
      ctx.lineTo(width * 0.65, height * 0.25);
      ctx.lineTo(width * 0.72, height * 0.44);
      ctx.closePath();
      ctx.fill();

      // Windshield reflection
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width * 0.38, height * 0.28);
      ctx.lineTo(width * 0.62, height * 0.4);
      ctx.stroke();

      // Main car body
      const bodyGrad = ctx.createLinearGradient(0, height * 0.4, 0, height * 0.75);
      bodyGrad.addColorStop(0, '#f8fafc');
      bodyGrad.addColorStop(0.7, '#e2e8f0');
      bodyGrad.addColorStop(1, '#94a3b8');
      ctx.fillStyle = bodyGrad;

      ctx.beginPath();
      ctx.roundRect(width * 0.18, height * 0.42, width * 0.64, height * 0.34, [24, 24, 8, 8]);
      ctx.fill();

      // Front Radiator Grille
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(width * 0.32, height * 0.5, width * 0.36, height * 0.12, 6);
      ctx.fill();

      // Grille mesh lines
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      for (let x = width * 0.34; x < width * 0.66; x += 12) {
        ctx.beginPath();
        ctx.moveTo(x, height * 0.51);
        ctx.lineTo(x, height * 0.61);
        ctx.stroke();
      }

      // Chrome Emblem on grille
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.55, 9, 0, Math.PI * 2);
      ctx.fill();

      // Headlights (Dual angular LED)
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(width * 0.2, height * 0.48);
      ctx.lineTo(width * 0.3, height * 0.5);
      ctx.lineTo(width * 0.28, height * 0.56);
      ctx.lineTo(width * 0.19, height * 0.53);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(width * 0.8, height * 0.48);
      ctx.lineTo(width * 0.7, height * 0.5);
      ctx.lineTo(width * 0.72, height * 0.56);
      ctx.lineTo(width * 0.81, height * 0.53);
      ctx.closePath();
      ctx.fill();

      // Lower Bumper & Fog lamps
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.roundRect(width * 0.22, height * 0.66, width * 0.56, height * 0.08, 4);
      ctx.fill();

      ctx.restore();

      // NUMBER PLATE REGION
      const plateWidth = Math.round(width * 0.3);
      const plateHeight = Math.round(height * 0.085);
      const plateX = Math.round((width - plateWidth) / 2);
      const plateY = Math.round(height * 0.645);

      // Plate mounting bracket (black border)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(plateX - 3, plateY - 3, plateWidth + 6, plateHeight + 6);

      // High-Security Plate Body (Pure White with subtle bevel)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(plateX, plateY, plateWidth, plateHeight);

      // Blue IND strip on the left
      const indWidth = Math.round(plateWidth * 0.09);
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(plateX, plateY, indWidth, plateHeight);
      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.max(8, Math.round(plateHeight * 0.26))}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('IND', plateX + indWidth / 2, plateY + plateHeight * 0.4);

      // Ashoka Chakra symbol placeholder (yellow dot)
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(plateX + indWidth / 2, plateY + plateHeight * 0.75, indWidth * 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Plate Characters
      ctx.fillStyle = '#111827';
      ctx.font = `900 ${Math.max(14, Math.round(plateHeight * 0.56))}px "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('TN 38 AB 1234', plateX + indWidth + (plateWidth - indWidth) / 2, plateY + plateHeight / 2 + 1);

      return {
        plateBox: { x: plateX, y: plateY, width: plateWidth, height: plateHeight },
        plateNumber: 'TN 38 AB 1234',
      };
    },
  },
  {
    id: 'suv-urban-dl',
    name: 'SUV (Delhi) - DL 01 CA 4521',
    category: 'SUV',
    plateNumber: 'DL 01 CA 4521',
    stateCode: 'DL',
    description: 'Rugged dark grey compact SUV with illuminated grill and high-contrast registration plate.',
    generator: (ctx, width, height) => {
      // Outdoor asphalt backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#94a3b8');
      bgGrad.addColorStop(0.48, '#64748b');
      bgGrad.addColorStop(0.5, '#475569');
      bgGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // SUV Cabin
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(width * 0.24, height * 0.42);
      ctx.lineTo(width * 0.3, height * 0.2);
      ctx.lineTo(width * 0.7, height * 0.2);
      ctx.lineTo(width * 0.76, height * 0.42);
      ctx.closePath();
      ctx.fill();

      // Roof rails
      ctx.fillStyle = '#e2e8f0';
      ctx.fillRect(width * 0.28, height * 0.18, width * 0.44, 4);

      // SUV Tough Body (Dark Metallic Charcoal)
      const bodyGrad = ctx.createLinearGradient(0, height * 0.38, 0, height * 0.76);
      bodyGrad.addColorStop(0, '#334155');
      bodyGrad.addColorStop(0.6, '#1e293b');
      bodyGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bodyGrad;

      ctx.beginPath();
      ctx.roundRect(width * 0.15, height * 0.4, width * 0.7, height * 0.38, [20, 20, 10, 10]);
      ctx.fill();

      // Bold Horizontal Chrome Grille slats
      ctx.fillStyle = '#64748b';
      ctx.fillRect(width * 0.3, height * 0.48, width * 0.4, height * 0.12);
      ctx.fillStyle = '#94a3b8';
      for (let y = height * 0.5; y < height * 0.59; y += 8) {
        ctx.fillRect(width * 0.32, y, width * 0.36, 3);
      }

      // Wide LED DRLs
      ctx.fillStyle = '#67e8f9';
      ctx.fillRect(width * 0.18, height * 0.46, width * 0.1, 8);
      ctx.fillRect(width * 0.72, height * 0.46, width * 0.1, 8);

      // Skid plate (Silver off-road protector)
      ctx.fillStyle = '#94a3b8';
      ctx.beginPath();
      ctx.roundRect(width * 0.28, height * 0.7, width * 0.44, height * 0.08, 6);
      ctx.fill();

      // PLATE
      const plateWidth = Math.round(width * 0.31);
      const plateHeight = Math.round(height * 0.085);
      const plateX = Math.round((width - plateWidth) / 2);
      const plateY = Math.round(height * 0.63);

      ctx.fillStyle = '#09090b';
      ctx.fillRect(plateX - 3, plateY - 3, plateWidth + 6, plateHeight + 6);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(plateX, plateY, plateWidth, plateHeight);

      const indWidth = Math.round(plateWidth * 0.09);
      ctx.fillStyle = '#1d4ed8';
      ctx.fillRect(plateX, plateY, indWidth, plateHeight);

      ctx.fillStyle = '#09090b';
      ctx.font = `900 ${Math.max(14, Math.round(plateHeight * 0.58))}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('DL 01 CA 4521', plateX + indWidth + (plateWidth - indWidth) / 2, plateY + plateHeight / 2);

      return {
        plateBox: { x: plateX, y: plateY, width: plateWidth, height: plateHeight },
        plateNumber: 'DL 01 CA 4521',
      };
    },
  },
  {
    id: 'bike-sport-ka',
    name: 'Motorcycle (Karnataka) - KA 05 MJ 9876',
    category: 'Bike',
    plateNumber: 'KA 05 MJ 9876',
    stateCode: 'KA',
    description: 'Sport motorcycle front mudguard mount with dual-line compact plate.',
    generator: (ctx, width, height) => {
      // Backdrop
      ctx.fillStyle = '#475569';
      ctx.fillRect(0, 0, width, height);

      // Bike Windscreen & Handlebars
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(width * 0.38, height * 0.3);
      ctx.lineTo(width * 0.45, height * 0.16);
      ctx.lineTo(width * 0.55, height * 0.16);
      ctx.lineTo(width * 0.62, height * 0.3);
      ctx.closePath();
      ctx.fill();

      // Handlebar grips
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(width * 0.22, height * 0.28, width * 0.56, 8);
      // Mirrors
      ctx.fillRect(width * 0.2, height * 0.22, 16, 24);
      ctx.fillRect(width * 0.77, height * 0.22, 16, 24);

      // Bike front cowl (Sport red)
      const cowlGrad = ctx.createLinearGradient(0, height * 0.28, 0, height * 0.58);
      cowlGrad.addColorStop(0, '#dc2626');
      cowlGrad.addColorStop(1, '#991b1b');
      ctx.fillStyle = cowlGrad;

      ctx.beginPath();
      ctx.moveTo(width * 0.3, height * 0.32);
      ctx.lineTo(width * 0.5, height * 0.58);
      ctx.lineTo(width * 0.7, height * 0.32);
      ctx.closePath();
      ctx.fill();

      // Headlamp
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(width * 0.5, height * 0.42, 22, 0, Math.PI * 2);
      ctx.fill();

      // Front suspension forks & mudguard
      ctx.fillStyle = '#64748b';
      ctx.fillRect(width * 0.42, height * 0.55, 10, height * 0.35);
      ctx.fillRect(width * 0.56, height * 0.55, 10, height * 0.35);

      // Mudguard
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.ellipse(width * 0.5, height * 0.68, width * 0.14, height * 0.08, 0, 0, Math.PI * 2);
      ctx.fill();

      // BIKE PLATE (Standard two-wheeler front plate)
      const plateWidth = Math.round(width * 0.28);
      const plateHeight = Math.round(height * 0.1);
      const plateX = Math.round((width - plateWidth) / 2);
      const plateY = Math.round(height * 0.72);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(plateX - 2, plateY - 2, plateWidth + 4, plateHeight + 4);

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(plateX, plateY, plateWidth, plateHeight);

      // Plate Text
      ctx.fillStyle = '#09090b';
      ctx.font = `bold ${Math.max(12, Math.round(plateHeight * 0.42))}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('KA 05', plateX + plateWidth / 2, plateY + plateHeight * 0.3);
      ctx.fillText('MJ 9876', plateX + plateWidth / 2, plateY + plateHeight * 0.72);

      return {
        plateBox: { x: plateX, y: plateY, width: plateWidth, height: plateHeight },
        plateNumber: 'KA 05 MJ 9876',
      };
    },
  },
  {
    id: 'commercial-van-mh',
    name: 'Commercial Taxi (Maharashtra) - MH 12 DE 1432',
    category: 'Commercial',
    plateNumber: 'MH 12 DE 1432',
    stateCode: 'MH',
    description: 'Commercial fleet passenger vehicle with standard yellow background registration plate.',
    generator: (ctx, width, height) => {
      // Backdrop
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(0, 0, width, height);

      // Van Body (Silver fleet)
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.roundRect(width * 0.16, height * 0.22, width * 0.68, height * 0.58, [20, 20, 8, 8]);
      ctx.fill();

      // Windshield
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(width * 0.22, height * 0.26, width * 0.56, height * 0.22, 8);
      ctx.fill();

      // Dual Wipers
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(width * 0.35, height * 0.46);
      ctx.lineTo(width * 0.46, height * 0.32);
      ctx.moveTo(width * 0.55, height * 0.46);
      ctx.lineTo(width * 0.66, height * 0.32);
      ctx.stroke();

      // Heavy bumper
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(width * 0.16, height * 0.62, width * 0.68, height * 0.18);

      // Headlamps
      ctx.fillStyle = '#fef08a';
      ctx.fillRect(width * 0.19, height * 0.52, width * 0.11, height * 0.08);
      ctx.fillRect(width * 0.7, height * 0.52, width * 0.11, height * 0.08);

      // COMMERCIAL YELLOW NUMBER PLATE
      const plateWidth = Math.round(width * 0.32);
      const plateHeight = Math.round(height * 0.09);
      const plateX = Math.round((width - plateWidth) / 2);
      const plateY = Math.round(height * 0.66);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(plateX - 3, plateY - 3, plateWidth + 6, plateHeight + 6);

      // Commercial Indian plates are vivid yellow
      ctx.fillStyle = '#facc15';
      ctx.fillRect(plateX, plateY, plateWidth, plateHeight);

      ctx.fillStyle = '#111827';
      ctx.font = `900 ${Math.max(14, Math.round(plateHeight * 0.56))}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('MH 12 DE 1432', plateX + plateWidth / 2, plateY + plateHeight / 2);

      return {
        plateBox: { x: plateX, y: plateY, width: plateWidth, height: plateHeight },
        plateNumber: 'MH 12 DE 1432',
      };
    },
  },
  {
    id: 'challenging-blurry-kl',
    name: 'Challenging / Rain Splash - KL 07 BN 7788',
    category: 'Challenging / Low Contrast',
    plateNumber: 'KL 07 BN 7788',
    stateCode: 'KL',
    description: 'Challenging low-light / rainy night conditions with reflections to test edge detection & noise filtering.',
    generator: (ctx, width, height) => {
      // Dark moody stormy scene
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(0.7, '#1e293b');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Vehicle silhouette
      ctx.fillStyle = '#0b1120';
      ctx.beginPath();
      ctx.roundRect(width * 0.2, height * 0.35, width * 0.6, height * 0.42, 16);
      ctx.fill();

      // Strong headlight flare (challenging lighting)
      const flare1 = ctx.createRadialGradient(width * 0.25, height * 0.5, 5, width * 0.25, height * 0.5, 70);
      flare1.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
      flare1.addColorStop(1, 'rgba(254, 240, 138, 0)');
      ctx.fillStyle = flare1;
      ctx.beginPath();
      ctx.arc(width * 0.25, height * 0.5, 70, 0, Math.PI * 2);
      ctx.fill();

      const flare2 = ctx.createRadialGradient(width * 0.75, height * 0.5, 5, width * 0.75, height * 0.5, 70);
      flare2.addColorStop(0, 'rgba(254, 240, 138, 0.9)');
      flare2.addColorStop(1, 'rgba(254, 240, 138, 0)');
      ctx.fillStyle = flare2;
      ctx.beginPath();
      ctx.arc(width * 0.75, height * 0.5, 70, 0, Math.PI * 2);
      ctx.fill();

      // NUMBER PLATE with subtle rain blur / water streaks
      const plateWidth = Math.round(width * 0.29);
      const plateHeight = Math.round(height * 0.082);
      const plateX = Math.round((width - plateWidth) / 2);
      const plateY = Math.round(height * 0.64);

      ctx.fillStyle = '#020617';
      ctx.fillRect(plateX - 2, plateY - 2, plateWidth + 4, plateHeight + 4);

      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(plateX, plateY, plateWidth, plateHeight);

      // Text
      ctx.fillStyle = '#0f172a';
      ctx.font = `900 ${Math.max(13, Math.round(plateHeight * 0.54))}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('KL 07 BN 7788', plateX + plateWidth / 2, plateY + plateHeight / 2);

      // Rain droplet streaks across screen
      ctx.strokeStyle = 'rgba(255,255,255,0.25)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 40; i++) {
        const rx = (i * 19) % width;
        const ry = (i * 23) % height;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx + 8, ry + 22);
        ctx.stroke();
      }

      return {
        plateBox: { x: plateX, y: plateY, width: plateWidth, height: plateHeight },
        plateNumber: 'KL 07 BN 7788',
      };
    },
  },
];

/**
 * Render a sample vehicle to an image URL
 */
export function renderSampleVehicleToDataUrl(sample: SampleVehicle, width = 640, height = 440): {
  dataUrl: string;
  plateBox: { x: number; y: number; width: number; height: number };
  plateNumber: string;
} {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D context not available');
  }

  const { plateBox, plateNumber } = sample.generator(ctx, width, height);
  return {
    dataUrl: canvas.toDataURL('image/png'),
    plateBox,
    plateNumber,
  };
}
