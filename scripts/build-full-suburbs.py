import json
import os

hubs_data = [
  # -------------------------------------------------------------
  # VICTORIA METRO & REGIONAL
  # -------------------------------------------------------------
  {
    "state": "vic",
    "suburb": "truganina",
    "postcode": "3029",
    "lat": -37.8340,
    "lng": 144.7330,
    "lga": "City of Wyndham",
    "corridor": "Western Freight Corridor & Port Intermodal Gateway",
    "arterials": ["Western Freeway (M8)", "Princes Freeway (M1)", "Boundary Road", "Robinsons Road", "Palmers Road"],
    "localOverview": "Truganina is Victoria's primary modern logistics powerhouse, connecting the Port of Melbourne to national distribution centres with high-density B-double and Super B-double container movements.",
    "nearbySuburbs": [{"name": "Laverton North", "slug": "laverton-north"}, {"name": "Derrimut", "slug": "derrimut"}],
    "businesses": [
      {
        "name": "Daimler Trucks Laverton",
        "slug": "daimler-trucks-laverton",
        "phone": "(03) 9680 8777",
        "website": "https://daimlertruckslaverton.com.au",
        "address": "423 Boundary Road, Truganina VIC 3029",
        "rating": 4.4,
        "reviewCount": 88,
        "tags": ["24/7 Breakdown", "56-Bay Workshop", "Detroit & Cummins", "OEM Authorised"],
        "editorialSummary": "Massive 56-bay authorized heavy vehicle dealership and service centre specializing in Freightliner, Mercedes-Benz, and Fuso.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      },
      {
        "name": "Volscan Truck Repairs",
        "slug": "volscan-truck-repairs",
        "phone": "0432 026 507",
        "website": "#",
        "address": "41-43 Woods Road, Truganina VIC 3029",
        "rating": 4.8,
        "reviewCount": 39,
        "tags": ["Mobile Mechanics", "24/7 Breakdown", "Trailer Servicing"],
        "editorialSummary": "Specialized mobile heavy diesel repair fleet operating across western logistics corridors.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": False,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "vic",
    "suburb": "laverton-north",
    "postcode": "3026",
    "lat": -37.8285,
    "lng": 144.8020,
    "lga": "City of Hobsons Bay",
    "corridor": "Princes Freeway / Western Ring Road Heavy Transport Precinct",
    "arterials": ["Western Ring Road (M80)", "Princes Freeway (M1)", "Boundary Road", "Cherry Lane"],
    "localOverview": "Laverton North is the industrial throat linking Melbourne's manufacturing base to the Port of Melbourne and the Western Ring Road.",
    "nearbySuburbs": [{"name": "Truganina", "slug": "truganina"}, {"name": "Brooklyn", "slug": "brooklyn"}],
    "businesses": [
      {
        "name": "Modern Truck & Trailer Repairs",
        "slug": "modern-truck-and-trailer-repairs",
        "phone": "(03) 9369 2277",
        "website": "https://moderntruckrepairs.com.au",
        "address": "33-39 Cherry Lane, Laverton North VIC 3026",
        "rating": 4.6,
        "reviewCount": 34,
        "tags": ["24/7 Breakdown", "Heavy Towing & Recovery", "Chassis Straightening"],
        "editorialSummary": "Complete heavy vehicle mechanical and crash facility providing 24/7 heavy recovery and driveline repair.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      },
      {
        "name": "Trackright 3 (AMA Heavy Vehicle)",
        "slug": "trackright-3-ama-group",
        "phone": "(03) 8311 9399",
        "website": "#",
        "address": "105 William Angliss Drive, Laverton North VIC 3026",
        "rating": 4.5,
        "reviewCount": 29,
        "tags": ["Laser Wheel Alignment", "Chassis Straightening", "Prime Movers"],
        "editorialSummary": "Industrial-grade heavy vehicle engineering facility servicing commercial linehaul transport.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "vic",
    "suburb": "campbellfield",
    "postcode": "3061",
    "lat": -37.6698,
    "lng": 144.9567,
    "lga": "City of Hume",
    "corridor": "Hume Freeway (M31) Northern Freight Gateway",
    "arterials": ["Hume Highway (A31)", "M80 Western Ring Road", "Somerton Road", "Sydney Road"],
    "localOverview": "Campbellfield is Melbourne's northern road freight capital, anchoring the starting staging point of the Sydney–Melbourne interstate highway corridor.",
    "nearbySuburbs": [{"name": "Somerton", "slug": "somerton"}, {"name": "Broadmeadows", "slug": "broadmeadows"}],
    "businesses": [
      {
        "name": "Victorian Diesel Services",
        "slug": "victorian-diesel-services",
        "phone": "(03) 9303 9989",
        "website": "https://victoriandiesel.com.au",
        "address": "7-9 Somerton Road, Campbellfield VIC 3061",
        "rating": 4.8,
        "reviewCount: 51,
        "tags": ["VicRoads Heavy Vehicle Tester", "Prime Movers", "Electronic Diagnostics"],
        "editorialSummary": "Accredited VicRoads Heavy Vehicle Roadworthy Tester with over 20 years of commercial road transport expertise.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      },
      {
        "name": "Northern Truck Services",
        "slug": "northern-truck-services",
        "phone": "(03) 9308 6944",
        "website": "#",
        "address": "3/1745 Hume Highway, Campbellfield VIC 3061",
        "rating": 4.7,
        "reviewCount": 36,
        "tags": ["Hume Highway Corridor", "Engine Overhauls", "Hydraulics"],
        "editorialSummary": "Roadside heavy vehicle workshop located directly on the Hume Highway providing staging and mechanical rebuilds.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": False,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "vic",
    "suburb": "dandenong-south",
    "postcode": "3175",
    "lat": -38.0167,
    "lng": 145.2250,
    "lga": "City of Greater Dandenong",
    "corridor": "South-Eastern Industrial & Gippsland Freight Corridor",
    "arterials": ["EastLink (M3)", "South Gippsland Freeway (M420)", "Princes Freeway (M1)", "Hammond Road"],
    "localOverview": "Dandenong South is Victoria's manufacturing heartland and the vital freight nexus connecting south-eastern Melbourne to Gippsland.",
    "nearbySuburbs": [{"name": "Dandenong", "slug": "dandenong"}, {"name": "Keysborough", "slug": "keysborough"}],
    "businesses": [
      {
        "name": "TRUCK TECH Dandenong",
        "slug": "truck-tech-dandenong",
        "phone": "1800 491 700",
        "website": "https://truck-tech.com.au",
        "address": "1/133 Ordish Road, Dandenong South VIC 3175",
        "rating": 4.9,
        "reviewCount": 63,
        "tags": ["24/7 Breakdown", "Fleet Maintenance", "Multi-Combination Rigs"],
        "editorialSummary": "Tier-1 heavy fleet specialist operating workshop bays until midnight, backed by 24/7 roadside emergency response.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      },
      {
        "name": "Daimler Trucks Dandenong",
        "slug": "daimler-trucks-dandenong",
        "phone": "(03) 9791 6533",
        "website": "#",
        "address": "67-75 Princes Highway, Dandenong South VIC 3175",
        "rating": 4.4,
        "reviewCount": 95,
        "tags": ["23-Bay Workshop", "24/7 Roadside Assistance", "Freightliner & Mercedes-Benz"],
        "editorialSummary": "High-capacity 23-bay factory dealership with certified heavy driveline overhauls.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "vic",
    "suburb": "bayswater",
    "postcode": "3153",
    "lat": -37.8465,
    "lng": 145.2710,
    "lga": "City of Knox",
    "corridor": "Eastern Ring Freight Corridor & Maroondah Industrial Hub",
    "arterials": ["EastLink (M3)", "Mountain Highway", "Canterbury Road", "Dorset Road"],
    "localOverview": "Bayswater is eastern Melbourne's largest industrial concentration, serving advanced manufacturing, aggregate quarries, and waste fleets.",
    "nearbySuburbs": [{"name": "Boronia", "slug": "boronia"}, {"name": "Kilsyth", "slug": "kilsyth"}],
    "businesses": [
      {
        "name": "Eastern Heavy Workshop",
        "slug": "eastern-heavy-workshop",
        "phone": "(03) 8727 7509",
        "website": "#",
        "address": "7-9 Waldheim Road, Bayswater VIC 3153",
        "rating": 4.8,
        "reviewCount": 38,
        "tags": ["Prime Movers", "Brake & Suspension", "Diesel Diagnostics"],
        "editorialSummary": "Dedicated heavy transport mechanical workshop catering to medium and heavy trucks and trailers.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": False,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "vic",
    "suburb": "seymour",
    "postcode": "3660",
    "lat": -37.0305,
    "lng": 145.1375,
    "lga": "Shire of Mitchell",
    "corridor": "Hume Freeway (M31) / Goulburn Valley Freight Junction",
    "arterials": ["Hume Freeway (M31)", "Goulburn Valley Highway (A39)", "Emily Street"],
    "localOverview": "Seymour is the pivotal central Victorian freight junction where the Hume Freeway bifurcates into the Goulburn Valley Highway.",
    "nearbySuburbs": [{"name": "Broadford", "slug": "broadford"}, {"name": "Avenel", "slug": "avenel"}],
    "businesses": [
      {
        "name": "MH Truck and Trailer Repairs",
        "slug": "mh-truck-and-trailer-repairs",
        "phone": "0448 922 798",
        "website": "#",
        "address": "55 Highlands Road, Seymour VIC 3660",
        "rating": 4.9,
        "reviewCount": 46,
        "tags": ["24/7 Roadside Assistance", "B-Double Yard", "Hume Corridor Breakdown"],
        "editorialSummary": "Purpose-built heavy transport facility with yard accommodating B-doubles and 24/7 roadside emergency breakdown.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "vic",
    "suburb": "wodonga",
    "postcode": "3690",
    "lat": -36.1241,
    "lng": 146.8887,
    "lga": "City of Wodonga",
    "corridor": "Sydney–Melbourne Hume Trans-Border Freight Corridor",
    "arterials": ["Hume Freeway (M31)", "Murray Valley Highway (B400)", "McKoy Street"],
    "localOverview": "Wodonga is Victoria's strategic trans-border road transport capital on the Murray River, marking the busiest heavy vehicle border crossing in Australia.",
    "nearbySuburbs": [{"name": "Albury", "slug": "albury"}, {"name": "Barnawartha", "slug": "barnawartha"}],
    "businesses": [
      {
        "name": "Twin City Truck Centre",
        "slug": "twin-city-truck-centre",
        "phone": "(02) 6049 8888",
        "website": "#",
        "address": "25 McKoy Street, Wodonga VIC 3690",
        "rating": 4.5,
        "reviewCount": 78,
        "tags": ["Kenworth & DAF Dealer", "24/7 Breakdown Hotline", "PACCAR Parts"],
        "editorialSummary": "Major heavy commercial dealership and service facility on the Hume Freeway with master Cummins technicians.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": True,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "vic",
    "suburb": "ballarat",
    "postcode": "3350",
    "lat": -37.5622,
    "lng": 143.8503,
    "lga": "City of Ballarat",
    "corridor": "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    "arterials": ["Western Freeway (M8)", "Midland Highway (A300)", "Learmonth Road"],
    "localOverview": "Ballarat is the premier western Victorian regional transport hub situated on the Melbourne–Adelaide logistics corridor.",
    "nearbySuburbs": [{"name": "Wendouree", "slug": "wendouree"}, {"name": "Horsham", "slug": "horsham"}],
    "businesses": [
      {
        "name": "Daimler Trucks Ballarat",
        "slug": "daimler-trucks-ballarat",
        "phone": "(03) 5335 0101",
        "website": "#",
        "address": "36 Grandlee Drive, Wendouree VIC 3355",
        "rating": 4.5,
        "reviewCount": 62,
        "tags": ["24/7 Emergency Roadside", "Mercedes-Benz & Freightliner"],
        "editorialSummary": "Certified commercial dealership and heavy vehicle service centre on the Western Freeway with 24/7 roadside assistance.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "vic",
    "suburb": "horsham",
    "postcode": "3400",
    "lat": -36.7118,
    "lng": 142.1989,
    "lga": "Rural City of Horsham",
    "corridor": "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    "arterials": ["Western Highway (A8)", "Henty Highway (B200)", "Wimmera Highway (B240)"],
    "localOverview": "Horsham is the primary commercial capital of the Wimmera midway between Melbourne and Adelaide, supporting high-density grain and bulk freight.",
    "nearbySuburbs": [{"name": "Ballarat", "slug": "ballarat"}, {"name": "Nhill", "slug": "nhill"}],
    "businesses": [
      {
        "name": "Wimmera Truck Repairs",
        "slug": "wimmera-truck-repairs",
        "phone": "(03) 5382 6111",
        "website": "#",
        "address": "7 Golf Course Road, Horsham VIC 3400",
        "rating": 4.8,
        "reviewCount": 46,
        "tags": ["24/7 Breakdown Assistance", "Detroit & Cummins", "B-Double Cleared Yard"],
        "editorialSummary": "Premier heavy vehicle workshop on the Western Highway in Horsham with drive-through bays.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": True,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "vic",
    "suburb": "nhill",
    "postcode": "3418",
    "lat": -36.3328,
    "lng": 141.6508,
    "lga": "Shire of Hindmarsh",
    "corridor": "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    "arterials": ["Western Highway (A8)", "Nelson Street Heavy Staging"],
    "localOverview": "Nhill is the historic Melbourne–Adelaide changeover town 50km east of the SA border, catering to fatigue rest and mechanical relay.",
    "nearbySuburbs": [{"name": "Horsham", "slug": "horsham"}, {"name": "Bordertown", "slug": "bordertown"}],
    "businesses": [
      {
        "name": "Nhill Heavy Vehicle Mechanics",
        "slug": "nhill-heavy-vehicle-mechanics",
        "phone": "(03) 5391 1800",
        "website": "#",
        "address": "88 Nelson Street, Nhill VIC 3418",
        "rating": 4.8,
        "reviewCount": 28,
        "tags": ["24/7 Roadside Callout", "Driver Changeover Hub", "Air Brakes"],
        "editorialSummary": "Established heavy transport workshop positioned directly off the Western Highway with ample uncoupling space.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": True,
          "driveThroughBays": False,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },

  # -------------------------------------------------------------
  # NEW SOUTH WALES HUME CORRIDOR (M31 TO SYDNEY)
  # -------------------------------------------------------------
  {
    "state": "nsw",
    "suburb": "albury",
    "postcode": "2640",
    "lat": -36.0737,
    "lng": 146.9135,
    "lga": "City of Albury",
    "corridor": "Sydney–Melbourne Hume Trans-Border Freight Corridor",
    "arterials": ["Hume Freeway (M31)", "Riverina Highway (B58)", "Davey Road Heavy Bypass"],
    "localOverview": "Albury is the northern gateway to the Murray River crossing on the Hume Freeway, serving as a primary linehaul relay and staging hub.",
    "nearbySuburbs": [{"name": "Wodonga", "slug": "wodonga"}, {"name": "Holbrook", "slug": "holbrook"}],
    "businesses": [
      {
        "name": "Hartwigs Albury Truck Centre",
        "slug": "hartwigs-albury-truck-centre",
        "phone": "(02) 6049 8200",
        "website": "#",
        "address": "180 Wagga Road, Albury NSW 2641",
        "rating": 4.6,
        "reviewCount": 68,
        "tags": ["Western Star & MAN Dealer", "24/7 Breakdown Assistance"],
        "editorialSummary": "Major linehaul transport dealership on the northern approach of the Hume Highway.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "nsw",
    "suburb": "holbrook",
    "postcode": "2644",
    "lat": -35.7228,
    "lng": 147.3150,
    "lga": "Greater Hume Shire",
    "corridor": "Hume Freeway (M31) Sydney–Melbourne Trans-Border Corridor",
    "arterials": ["Hume Highway (M31)", "Albury Street", "Holbrook Bypass"],
    "localOverview": "Holbrook is the primary mid-riverina heavy vehicle staging post on the Hume Highway between Albury and Gundagai.",
    "nearbySuburbs": [{"name": "Albury", "slug": "albury"}, {"name": "Gundagai", "slug": "gundagai"}],
    "businesses": [
      {
        "name": "Holbrook Mechanical & Diesel Services",
        "slug": "holbrook-mechanical-diesel",
        "phone": "(02) 6036 2233",
        "website": "#",
        "address": "144 Albury Street, Holbrook NSW 2644",
        "rating": 4.8,
        "reviewCount": 31,
        "tags": ["24/7 Breakdown Assistance", "Prime Movers", "Air Brakes"],
        "editorialSummary": "Heavy commercial mechanical workshop located directly off the Hume Highway bypass.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "nsw",
    "suburb": "gundagai",
    "postcode": "2722",
    "lat": -35.0664,
    "lng": 148.1090,
    "lga": "Cootamundra-Gundagai Regional Council",
    "corridor": "Hume Freeway (M31) Sydney–Melbourne Trans-Border Corridor",
    "arterials": ["Hume Highway (M31)", "South Gundagai Heavy Truck Stop", "Sheridan Street"],
    "localOverview": "Gundagai is the historic linehaul midpoint between Sydney and Melbourne along the Murrumbidgee River with high-volume truck stops.",
    "nearbySuburbs": [{"name": "Holbrook", "slug": "holbrook"}, {"name": "Yass", "slug": "yass"}],
    "businesses": [
      {
        "name": "Gundagai Diesel Repairs & Roadside",
        "slug": "gundagai-diesel-repairs",
        "phone": "(02) 6944 1500",
        "website": "#",
        "address": "185 Sheridan Street, Gundagai NSW 2722",
        "rating": 4.7,
        "reviewCount": 44,
        "tags": ["24/7 Roadside Rescue", "Prime Movers", "Cummins Diagnostics"],
        "editorialSummary": "Comprehensive heavy diesel service centre catering to interstate linehaul prime movers.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "nsw",
    "suburb": "yass",
    "postcode": "2582",
    "lat": -34.8467,
    "lng": 148.9135,
    "lga": "Yass Valley Council",
    "corridor": "Hume Freeway (M31) Sydney–Melbourne Trans-Border Corridor",
    "arterials": ["Hume Highway (M31)", "Barton Highway (A25)", "Yass Valley Way"],
    "localOverview": "Yass is the critical strategic junction where the Hume Highway meets the Barton Highway connecting to Canberra.",
    "nearbySuburbs": [{"name": "Gundagai", "slug": "gundagai"}, {"name": "Goulburn", "slug": "goulburn"}],
    "businesses": [
      {
        "name": "Yass Valley Diesel Services",
        "slug": "yass-valley-diesel",
        "phone": "(02) 6226 2110",
        "website": "#",
        "address": "32 Laidlaw Street, Yass NSW 2582",
        "rating": 4.8,
        "reviewCount": 38,
        "tags": ["24/7 Breakdown", "Common Rail Diagnostics", "Air Systems"],
        "editorialSummary": "Full-service commercial vehicle workshop providing major engine diagnostics and 24-hour callouts.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": False,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "nsw",
    "suburb": "goulburn",
    "postcode": "2580",
    "lat": -34.7545,
    "lng": 149.7178,
    "lga": "Goulburn Mulwaree Council",
    "corridor": "Hume Freeway (M31) Sydney–Melbourne Trans-Border Corridor",
    "arterials": ["Hume Highway (M31)", "Federal Highway (M23)", "Finlay Road"],
    "localOverview": "Goulburn is the premier heavy transport powerhouse of the NSW Southern Tablelands supporting heavy dealerships and livestock fleets.",
    "nearbySuburbs": [{"name": "Yass", "slug": "yass"}, {"name": "Prestons", "slug": "prestons"}],
    "businesses": [
      {
        "name": "Southern Tablelands Truck Centre",
        "slug": "southern-tablelands-truck-centre",
        "phone": "(02) 4821 1888",
        "website": "#",
        "address": "10 Finlay Road, Goulburn NSW 2580",
        "rating": 4.6,
        "reviewCount": 72,
        "tags": ["Kenworth & DAF Service", "24/7 Roadside Hotline", "Cummins Master Technicians"],
        "editorialSummary": "Major heavy commercial workshop on the Hume Highway corridor featuring certified master technicians.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "nsw",
    "suburb": "prestons",
    "postcode": "2170",
    "lat": -33.9392,
    "lng": 150.8654,
    "lga": "City of Liverpool",
    "corridor": "Hume Freeway (M31) Sydney–Melbourne Trans-Border Corridor",
    "arterials": ["Hume Motorway (M31)", "Westlink M7", "M5 Motorway", "Kurrajong Road"],
    "localOverview": "Prestons is Sydney's southern industrial and logistics gatekeeper, marking the direct junction of the M31, M7, and M5 freight corridors.",
    "nearbySuburbs": [{"name": "Goulburn", "slug": "goulburn"}, {"name": "Campbelltown", "slug": "campbelltown"}],
    "businesses": [
      {
        "name": "Sydney South Truck Centre Prestons",
        "slug": "sydney-south-truck-centre-prestons",
        "phone": "(02) 9608 0100",
        "website": "#",
        "address": "15-19 Kurrajong Road, Prestons NSW 2170",
        "rating": 4.6,
        "reviewCount": 84,
        "tags": ["M31/M7 Gateway", "24/7 Breakdown Assistance", "Detroit & Cummins"],
        "editorialSummary": "Premier heavy vehicle dealership and mechanical facility strategically situated at the M31/M7 interchange.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": False,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },

  # -------------------------------------------------------------
  # SOUTH AUSTRALIA DUKES / WESTERN CORRIDOR (A8 TO ADELAIDE)
  # -------------------------------------------------------------
  {
    "state": "sa",
    "suburb": "bordertown",
    "postcode": "5268",
    "lat": -36.3134,
    "lng": 140.7712,
    "lga": "Tatiara District Council",
    "corridor": "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    "arterials": ["Dukes Highway (A8)", "Ngarkat Highway (B57)", "Pigeon Flat Road"],
    "localOverview": "Bordertown is South Australia's eastern heavy freight gateway on the Dukes Highway, serving as the border checkpoint for linehaul and road trains.",
    "nearbySuburbs": [{"name": "Nhill", "slug": "nhill"}, {"name": "Keith", "slug": "keith"}],
    "businesses": [
      {
        "name": "Tatiara Truck & Trailer",
        "slug": "tatiara-truck-trailer",
        "phone": "(08) 8752 0077",
        "website": "#",
        "address": "10 Dukes Highway, Bordertown SA 5268",
        "rating": 4.7,
        "reviewCount": 54,
        "tags": ["24/7 Breakdown Callout", "Dukes Highway Corridor", "Road Train Yard"],
        "editorialSummary": "Heavy commercial dealership on the Dukes Highway with 24-hour roadside recovery and multi-combination staging.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": True,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "sa",
    "suburb": "keith",
    "postcode": "5267",
    "lat": -36.0983,
    "lng": 140.3547,
    "lga": "Tatiara District Council",
    "corridor": "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    "arterials": ["Dukes Highway (A8)", "Riddoch Highway (A66)", "Memorial Avenue"],
    "localOverview": "Keith is the South Australian junction where the Dukes Highway intersects with the Riddoch Highway connecting south to the Limestone Coast.",
    "nearbySuburbs": [{"name": "Bordertown", "slug": "bordertown"}, {"name": "Tailem Bend", "slug": "tailem-bend"}],
    "businesses": [
      {
        "name": "Keith Diesel & Heavy Mechanical",
        "slug": "keith-diesel-heavy-mechanical",
        "phone": "(08) 8755 1255",
        "website": "#",
        "address": "24 Memorial Avenue, Keith SA 5267",
        "rating": 4.7,
        "reviewCount": 39,
        "tags": ["24/7 Emergency Dispatch", "Road Train Repairs", "Air Brakes"],
        "editorialSummary": "Heavy vehicle facility catering to multi-combination road trains and linehaul freighters.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": True,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "sa",
    "suburb": "tailem-bend",
    "postcode": "5260",
    "lat": -35.2589,
    "lng": 139.4589,
    "lga": "Coorong District Council",
    "corridor": "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    "arterials": ["Princes Highway (A1)", "Dukes Highway (A8)", "Mallee Highway (B12)", "Lime Kiln Road"],
    "localOverview": "Tailem Bend is the critical freight choke point and Murray River crossing where multiple highways converge before descending into Greater Adelaide.",
    "nearbySuburbs": [{"name": "Keith", "slug": "keith"}, {"name": "Wingfield", "slug": "wingfield"}],
    "businesses": [
      {
        "name": "Tailem Bend Truck Services",
        "slug": "tailem-bend-truck-services",
        "phone": "(08) 8572 4111",
        "website": "#",
        "address": "Lime Kiln Road, Tailem Bend SA 5260",
        "rating": 4.6,
        "reviewCount": 42,
        "tags": ["24/7 Breakdown Hotline", "Murray River Crossing", "B-Double Cleared Yard"],
        "editorialSummary": "Commercial vehicle repair yard at the junction of the Dukes and Princes Highways.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": True,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  },
  {
    "state": "sa",
    "suburb": "wingfield",
    "postcode": "5013",
    "lat": -34.8464,
    "lng": 138.5639,
    "lga": "City of Port Adelaide Enfield",
    "corridor": "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    "arterials": ["Port River Expressway (A9)", "Northern Connector (M2)", "South Road (A2)", "Cormack Road"],
    "localOverview": "Wingfield is Adelaide's premier heavy transport and intermodal freight terminal, connecting the port, national rail yards, and interstate highways.",
    "nearbySuburbs": [{"name": "Tailem Bend", "slug": "tailem-bend"}, {"name": "Port Adelaide", "slug": "port-adelaide"}],
    "businesses": [
      {
        "name": "Adelaide Heavy Vehicle & Diesel Centre",
        "slug": "adelaide-heavy-vehicle-diesel-centre",
        "phone": "(08) 8347 1888",
        "website": "#",
        "address": "42 Cormack Road, Wingfield SA 5013",
        "rating": 4.8,
        "reviewCount": 79,
        "tags": ["Adelaide Freight Terminal", "24/7 Emergency Breakdown", "B-Double & Road Train Bays"],
        "editorialSummary": "Massive heavy commercial dealership and engineering workshop in Adelaide's transport heartland.",
        "access": {
          "bDouble26m": True,
          "roadTrain36m": True,
          "driveThroughBays": True,
          "nhvrRoadGazetted": True,
          "verifiedByOwner": False
        }
      }
    ]
  }
]

out_path = os.path.join("src", "data", "suburbs.json")
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(hubs_data, f, indent=2)

print("✓ Successfully created", out_path)
print("✓ Total hubs in clean schema:", len(hubs_data))
