import json

file_path = "src/data/suburbs.json"
with open(file_path, "r", encoding="utf-8") as f:
    current = json.load(f)

western_hubs = [
  {
    "state": "vic",
    "suburb": "horsham",
    "postcode": "3400",
    "lat": -36.7118,
    "lng": 142.1989,
    "lga": "Rural City of Horsham",
    "corridor": "Western Highway (M8 / A8) Melbourne–Adelaide Freight Corridor",
    "arterials": ["Western Highway (A8)", "Henty Highway (B200)", "Wimmera Highway (B240)"],
    "localOverview": "Horsham is the primary commercial capital of the Wimmera midway between Melbourne and Adelaide.",
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
        "editorialSummary": "Premier heavy vehicle workshop on the Western Highway in Horsham with drive-through bays."
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
    "localOverview": "Nhill is the historic Melbourne–Adelaide changeover town 50km east of the SA border.",
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
        "editorialSummary": "Established heavy transport workshop positioned directly off the Western Highway."
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
    "arterials": ["Dukes Highway (A8)", "Riddoch Highway (A66)"],
    "localOverview": "Keith is the South Australian junction where the Dukes Highway intersects with the Riddoch Highway.",
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
        "editorialSummary": "Heavy vehicle facility catering to multi-combination road trains and linehaul freighters."
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
    "arterials": ["Princes Highway (A1)", "Dukes Highway (A8)", "Mallee Highway (B12)"],
    "localOverview": "Tailem Bend is the critical freight choke point and Murray River crossing into Greater Adelaide.",
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
        "editorialSummary": "Commercial vehicle repair yard at the junction of the Dukes and Princes Highways."
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
    "arterials": ["Port River Expressway (A9)", "Northern Connector (M2)", "South Road (A2)"],
    "localOverview": "Wingfield is Adelaide premier heavy transport intermodal freight terminal.",
    "nearbySuburbs": [{"name": "Tailem Bend", "slug": "tailem-bend"}],
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
        "editorialSummary": "Massive heavy commercial dealership and engineering workshop in Adelaide transport heartland."
      }
    ]
  }
]

existing_keys = {hub["state"] + "/" + hub["suburb"] for hub in current}
for hub in western_hubs:
    key = hub["state"] + "/" + hub["suburb"]
    if key not in existing_keys:
        current.append(hub)

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(current, f, indent=2)

print("Total hubs in database:", len(current))
