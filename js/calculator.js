/* ==========================================================================
   TOPLAWNCARE247 - INTERACTIVE LAWN CALCULATOR & DIAGNOSTIC ENGINE
   ========================================================================== */

const GRASS_DATABASE = {
  kbg: {
    name: "Kentucky Bluegrass",
    type: "Cool-Season Turf",
    zone: "Northern & Transition Zones",
    mowHeight: "2.5 – 3.5 inches",
    mowFreq: "Every 4 to 6 days in peak growth",
    waterDepth: "1.25 inches / week (2 deep sessions)",
    waterTime: "5:00 AM – 8:30 AM",
    fertilizerRate: "3.5 – 4 lbs N per 1,000 sq ft / yr",
    ratio: "4-1-2 (High Nitrogen in Fall, low summer)",
    threat: "Summer Dormancy & Dollar Spot",
    threatAction: "Apply pre-emergent when soil hits 53°F; core aerate in early September.",
    soilPh: "6.2 – 7.0",
    rootDepth: "4 – 6 inches",
    bestFeature: "Self-repairing rhizomes & rich golf-fairway blue-green color"
  },
  bermuda: {
    name: "Bermuda Grass",
    type: "Warm-Season Turf",
    zone: "Southern & Transition Zones",
    mowHeight: "1.0 – 2.0 inches",
    mowFreq: "Every 3 to 5 days during summer heat",
    waterDepth: "1.0 inch / week (deep infrequent cycle)",
    waterTime: "6:00 AM – 9:00 AM",
    fertilizerRate: "4 – 5 lbs N per 1,000 sq ft / yr",
    ratio: "3-1-2 (Heavy summer feeder)",
    threat: "Crabgrass & Armyworms",
    threatAction: "Scalp in early Spring to remove thatch; apply pre-emergent at 55°F soil temp.",
    soilPh: "6.0 – 7.0",
    rootDepth: "6 – 10 inches (Deep drought resistance)",
    bestFeature: "Virtually indestructible traffic tolerance and aggressive spreading"
  },
  fescue: {
    name: "Tall Fescue",
    type: "Cool-Season Turf",
    zone: "Transition & Mid-Atlantic / Midwest",
    mowHeight: "3.5 – 4.0 inches (Never cut lower)",
    mowFreq: "Every 5 to 7 days",
    waterDepth: "1.25 inches / week in summer",
    waterTime: "5:30 AM – 8:30 AM",
    fertilizerRate: "2.5 – 3.5 lbs N per 1,000 sq ft / yr",
    ratio: "3-1-2 (Feed 70% in Autumn)",
    threat: "Brown Patch Fungus in humid July nights",
    threatAction: "Annual overseeding every September; avoid evening sprinkler sessions.",
    soilPh: "5.8 – 6.8",
    rootDepth: "8 – 12 inches (Deepest cool-season roots)",
    bestFeature: "Remarkable heat tolerance and lush deep green bunch blades"
  },
  staugustine: {
    name: "St. Augustine",
    type: "Warm-Season Turf",
    zone: "Deep South, Florida & Gulf Coast",
    mowHeight: "3.5 – 4.0 inches",
    mowFreq: "Every 5 to 7 days in summer",
    waterDepth: "1.0 inch / week when blades fold",
    waterTime: "6:00 AM – 8:30 AM",
    fertilizerRate: "3 – 4 lbs N per 1,000 sq ft / yr",
    ratio: "4-1-2 with micronutrient Iron",
    threat: "Chinch Bugs & Take-All Root Rot",
    threatAction: "Avoid 2,4-D herbicides; apply systemic insecticide in June.",
    soilPh: "6.0 – 7.5",
    rootDepth: "5 – 7 inches",
    bestFeature: "Superior tropical shade performance and broad emerald foliage"
  },
  zoysia: {
    name: "Zoysia Grass",
    type: "Warm-Season Turf",
    zone: "Transition & Southern Zones",
    mowHeight: "1.5 – 2.5 inches",
    mowFreq: "Every 6 to 9 days (Slow growing)",
    waterDepth: "0.75 – 1.0 inch / week",
    waterTime: "6:00 AM – 9:00 AM",
    fertilizerRate: "1.5 – 2.5 lbs N per 1,000 sq ft / yr",
    ratio: "2-1-2 or 3-1-2 (Light feeder)",
    threat: "Large Patch (Rhizoctonia) in cool wet spring",
    threatAction: "Keep fertilizer light; aerate in late spring during active shoot growth.",
    soilPh: "6.0 – 7.0",
    rootDepth: "6 – 8 inches",
    bestFeature: "Dense, barefoot carpet that naturally chokes out 95% of weed seeds"
  },
  rye: {
    name: "Perennial Ryegrass",
    type: "Cool-Season Turf",
    zone: "Pacific NW, Northeast & Winter Overseed",
    mowHeight: "2.0 – 3.0 inches",
    mowFreq: "Every 4 to 5 days",
    waterDepth: "1.25 – 1.5 inches / week",
    waterTime: "5:00 AM – 8:00 AM",
    fertilizerRate: "3 – 4 lbs N per 1,000 sq ft / yr",
    ratio: "3-1-2 or 4-1-2 balanced",
    threat: "Summer heat collapse & Gray Leaf Spot",
    threatAction: "Provide afternoon shade relief; germinates in just 4 to 7 days.",
    soilPh: "6.0 – 7.0",
    rootDepth: "4 – 5 inches",
    bestFeature: "Highest shine and crispest mower stripes in the lawn care world"
  }
};

export function initLawnCalculator() {
  const grassButtons = document.querySelectorAll('.grass-chip-btn');
  const yardSlider = document.getElementById('yardSizeRange');
  const yardDisplay = document.getElementById('yardSizeDisplay');
  const sunButtons = document.querySelectorAll('.pill-option-btn');
  
  // Results Elements
  const resBadge = document.getElementById('resTypeBadge');
  const resTitle = document.getElementById('resGrassTitle');
  const resZone = document.getElementById('resZone');
  const resMow = document.getElementById('resMowHeight');
  const resWater = document.getElementById('resWater');
  const resFert = document.getElementById('resFertilizer');
  const resThreatTitle = document.getElementById('resThreatTitle');
  const resThreatText = document.getElementById('resThreatText');
  const resFeature = document.getElementById('resFeature');
  const resSeedEstimate = document.getElementById('resSeedEstimate');

  if (!grassButtons.length || !yardSlider) return;

  let currentGrass = 'fescue';
  let yardSqFt = parseInt(yardSlider.value, 10) || 5000;
  let sunLevel = 'full';

  function updatePrescription() {
    const data = GRASS_DATABASE[currentGrass];
    if (!data) return;

    if (resBadge) resBadge.textContent = data.type;
    if (resTitle) resTitle.textContent = data.name;
    if (resZone) resZone.textContent = data.zone;
    if (resMow) resMow.textContent = data.mowHeight;
    if (resWater) resWater.textContent = data.waterDepth;
    if (resFert) resFert.textContent = data.fertilizerRate;
    if (resThreatTitle) resThreatTitle.textContent = `Warning: ${data.threat}`;
    if (resThreatText) resThreatText.textContent = data.threatAction;
    if (resFeature) resFeature.textContent = data.bestFeature;

    // Calculate approximate seed requirement for yard size
    const seedPer1000 = currentGrass === 'fescue' ? 7 : (currentGrass === 'kbg' ? 3 : 5);
    const totalSeed = Math.round((yardSqFt / 1000) * seedPer1000);
    const weeklyGallons = Math.round((yardSqFt * 0.623 * 1.25)); // 1.25 in water = ~0.77 gal/sq ft
    
    if (resSeedEstimate) {
      resSeedEstimate.innerHTML = `<strong>Yard Size:</strong> ${yardSqFt.toLocaleString()} sq ft • <strong>Seasonal Seed:</strong> ~${totalSeed} lbs • <strong>Irrigation:</strong> ~${weeklyGallons.toLocaleString()} gal/wk`;
    }
  }

  // Grass button click handlers
  grassButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      grassButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGrass = btn.dataset.grass || 'fescue';
      updatePrescription();
    });
  });

  // Yard slider handler
  yardSlider.addEventListener('input', (e) => {
    yardSqFt = parseInt(e.target.value, 10);
    if (yardDisplay) yardDisplay.textContent = `${yardSqFt.toLocaleString()} sq ft`;
    updatePrescription();
  });

  // Sun level buttons
  sunButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sunButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sunLevel = btn.dataset.sun || 'full';
      updatePrescription();
    });
  });

  // Initial calculation
  updatePrescription();
}
