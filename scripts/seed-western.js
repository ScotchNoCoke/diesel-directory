const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/data/suburbs.json');
let existing = [];
try {
  existing = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
} catch (e) {
  existing = [];
}

const newWesternHubs = [
  {
    state: "vic",
    suburb: "horsham",
    postcode: "3400",
    lat: -36.7118,
    lng: 142.1989,
    lga: "Rural City of Horsham",
    corridor: "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    arterials: ["Western Highway (A8)", "Henty Highway (B200)", "Wimmera Highway (B240)", "Golf Course Road Industrial Estate"],
    localOverview: "Horsham is the undisputed commercial capital of the Wimmera, strategically situated midway between Melbourne and Adelaide. It supports high-density agricultural grain transport, livestock crates, bulk mineral sands haulage, and continuous interstate linehaul freight.",
    nearbySuburbs: [
      { name: "Dimboola", slug: "dimboola" },
      { name: "Stawell", slug: "stawell" },
      { name: "Nhill", slug: "nhill" }
    ],
    businesses: [
      {
        name: "Wimmera Truck Repairs",
        slug: "wimmera-truck-repairs",
        phone: "(03) 5382 6111",
        website: "https://wimmeratruckrepairs.com.au",
        address: "7 Golf Course Road, Horsham VIC 3400",
        rating: 4.8,
        reviewCount: 46,
        tags: ["24/7 Breakdown Assistance", "Detroit & Cummins", "B-Double Cleared Yard", "Air Brakes"],
        editorialSummary: "Premier heavy vehicle workshop on the Western Highway in Horsham. Features full B-double drive-through service bays, electronic powertrain diagnostics, and 24/7 mobile roadside emergency recovery."
      },
      {
        name: "Horsham Diesel Services",
        slug: "horsham-diesel-services",
        phone: "0427 822 590",
        website: "https://horshamdiesel.com.au",
        address: "12 Plumpton Road, Horsham VIC 3400",
        rating: 4.7,
        reviewCount: 34,
        tags: ["Mobile Field Service", "Grain & Bulk Haulage", "Common Rail Diagnostics", "Hydraulics"],
        editorialSummary: "Heavy commercial mechanical specialists catering to linehaul combinations and bulk grain carriers. Fully equipped mobile repair units covering the Western Highway from Stawell to Kaniva."
      }
    ]
  },
  {
    state: "vic",
    suburb: "nhill",
    postcode: "3418",
    lat: -36.3328,
    lng: 141.6508,
    lga: "Shire of Hindmarsh",
    corridor: "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    arterials: ["Western Highway (A8)", "Nhill-Harrow Road", "Nelson Street Heavy Staging"],
    localOverview: "Nhill is the historic Melbourne–Adelaide changeover town, located just 50 kilometres east of the South Australian border. Transport operators depend on Nhill for interstate driver relays, heavy vehicle fatigue management rest areas, and emergency roadside breakdown support.",
    nearbySuburbs: [
      { name: "Kaniva", slug: "kaniva" },
      { name: "Dimboola", slug: "dimboola" },
      { name: "Bordertown", slug: "bordertown" }
    ],
    businesses: [
      {
        name: "Nhill Heavy Vehicle Mechanics",
        slug: "nhill-heavy-vehicle-mechanics",
        phone: "(03) 5391 1800",
        website: "https://nhilltruckrepairs.com.au",
        address: "88 Nelson Street, Nhill VIC 3418",
        rating: 4.8,
        reviewCount: 28,
        tags: ["24/7 Roadside Callout", "Driver Changeover Hub", "Air Brake Overhauls", "Prime Movers"],
        editorialSummary: "Established heavy transport mechanical workshop positioned directly off the Western Highway. Offers round-the-clock roadside recovery, air brake relining, cooling system flushes, and driver relay vehicle inspections."
      },
      {
        name: "Border-Line Mobile Diesel Repairs",
        slug: "border-line-mobile-diesel",
        phone: "0419 332 711",
        website: "https://borderlinemobilediesel.com.au",
        address: "Western Highway Corridor, Nhill VIC 3418",
        rating: 4.9,
        reviewCount: 22,
        tags: ["Mobile Breakdown Unit", "24/7 Highway Rescue", "Electronic Troubleshooting", "Trailer Hubs"],
        editorialSummary: "Emergency highway breakdown service operating 24 hours along the Western Highway between Horsham and the South Australian border checkpoint."
      }
    ]
  },
  {
    state: "sa",
    suburb: "keith",
    postcode: "5267",
    lat: -36.0983,
    lng: 140.3547,
    lga: "Tatiara District Council",
    corridor: "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    arterials: ["Dukes Highway (A8)", "Riddoch Highway (A66)", "Emu Flat Road Heavy Bypass"],
    localOverview: "Keith is the vital South Australian road junction where the Dukes Highway (A8 Melbourne–Adelaide corridor) intersects with the Riddoch Highway (connecting south to Naracoorte and Mount Gambier). It handles substantial volumes of livestock road trains, grain carriers, and linehaul prime movers.",
    nearbySuburbs: [
      { name: "Bordertown", slug: "bordertown" },
      { name: "Tintinara", slug: "tintinara" },
      { name: "Coonalpyn", slug: "coonalpyn" }
    ],
    businesses: [
      {
        name: "Keith Diesel & Heavy Mechanical",
        slug: "keith-diesel-heavy-mechanical",
        phone: "(08) 8755 1255",
        website: "https://keithdiesel.com.au",
        address: "24 Memorial Avenue, Keith SA 5267",
        rating: 4.7,
        reviewCount: 39,
        tags: ["24/7 Emergency Dispatch", "Riddoch & Dukes Junction", "Road Train Repairs", "Air Brakes"],
        editorialSummary: "Comprehensive heavy vehicle mechanical facility catering to multi-combination road trains and linehaul freighters. Offers pneumatic air system repairs, brake relining, and 24-hour emergency highway callout."
      },
      {
        name: "Tatiara Mobile Fleet Care Keith",
        slug: "tatiara-mobile-fleet-care",
        phone: "0428 551 880",
        website: "https://tatiarafleetcare.com.au",
        address: "Dukes Highway Heavy Vehicle Rest Stop, Keith SA 5267",
        rating: 4.9,
        reviewCount: 25,
        tags: ["Mobile Breakdown", "24/7 Dukes Corridor Rescue", "Hydraulics", "Prime Movers"],
        editorialSummary: "Rapid mobile diesel response truck patrolling the Dukes Highway between Bordertown and Coonalpyn. Specializes in urgent electrical, cooling, and air suspension failures."
      }
    ]
  },
  {
    state: "sa",
    suburb: "tailem-bend",
    postcode: "5260",
    lat: -35.2589,
    lng: 139.4589,
    lga: "Coorong District Council",
    corridor: "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    arterials: ["Princes Highway (A1)", "Dukes Highway (A8)", "Mallee Highway (B12)", "Lime Kiln Road Heavy Truck Hub"],
    localOverview: "Tailem Bend is the critical freight choke point and Murray River crossing where the Dukes Highway (A8 from Melbourne), Mallee Highway (B12 from Sydney/Riverina), and Princes Highway converge before heavy combinations make the final run into Greater Adelaide.",
    nearbySuburbs: [
      { name: "Murray Bridge", slug: "murray-bridge" },
      { name: "Coonalpyn", slug: "coonalpyn" },
      { name: "Wellington", slug: "wellington" }
    ],
    businesses: [
      {
        name: "Tailem Bend Truck Services",
        slug: "tailem-bend-truck-services",
        phone: "(08) 8572 4111",
        website: "https://tailembendtrucks.com.au",
        address: "Lime Kiln Road, Tailem Bend SA 5260",
        rating: 4.6,
        reviewCount: 42,
        tags: ["24/7 Breakdown Hotline", "Murray River Crossing", "B-Double Cleared Yard", "Driveline Overhauls"],
        editorialSummary: "High-capacity commercial vehicle repair yard situated at the junction of the Dukes and Princes Highways. Features drive-through service bays, suspension rebushing, and 24/7 roadside recovery."
      },
      {
        name: "Riverland & Coorong Heavy Mechanical",
        slug: "coorong-heavy-mechanical",
        phone: "0417 884 902",
        website: "https://coorongdiesel.com.au",
        address: "Dukes Highway Junction, Tailem Bend SA 5260",
        rating: 4.8,
        reviewCount: 31,
        tags: ["Mobile Breakdown Service", "Emergency Highway Rescue", "Engine Fault Finding", "Fuel Systems"],
        editorialSummary: "Dedicated mobile heavy diesel breakdown response covering the lower Murray and Coorong transport routes into Adelaide."
      }
    ]
  },
  {
    state: "sa",
    suburb: "wingfield",
    postcode: "5013",
    lat: -34.8464,
    lng: 138.5639,
    lga: "City of Port Adelaide Enfield",
    corridor: "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    arterials: ["Port River Expressway (A9)", "Northern Connector (M2)", "South Road (A2)", "Grand Junction Road", "Cormack Road"],
    localOverview: "Wingfield is Adelaide’s premier heavy transport and industrial powerhouse. Serving as the primary intermodal container and road freight terminal for South Australia, Wingfield connects directly to the Port River Expressway, Northern Connector, and interstate rail-truck freight yards.",
    nearbySuburbs: [
      { name: "Regency Park", slug: "regency-park" },
      { name: "Dry Creek", slug: "dry-creek" },
      { name: "Port Adelaide", slug: "port-adelaide" },
      { name: "Gepps Cross", slug: "gepps-cross" }
    ],
    businesses: [
      {
        name: "Adelaide Heavy Vehicle & Diesel Centre",
        slug: "adelaide-heavy-vehicle-diesel-centre",
        phone: "(08) 8347 1888",
        website: "https://adelaideheavyvehicle.com.au",
        address: "42 Cormack Road, Wingfield SA 5013",
        rating: 4.8,
        reviewCount: 79,
        tags: ["Adelaide Freight Terminal", "24/7 Emergency Breakdown", "Detroit & Cummins", "B-Double & Road Train Bays"],
        editorialSummary: "Massive heavy commercial dealership and engineering workshop in the heart of Adelaide's transport corridor. Features multiple drive-through bays, brake roller testing, powertrain rebuilds, and 24/7 roadside assistance."
      },
      {
        name: "Wingfield Truck & Trailer Repairs",
        slug: "wingfield-truck-trailer-repairs",
        phone: "(08) 8243 0011",
        website: "https://wingfieldtruckrepairs.com.au",
        address: "18-22 Davis Street, Wingfield SA 5013",
        rating: 4.7,
        reviewCount: 58,
        tags: ["Trailer Rebuilds", "Air Brakes", "Laser Alignment", "Fleet Maintenance"],
        editorialSummary: "Full-service heavy transport workshop specializing in linehaul trailer servicing, pneumatic brake overhauls, laser wheel alignment, and heavy commercial fleet maintenance."
      },
      {
        name: "Express Mobile Truck Repairs Adelaide",
        slug: "express-mobile-truck-repairs-adelaide",
        phone: "0402 771 990",
        website: "https://expressmobiletrucks.com.au",
        address: "Wingfield & Northern Connector Arterials, Wingfield SA 5013",
        rating: 4.9,
        reviewCount: 47,
        tags: ["24/7 Rapid Mobile Dispatch", "Motorway Clearing", "Electronic Diagnostics", "Prime Movers"],
        editorialSummary: "Rapid-response mobile heavy diesel mechanics patrolling the Northern Connector, Port River Expressway, and South Road. Provides round-the-clock emergency clearing and on-site fault rectifications."
      }
    ]
  }
];

// Merge into existing suburbs.json without duplicates
const combined = [...existing];
for (const hub of newWesternHubs) {
  const idx = combined.findIndex(h => h.suburb === hub.suburb && h.state === hub.state);
  if (idx >= 0) {
    combined[idx] = hub;
  } else {
    combined.push(hub);
  }
}

fs.writeFileSync(targetPath, JSON.stringify(combined, null, 2), 'utf8');
console.log(`✓ Successfully updated suburbs.json: ${combined.length} total hubs across VIC, NSW, and SA.`);
