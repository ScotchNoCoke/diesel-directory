const fs = require('fs');
const path = require('path');

const fullData = [
  {
    state: "vic",
    suburb: "truganina",
    postcode: "3029",
    lat: -37.834,
    lng: 144.733,
    lga: "City of Wyndham",
    corridor: "Western Freight Corridor & Port Intermodal Gateway",
    arterials: ["Western Freeway (M8)", "Princes Freeway (M1)", "Boundary Road", "Robinsons Road", "Palmers Road", "Derrimut Road"],
    localOverview: "Truganina is Victoria's primary modern logistics and intermodal distribution powerhouse. Strategically positioned between the Princes and Western Freeways, it handles high-density B-double and Super B-double container haulage connecting the Port of Melbourne to national distribution centres.",
    nearbySuburbs: [
      { name: "Laverton North", slug: "laverton-north" },
      { name: "Derrimut", slug: "derrimut" },
      { name: "Tarneit", slug: "tarneit" },
      { name: "Altona", slug: "altona" }
    ],
    businesses: [
      {
        name: "Daimler Trucks Laverton",
        slug: "daimler-trucks-laverton",
        phone: "(03) 9680 8777",
        website: "https://daimlertruckslaverton.com.au",
        address: "423 Boundary Road, Truganina VIC 3029",
        rating: 4.4,
        reviewCount: 88,
        tags: ["24/7 Breakdown", "56-Bay Workshop", "Detroit & Cummins", "Prime Movers", "OEM Authorised"],
        editorialSummary: "Massive 56-bay authorized heavy vehicle dealership and service centre specializing in Freightliner, Mercedes-Benz, and Fuso."
      },
      {
        name: "Volscan Truck Repairs",
        slug: "volscan-truck-repairs",
        phone: "0432 026 507",
        website: "https://volscan.com.au",
        address: "41-43 Woods Road, Truganina VIC 3029",
        rating: 4.8,
        reviewCount: 39,
        tags: ["Mobile Mechanics", "24/7 Breakdown", "Heavy Vehicle Diagnostics", "Trailer Servicing"],
        editorialSummary: "Specialized mobile heavy diesel repair service operating across Truganina and western logistics corridors."
      },
      {
        name: "G M Truck Repairs",
        slug: "g-m-truck-repairs",
        phone: "(03) 9077 5661",
        website: "https://gmtruckrepairs.com.au",
        address: "1/17 Barclay Road, Derrimut / Truganina VIC 3029",
        rating: 4.7,
        reviewCount: 42,
        tags: ["Prime Movers", "Brake & Clutch", "Engine Overhauls", "Heavy Fleet Maintenance"],
        editorialSummary: "Established heavy transport mechanical workshop equipped with heavy vehicle hoist bays for major rebuilds."
      },
      {
        name: "Road King Truck & Trailer Repairs",
        slug: "road-king-truck-repairs",
        phone: "0432 511 988",
        website: "https://roadkingtruckrepairs.com.au",
        address: "7B Amherst Drive, Truganina VIC 3029",
        rating: 4.8,
        reviewCount: 31,
        tags: ["24/7 Breakdown", "Trailer Maintenance", "Pneumatics", "Prime Movers"],
        editorialSummary: "Commercial truck and trailer repair centre operating round-the-clock for urgent roadside breakdowns."
      },
      {
        name: "CMV Truck & Bus Derrimut / Truganina",
        slug: "cmv-truck-bus-derrimut",
        phone: "(03) 9931 6000",
        website: "https://cmvtb.com.au",
        address: "392 Boundary Road, Derrimut / Truganina VIC 3026",
        rating: 4.5,
        reviewCount: 112,
        tags: ["Mack & Volvo Dealer", "UD Trucks", "Major Driveline", "24/7 Roadside Assistance"],
        editorialSummary: "State-of-the-art heavy commercial dealership featuring comprehensive drive-through service bays."
      },
      {
        name: "CMI Hino Melbourne",
        slug: "cmi-hino-melbourne",
        phone: "(03) 9931 6500",
        website: "https://cmihinomelbourne.com.au",
        address: "326 Boundary Road, Derrimut / Truganina VIC 3026",
        rating: 4.4,
        reviewCount: 76,
        tags: ["Hino Authorised", "Fleet Servicing", "Heavy Diagnostics", "Driveline Repairs"],
        editorialSummary: "Premier commercial vehicle centre with extensive heavy workshop capacity and transmission rebuilding."
      },
      {
        name: "D Bros Diesel Repairs",
        slug: "d-bros-diesel-repairs",
        phone: "0413 779 465",
        website: "https://dbrosdiesel.com.au",
        address: "44A Permas Way, Truganina VIC 3029",
        rating: 4.9,
        reviewCount: 24,
        tags: ["Mobile Field Service", "Diesel Injection", "B-Double Maintenance", "Hydraulics"],
        editorialSummary: "Independent heavy diesel specialist workshop and mobile service fleet handling prime movers and trailers."
      }
    ]
  },
  {
    state: "vic",
    suburb: "laverton-north",
    postcode: "3026",
    lat: -37.8285,
    lng: 144.802,
    lga: "City of Hobsons Bay",
    corridor: "Princes Freeway / Western Ring Road Heavy Transport Precinct",
    arterials: ["Western Ring Road (M80)", "Princes Freeway (M1)", "Fitzgerald Road", "Boundary Road", "Kororoit Creek Road", "Cherry Lane"],
    localOverview: "Laverton North is the critical industrial throat linking Melbourne's western manufacturing base directly to the Port of Melbourne and the Western Ring Road.",
    nearbySuburbs: [
      { name: "Truganina", slug: "truganina" },
      { name: "Brooklyn", slug: "brooklyn" },
      { name: "Derrimut", slug: "derrimut" },
      { name: "Altona North", slug: "altona-north" }
    ],
    businesses: [
      {
        name: "Modern Truck & Trailer Repairs",
        slug: "modern-truck-and-trailer-repairs",
        phone: "(03) 9369 2277",
        website: "https://moderntruckrepairs.com.au",
        address: "33-39 Cherry Lane, Laverton North VIC 3026",
        rating: 4.6,
        reviewCount: 34,
        tags: ["24/7 Breakdown", "Heavy Towing & Recovery", "Trailer Repairs", "Chassis Straightening"],
        editorialSummary: "Complete heavy vehicle mechanical and crash facility providing 24/7 heavy recovery and driveline repair."
      },
      {
        name: "Trackright 3 (AMA Group Heavy Vehicle)",
        slug: "trackright-3-ama-group",
        phone: "(03) 8311 9399",
        website: "https://amagroupltd.com",
        address: "105 William Angliss Drive, Laverton North VIC 3026",
        rating: 4.5,
        reviewCount: 29,
        tags: ["Heavy Commercial Fleet", "Laser Wheel Alignment", "Chassis Straightening", "Prime Movers"],
        editorialSummary: "Industrial-grade heavy vehicle engineering facility servicing commercial transport and defense logistics."
      },
      {
        name: "Adtrans Truck Centre IVECO",
        slug: "adtrans-truck-centre-iveco",
        phone: "(03) 9126 3046",
        website: "https://adtranstrucks.com.au",
        address: "Corner Raymond & Boundary Road, Laverton North VIC 3026",
        rating: 4.3,
        reviewCount: 47,
        tags: ["OEM Certified", "Cummins Powertrain", "Heavy Diagnostics", "Logbook Servicing"],
        editorialSummary: "Authorized heavy transport dealership workshop providing factory-certified diagnostics and overhauls."
      },
      {
        name: "Truck Fix West",
        slug: "truck-fix-west",
        phone: "0451 000 034",
        website: "https://truckfix.com.au",
        address: "2/5 Supertron Court, Laverton North VIC 3026",
        rating: 4.9,
        reviewCount: 37,
        tags: ["24/7 Onsite & Breakdown", "Mobile Mechanics", "Trailer Servicing", "Prime Movers"],
        editorialSummary: "Dedicated 24/7 onsite heavy diesel breakdown team and workshop servicing prime movers and trailers."
      },
      {
        name: "Callaway Diesel",
        slug: "callaway-diesel",
        phone: "(03) 9364 7222",
        website: "https://callawaydiesel.com.au",
        address: "18-20 Gilbertson Road, Laverton North VIC 3026",
        rating: 4.7,
        reviewCount: 25,
        tags: ["Heavy Diesel Fitters", "Engine Overhauls", "Hydraulic Maintenance", "Transmission"],
        editorialSummary: "Family-owned heavy transport workshop catering to Class 3-9 prime movers and bulk carriers."
      },
      {
        name: "Austin Truck Bodies & Mechanical",
        slug: "austin-truck-bodies",
        phone: "(03) 9000 0228",
        website: "https://austintruckbodies.com.au",
        address: "4/11 Gilbertson Road, Laverton North VIC 3026",
        rating: 4.6,
        reviewCount: 28,
        tags: ["Commercial Body Repairs", "Heavy Mechanical", "Brakes & Suspension", "Hydraulics"],
        editorialSummary: "Specialist heavy commercial workshop providing structural repairs, chassis repairs, and pneumatic brakes."
      },
      {
        name: "GM Truck Repairs Laverton Workshop",
        slug: "gm-truck-repairs-laverton",
        phone: "(03) 9077 5661",
        website: "https://gmtruckrepairs.com.au",
        address: "59A Patch Circuit, Laverton North VIC 3026",
        rating: 4.8,
        reviewCount: 39,
        tags: ["European & Japanese Trucks", "Engine Rebuilds", "Pre-Purchase Inspections", "24/7 Urgent Repair"],
        editorialSummary: "High-capacity heavy vehicle facility specializing in European and Japanese linehaul trucks."
      }
    ]
  },
  {
    state: "vic",
    suburb: "campbellfield",
    postcode: "3061",
    lat: -37.6698,
    lng: 144.9567,
    lga: "City of Hume",
    corridor: "Hume Freeway (M31) Northern Freight Gateway",
    arterials: ["Hume Highway (A31)", "M80 Western Ring Road", "Somerton Road", "Cooper Street", "Sydney Road", "Rex Road"],
    localOverview: "Campbellfield is Melbourne's northern road freight capital, anchoring the start of the Sydney-Melbourne interstate highway corridor.",
    nearbySuburbs: [
      { name: "Somerton", slug: "somerton" },
      { name: "Broadmeadows", slug: "broadmeadows" },
      { name: "Epping", slug: "epping" },
      { name: "Roxburgh Park", slug: "roxburgh-park" }
    ],
    businesses: [
      {
        name: "Victorian Diesel Services",
        slug: "victorian-diesel-services",
        phone: "(03) 9303 9989",
        website: "https://victoriandiesel.com.au",
        address: "7-9 Somerton Road, Campbellfield VIC 3061",
        rating: 4.8,
        reviewCount: 51,
        tags: ["VicRoads Heavy Vehicle Tester", "Buses & Coaches", "Prime Movers", "Electronic Diagnostics"],
        editorialSummary: "Accredited VicRoads Heavy Vehicle Roadworthy Tester with over 20 years of commercial road transport expertise."
      },
      {
        name: "Northern Truck Services",
        slug: "northern-truck-services",
        phone: "(03) 9308 6944",
        website: "https://northerntruckservices.com.au",
        address: "3/1745 Hume Highway, Campbellfield VIC 3061",
        rating: 4.7,
        reviewCount: 36,
        tags: ["Hume Highway Corridor", "Diesel Engine Overhauls", "Hydraulics", "Fleet Servicing"],
        editorialSummary: "Prime roadside positioning directly on the Hume Highway providing immediate staging and major overhauls."
      },
      {
        name: "ADM Truck Diesel Mechanic",
        slug: "adm-truck-diesel-mechanic",
        phone: "0404 682 600",
        website: "https://admtruckdieselmechanic.com.au",
        address: "13 Killara Road, Campbellfield VIC 3061",
        rating: 4.9,
        reviewCount: 44,
        tags: ["24/7 Breakdown", "Mobile Diesel Mechanics", "Prime Movers", "Roadside Callout"],
        editorialSummary: "Specialist heavy diesel mechanical shop and dedicated 24/7 roadside emergency breakdown unit."
      },
      {
        name: "1 Stop Truck Repairs",
        slug: "1-stop-truck-repairs",
        phone: "0402 040 087",
        website: "https://1stoptruckrepairs.com.au",
        address: "15-17 Colbert Road, Campbellfield VIC 3061",
        rating: 4.7,
        reviewCount: 28,
        tags: ["Engine Reconditioning", "Brake Overhauls", "Hydraulics", "Heavy Transmission"],
        editorialSummary: "Dedicated heavy vehicle workshop offering engine rebuilds, clutch and gearbox overhauls."
      },
      {
        name: "European Truck Repairs",
        slug: "european-truck-repairs",
        phone: "(03) 9305 3014",
        website: "https://europeantruckrepairs.com.au",
        address: "257 Rex Road, Campbellfield VIC 3061",
        rating: 4.8,
        reviewCount: 33,
        tags: ["Scania & Volvo Specialists", "VicRoads RWC", "Full Engine Rebuilds", "Electronic Diagnostics"],
        editorialSummary: "Accredited heavy vehicle workshop specializing in European linehaul prime movers."
      },
      {
        name: "Campbellfield Trailer Services",
        slug: "campbellfield-trailer-services",
        phone: "(03) 9308 6032",
        website: "https://campbellfieldtrailerservices.com.au",
        address: "16 Production Drive, Campbellfield VIC 3061",
        rating: 4.6,
        reviewCount: 29,
        tags: ["Chassis & Trailer Straightening", "Roadside Recovery", "Air Brakes", "Fleet Maintenance"],
        editorialSummary: "Heavy commercial trailer and chassis specialists providing fixed-price fleet maintenance and structural repair."
      },
      {
        name: "Campbellfield Truck Services",
        slug: "campbellfield-truck-services",
        phone: "0409 433 348",
        website: "https://campbellfieldtrucks.com.au",
        address: "Unit 1, 1745 Sydney Road, Campbellfield VIC 3061",
        rating: 4.6,
        reviewCount: 22,
        tags: ["Linehaul Staging", "Brake Relining", "Suspension", "Preventative Servicing"],
        editorialSummary: "Roadside commercial truck mechanical repairer situated directly along the Sydney Road/Hume corridor."
      }
    ]
  },
  {
    state: "vic",
    suburb: "dandenong-south",
    postcode: "3175",
    lat: -38.0167,
    lng: 145.225,
    lga: "City of Greater Dandenong",
    corridor: "South-Eastern Industrial & Gippsland Freight Corridor",
    arterials: ["EastLink (M3)", "South Gippsland Freeway (M420)", "Princes Freeway (M1)", "Frankston-Dandenong Road", "Hammond Road", "Ordish Road"],
    localOverview: "Dandenong South is Victoria's manufacturing heartland and the vital freight nexus for south-eastern Victoria, Mornington Peninsula, and Gippsland.",
    nearbySuburbs: [
      { name: "Dandenong", slug: "dandenong" },
      { name: "Lyndhurst", slug: "lyndhurst" },
      { name: "Keysborough", slug: "keysborough" },
      { name: "Carrum Downs", slug: "carrum-downs" }
    ],
    businesses: [
      {
        name: "TRUCK TECH Dandenong",
        slug: "truck-tech-dandenong",
        phone: "1800 491 700",
        website: "https://truck-tech.com.au",
        address: "1/133 Ordish Road, Dandenong South VIC 3175",
        rating: 4.9,
        reviewCount: 63,
        tags: ["24/7 Breakdown", "Fleet Maintenance", "Extended Operating Hours", "Multi-Combination Rigs"],
        editorialSummary: "Tier-1 heavy fleet specialist operating workshop bays from 6:00 AM to midnight Monday-Friday, supported by 24/7 roadside response."
      },
      {
        name: "Daimler Trucks Dandenong",
        slug: "daimler-trucks-dandenong",
        phone: "(03) 9791 6533",
        website: "https://daimlertrucksdandenong.com.au",
        address: "67-75 Princes Highway, Dandenong South VIC 3175",
        rating: 4.4,
        reviewCount: 95,
        tags: ["23-Bay Workshop", "24/7 Emergency Roadside", "Mercedes-Benz & Freightliner", "Detroit Diesel"],
        editorialSummary: "Expansive 23-bay factory-authorized dealership workshop equipped with diagnostic bays and 24-hour roadside assistance."
      },
      {
        name: "Truckrite Heavy Vehicle Repairs",
        slug: "truckrite-heavy-vehicle-repairs",
        phone: "(03) 9558 0200",
        website: "https://truckrite.com.au",
        address: "293-295 Hammond Road, Dandenong South VIC 3175",
        rating: 4.6,
        reviewCount: 41,
        tags: ["24/7 Roadside Assistance", "Chassis Alignment", "Prime Movers", "Major Accident Repairs"],
        editorialSummary: "Full-spectrum commercial road transport workshop featuring laser chassis alignment and mechanical driveline rebuilds."
      },
      {
        name: "DHT Transport Repairs Melbourne",
        slug: "dht-transport-repairs-melbourne",
        phone: "0475 123 505",
        website: "https://dhttr.com.au",
        address: "28 Mickle Street, Dandenong South VIC 3175",
        rating: 4.8,
        reviewCount: 27,
        tags: ["Mobile Breakdown", "Prime Movers", "Trailer Maintenance", "Diagnostics"],
        editorialSummary: "Independent commercial vehicle workshop and rapid mobile emergency service providing on-site diesel repairs."
      },
      {
        name: "NewWays Truck Service",
        slug: "newways-truck-service",
        phone: "0451 539 299",
        website: "https://newwaystruckservice.com.au",
        address: "Unit 3, 21-23 Swift Way, Dandenong South VIC 3175",
        rating: 4.8,
        reviewCount: 35,
        tags: ["Engine & Transmission Overhauls", "DPF Maintenance", "Brake Overhauls", "Medium & Heavy"],
        editorialSummary: "With over 30 years in heavy transport, reconditions diesel engines and overhauls heavy transmissions."
      },
      {
        name: "Innovative Truck Centre",
        slug: "innovative-truck-centre",
        phone: "(03) 9706 5646",
        website: "https://innovativetruckcentre.com.au",
        address: "Unit 2/6 Park Drive, Dandenong South VIC 3175",
        rating: 4.7,
        reviewCount: 31,
        tags: ["Drivetrain Overhaul", "Auto Electrical & Diagnostics", "Steering & Suspension", "Brake Systems"],
        editorialSummary: "Comprehensive heavy truck maintenance and engineering center offering precision engine troubleshooting."
      },
      {
        name: "Royans Dandenong",
        slug: "royans-dandenong",
        phone: "(03) 9768 2366",
        website: "https://royans.com.au",
        address: "15-17 Southlink, Dandenong South VIC 3175",
        rating: 4.6,
        reviewCount: 44,
        tags: ["24/7 Accident Response", "Heavy Chassis Straightening", "Commercial Fleet Repairs", "Trailer Rebuilds"],
        editorialSummary: "Heavy commercial road transport specialist offering full structural chassis realignment and 24/7 accident recovery."
      }
    ]
  },
  {
    state: "vic",
    suburb: "bayswater",
    postcode: "3153",
    lat: -37.8465,
    lng: 145.271,
    lga: "City of Knox",
    corridor: "Eastern Ring Freight Corridor & Maroondah Industrial Hub",
    arterials: ["EastLink (M3)", "Mountain Highway", "Canterbury Road", "Stud Road", "Dorset Road", "Scoresby Road"],
    localOverview: "Bayswater is eastern Melbourne's largest industrial concentration, serving advanced manufacturing, aggregate quarries, and heavy waste compactor fleets.",
    nearbySuburbs: [
      { name: "Bayswater North", slug: "bayswater-north" },
      { name: "Kilsyth", slug: "kilsyth" },
      { name: "Boronia", slug: "boronia" },
      { name: "Wantirna", slug: "wantirna" }
    ],
    businesses: [
      {
        name: "Eastern Heavy Workshop",
        slug: "eastern-heavy-workshop",
        phone: "(03) 8727 7509",
        website: "https://easternheavyworkshop.com.au",
        address: "7-9 Waldheim Road, Bayswater VIC 3153",
        rating: 4.8,
        reviewCount: 38,
        tags: ["Class 3-9 Heavy Vehicles", "Prime Movers", "Brake & Suspension", "Diesel Diagnostics"],
        editorialSummary: "Dedicated heavy transport and diesel mechanical workshop catering to medium and heavy trucks and trailers."
      },
      {
        name: "Truck & Compaction Services",
        slug: "truck-and-compaction-services",
        phone: "(03) 9720 7968",
        website: "https://tcscentre.com.au",
        address: "Unit 1/21 Jersey Road, Bayswater VIC 3153",
        rating: 4.7,
        reviewCount: 31,
        tags: ["VACC Member", "Waste Compactor Fleets", "Heavy Hydraulics", "Roadworthy Testing"],
        editorialSummary: "More than 60 years of combined mechanical expertise servicing heavy commercial trucks and waste compactors."
      },
      {
        name: "R & G Truck Repairs",
        slug: "r-and-g-truck-repairs",
        phone: "(03) 9762 2158",
        website: "https://rg-truckrepairs.com.au",
        address: "Unit 1/56 Barry Street, Bayswater VIC 3153",
        rating: 4.9,
        reviewCount: 22,
        tags: ["Commercial Fleets", "Buses & Trucks", "Engine Overhauls", "Brake Relining"],
        editorialSummary: "Specialist heavy transport mechanics offering comprehensive diesel maintenance for freight operators and bus fleets."
      },
      {
        name: "Royans Bayswater / Melbourne",
        slug: "royans-bayswater",
        phone: "(03) 9737 2444",
        website: "https://royans.com.au",
        address: "14 Royan Place, Bayswater North VIC 3153",
        rating: 4.6,
        reviewCount: 42,
        tags: ["Commercial Smash Repairs", "Laser Alignment", "Heavy Chassis", "24/7 Breakdown Response"],
        editorialSummary: "Commercial vehicle accident repair center providing laser chassis straightening and emergency accident response."
      },
      {
        name: "Big Rig Diesel Repairs",
        slug: "big-rig-diesel-repairs",
        phone: "(03) 9720 9867",
        website: "https://bigrigdiesel.com.au",
        address: "292 Canterbury Road, Bayswater North VIC 3153",
        rating: 4.8,
        reviewCount: 29,
        tags: ["Prime Movers", "Engine Rebuilds", "Driveline Overhauls", "Heavy Commercial Diesel"],
        editorialSummary: "Heavy diesel specialist providing full engine reconditioning and in-chassis rebuilds (Detroit, Cummins, CAT)."
      },
      {
        name: "Rankin Diesel Injection Service",
        slug: "rankin-diesel-injection",
        phone: "(03) 9762 9133",
        website: "https://rankindiesel.com.au",
        address: "2/6 Melrich Road, Bayswater VIC 3153",
        rating: 4.7,
        reviewCount: 36,
        tags: ["Bosch & Denso Authorised", "Common Rail Injection", "Diesel Diagnostics", "Turbocharger Servicing"],
        editorialSummary: "VACC accredited heavy diesel fuel injection specialists providing common rail injector testing and tuning."
      }
    ]
  },
  {
    state: "vic",
    suburb: "seymour",
    postcode: "3660",
    lat: -37.0305,
    lng: 145.1375,
    lga: "Shire of Mitchell",
    corridor: "Hume Freeway (M31) / Goulburn Valley Freight Junction",
    arterials: ["Hume Freeway (M31)", "Goulburn Valley Highway (A39)", "Seymour-Tooborac Road", "Emily Street", "Highlands Road"],
    localOverview: "Seymour is the pivotal central Victorian freight junction where the Hume Freeway bifurcates into the Goulburn Valley Highway.",
    nearbySuburbs: [
      { name: "Avenel", slug: "avenel" },
      { name: "Tallarook", slug: "tallarook" },
      { name: "Broadford", slug: "broadford" },
      { name: "Nagambie", slug: "nagambie" }
    ],
    businesses: [
      {
        name: "MH Truck and Trailer Repairs",
        slug: "mh-truck-and-trailer-repairs",
        phone: "0448 922 798",
        website: "https://mhtruckandtrailerrepairs.com.au",
        address: "55 Highlands Road, Seymour VIC 3660",
        rating: 4.9,
        reviewCount: 46,
        tags: ["24/7 Roadside Assistance", "B-Double Yard", "Hume Corridor Breakdown", "Semi-Trailer Servicing"],
        editorialSummary: "Purpose-built heavy transport facility with yard accommodating B-doubles and 24/7 roadside emergency breakdown."
      },
      {
        name: "Seymour & District Diesel Repairs",
        slug: "seymour-and-district-diesel-repairs",
        phone: "(03) 5799 1160",
        website: "https://seymourdieselepairs.com.au",
        address: "100 Dysart Road, Seymour VIC 3660",
        rating: 4.6,
        reviewCount: 29,
        tags: ["Diesel Specialists", "Agricultural & Transport", "Mechanical Overhauls", "Fuel Injection"],
        editorialSummary: "Regional heavy diesel specialists providing engine diagnosis and common rail injection testing."
      },
      {
        name: "Mac's Diesel Service",
        slug: "macs-diesel",
        phone: "0417 356 751",
        website: "https://macsdiesel.com.au",
        address: "Rear 30 High Street, Seymour VIC 3660",
        rating: 4.8,
        reviewCount: 19,
        tags: ["Heavy Commercial Diesel", "Emergency Breakdown", "Air Brakes", "Drivetrain"],
        editorialSummary: "Locally renowned heavy mechanical repairer delivering dependable diesel repairs and air brake relining."
      },
      {
        name: "Clerkin Heavy Mechanical Repairs",
        slug: "clerkin-heavy-mechanical",
        phone: "0419 568 281",
        website: "https://clerkinheavyrepairs.com.au",
        address: "Seymour & Mitchell Shire Corridor VIC 3660",
        rating: 4.9,
        reviewCount: 23,
        tags: ["Mobile Field Service", "24/7 Breakdown", "Earthmoving & Haulage", "Hydraulics"],
        editorialSummary: "Mobile heavy mechanical field service unit equipped with diagnostic laptops and hose crimping gear."
      },
      {
        name: "Brenmak Industries Heavy Mechanical",
        slug: "brenmak-industries",
        phone: "0487 824 401",
        website: "https://brenmakindustries.com.au",
        address: "Industrial Precinct, Seymour VIC 3660",
        rating: 4.7,
        reviewCount: 18,
        tags: ["Heavy Fleet Maintenance", "Chassis Fabrication", "Engine Overhauls", "Hydraulic Overhauls"],
        editorialSummary: "Engineering and heavy mechanical workshop handling transport trailers and driveline overhauls."
      },
      {
        name: "Seymour Tyre & Heavy Mechanical",
        slug: "seymour-heavy-mechanical",
        phone: "(03) 5756 3630",
        website: "https://seymourmechanical.com.au",
        address: "3/45 Wallis Street, Seymour VIC 3660",
        rating: 4.7,
        reviewCount: 34,
        tags: ["Commercial Truck Servicing", "Suspension & Steering", "Air Brakes", "Driveline"],
        editorialSummary: "Heavy commercial mechanical bay servicing regional freight trucks and emergency defect rectifications."
      }
    ]
  },
  {
    state: "vic",
    suburb: "wodonga",
    postcode: "3690",
    lat: -36.1241,
    lng: 146.8887,
    lga: "City of Wodonga",
    corridor: "Sydney–Melbourne Hume Trans-Border Freight Corridor",
    arterials: ["Hume Freeway (M31)", "Murray Valley Highway (B400)", "Bandiana Link Road", "Lincoln Causeway", "McKoy Street", "Melbourne Road"],
    localOverview: "Wodonga is Victoria's strategic trans-border road transport capital on the Murray River, marking the busiest heavy vehicle crossing in the Southern Hemisphere.",
    nearbySuburbs: [
      { name: "Albury", slug: "albury" },
      { name: "Baranduda", slug: "baranduda" },
      { name: "Barnawartha", slug: "barnawartha" },
      { name: "Bandiana", slug: "bandiana" }
    ],
    businesses: [
      {
        name: "Twin City Truck Centre",
        slug: "twin-city-truck-centre",
        phone: "(02) 6049 8888",
        website: "https://twincitytruckcentre.com.au",
        address: "25 McKoy Street, Wodonga VIC 3690",
        rating: 4.5,
        reviewCount: 78,
        tags: ["Kenworth & DAF Dealer", "24/7 Breakdown Hotline", "Major Driveline Overhaul", "PACCAR Parts"],
        editorialSummary: "Major heavy commercial dealership and service facility on the Hume Freeway with master Cummins and PACCAR technicians."
      },
      {
        name: "CMV Truck & Bus Wodonga",
        slug: "cmv-truck-bus-wodonga",
        phone: "(02) 6042 1900",
        website: "https://cmvtb.com.au",
        address: "221 McKoy Street, West Wodonga VIC 3690",
        rating: 4.6,
        reviewCount: 65,
        tags: ["Volvo, Mack & UD Dealer", "24/7 Roadside Callout", "Computerized Diagnostics", "Trans-Border Hub"],
        editorialSummary: "Premier border dealership featuring drive-through bays, certified Volvo and Mack technicians, and 24/7 callouts."
      },
      {
        name: "Heavy Mechanics Wodonga",
        slug: "heavy-mechanics-wodonga",
        phone: "(02) 6056 0055",
        website: "https://heavymechanicswodonga.com.au",
        address: "6 Kane Road, Wodonga VIC 3690",
        rating: 4.7,
        reviewCount: 42,
        tags: ["Prime Movers", "Trailer Maintenance", "Driveline Overhauls", "Fleet Servicing"],
        editorialSummary: "Independent heavy transport workshop equipped for multi-combination freight rigs."
      },
      {
        name: "The Haire Truck & Bus Repairs",
        slug: "the-haire-truck-bus-repairs",
        phone: "(02) 6056 2399",
        website: "https://thehairetruckandbusrepairs.com.au",
        address: "9B Moloney Drive, Wodonga VIC 3690",
        rating: 4.8,
        reviewCount: 31,
        tags: ["In-House Driveline", "Air Bag Suspension Kits", "Buses & Prime Movers", "Hydraulics"],
        editorialSummary: "Full-service heavy vehicle mechanical engineering center specializing in driveline and suspension."
      },
      {
        name: "Wyatt Mechanical Heavy Vehicle Repairs",
        slug: "wyatt-mechanical",
        phone: "0458 651 637",
        website: "https://wyattmechanical.com.au",
        address: "17 Chapple Street / Mobile Fleet, Wodonga VIC 3690",
        rating: 4.9,
        reviewCount: 35,
        tags: ["Mobile Field Service", "Heavy Hydraulics", "ECU Diagnostics", "24/7 Breakdown Callout"],
        editorialSummary: "Mobile heavy diesel mechanics providing 24/7 emergency highway breakdown rescue across the border."
      },
      {
        name: "Royans Wodonga",
        slug: "royans-wodonga",
        phone: "(02) 6059 1111",
        website: "https://royans.com.au",
        address: "22 Muller Street, Baranduda / Wodonga VIC 3691",
        rating: 4.6,
        reviewCount: 38,
        tags: ["24/7 Accident Response", "Chassis Straightening", "Heavy Commercial Repairs", "Trailer Rebuilds"],
        editorialSummary: "Heavy commercial road transport specialist offering 24/7 emergency accident assistance and laser alignment."
      },
      {
        name: "Prestige Truck Repairs Wodonga",
        slug: "prestige-truck-repairs",
        phone: "(02) 6040 9883",
        website: "https://prestigetruckrepairs.com.au",
        address: "8-12 Hovell Street, Wodonga VIC 3690",
        rating: 4.7,
        reviewCount: 29,
        tags: ["Fleet Logbook Servicing", "Brake & Clutch", "Engine Reconditioning", "Diesel Diagnostics"],
        editorialSummary: "Commercial fleet and heavy diesel workshop providing comprehensive logbook maintenance and engine overhauls."
      }
    ]
  },
  {
    state: "vic",
    suburb: "ballarat",
    postcode: "3350",
    lat: -37.5622,
    lng: 143.8503,
    lga: "City of Ballarat",
    corridor: "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    arterials: ["Western Freeway (M8)", "Midland Highway (A300)", "Glenelg Highway (B160)", "Sunraysia Highway (B220)", "Wiltshire Lane", "Learmonth Road"],
    localOverview: "Ballarat is the premier western Victorian regional transport hub situated on the Melbourne-Adelaide logistics corridor.",
    nearbySuburbs: [
      { name: "Wendouree", slug: "wendouree" },
      { name: "Delacombe", slug: "delacombe" },
      { name: "Alfredton", slug: "alfredton" },
      { name: "Mitchell Park", slug: "mitchell-park" }
    ],
    businesses: [
      {
        name: "Daimler Trucks Ballarat",
        slug: "daimler-trucks-ballarat",
        phone: "(03) 5335 0101",
        website: "https://daimlertrucksballarat.com.au",
        address: "36 Grandlee Drive, Wendouree / Ballarat VIC 3355",
        rating: 4.5,
        reviewCount: 62,
        tags: ["24/7 Emergency Roadside", "Mercedes-Benz & Freightliner", "Detroit & Cummins", "Authorised OEM"],
        editorialSummary: "Certified commercial dealership and heavy vehicle service centre on the Western Freeway with 24/7 roadside assistance."
      },
      {
        name: "Ballarat Commercial Service Centre (BCSC)",
        slug: "ballarat-commercial-service-centre",
        phone: "(03) 5322 4674",
        website: "https://ballaratcsc.com.au",
        address: "15-17 Production Drive, Alfredton / Ballarat VIC 3350",
        rating: 4.8,
        reviewCount: 47,
        tags: ["Fleet Maintenance", "Kenworth & Volvo Specialists", "Brake & Suspension", "Major Overhauls"],
        editorialSummary: "Specialist heavy transport service hub dedicated to minimizing fleet downtime for linehaul prime movers."
      },
      {
        name: "Ballarat Truck Centre",
        slug: "ballarat-truck-centre",
        phone: "(03) 5335 7705",
        website: "https://ballarattruckcentre.com.au",
        address: "22 Wiltshire Lane, Delacombe / Ballarat VIC 3356",
        rating: 4.7,
        reviewCount: 33,
        tags: ["American & European Trucks", "Trailer Rebuilds", "Roadworthy Testing", "Drivetrain Service"],
        editorialSummary: "Long-standing heavy transport workshop serving American and European road freight fleets."
      },
      {
        name: "SOS Heavy Transport and Mechanical Maintenance",
        slug: "sos-heavy-transport-and-mechanical-maintenance",
        phone: "0493 208 217",
        website: "https://servicesonsite.com.au",
        address: "Ballarat & Western Victoria Region VIC 3350",
        rating: 4.9,
        reviewCount: 26,
        tags: ["24/7 Mobile Breakdown", "Onsite Field Service", "Prime Movers", "Western Highway Corridor"],
        editorialSummary: "On-demand 24/7 mobile heavy diesel maintenance service attending highway breakdowns across Western Victoria."
      },
      {
        name: "Lennox Contracting Heavy Mechanical",
        slug: "lennox-contracting",
        phone: "0412 180 000",
        website: "https://lennoxcontractingballarat.com.au",
        address: "2 Wiltshire Lane, Delacombe / Ballarat VIC 3356",
        rating: 4.8,
        reviewCount: 30,
        tags: ["Heavy Earthmoving & Transport", "Hydraulic Hose Repairs", "Engine Fault Finding", "Onsite Field Fitters"],
        editorialSummary: "Heavy equipment and commercial transport workshop delivering diagnostics and transmission repairs."
      },
      {
        name: "Ballarat Roadworthy & Diesel Centre",
        slug: "ballarat-roadworthy-centre",
        phone: "(03) 4309 4011",
        website: "https://ballaratroadworthy.com",
        address: "35 Martin Drive, Delacombe / Ballarat VIC 3356",
        rating: 4.6,
        reviewCount: 38,
        tags: ["VicRoads Heavy Vehicle Tester", "Common Rail Diesel", "Brake Overhauls", "Fleet Compliance"],
        editorialSummary: "Accredited heavy vehicle testing station and diesel workshop providing comprehensive safety inspections."
      },
      {
        name: "Scobies Service Centre",
        slug: "scobies-service-centre",
        phone: "(03) 5334 2150",
        website: "https://scobiesservicecentre.com.au",
        address: "15 Caravan Street, Wendouree / Ballarat VIC 3355",
        rating: 4.7,
        reviewCount: 41,
        tags: ["Logging & Freight Trucks", "Mobile Repair Fleet", "Driveline Repairs", "Heavy Transport Since 1993"],
        editorialSummary: "Established heavy commercial repair facility servicing bulk transport, logging trucks, and regional hauliers."
      }
    ]
  },
  {
    state: "nsw",
    suburb: "albury",
    postcode: "2640",
    lat: -36.0737,
    lng: 146.9135,
    lga: "City of Albury",
    corridor: "Sydney–Melbourne Hume Trans-Border Freight Corridor",
    arterials: ["Hume Freeway (M31)", "Riverina Highway (B58)", "Davey Road Heavy Bypass", "Kiewa Street", "Wagga Road"],
    localOverview: "Albury is the northern gateway to the Murray River crossing on the Hume Freeway (M31). Operating seamlessly alongside Wodonga, it serves as the primary interstate logistics relay, changeover depot, and breakdown recovery centre for road trains, B-doubles, and prime movers travelling between Victoria and New South Wales.",
    nearbySuburbs: [
      { name: "Wodonga", slug: "wodonga" },
      { name: "Lavington", slug: "lavington" },
      { name: "Table Top", slug: "table-top" },
      { name: "Jindera", slug: "jindera" }
    ],
    businesses: [
      {
        name: "Hartwigs Albury Truck Centre",
        slug: "hartwigs-albury-truck-centre",
        phone: "(02) 6049 8200",
        website: "https://hartwigs.com.au",
        address: "180 Wagga Road, Lavington / Albury NSW 2641",
        rating: 4.6,
        reviewCount: 68,
        tags: ["Western Star & MAN Dealer", "24/7 Breakdown Assistance", "Detroit Diesel Specialist", "B-Double Drive-Through"],
        editorialSummary: "Major linehaul transport dealership and repair workshop on the northern approach of the Hume Highway."
      },
      {
        name: "Albury Heavy Truck Repairs",
        slug: "albury-heavy-truck-repairs",
        phone: "(02) 6040 3388",
        website: "https://alburyheavytrucks.com.au",
        address: "12 Kane Road / Hume Link, Albury NSW 2640",
        rating: 4.8,
        reviewCount: 39,
        tags: ["24/7 Roadside Rescue", "Air Brakes & Pneumatics", "Prime Movers", "Trailer Overhauls"],
        editorialSummary: "Dedicated heavy transport mechanical centre specializing in interstate linehaul maintenance and pneumatic air brake relining."
      },
      {
        name: "Border Diesel Care Albury",
        slug: "border-diesel-care-albury",
        phone: "0418 692 881",
        website: "https://borderdieselcare.com.au",
        address: "4 Fallon Street, Albury NSW 2640",
        rating: 4.9,
        reviewCount: 32,
        tags: ["Mobile Field Fitters", "24/7 Hume Corridor Rescue", "Fuel Injection Overhaul", "Hydraulic Hose Repairs"],
        editorialSummary: "Rapid-response mobile heavy diesel mechanics operating along the Hume Freeway from Albury north to Holbrook and Gundagai."
      }
    ]
  },
  {
    state: "sa",
    suburb: "bordertown",
    postcode: "5268",
    lat: -36.3134,
    lng: 140.7712,
    lga: "Tatiara District Council",
    corridor: "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    arterials: ["Dukes Highway (A8)", "Western Highway (A8 Corridor)", "Ngarkat Highway (B57)", "Cannawigara Road", "Pigeon Flat Road"],
    localOverview: "Bordertown is South Australia's eastern heavy freight gateway, situated directly on the Dukes Highway (A8 corridor) linking Melbourne to Adelaide. It is the vital border rest, refueling, and emergency breakdown checkpoint for B-doubles, livestock road trains, and grain tippers crossing the SA/Victoria state border.",
    nearbySuburbs: [
      { name: "Serviceton", slug: "serviceton" },
      { name: "Kaniva", slug: "kaniva" },
      { name: "Keith", slug: "keith" },
      { name: "Wolseley", slug: "wolseley" }
    ],
    businesses: [
      {
        name: "Tatiara Truck & Trailer",
        slug: "tatiara-truck-trailer",
        phone: "(08) 8752 0077",
        website: "https://tatiaratrucks.com.au",
        address: "10 Dukes Highway, Bordertown SA 5268",
        rating: 4.7,
        reviewCount: 54,
        tags: ["24/7 Breakdown Callout", "Dukes Highway Corridor", "Cummins & CAT Overhauls", "Road Train Yard"],
        editorialSummary: "Prominent heavy commercial dealership positioned on the Dukes Highway with 24-hour roadside highway rescue."
      },
      {
        name: "Border Mechanical & Diesel Services",
        slug: "border-mechanical-diesel-sa",
        phone: "0428 521 340",
        website: "https://bordermechanicalsa.com.au",
        address: "Lot 2 Industrial Estate, Bordertown SA 5268",
        rating: 4.8,
        reviewCount: 27,
        tags: ["24/7 Mobile Breakdown", "Grain & Livestock Haulage", "Pneumatic Air Brakes", "Trans-Border Callouts"],
        editorialSummary: "Heavy vehicle workshop and mobile field service covering the Western/Dukes Highway corridor across the state border."
      },
      {
        name: "Dukes Highway Heavy Diesel Repairs",
        slug: "dukes-highway-diesel-repairs",
        phone: "(08) 8752 1445",
        website: "https://dukesdieselrepairs.com.au",
        address: "45 South Terrace, Bordertown SA 5268",
        rating: 4.6,
        reviewCount: 21,
        tags: ["B-Double Servicing", "Emergency Driveline", "Roadworthy Inspections", "Common Rail Diagnostics"],
        editorialSummary: "Dedicated heavy commercial transport repairers offering scheduled linehaul servicing and breakdown support."
      }
    ]
  }
];

const dest = path.join(process.cwd(), 'src/data/suburbs.json');
fs.writeFileSync(dest, JSON.stringify(fullData, null, 2), 'utf8');
console.log('✓ Successfully wrote ' + fullData.length + ' hubs to ' + dest);
