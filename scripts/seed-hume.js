const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/data/suburbs.json');
let existing = [];
try {
  existing = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
} catch (e) {
  existing = [];
}

const newHumeHubs = [
  {
    state: "nsw",
    suburb: "holbrook",
    postcode: "2644",
    lat: -35.7228,
    lng: 147.3150,
    lga: "Greater Hume Shire",
    corridor: "Hume Freeway (M31) Sydney–Melbourne Trans-Border Corridor",
    arterials: ["Hume Highway (M31)", "Wagga Road", "Holbrook Heavy Vehicle Bypass", "Albury Street"],
    localOverview: "Holbrook is the primary mid-riverina heavy vehicle staging post on the Hume Highway between Albury and Gundagai. Known for its bypass rest areas and heavy fleet depots, it accommodates high-density B-double and interstate road train changeovers.",
    nearbySuburbs: [
      { name: "Albury", slug: "albury" },
      { name: "Culcairn", slug: "culcairn" },
      { name: "Tarcutta", slug: "tarcutta" }
    ],
    businesses: [
      {
        name: "Holbrook Mechanical & Diesel Services",
        slug: "holbrook-mechanical-diesel",
        phone: "(02) 6036 2233",
        website: "https://holbrookdiesel.com.au",
        address: "144 Albury Street, Holbrook NSW 2644",
        rating: 4.8,
        reviewCount: 31,
        tags: ["24/7 Breakdown Assistance", "Hume Bypass Rescue", "Air Brakes", "Prime Movers"],
        editorialSummary: "Heavy commercial mechanical workshop located directly off the Hume Highway bypass. Equipped with heavy hoists, mobile roadside recovery units, and certified air-brake relining fitters."
      },
      {
        name: "Riverina Heavy Fleet Repairs",
        slug: "riverina-heavy-fleet-repairs",
        phone: "0418 522 910",
        website: "https://riverinaheavyfleet.com.au",
        address: "Hume Highway Corridor, Holbrook NSW 2644",
        rating: 4.9,
        reviewCount: 26,
        tags: ["Mobile Field Service", "24/7 Emergency Callout", "Diesel Diagnostics", "Hydraulics"],
        editorialSummary: "On-demand mobile diesel breakdown vehicle patrolling the M31 between Albury and Tarcutta. Specializes in ECU fault-finding, turbo replacements, and mobile hose crimping."
      }
    ]
  },
  {
    state: "nsw",
    suburb: "gundagai",
    postcode: "2722",
    lat: -35.0664,
    lng: 148.1090,
    lga: "Cootamundra-Gundagai Regional Council",
    corridor: "Hume Freeway (M31) Sydney–Melbourne Trans-Border Corridor",
    arterials: ["Hume Highway (M31)", "Gundagai Bypass", "Sheridan Street", "South Gundagai Heavy Truck Stop"],
    localOverview: "Gundagai is the historic linehaul midpoint between Sydney and Melbourne along the Murrumbidgee River. The South Gundagai heavy vehicle service center represents one of the busiest refueling, tire, and emergency mechanical recovery corridors in Australia.",
    nearbySuburbs: [
      { name: "Tumut", slug: "tumut" },
      { name: "Cootamundra", slug: "cootamundra" },
      { name: "Tarcutta", slug: "tarcutta" }
    ],
    businesses: [
      {
        name: "Gundagai Diesel Repairs & Roadside",
        slug: "gundagai-diesel-repairs",
        phone: "(02) 6944 1500",
        website: "https://gundagaidiesel.com.au",
        address: "185 Sheridan Street, Gundagai NSW 2722",
        rating: 4.7,
        reviewCount: 44,
        tags: ["24/7 Roadside Rescue", "Prime Movers", "Cummins Diagnostics", "Trailer Hubs"],
        editorialSummary: "Comprehensive heavy diesel service centre catering to interstate linehaul prime movers. Features heavy drive-through bays, electronic diagnostics, and 24/7 highway callout crews."
      },
      {
        name: "South Gundagai Truck Stop Repairs",
        slug: "south-gundagai-truck-stop-repairs",
        phone: "0429 881 304",
        website: "https://southgundagaitrucks.com.au",
        address: "Hume Highway Exit, South Gundagai NSW 2722",
        rating: 4.8,
        reviewCount: 37,
        tags: ["24/7 Breakdown Dispatch", "Air Suspension", "B-Double Cleared", "Pneumatics"],
        editorialSummary: "Located adjacent to the South Gundagai major roadhouse. Rapid-response mobile mechanic team handling air brake leaks, blown intercoolers, and driveline overhauls."
      }
    ]
  },
  {
    state: "nsw",
    suburb: "yass",
    postcode: "2582",
    lat: -34.8467,
    lng: 148.9135,
    lga: "Yass Valley Council",
    corridor: "Hume Freeway (M31) Sydney–Melbourne Trans-Border Corridor",
    arterials: ["Hume Highway (M31)", "Barton Highway (A25)", "Yass Valley Way", "Coolac Bypass"],
    localOverview: "Yass is the critical strategic junction where the Hume Highway meets the Barton Highway connecting to Canberra and the ACT. Heavy transport operators utilize Yass as a changeover depot, heavy weight-check bypass, and mechanical relay station.",
    nearbySuburbs: [
      { name: "Bowning", slug: "bowning" },
      { name: "Murrumbateman", slug: "murrumbateman" },
      { name: "Gunning", slug: "gunning" }
    ],
    businesses: [
      {
        name: "Yass Valley Diesel Services",
        slug: "yass-valley-diesel",
        phone: "(02) 6226 2110",
        website: "https://yassvalleydiesel.com.au",
        address: "32 Laidlaw Street, Yass NSW 2582",
        rating: 4.8,
        reviewCount: 38,
        tags: ["24/7 Breakdown", "B-Double Certified", "Common Rail Diagnostics", "Air Systems"],
        editorialSummary: "Full-service commercial vehicle workshop providing major engine diagnostics, brake roller inspections, pneumatic line overhauls, and 24-hour highway callout."
      },
      {
        name: "Trans-Hume Mobile Truck Mechanics",
        slug: "trans-hume-mechanics",
        phone: "0407 199 443",
        website: "https://transhumerepairs.com.au",
        address: "Yass & Barton Hwy Junction NSW 2582",
        rating: 4.9,
        reviewCount: 29,
        tags: ["Mobile Breakdown", "24/7 Emergency Dispatch", "Barton & Hume Corridors", "Hydraulics"],
        editorialSummary: "Mobile heavy mechanical field fitters operating along the Hume Highway from Jugiong to Gunning and south to Canberra. Specialized in urgent roadside electronic and pneumatic failures."
      }
    ]
  },
  {
    state: "nsw",
    suburb: "goulburn",
    postcode: "2580",
    lat: -34.7545,
    lng: 149.7178,
    lga: "Goulburn Mulwaree Council",
    corridor: "Hume Freeway (M31) Sydney–Melbourne Trans-Border Corridor",
    arterials: ["Hume Highway (M31)", "Federal Highway (M23)", "Syd Moore Heavy Bypass", "Finlay Road"],
    localOverview: "Goulburn is the premier heavy transport powerhouse of the NSW Southern Tablelands. It connects Sydney to the Southern Highlands, Canberra, and regional livestock saleyards, supporting heavy dealerships, livestock transports, and B-double linehaul.",
    nearbySuburbs: [
      { name: "Marulan", slug: "marulan" },
      { name: "Gunning", slug: "gunning" },
      { name: "Tarago", slug: "tarago" }
    ],
    businesses: [
      {
        name: "Southern Tablelands Truck Centre",
        slug: "southern-tablelands-truck-centre",
        phone: "(02) 4821 1888",
        website: "https://sttruckcentre.com.au",
        address: "10 Finlay Road, Goulburn NSW 2580",
        rating: 4.6,
        reviewCount: 72,
        tags: ["Kenworth & DAF Service", "Cummins Master Technicians", "24/7 Roadside Hotline", "B-Double Bays"],
        editorialSummary: "Major heavy commercial workshop on the Hume Highway corridor featuring certified Cummins and PACCAR master technicians, roller brake test units, and 24/7 emergency linehaul rescue."
      },
      {
        name: "Goulburn Heavy Vehicle Repairs",
        slug: "goulburn-heavy-vehicle-repairs",
        phone: "(02) 4822 5500",
        website: "https://goulburnheavyrepairs.com.au",
        address: "70 Robinson Street, Goulburn NSW 2580",
        rating: 4.7,
        reviewCount: 39,
        tags: ["Air Brake Specialists", "Trailer Suspensions", "Defect Clearance", "Mobile Van"],
        editorialSummary: "Accredited heavy mechanical workshop offering full powertrain servicing, trailer chassis repairs, NHVR compliance checks, and emergency roadside field service."
      },
      {
        name: "Hume Highway Mobile Diesel Doctors",
        slug: "hume-diesel-doctors",
        phone: "0412 809 332",
        website: "https://dieseldoctors.com.au",
        address: "Finlay Road Precinct, Goulburn NSW 2580",
        rating: 4.9,
        reviewCount: 33,
        tags: ["24/7 Breakdown Dispatch", "Onsite Field Fitters", "DPF Cleaning", "Roadside Diagnostics"],
        editorialSummary: "Dedicated 24/7 emergency roadside vehicle equipped with generator, air supply, and diagnostic software covering the Marulan weighbridge to Gunning corridor."
      }
    ]
  },
  {
    state: "nsw",
    suburb: "prestons",
    postcode: "2170",
    lat: -33.9392,
    lng: 150.8654,
    lga: "City of Liverpool",
    corridor: "Hume Freeway (M31) Sydney–Melbourne Trans-Border Corridor",
    arterials: ["Hume Motorway (M31)", "Westlink M7", "M5 South-Western Motorway", "Kurrajong Road", "Bernera Road"],
    localOverview: "Prestons is Sydney’s critical southern industrial and logistics gatekeeper, marking the direct junction of the M31 Hume Motorway, the M7 Westlink, and the M5. It handles enormous daily B-double and intermodal container volumes moving into Greater Western Sydney and Port Botany.",
    nearbySuburbs: [
      { name: "Eastern Creek", slug: "eastern-creek" },
      { name: "Ingleburn", slug: "ingleburn" },
      { name: "Moorebank", slug: "moorebank" },
      { name: "Campbelltown", slug: "campbelltown" }
    ],
    businesses: [
      {
        name: "Sydney South Truck Centre Prestons",
        slug: "sydney-south-truck-centre-prestons",
        phone: "(02) 9608 0100",
        website: "https://sydneysouthtrucks.com.au",
        address: "15-19 Kurrajong Road, Prestons NSW 2170",
        rating: 4.6,
        reviewCount: 84,
        tags: ["M31/M7 Gateway", "24/7 Breakdown Assistance", "Detroit & Cummins", "Fleet Bay Services"],
        editorialSummary: "Premier heavy vehicle dealership and mechanical facility strategically situated at the M31/M7 interchange. Features high-capacity drive-through bays, advanced driveline dyno diagnostics, and 24/7 roadside recovery."
      },
      {
        name: "Prestons Heavy Vehicle & Trailer Repairs",
        slug: "prestons-heavy-vehicle-repairs",
        phone: "(02) 9826 9911",
        website: "https://prestonsheavytrucks.com.au",
        address: "42 Jedda Road, Prestons NSW 2170",
        rating: 4.8,
        reviewCount: 52,
        tags: ["Container Skeletals", "Air Brake Overhauls", "Prime Movers", "NHVR Safety Inspections"],
        editorialSummary: "Specialized container freight and linehaul trailer workshop handling pneumatic air brake relining, chassis realignment, and fleet preventive maintenance schedules."
      },
      {
        name: "M7 & M31 Mobile Diesel Response",
        slug: "m7-m31-mobile-diesel-response",
        phone: "0488 440 119",
        website: "https://m7m31dieselfix.com.au",
        address: "Bernera Road Logistics Hub, Prestons NSW 2170",
        rating: 4.9,
        reviewCount: 41,
        tags: ["24/7 Roadside Units", "Rapid Motorway Dispatch", "Electronic Diagnostics", "Fuel Systems"],
        editorialSummary: "Mobile heavy breakdown trucks dispatched 24 hours a day across Sydney’s southern freight arterials. Specializes in on-freeway rapid clearing, fuel injector faults, and pneumatic breakdowns."
      }
    ]
  }
];

// Merge without duplicate suburbs
const combined = [...existing];
for (const hub of newHumeHubs) {
  const idx = combined.findIndex(h => h.suburb === hub.suburb && h.state === hub.state);
  if (idx >= 0) {
    combined[idx] = hub;
  } else {
    combined.push(hub);
  }
}

fs.writeFileSync(targetPath, JSON.stringify(combined, null, 2), 'utf8');
console.log(`✓ Successfully updated suburbs.json: ${combined.length} total hubs across VIC, NSW, and SA.`);
