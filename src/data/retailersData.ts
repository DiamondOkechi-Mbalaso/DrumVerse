import { Retailer } from '../types';

export const retailersData: Retailer[] = [
  {
    id: 'thomann',
    name: 'Thomann Music',
    headquarters: 'Treppendorf, Germany',
    regionsServed: 'United Kingdom, Europe & Worldwide Delivery',
    description: "Europe's largest musical instrument retailer, carrying an immense selection of acoustic drum kits, electronic drums (Roland, Alesis, Yamaha, Millenium), premium cymbals, and replacement drum hardware with a renowned 30-day money-back guarantee.",
    officialUrl: 'https://www.thomann.de/gb/drums_and_percussion.html',
    specialties: ['Huge Acoustic Shell Selection', 'Electronic Drum Kits & Upgrades', 'B20 Bronze Cymbals', 'In-House Millenium Value Line'],
    acousticKits: true,
    electronicKits: true,
    inStoreTesting: true,
    onlineDelivery: true,
    ratingScore: 'European Flagship',
    recommendedFor: 'Widest brand selection, competitive pricing, and fast international shipping.'
  },
  {
    id: 'andertons',
    name: 'Andertons Music Co.',
    headquarters: 'Guildford, Surrey, United Kingdom',
    regionsServed: 'United Kingdom & International Shipping',
    description: "Award-winning UK family-run music dealer world-famous for their in-depth video gear reviews, comprehensive drum testing showrooms, and passionate drummer staff. Stocks major brands including Ludwig, Mapex, Tama, Natal, Roland, and Sabian.",
    officialUrl: 'https://www.andertons.co.uk/drums-percussion',
    specialties: ['Expert In-Store Drum Demos', 'Custom Snare Collections', 'Electronic Drum Sound Booths', 'Rigorous Pre-Shipment Inspection'],
    acousticKits: true,
    electronicKits: true,
    inStoreTesting: true,
    onlineDelivery: true,
    ratingScore: 'UK Specialist',
    recommendedFor: 'Expert customer advice, comprehensive video demos, and hands-on showroom testing in Guildford.'
  },
  {
    id: 'gear4music',
    name: 'Gear4music',
    headquarters: 'York, North Yorkshire, United Kingdom',
    regionsServed: 'United Kingdom, Europe & International',
    description: "One of the UK's leading online retailers for musical equipment, offering everything from accessible starter drum packages for students to professional touring kits, extensive cymbal packs, and drum isolation booths.",
    officialUrl: 'https://www.gear4music.com/Drums_and_Percussion.html',
    specialties: ['Beginner Starter Drum Bundles', 'Affordable Electronic Kits', 'Drum Hardware & Stands', 'Express UK Delivery'],
    acousticKits: true,
    electronicKits: true,
    inStoreTesting: true,
    onlineDelivery: true,
    ratingScore: 'Great Value',
    recommendedFor: 'Beginner packages that bundle drum kits with sticks, thrones, and ear protection.'
  },
  {
    id: 'pmt-online',
    name: 'PMT Online (Play Music Today)',
    headquarters: 'Southend-on-Sea / Multiple UK Stores',
    regionsServed: 'United Kingdom (10+ Showroom Locations)',
    description: 'Premier UK music retail chain with dedicated drum demonstration suites across Birmingham, Manchester, London, Leeds, Bristol, and Cardiff, allowing players to tune and play acoustic kits before purchasing.',
    officialUrl: 'https://www.pmtonline.co.uk/drums-percussion',
    specialties: ['Local Nationwide UK Stores', 'Acoustic Kit Tuning Advice', 'Roland V-Drums Specialist Centers', 'Part-Exchange Options'],
    acousticKits: true,
    electronicKits: true,
    inStoreTesting: true,
    onlineDelivery: true,
    ratingScore: 'High Street Pro',
    recommendedFor: 'Players who want to walk into a local UK store and physically hit drums before buying.'
  },
  {
    id: 'drummers-only',
    name: "Drummer's Only",
    headquarters: 'Glasgow & Leeds, United Kingdom',
    regionsServed: 'Scotland, England & UK Nationwide Mail-Order',
    description: "Scotland and Northern England's premier 100% dedicated drum and percussion specialist shop. Staffed exclusively by working drummers offering expert advice on shell woods, bearing edges, snare wires, and custom setups.",
    officialUrl: 'https://drummersonly.co.uk/',
    specialties: ['100% Drummer Staffed', 'High-End Boutique Snares', 'Vintage & Pre-Owned Kits', 'Expert Tuning & Re-Heading Services'],
    acousticKits: true,
    electronicKits: true,
    inStoreTesting: true,
    onlineDelivery: true,
    ratingScore: 'Pure Drum Specialist',
    recommendedFor: 'Boutique drum shells, snare tuning perfectionists, and personalized drummer advice.'
  },
  {
    id: 'sweetwater',
    name: 'Sweetwater Sound',
    headquarters: 'Fort Wayne, Indiana, United States',
    regionsServed: 'North America & International Shipping',
    description: 'Renowned international dealer famous for their dedicated Sales Engineers, 55-point acoustic evaluations, extensive educational resources, and massive stock of drums, microphoning, and studio accessories.',
    officialUrl: 'https://www.sweetwater.com/shop/drums-percussion/',
    specialties: ['Drum Studio Microphones', 'V-Drum Module Support', 'Comprehensive Technical Guidance', 'Extended Warranty'],
    acousticKits: true,
    electronicKits: true,
    inStoreTesting: true,
    onlineDelivery: true,
    ratingScore: 'International Leader',
    recommendedFor: 'US customers or drummers building home studio microphone and recording setups.'
  }
];

export const accessoriesGuide = [
  {
    category: 'Drumsticks',
    recommendation: '5A Wood Tip (Hickory)',
    details: 'The universal starter size. Hickory provides balanced shock absorption and durability. Wood tips give warm cymbal response.'
  },
  {
    category: 'Hearing Protection',
    recommendation: 'Musicians High-Fidelity Earplugs (15–20 dB NRR)',
    details: 'Crucial for every acoustic drummer. High-fidelity earplugs attenuate dangerous SPL without muffling frequencies, preserving musical fidelity.'
  },
  {
    category: 'Drum Throne (Stool)',
    recommendation: 'Heavy-Duty Double-Braced Spindle Throne',
    details: 'Never compromise on seating. A stable, comfortable throne protects lower back alignment, core stability, and pedal foot independence.'
  },
  {
    category: 'Practice Pad',
    recommendation: '12-inch Dual-Sided Gum Rubber Pad',
    details: 'Essential for developing stick control, doubles, and paradiddles anywhere without waking roommates or neighbors.'
  },
  {
    category: 'Drum Key & Tuning Tool',
    recommendation: 'Standard 1/4-inch Square Socket Key',
    details: 'The single most essential tool in any drummer bag. Used to tension drumheads, adjust pedal springs, and tighten cymbal stands.'
  },
  {
    category: 'Drum Rug / Mat',
    recommendation: 'Non-Slip Gripped Carpet (at least 6ft x 5ft)',
    details: 'Prevents the bass drum and hi-hat stand from creeping away across hardwood or polished stage surfaces while playing.'
  }
];
