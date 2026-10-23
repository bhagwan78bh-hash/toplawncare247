/**
 * Gardencare247 — Essential Garden Tools & Practical Care
 * Client Application Logic & Local Data Store
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. SVG Category & Tool Icon Helpers (Clean, Professional Vector Graphics)
  // =========================================================================
  function getCategorySvg(category) {
    switch (category) {
      case 'digging':
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22l8-8"/><path d="M9 13l3.5-3.5a5 5 0 0 1 7 7L16 20l-7-7z"/></svg>`;
      case 'pruning':
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg>`;
      case 'weeding':
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12"/><path d="M12 6v6l4 2"/><path d="M4 17l4-4"/></svg>`;
      case 'watering':
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`;
      case 'protection':
      default:
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
    }
  }

  // =========================================================================
  // 2. Core Tool Database (24 Field-Tested Implements)
  // =========================================================================
  const TOOLS_DATA = [
    // Digging & Soil Preparation
    {
      id: 'tool-trowel',
      name: 'Forged Solid-Socket Hand Trowel',
      category: 'digging',
      categoryLabel: 'Digging & Soil Prep',
      steel: 'Tempered Boron Steel (50 HRC)',
      handle: 'FSC European Ash Hardwood',
      durability: 9.8,
      ergoScore: '5 / 5',
      brief: 'The primary hand implement for potting, trenching bulbs, and transplanting seedlings without wrist strain.',
      deepDesc: 'Forged from a single ingot of boron steel with no weld at the neck—the classic failure point in cheap retail trowels. Its dished blade holds potting soil securely while the sharpened bevel cuts through compacted loam and clay.',
      proTip: 'Sharpen the outer edges of the trowel blade with a mill bastard file once a season so it slices through soil with minimal effort.',
      careNotes: 'Rinse off clay after use, dry thoroughly with an old towel, and apply a light wipe of boiled linseed or camellia oil.',
      priority: 10
    },
    {
      id: 'tool-hori-hori',
      name: 'Japanese Hori-Hori Soil Knife',
      category: 'digging',
      categoryLabel: 'Digging & Soil Prep',
      steel: 'High-Carbon SK-5 Steel (58 HRC)',
      handle: 'Oiled Japanese White Oak',
      durability: 9.9,
      ergoScore: '4.8 / 5',
      brief: 'A versatile hybrid tool with a straight razor edge, root-cutting serrations, and engraved inch depth markings.',
      deepDesc: 'Literally translating to "dig-dig", the Hori-Hori functions as a trowel, dandelion taproot extractor, root saw, twine slicer, and bulb depth gauge. Its semi-concave profile gives immense leverage when prying up stubborn rocks or perennial root clumps.',
      proTip: 'Use the serrated edge on the pull stroke to slice through tough tree roots that obstruct your planting holes.',
      careNotes: 'Wipe with 70% alcohol after cutting diseased roots; keep lightly oiled in its leather sheath.',
      priority: 9
    },
    {
      id: 'tool-garden-spade',
      name: 'Forged English Border Spade',
      category: 'digging',
      categoryLabel: 'Digging & Soil Prep',
      steel: 'Drop-Forged Carbon Manganese Steel',
      handle: 'Solid Ash with Riveted YD-Grip',
      durability: 9.7,
      ergoScore: '4.9 / 5',
      brief: 'Flat-faced spade engineered for trenching, bed edging, dividing hostas, and slicing sod cleanly.',
      deepDesc: 'Unlike curved shovels designed for loose scoops, a border spade features a flat, perpendicular blade that slices clean vertical trench walls. The forged socket extends up the handle for maximum pry leverage without bending.',
      proTip: 'Step on the treaded shoulder with your midfoot, not your arch, keeping your spine straight and using body weight rather than lower back muscle.',
      careNotes: 'File the bottom edge to a single 45-degree bevel; never sharpen the back face.',
      priority: 8
    },
    {
      id: 'tool-garden-fork',
      name: 'Square-Tine Digging Fork',
      category: 'digging',
      categoryLabel: 'Digging & Soil Prep',
      steel: 'Forged High-Tensile Steel',
      handle: 'FSC Split-Crotch Ash Wood',
      durability: 9.6,
      ergoScore: '4.7 / 5',
      brief: 'Invaluable for aerating compacted clay, turning compost, and lifting root vegetables intact.',
      deepDesc: 'Solid square tines slip effortlessly between rocks and compacted soil layers where a solid spade would glance off. It harvests potatoes and carrots without slicing through them.',
      proTip: 'Insert the fork vertically behind root crops and rock the handle backward to pop the vegetable up gently.',
      careNotes: 'Clean mud between tines with a stiff brass bristle brush before hanging.',
      priority: 7
    },

    // Pruning & Cutting
    {
      id: 'tool-bypass-pruner',
      name: 'Ergonomic Bypass Pruning Shears',
      category: 'pruning',
      categoryLabel: 'Pruning & Cutting',
      steel: 'Japanese High-Carbon SK-5 (59 HRC)',
      handle: 'Forged Aluminum with Non-Slip Cushion',
      durability: 9.9,
      ergoScore: '5 / 5',
      brief: 'The cornerstone of any garden kit. Delivers surgical scissor cuts on green live stems up to 3/4 inch.',
      deepDesc: 'Features a precision-ground upper cutting blade that glides against a heavy hooked anvil counter-blade. This scissor action cleanly cuts vascular plant stems without crushing bark, allowing plants to heal swiftly and repel fungal spores.',
      proTip: 'Always prune with the cutting blade on the side of the branch you are keeping, so any minor counter-pressure bruising stays on the discarded wood.',
      careNotes: 'Disassemble yearly to clean pivot bolt; hone the 20-degree bevel using a fine diamond paddle.',
      priority: 10
    },
    {
      id: 'tool-pruning-saw',
      name: 'Tri-Edge Japanese Folding Pruning Saw',
      category: 'pruning',
      categoryLabel: 'Pruning & Cutting',
      steel: 'Impulse-Hardened Carbon Steel',
      handle: 'Rubberized Textured Ergonomic Grip',
      durability: 9.5,
      ergoScore: '4.8 / 5',
      brief: 'Cuts through branches from 1 to 4 inches with zero effort using a fast Japanese pull-stroke action.',
      deepDesc: 'Traditional Western saws cut on the push stroke, which causes thin blades to buckle and bind. This Japanese saw cuts on the pull stroke, allowing the blade to remain ultra-thin and razor-sharp for glass-smooth cuts that require no branch sealant.',
      proTip: 'Let the weight of the saw do the work on the pull stroke; pushing hard creates friction and tires your arm.',
      careNotes: 'Clean pitch and resin buildup using citrus solvent or isopropyl alcohol; fold lock closed when storing.',
      priority: 8
    },
    {
      id: 'tool-anvil-loppers',
      name: 'Compound-Action Bypass Loppers (28-inch)',
      category: 'pruning',
      categoryLabel: 'Pruning & Cutting',
      steel: 'Heat-Treated Cr-Mo Carbon Steel',
      handle: 'Tubular High-Strength Aluminum',
      durability: 9.4,
      ergoScore: '4.6 / 5',
      brief: 'Provides tremendous mechanical leverage to slice woody branches up to 1.75 inches in diameter.',
      deepDesc: 'Long handles and an integrated compound pivot gearing mechanism multiply hand force four-fold. Ideal for pruning fruit trees, dormant shrubs, and thick brambles beyond the capacity of hand shears.',
      proTip: 'Position the branch as deep into the throat of the lopper blades as possible for maximum shearing leverage.',
      careNotes: 'Lubricate the compound pivot gear every season with silicone or mineral grease.',
      priority: 7
    },
    {
      id: 'tool-micro-snips',
      name: 'Needle-Nose Precision Floral Snips',
      category: 'pruning',
      categoryLabel: 'Pruning & Cutting',
      steel: 'Surgical Grade Stainless Steel (420J2)',
      handle: 'Lightweight Thermoplastic Soft-Grip',
      durability: 9.0,
      ergoScore: '5 / 5',
      brief: 'Agile snips for deadheading flowers, harvesting delicate basil or cherry tomatoes, and micro-trimming.',
      deepDesc: 'Engineered for close-quarter work inside dense foliage where heavy pruners would accidentally snip adjacent flowering stems. A gentle return spring prevents hand strain during long harvesting sessions.',
      proTip: 'Keep a holster on your belt for deadheading during daily morning garden strolls.',
      careNotes: 'Sanitize tips with alcohol between tomato plants to prevent mosaic virus transmission.',
      priority: 6
    },

    // Weeding & Cultivation
    {
      id: 'tool-cape-cod-weeder',
      name: 'Hand-Forged Cape Cod Weeder',
      category: 'weeding',
      categoryLabel: 'Weeding & Aeration',
      steel: 'Hardened Spring Steel (52 HRC)',
      handle: 'Turned Beechwood with Brass Ferrule',
      durability: 9.7,
      ergoScore: '4.9 / 5',
      brief: 'Slices weeds right beneath the soil line with a graceful horizontal scraping motion.',
      deepDesc: 'An heirloom design originating in 19th-century New England. Its narrow right-angle blade slides underneath gravel, mulch, or dense perennial foliage to sever weed roots without disturbing soil biology or dormant weed seeds below.',
      proTip: 'Pull the blade toward you about 1/2 inch below soil surface; weeds simply roll over and wilt.',
      careNotes: 'Hone the leading edge with a diamond file; wipe with an oiled cloth.',
      priority: 9
    },
    {
      id: 'tool-oscillating-hoe',
      name: 'Stirrup / Oscillating Hoe (Hula Hoe)',
      category: 'weeding',
      categoryLabel: 'Weeding & Aeration',
      steel: 'High-Carbon Double-Beveled Spring Steel',
      handle: '60-inch North American White Ash',
      durability: 9.6,
      ergoScore: '5 / 5',
      brief: 'Clears entire rows of emerging weeds in minutes from a comfortable upright standing position.',
      deepDesc: 'The hinged blade rocks back and forth, cutting weeds on both the push and pull strokes just below the soil surface. Allows gardeners with lower back pain to cultivate large vegetable beds without kneeling.',
      proTip: 'Best used on sunny mornings when weeds are young (thread stage); severed weeds dry in the sun and die within hours.',
      careNotes: 'Tighten the side pivot bolts if blade play becomes loose; sharpen both leading and trailing edges.',
      priority: 8
    },
    {
      id: 'tool-dandelion-digger',
      name: 'Fishtail Deep Taproot Weeder',
      category: 'weeding',
      categoryLabel: 'Weeding & Aeration',
      steel: 'Tempered Forged Steel with Fulcrum Curve',
      handle: 'Solid Ergonomic Hardwood',
      durability: 9.3,
      ergoScore: '4.6 / 5',
      brief: 'Notches around deep taproots (dandelions, thistles, docks) and levers them out whole without snapping.',
      deepDesc: 'Features a forked notched tip and a curved metal rocker fulcrum. By sliding the tip down the taproot and pushing the handle down, the fulcrum uses physics to pop the root out cleanly.',
      proTip: 'Weed after heavy rain when the soil is damp and pliable for 100% root extraction.',
      careNotes: 'Rinse off clay soil and store indoors to avoid rust.',
      priority: 7
    },
    {
      id: 'tool-hand-cultivator',
      name: '3-Prong Hand Claw Cultivator',
      category: 'weeding',
      categoryLabel: 'Weeding & Aeration',
      steel: 'One-Piece Forged Alloy Steel',
      handle: 'Comfort Contour Beechwood',
      durability: 9.5,
      ergoScore: '4.7 / 5',
      brief: 'Breaks crusted topsoil, incorporates granular compost, and aerates around delicate roots.',
      deepDesc: 'Curved bird-claw tines scratch the top 2 inches of soil, breaking crust formed by sun and overhead watering to permit oxygen and moisture penetration.',
      proTip: 'Use before side-dressing tomato plants with organic compost to gently mix amendments into topsoil.',
      careNotes: 'Remove trapped roots from tines; wipe clean before hanging.',
      priority: 6
    },

    // Watering & Hydration
    {
      id: 'tool-brass-nozzle',
      name: 'Machined Heavy Solid-Brass Twist Nozzle',
      category: 'watering',
      categoryLabel: 'Hydration & Testing',
      steel: 'Solid Forged C36000 Brass Alloy',
      handle: 'Knurled Non-Slip Solid Grip',
      durability: 9.9,
      ergoScore: '4.8 / 5',
      brief: 'Virtually indestructible hose nozzle that transitions from delicate seedling mist to high-pressure wash.',
      deepDesc: 'Plastic multi-dial sprayers leak and crack after one winter freeze. This solid brass nozzle contains no breakable gears or brittle plastic triggers, surviving being stepped on or dropped on concrete for decades.',
      proTip: 'Pair with heavy-duty EPDM rubber O-rings (Viton) to ensure 100% drip-free water conservation.',
      careNotes: 'Store in shed during hard winter freezes to protect internal rubber seal.',
      priority: 9
    },
    {
      id: 'tool-watering-can',
      name: 'Galvanized Steel Traditional Watering Can (2-Gal)',
      category: 'watering',
      categoryLabel: 'Hydration & Testing',
      steel: 'Hot-Dip Galvanized Zinc Steel',
      handle: 'Dual Rolled Steel Carry & Pour Handles',
      durability: 9.8,
      ergoScore: '4.9 / 5',
      brief: 'Balanced dual-handle can with a gentle brass rose for delicate seedlings and raised beds.',
      deepDesc: 'Hot-dip galvanizing bonds molten zinc to steel, making it completely rustproof for 30+ years. The curved upper handle allows seamless balance transition as the water volume empties.',
      proTip: 'Turn the brass rose face up for a soft rainfall drizzle over newly sown micro-seeds.',
      careNotes: 'Empty completely before sub-zero winter temperatures to prevent ice expansion damage.',
      priority: 8
    },
    {
      id: 'tool-soil-tester',
      name: 'Precision 3-in-1 Soil Moisture, pH & Lux Meter',
      category: 'watering',
      categoryLabel: 'Hydration & Testing',
      steel: 'Dual Copper & Aluminum Probe Sensors',
      handle: 'High-Impact ABS Sensor Housing',
      durability: 8.9,
      ergoScore: '4.9 / 5',
      brief: 'Battery-free galvanic sensor showing moisture depth at the root zone to prevent overwatering.',
      deepDesc: 'Most container plants die of root rot from overwatering rather than drought. This meter checks deep 6-8 inch root zones instantly without guessing or disturbing roots.',
      proTip: 'Wipe probes with a clean scouring pad before and after testing to remove soil oxidation.',
      careNotes: 'Do not leave permanently submerged in soil; remove immediately after reading.',
      priority: 7
    },
    {
      id: 'tool-soaker-hose',
      name: 'Heavy-Duty Recycled Rubber Soaker Hose',
      category: 'watering',
      categoryLabel: 'Hydration & Testing',
      steel: 'Machined Brass End Fittings',
      handle: 'Microporous Heavy-Wall Rubber',
      durability: 9.1,
      ergoScore: '4.5 / 5',
      brief: 'Delivers water directly to plant roots at ground level, reducing evaporation loss by 70%.',
      deepDesc: 'Weeps water along its entire length. Prevents foliage splashing, which is the primary vector for fungal blight in tomatoes, squash, and roses.',
      proTip: 'Bury beneath 2 inches of cedar or bark mulch to prevent UV breakdown and direct water straight to soil.',
      careNotes: 'Drain and roll loosely for winter storage.',
      priority: 7
    },

    // Protection & Transport
    {
      id: 'tool-gloves',
      name: 'Puncture-Resistant Full-Grain Goatskin Gauntlets',
      category: 'protection',
      categoryLabel: 'Protection & Hauling',
      steel: 'Reinforced Kevlar Stitching',
      handle: 'Supple Full-Grain Goatskin Leather + Cowhide Cuff',
      durability: 9.5,
      ergoScore: '5 / 5',
      brief: 'Unrivaled puncture resistance against thorns, nettles, and briars with tactile fingertip dexterity.',
      deepDesc: 'Goatskin contains natural lanolin, making it significantly more pliable and tear-resistant than cowhide. The extended suede cowhide forearm sleeve protects wrists and arms from rose thorns and poison ivy.',
      proTip: 'If gloves become stiff after mud exposure, rub with a dab of leather balm or saddle soap while wearing them.',
      careNotes: 'Air dry away from direct heaters; do not wash with harsh detergents.',
      priority: 10
    },
    {
      id: 'tool-kneeler',
      name: 'High-Density Dual-Foam Garden Kneeler Pad',
      category: 'protection',
      categoryLabel: 'Protection & Hauling',
      steel: 'Waterproof Neoprene Ripstop Coating',
      handle: 'Die-Cut Integrated Carry Handle',
      durability: 9.4,
      ergoScore: '5 / 5',
      brief: '1.5-inch layered memory and EVA foam protecting knees from gravel, sharp mulch, and damp ground.',
      deepDesc: 'Engineered with shock-absorbing inner memory foam sandwiched between closed-cell EVA foam. Will not compress flat or absorb water over years of heavy use on rough rocks.',
      proTip: 'Also doubles as a dry comfortable seat cushion when taking breaks on stone garden walls.',
      careNotes: 'Hose off mud with water; wipe dry.',
      priority: 9
    },
    {
      id: 'tool-wheelbarrow',
      name: 'Dual-Wheel Utility Garden Cart (400 lb)',
      category: 'protection',
      categoryLabel: 'Protection & Hauling',
      steel: 'Powder-Coated Steel Frame & Axle',
      handle: 'Padded Foam Pull / Push Loop Handle',
      durability: 9.6,
      ergoScore: '4.9 / 5',
      brief: 'Balanced dual-wheel design that eliminates tip-overs when hauling heavy compost, rocks, and soil.',
      deepDesc: 'Traditional single-wheel wheelbarrows easily tip over on uneven garden ground, spilling contents and twisting shoulders. This low-center-of-gravity cart rolls effortlessly over damp lawns.',
      proTip: 'Equipped with pneumatic wheels; check tire PSI in spring to ensure effortless rolling.',
      careNotes: 'Hose out acidic compost residues after use; park under cover.',
      priority: 8
    },
    {
      id: 'tool-sharpening-stone',
      name: 'Dual-Grit Diamond Honing Paddle (400/1000)',
      category: 'protection',
      categoryLabel: 'Protection & Hauling',
      steel: 'Monocrystalline Diamond on Solid Steel Core',
      handle: 'Contoured Non-Slip Handle with Hanging Loop',
      durability: 9.7,
      ergoScore: '4.8 / 5',
      brief: 'Fast-cutting diamond hone that sharpens hard SK5 pruner steel without water or messy oils.',
      deepDesc: 'Slender paddle slips between assembled pruner blades without taking the tool apart. 400-grit coarse side fixes nicked edges in seconds; 1000-grit side polishes to razor keenness.',
      proTip: 'Always hone with light, even strokes in one direction following the factory 20-degree bevel.',
      careNotes: 'Brush away metal dust with an old toothbrush; store in tool pouch.',
      priority: 9
    },
    {
      id: 'tool-leaf-rake',
      name: 'Expandable Spring-Steel Lawn & Shrub Rake',
      category: 'weeding',
      categoryLabel: 'Weeding & Aeration',
      steel: 'Tempered Spring Steel Flat Tines',
      handle: 'Telescopic Anodized Aluminum',
      durability: 9.3,
      ergoScore: '4.7 / 5',
      brief: 'Adjustable head width (7 to 22 inches) transforms from wide lawn raking to narrow shrub clearing.',
      deepDesc: 'Spring steel tines glide through mulch without snagging perennial crowns. Lock the collar to 7 inches to reach between delicate perennials and fences.',
      proTip: 'Keep head compact when raking inside raised garden beds to avoid uprooting vegetable plants.',
      careNotes: 'Hang horizontally to avoid bending flexible tines.',
      priority: 6
    },
    {
      id: 'tool-broadfork',
      name: 'Deep-Aerating 5-Tine Broadfork (U-Bar)',
      category: 'digging',
      categoryLabel: 'Digging & Soil Prep',
      steel: 'Heavy-Duty Solid Laser-Cut Steel Tines',
      handle: 'Twin Ash Wood Staves (48-inch)',
      durability: 9.9,
      ergoScore: '4.8 / 5',
      brief: 'The no-till master tool for opening compacted soil 12 inches deep without inverting biological horizons.',
      deepDesc: 'Traditional rototillers pulverize soil structure and chop up beneficial earthworms. The broadfork fractures hardpan clay using body leverage while keeping delicate mycorrhizal networks intact.',
      proTip: 'Step onto the crossbar with both feet, rock the handles backward slightly, and step back. Never fully invert.',
      careNotes: 'Check handle bolts periodically; store upright against shed wall.',
      priority: 7
    },
    {
      id: 'tool-harvest-basket',
      name: 'Traditional Wire & Cedar Garden Hod',
      category: 'protection',
      categoryLabel: 'Protection & Hauling',
      steel: 'Vinyl-Coated Woven Mesh Wire',
      handle: 'Steam-Bent Solid Pine & Cedar Frame',
      durability: 9.4,
      ergoScore: '4.9 / 5',
      brief: 'Harvest vegetables directly into the hod and hose them off outside before bringing them into the kitchen.',
      deepDesc: 'Originally used by Maine clam diggers, the mesh wire allows loose garden mud to wash right through while protecting tomatoes, squash, and lettuce from bruising.',
      proTip: 'Place a damp tea towel over harvested greens to keep them crisp in hot afternoon sun.',
      careNotes: 'Allow cedar wood to dry in shade; wipe wire mesh.',
      priority: 7
    },
    {
      id: 'tool-camellia-oil',
      name: 'Pure Japanese Camellia Blade Oil (Kurobara)',
      category: 'protection',
      categoryLabel: 'Protection & Hauling',
      steel: '100% Pure Non-Drying Botanical Camellia Oleifera',
      handle: 'Precision Needle-Dropper Dispenser',
      durability: 10,
      ergoScore: '5 / 5',
      brief: 'The botanical preservative that shields high-carbon pruning steel from moisture and corrosion.',
      deepDesc: 'Unlike synthetic petroleum lubricants, organic camellia oil is non-toxic, odorless, non-gumming, and completely safe for edible vegetable gardens. Forms a lasting invisible rust barrier.',
      proTip: 'Apply 2 drops after every sharpening session; spread with a dedicated lint-free cotton cloth.',
      careNotes: 'Keep cap tightly sealed in cool, dry tool cabinet.',
      priority: 9
    }
  ];

  // =========================================================================
  // 3. State & LocalStorage
  // =========================================================================
  const STORAGE_KEY_CHECKLIST = 'gardencare247_checklist_v1';
  const STORAGE_KEY_SHED = 'gardencare247_user_shed_v1';

  let currentCategory = 'all';
  let searchQuery = '';
  let currentSort = 'essential';

  let shedItems = [];
  try {
    const savedShed = localStorage.getItem(STORAGE_KEY_SHED) || localStorage.getItem('gardercare2_user_shed_v1') || localStorage.getItem('gardening101_user_shed_v1');
    if (savedShed) {
      shedItems = JSON.parse(savedShed);
    }
  } catch (e) {
    shedItems = [];
  }

  let checklistChecked = {};
  try {
    const savedChecklist = localStorage.getItem(STORAGE_KEY_CHECKLIST) || localStorage.getItem('gardercare2_checklist_v1') || localStorage.getItem('gardening101_checklist_v1');
    if (savedChecklist) {
      checklistChecked = JSON.parse(savedChecklist);
    }
  } catch (e) {
    checklistChecked = {};
  }

  // =========================================================================
  // 4. DOM Elements
  // =========================================================================
  const toolsGrid = document.getElementById('toolsGrid');
  const toolSearchInput = document.getElementById('toolSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const catTabs = document.querySelectorAll('.cat-tab');
  const toolSortSelect = document.getElementById('toolSortSelect');
  const filterStatusText = document.getElementById('filterStatusText');
  const toolsEmptyState = document.getElementById('toolsEmptyState');
  const resetSearchBtn = document.getElementById('resetSearchBtn');

  // Shed Drawer
  const shedDrawerBtn = document.getElementById('shedDrawerBtn');
  const shedCountBadge = document.getElementById('shedCountBadge');
  const shedDrawerModal = document.getElementById('shedDrawerModal');
  const closeShedModalBtn = document.getElementById('closeShedModalBtn');
  const closeShedSecondaryBtn = document.getElementById('closeShedSecondaryBtn');
  const shedItemsList = document.getElementById('shedItemsList');
  const shedEmptyNotice = document.getElementById('shedEmptyNotice');
  const shedItemsCountText = document.getElementById('shedItemsCountText');
  const clearShedDrawerBtn = document.getElementById('clearShedDrawerBtn');
  const exportShedSummaryBtn = document.getElementById('exportShedSummaryBtn');
  const shedBrowseBtn = document.getElementById('shedBrowseBtn');

  // Tool Detail Modal
  const toolDetailModal = document.getElementById('toolDetailModal');
  const closeToolModalBtn = document.getElementById('closeToolModalBtn');
  const modalCloseSecondaryBtn = document.getElementById('modalCloseSecondaryBtn');
  const modalToolCategory = document.getElementById('modalToolCategory');
  const modalToolIcon = document.getElementById('modalToolIcon');
  const modalToolTitle = document.getElementById('modalToolTitle');
  const modalToolTagline = document.getElementById('modalToolTagline');
  const modalToolSteel = document.getElementById('modalToolSteel');
  const modalToolHandle = document.getElementById('modalToolHandle');
  const modalToolDurability = document.getElementById('modalToolDurability');
  const modalToolErgo = document.getElementById('modalToolErgo');
  const modalToolDeepDesc = document.getElementById('modalToolDeepDesc');
  const modalToolProTip = document.getElementById('modalToolProTip');
  const modalToolCareNotes = document.getElementById('modalToolCareNotes');
  const modalToggleShedBtn = document.getElementById('modalToggleShedBtn');
  let activeDetailToolId = null;

  // Legal Modals
  const privacyModal = document.getElementById('privacyModal');
  const termsModal = document.getElementById('termsModal');
  const allModalTriggers = document.querySelectorAll('.modal-trigger');
  const allCloseLegalBtns = document.querySelectorAll('.close-legal-btn');
  const footerClearDataBtn = document.getElementById('footerClearDataBtn');

  // Checklist
  const interactiveChecklist = document.getElementById('interactiveChecklist');
  const readinessBar = document.getElementById('readinessBar');
  const readinessPercentage = document.getElementById('readinessPercentage');
  const markAllBtn = document.getElementById('markAllBtn');
  const clearAllBtn = document.getElementById('clearAllBtn');
  const copyChecklistBtn = document.getElementById('copyChecklistBtn');

  // Matcher
  const quizOptionBtns = document.querySelectorAll('.quiz-option-btn');
  const kitResultTitle = document.getElementById('kitResultTitle');
  const kitResultDesc = document.getElementById('kitResultDesc');
  const kitResultTags = document.getElementById('kitResultTags');
  const kitToolsPreview = document.getElementById('kitToolsPreview');
  const addKitToShedBtn = document.getElementById('addKitToShedBtn');

  // Toast
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  // Mobile Nav
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  // =========================================================================
  // 5. Toast Notifications & State Storage
  // =========================================================================
  function showToast(message) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toastNotification.classList.add('show');
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 2800);
  }

  function saveShedState() {
    try {
      localStorage.setItem(STORAGE_KEY_SHED, JSON.stringify(shedItems));
    } catch (e) {
      console.warn('Storage error:', e);
    }
    updateShedUI();
  }

  function saveChecklistState() {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(checklistChecked));
    } catch (e) {
      console.warn('Storage error:', e);
    }
    updateChecklistProgress();
  }

  // =========================================================================
  // 6. Tool Catalog Rendering
  // =========================================================================
  function filterAndSortTools() {
    let filtered = TOOLS_DATA.filter((tool) => {
      const matchesCat = currentCategory === 'all' || tool.category === currentCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.brief.toLowerCase().includes(q) ||
        tool.steel.toLowerCase().includes(q) ||
        tool.handle.toLowerCase().includes(q) ||
        tool.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });

    if (currentSort === 'essential') {
      filtered.sort((a, b) => b.priority - a.priority);
    } else if (currentSort === 'durability') {
      filtered.sort((a, b) => b.durability - a.durability);
    } else if (currentSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }

  function renderToolsCatalog() {
    const tools = filterAndSortTools();

    if (tools.length === 0) {
      toolsGrid.innerHTML = '';
      toolsEmptyState.classList.remove('hidden');
      filterStatusText.innerHTML = `No tools match your query.`;
      return;
    }

    toolsEmptyState.classList.add('hidden');
    filterStatusText.innerHTML = `Showing <strong>${tools.length} of ${TOOLS_DATA.length} tools</strong> ${
      currentCategory !== 'all' ? `in <em>${currentCategory}</em>` : 'across all categories'
    }`;

    toolsGrid.innerHTML = tools
      .map((tool) => {
        const inShed = shedItems.includes(tool.id);
        const iconSvg = getCategorySvg(tool.category);

        return `
        <article class="tool-card" data-tool-id="${tool.id}">
          <div class="tool-card-top">
            <span class="tool-cat-tag">${tool.categoryLabel}</span>
          </div>
          <h3 class="tool-name">${tool.name}</h3>
          <div class="tool-metal-label">
            ${iconSvg}
            <span>${tool.steel}</span>
          </div>
          <p class="tool-desc">${tool.brief}</p>
          <div class="tool-spec-pill-row">
            <div class="spec-item">
              <span class="lbl">Durability</span>
              <span class="val">${tool.durability}/10</span>
            </div>
            <div class="spec-item">
              <span class="lbl">Ergonomics</span>
              <span class="val">${tool.ergoScore}</span>
            </div>
          </div>
          <div class="tool-card-footer">
            <button class="btn-card-shed ${inShed ? 'in-shed' : ''}" data-shed-id="${tool.id}" aria-label="${inShed ? 'Remove from shed' : 'Add to shed'}">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                ${inShed ? '<path d="M20 6L9 17l-5-5"/>' : '<path d="M12 5v14M5 12h14"/>'}
              </svg>
              <span>${inShed ? 'In Your Shed' : 'Add to Shed'}</span>
            </button>
            <button class="btn-card-specs" data-detail-id="${tool.id}" aria-label="View specifications for ${tool.name}">
              Full Specs
            </button>
          </div>
        </article>
      `;
      })
      .join('');
  }

  // =========================================================================
  // 7. Tool Detail Modal
  // =========================================================================
  function openToolDetailModal(toolId) {
    const tool = TOOLS_DATA.find((t) => t.id === toolId);
    if (!tool) return;

    activeDetailToolId = tool.id;
    modalToolCategory.textContent = tool.categoryLabel;
    modalToolIcon.innerHTML = getCategorySvg(tool.category);
    modalToolTitle.textContent = tool.name;
    modalToolTagline.textContent = `${tool.steel} • ${tool.handle}`;
    modalToolSteel.textContent = tool.steel;
    modalToolHandle.textContent = tool.handle;
    modalToolDurability.textContent = `${tool.durability} / 10`;
    modalToolErgo.textContent = tool.ergoScore;
    modalToolDeepDesc.textContent = tool.deepDesc;
    modalToolProTip.textContent = tool.proTip;
    modalToolCareNotes.textContent = tool.careNotes;

    const inShed = shedItems.includes(tool.id);
    updateModalShedBtnState(inShed);

    if (typeof toolDetailModal.showModal === 'function') {
      toolDetailModal.showModal();
    } else {
      toolDetailModal.setAttribute('open', '');
    }
  }

  function updateModalShedBtnState(inShed) {
    if (inShed) {
      modalToggleShedBtn.className = 'btn btn-secondary';
      modalToggleShedBtn.innerHTML = `<span>✓ In Your Shed (Remove)</span>`;
    } else {
      modalToggleShedBtn.className = 'btn btn-primary';
      modalToggleShedBtn.innerHTML = `<span>+ Add to My Shed</span>`;
    }
  }

  // Modal Light Dismissal
  [toolDetailModal, privacyModal, termsModal, shedDrawerModal].forEach((modal) => {
    if (!modal) return;
    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        if (typeof modal.close === 'function') {
          modal.close();
        } else {
          modal.removeAttribute('open');
        }
      }
    });
  });

  // =========================================================================
  // 8. Shed Drawer & Inventory
  // =========================================================================
  function toggleShedItem(toolId) {
    const idx = shedItems.indexOf(toolId);
    const tool = TOOLS_DATA.find((t) => t.id === toolId);
    const toolName = tool ? tool.name : 'Tool';

    if (idx > -1) {
      shedItems.splice(idx, 1);
      showToast(`Removed "${toolName}" from your shed.`);
    } else {
      shedItems.push(toolId);
      showToast(`Added "${toolName}" to your shed.`);
    }

    saveShedState();
    renderToolsCatalog();

    if (activeDetailToolId === toolId) {
      updateModalShedBtnState(shedItems.includes(toolId));
    }
  }

  function updateShedUI() {
    const count = shedItems.length;
    shedCountBadge.textContent = count;
    shedItemsCountText.textContent = `${count} tool${count === 1 ? '' : 's'} saved in your personal shed`;

    if (count === 0) {
      shedEmptyNotice.style.display = 'block';
      shedItemsList.style.display = 'none';
      exportShedSummaryBtn.disabled = true;
    } else {
      shedEmptyNotice.style.display = 'none';
      shedItemsList.style.display = 'flex';
      exportShedSummaryBtn.disabled = false;

      shedItemsList.innerHTML = shedItems
        .map((id) => {
          const tool = TOOLS_DATA.find((t) => t.id === id);
          if (!tool) return '';
          return `
          <div class="shed-item-row">
            <div>
              <strong>${tool.name}</strong>
              <span>${tool.categoryLabel} • ${tool.steel}</span>
            </div>
            <button class="shed-remove-btn" data-remove-id="${tool.id}" title="Remove item" aria-label="Remove ${tool.name}">&times;</button>
          </div>
        `;
        })
        .join('');
    }
  }

  // =========================================================================
  // 9. Interactive Shed Checklist
  // =========================================================================
  function renderChecklist() {
    interactiveChecklist.innerHTML = TOOLS_DATA.map((tool) => {
      const isChecked = !!checklistChecked[tool.id];
      return `
        <div class="chk-item ${isChecked ? 'checked' : ''}" data-chk-id="${tool.id}" role="checkbox" aria-checked="${isChecked}" tabindex="0">
          <div class="chk-box">
            ${isChecked ? '✓' : ''}
          </div>
          <div class="chk-text">
            <strong>${tool.name}</strong>
            <span>${tool.categoryLabel}</span>
          </div>
        </div>
      `;
    }).join('');

    updateChecklistProgress();
  }

  function toggleChecklistItem(toolId) {
    checklistChecked[toolId] = !checklistChecked[toolId];
    saveChecklistState();
    renderChecklist();
  }

  function updateChecklistProgress() {
    const total = TOOLS_DATA.length;
    const checkedCount = Object.values(checklistChecked).filter(Boolean).length;
    const percentage = Math.round((checkedCount / total) * 100);

    readinessBar.style.width = `${percentage}%`;
    readinessPercentage.textContent = `${percentage}% Prepared (${checkedCount}/${total})`;
  }

  // =========================================================================
  // 10. Starter Kit Matcher Logic
  // =========================================================================
  const QUIZ_KITS = {
    'balcony-edibles': {
      title: 'The Balcony Herb & Micro-Edibles Kit',
      desc: 'Optimized for container crops, terracotta planters, and clean culinary harvesting without cluttering tight spaces.',
      tags: ['4 Essential Tools', 'Estimated Cost: $85 - $110', 'Ideal for Pots & Planter Boxes'],
      toolIds: ['tool-hori-hori', 'tool-micro-snips', 'tool-watering-can', 'tool-soil-tester']
    },
    'balcony-flowers': {
      title: 'The Balcony Floral & Perennial Kit',
      desc: 'Precision deadheading and root-safe transplanting for hanging baskets, climbing clematis, and potted roses.',
      tags: ['4 Essential Tools', 'Estimated Cost: $95 - $130', 'Maximum Dexterity & Control'],
      toolIds: ['tool-bypass-pruner', 'tool-trowel', 'tool-micro-snips', 'tool-soil-tester']
    },
    'raised-bed-edibles': {
      title: 'The Raised Bed Kitchen Cultivator Kit',
      desc: 'Designed for turning compost, transplanting seedlings, eliminating weeds cleanly at the root, and daily harvesting.',
      tags: ['5 Essential Tools', 'Estimated Cost: $135 - $180', 'Lifespan: 20+ Years with Care'],
      toolIds: ['tool-trowel', 'tool-cape-cod-weeder', 'tool-bypass-pruner', 'tool-gloves', 'tool-kneeler']
    },
    'raised-bed-flowers': {
      title: 'The Perennial Border & Cutting Kit',
      desc: 'Heavy-duty division of hostas and daylilies, bulb planting with depth gauges, and clean rose care.',
      tags: ['5 Essential Tools', 'Estimated Cost: $145 - $195', 'High-Carbon Japanese Steel'],
      toolIds: ['tool-hori-hori', 'tool-bypass-pruner', 'tool-gloves', 'tool-garden-spade', 'tool-sharpening-stone']
    },
    'homestead-trees': {
      title: 'The Orchard & Shrub Care Kit',
      desc: 'Full branch lopping leverage, folding tree saw cuts, deep soil aeration, and heavy-duty protection.',
      tags: ['6 Master Tools', 'Estimated Cost: $250 - $330', 'Arborist Grade Quality'],
      toolIds: ['tool-pruning-saw', 'tool-anvil-loppers', 'tool-broadfork', 'tool-wheelbarrow', 'tool-gloves', 'tool-camellia-oil']
    },
    'homestead-edibles': {
      title: 'The In-Ground Vegetable Garden Kit',
      desc: 'Broadfork bio-aeration, rapid row cultivation, ergonomic kneeling, and high-volume wash-and-pack harvest tools.',
      tags: ['6 Master Tools', 'Estimated Cost: $230 - $300', 'No-Till Ground Preparation'],
      toolIds: ['tool-broadfork', 'tool-oscillating-hoe', 'tool-garden-fork', 'tool-harvest-basket', 'tool-kneeler', 'tool-brass-nozzle']
    }
  };

  let currentQuizState = {
    space: 'raised-bed',
    focus: 'edibles',
    tier: 'heirloom'
  };

  function updateQuizRecommendation() {
    const key = `${currentQuizState.space}-${currentQuizState.focus}`;
    const fallbackKey = 'raised-bed-edibles';
    const kit = QUIZ_KITS[key] || QUIZ_KITS[fallbackKey];

    kitResultTitle.textContent = kit.title;
    kitResultDesc.textContent = kit.desc;

    kitResultTags.innerHTML = kit.tags
      .map((t) => `<span class="tag">${t}</span>`)
      .join('');

    kitToolsPreview.innerHTML = kit.toolIds
      .map((id) => {
        const tool = TOOLS_DATA.find((t) => t.id === id);
        if (!tool) return '';
        return `
        <div class="mini-tool-pill">
          <span class="name">${tool.name}</span>
          <span class="spec">${tool.steel}</span>
        </div>
      `;
      })
      .join('');

    addKitToShedBtn.dataset.kitToolIds = JSON.stringify(kit.toolIds);
  }

  // =========================================================================
  // 11. Event Listeners
  // =========================================================================
  function initEventListeners() {
    // Category Tabs
    catTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        catTabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        currentCategory = tab.dataset.cat;
        renderToolsCatalog();
      });
    });

    // Search Input
    toolSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchQuery.trim().length > 0) {
        searchClearBtn.classList.add('visible');
      } else {
        searchClearBtn.classList.remove('visible');
      }
      renderToolsCatalog();
    });

    searchClearBtn.addEventListener('click', () => {
      toolSearchInput.value = '';
      searchQuery = '';
      searchClearBtn.classList.remove('visible');
      renderToolsCatalog();
      toolSearchInput.focus();
    });

    resetSearchBtn.addEventListener('click', () => {
      currentCategory = 'all';
      searchQuery = '';
      toolSearchInput.value = '';
      searchClearBtn.classList.remove('visible');
      catTabs.forEach((t) => t.classList.remove('active'));
      catTabs[0].classList.add('active');
      renderToolsCatalog();
    });

    // Sort Select
    toolSortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderToolsCatalog();
    });

    // Tool Card Delegations
    toolsGrid.addEventListener('click', (e) => {
      const shedBtn = e.target.closest('.btn-card-shed');
      if (shedBtn) {
        toggleShedItem(shedBtn.dataset.shedId);
        return;
      }

      const detailBtn = e.target.closest('.btn-card-specs');
      if (detailBtn) {
        openToolDetailModal(detailBtn.dataset.detailId);
        return;
      }

      const card = e.target.closest('.tool-card');
      if (card && !e.target.closest('button')) {
        openToolDetailModal(card.dataset.toolId);
      }
    });

    // Detail Modal Actions
    closeToolModalBtn.addEventListener('click', () => toolDetailModal.close());
    modalCloseSecondaryBtn.addEventListener('click', () => toolDetailModal.close());
    modalToggleShedBtn.addEventListener('click', () => {
      if (activeDetailToolId) {
        toggleShedItem(activeDetailToolId);
      }
    });

    // Shed Drawer Trigger
    shedDrawerBtn.addEventListener('click', () => {
      if (typeof shedDrawerModal.showModal === 'function') {
        shedDrawerModal.showModal();
      } else {
        shedDrawerModal.setAttribute('open', '');
      }
    });

    closeShedModalBtn.addEventListener('click', () => shedDrawerModal.close());
    closeShedSecondaryBtn.addEventListener('click', () => shedDrawerModal.close());
    shedBrowseBtn.addEventListener('click', () => shedDrawerModal.close());

    // Shed Item Removal in Drawer
    shedItemsList.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.shed-remove-btn');
      if (removeBtn) {
        toggleShedItem(removeBtn.dataset.removeId);
      }
    });

    clearShedDrawerBtn.addEventListener('click', () => {
      if (shedItems.length === 0) return;
      if (confirm('Are you sure you want to empty your shed list?')) {
        shedItems = [];
        saveShedState();
        renderToolsCatalog();
        showToast('Your shed list has been cleared.');
      }
    });

    exportShedSummaryBtn.addEventListener('click', () => {
      if (shedItems.length === 0) return;
      const listText = shedItems
        .map((id) => {
          const t = TOOLS_DATA.find((x) => x.id === id);
          return t ? `• ${t.name} (${t.categoryLabel}) — ${t.steel}` : '';
        })
        .filter(Boolean)
        .join('\n');

      const fullSummary = `🌱 Gardencare247 — Saved Shed Toolkit:\n\n${listText}\n\nGuide: gardencare247.guide`;
      navigator.clipboard.writeText(fullSummary).then(
        () => showToast('Shed inventory copied to clipboard!'),
        () => showToast('Could not copy to clipboard.')
      );
    });

    // Checklist Actions
    interactiveChecklist.addEventListener('click', (e) => {
      const item = e.target.closest('.chk-item');
      if (item) {
        toggleChecklistItem(item.dataset.chkId);
      }
    });

    interactiveChecklist.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        const item = e.target.closest('.chk-item');
        if (item) {
          e.preventDefault();
          toggleChecklistItem(item.dataset.chkId);
        }
      }
    });

    markAllBtn.addEventListener('click', () => {
      TOOLS_DATA.forEach((t) => (checklistChecked[t.id] = true));
      saveChecklistState();
      renderChecklist();
      showToast('All 24 tools marked as owned!');
    });

    clearAllBtn.addEventListener('click', () => {
      checklistChecked = {};
      saveChecklistState();
      renderChecklist();
      showToast('Checklist reset.');
    });

    copyChecklistBtn.addEventListener('click', () => {
      const checkedTools = TOOLS_DATA.filter((t) => checklistChecked[t.id]);
      const uncheckedTools = TOOLS_DATA.filter((t) => !checklistChecked[t.id]);

      let summary = `🌱 Gardencare247 — Shed Inventory Report\nReadiness: ${readinessPercentage.textContent}\n\n`;
      summary += `IN MY SHED (${checkedTools.length}):\n`;
      checkedTools.forEach((t) => (summary += `  ✓ ${t.name}\n`));
      summary += `\nSTILL NEEDED (${uncheckedTools.length}):\n`;
      checkedTools.length < TOOLS_DATA.length ? uncheckedTools.forEach((t) => (summary += `  ◻ ${t.name}\n`)) : null;
      summary += `\nPractical advice for growers — gardencare247.guide`;

      navigator.clipboard.writeText(summary).then(
        () => showToast('Checklist report copied to clipboard!'),
        () => showToast('Could not copy to clipboard.')
      );
    });

    // Matcher Quiz Buttons
    quizOptionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        const value = btn.dataset.value;
        const parentList = btn.closest('.quiz-options-list');
        parentList.querySelectorAll('.quiz-option-btn').forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');

        currentQuizState[category] = value;
        updateQuizRecommendation();
      });
    });

    addKitToShedBtn.addEventListener('click', () => {
      const toolIds = JSON.parse(addKitToShedBtn.dataset.kitToolIds || '[]');
      let addedCount = 0;
      toolIds.forEach((id) => {
        if (!shedItems.includes(id)) {
          shedItems.push(id);
          addedCount++;
        }
      });
      saveShedState();
      renderToolsCatalog();
      showToast(`Added ${toolIds.length} kit tools to your shed!`);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item) => {
      const questionBtn = item.querySelector('.faq-question');
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach((f) => {
          f.classList.remove('open');
          f.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Legal Modals
    allModalTriggers.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetModalId = btn.dataset.modal;
        const modal = document.getElementById(targetModalId);
        if (modal) {
          if (typeof modal.showModal === 'function') {
            modal.showModal();
          } else {
            modal.setAttribute('open', '');
          }
        }
        if (mobileNavDrawer.classList.contains('open')) {
          mobileNavDrawer.classList.remove('open');
          mobileMenuBtn.classList.remove('open');
        }
      });
    });

    allCloseLegalBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('dialog');
        if (modal) modal.close();
      });
    });

    footerClearDataBtn.addEventListener('click', () => {
      if (confirm('Clear all saved shed tools and checklist marks from your browser?')) {
        localStorage.removeItem(STORAGE_KEY_SHED);
        localStorage.removeItem(STORAGE_KEY_CHECKLIST);
        shedItems = [];
        checklistChecked = {};
        updateShedUI();
        renderToolsCatalog();
        renderChecklist();
        showToast('All local storage data cleared.');
      }
    });

    // Mobile Navigation
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        mobileNavDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileNavDrawer.classList.add('open');
        mobileMenuBtn.classList.add('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        mobileMenuBtn.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // =========================================================================
  // 12. App Initialization
  // =========================================================================
  function init() {
    renderToolsCatalog();
    updateShedUI();
    renderChecklist();
    updateQuizRecommendation();
    initEventListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
