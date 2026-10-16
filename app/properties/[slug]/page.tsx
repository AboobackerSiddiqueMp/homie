import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { PropertyDetailView, PropertyDetail } from "@/components/property-detail-view"

const propertyList: PropertyDetail[] = [
  {
    slug: "the-boulevard-loft",
    name: "The Boulevard Loft",
    location: "Pali Hill, Bandra West, Mumbai",
    neighborhood: "Bandra Cultural District",
    type: "Urban Loft Sanctuary",
    price: 12400,
    rating: 4.78,
    reviewCount: 82,
    image: "/images/property-city-loft.jpg",
    gallery: [
      "/images/property-city-loft.jpg",
      "/images/property-lakefront-modern.jpg",
      "/images/property-beach-villa.jpg",
      "/images/property-mountain-cabin.jpg"
    ],
    guests: "2 Guests",
    beds: "1 King Loft Suite",
    baths: "1.5 Designer Baths",
    sqft: "1,450 sq.ft",
    tag: "Design stay",
    host: {
      name: "Kabir & Zoya",
      title: "Architectural Designer & Ceramicist",
      superhost: true,
      responseRate: "100%",
      responseTime: "within 30 mins",
      avatar: "/placeholder-user.jpg",
      bio: "We have lived in Bandra for over twelve years. We designed this loft as a personal retreat from the city's pulse, blending brutalist concrete with warm Burma teak and Japanese lighting."
    },
    highlights: ["Double-Height Ceilings", "Curated Vinyl & Hi-Fi", "Walk to Pali Hill Cafes", "Herman Miller Workstation"],
    description: "Architectural modernist loft featuring mid-century furnishings in the cultural heart of Bandra. Flooded with natural light through floor-to-ceiling industrial steel-framed windows overlooking the Mumbai canopy and skyline.",
    architecturalNote: "A study in restrained urban minimalism: raw Burma teak millwork, custom fluted glass partitions, and soft indirect cove lighting that transforms the space at dusk.",
    neighborhoodGuide: {
      title: "The Pali Hill Journal",
      description: "Nestled among quiet leafy lanes, old banyan trees, and Portuguese villas, Pali Hill is Mumbai's most treasured residential haven.",
      spots: [
        { name: "Subko Specialty Coffee", type: "Roastery & Bakehouse", distance: "3 min walk", note: "Single-origin pour-overs and artisanal sourdough croissants in a restored heritage bungalow." },
        { name: "Veronica's", type: "Neighbourhood Deli", distance: "6 min walk", note: "Pastrami sandwiches, organic wines, and lively community street dining." },
        { name: "Bandstand Promenade", type: "Coastal Walkway", distance: "8 min walk", note: "Arabian Sea breeze and uninterrupted sunset vistas along the rocky shore." }
      ]
    },
    amenityGroups: [
      { title: "Living & Workspace", items: ["300 Mbps Fiber Wi-Fi", "Herman Miller Aeron Workstation", "Bang & Olufsen Bluetooth Sound", "Curated Art & Architecture Library"] },
      { title: "Culinary & Dining", items: ["Smeg Espresso Machine & Grinder", "Full induction stovetop & oven", "Le Creuset Cookware & Wine Decanter", "Complimentary artisanal coffee beans"] },
      { title: "Rest & Wellness", items: ["King organic latex mattress", "Custom 600-thread count Belgian linen", "Blackout curtains & acoustic glazing", "Daikin multi-zone climate control"] },
      { title: "Spa & Bath", items: ["Rainfall pressure shower", "Forest Essentials botanical amenities", "Organic cotton waffle bathrobes", "Hairdryer & magnifying vanity mirror"] }
    ],
    reviews: [
      { author: "Aditi Rao", location: "Bangalore", date: "October 2026", rating: 5, avatar: "/placeholder-user.jpg", comment: "The Boulevard Loft is unlike anything else in Mumbai. The light at 5 PM through the double-height windows is pure magic. Kabir and Zoya left the best coffee and local recommendations." },
      { author: "Marcus Vance", location: "London, UK", date: "September 2026", rating: 5, avatar: "/placeholder-user.jpg", comment: "Impeccable design details, whisper-quiet despite being in Bandra, and ultra-fast Wi-Fi for international calls. It felt like living inside an Architectural Digest story." },
      { author: "Pooja Sharma", location: "Delhi", date: "August 2026", rating: 4.8, avatar: "/placeholder-user.jpg", comment: "Walking distance to Subko and the best dining spots. The bed was exceptionally comfortable. Will definitely book again on my next Mumbai trip." }
    ]
  },
  {
    slug: "casa-amara",
    name: "Casa Amara",
    location: "Ashwem Beach, Goa",
    neighborhood: "North Goa Coast",
    type: "Beach Villa Sanctuary",
    price: 18500,
    rating: 4.92,
    reviewCount: 128,
    image: "/images/property-beach-villa.jpg",
    gallery: [
      "/images/property-beach-villa.jpg",
      "/images/property-tropical-bungalow.jpg",
      "/images/property-lakefront-modern.jpg",
      "/images/property-tuscan-estate.jpg"
    ],
    guests: "6 Guests",
    beds: "3 King Bedrooms",
    baths: "3 En-suite Baths",
    sqft: "3,200 sq.ft",
    tag: "Guest favourite",
    host: {
      name: "Tanya & Rohan",
      title: "Architect & Landscape Designer",
      superhost: true,
      responseRate: "100%",
      responseTime: "within 15 mins",
      avatar: "/placeholder-user.jpg",
      bio: "Born and raised in Goa, we built Casa Amara as an ode to coastal serenity and sustainable stone construction."
    },
    highlights: ["Infinity Pool", "Private Beach Path", "In-house Chef", "Sunset Rooftop Deck"],
    description: "Sun-drenched minimalist sanctuary perched above the Arabian Sea. Designed with natural lime plaster, polished stone, and expansive pocket glass doors that dissolve the boundary between living spaces and the sea.",
    architecturalNote: "Seamless indoor-outdoor living with locally quarried laterite stone walls and reclaimed teak pergolas filtering coastal sunlight.",
    neighborhoodGuide: {
      title: "Ashwem Coastal Haven",
      description: "A serene stretch of shoreline celebrated for tranquil waters, pristine sands, and quiet bohemian beach bistros.",
      spots: [
        { name: "La Plage", type: "French Coastal Bistro", distance: "4 min walk", note: "Exceptional seafood carpaccio under shaded pine groves by the sea." },
        { name: "Ashwem Quiet Dunes", type: "Pristine Beach", distance: "2 min walk", note: "Private boardwalk access directly to calm morning swimming waters." },
        { name: "Mandrem Surf Club", type: "Water Sports", distance: "7 min drive", note: "Gentle surf breaks and sunset paddle boarding." }
      ]
    },
    amenityGroups: [
      { title: "Coastal Living", items: ["Private Infinity Edge Pool", "Direct Private Beach Access", "Outdoor Sunset Lounge & Firepit", "Lush Coconut Grove Garden"] },
      { title: "Hospitality & Dining", items: ["Daily Gourmet Breakfast Prepared", "In-house Chef for Private Dinners", "Full Commercial Kitchen", "Complimentary Fresh Coconuts & Barista Coffee"] },
      { title: "Comfort & Rest", items: ["3 King Master Suites with Sea Views", "Egyptian Cotton Bedding", "Silent VRV Air Conditioning", "Bose Outdoor Sound System"] },
      { title: "Spa & Essentials", items: ["Open-air Tropical Rain Showers", "Handmade Ayurvedic Bath Soaps", "Daily Housekeeping & Turndown", "High-speed Starlink Internet"] }
    ],
    reviews: [
      { author: "Karan Johar", location: "Mumbai", date: "October 2026", rating: 5, avatar: "/placeholder-user.jpg", comment: "The most serene villa we have stayed at in Goa. Watching the sunset from the rooftop lounge with fresh cocktails was unforgettable." },
      { author: "Elena Rostova", location: "Geneva", date: "September 2026", rating: 5, avatar: "/placeholder-user.jpg", comment: "Private beach path, exquisite food by the chef, and total privacy. Everything was handled with utmost care." }
    ]
  },
  {
    slug: "pine-and-peak",
    name: "Pine & Peak",
    location: "Old Manali, Himachal Pradesh",
    neighborhood: "Upper Beas Valley",
    type: "Timber Mountain Cabin",
    price: 9200,
    rating: 4.86,
    reviewCount: 94,
    image: "/images/property-mountain-cabin.jpg",
    gallery: [
      "/images/property-mountain-cabin.jpg",
      "/images/property-tuscan-estate.jpg",
      "/images/property-lakefront-modern.jpg",
      "/images/property-city-loft.jpg"
    ],
    guests: "4 Guests",
    beds: "2 Queen Suites",
    baths: "2 Slate Stone Baths",
    sqft: "1,800 sq.ft",
    tag: "Quiet escape",
    host: {
      name: "Vikram Negi",
      title: "Alpine Naturalist & Mountain Guide",
      superhost: true,
      responseRate: "98%",
      responseTime: "within 1 hour",
      avatar: "/placeholder-user.jpg",
      bio: "Descendant of local apple orchardists, committed to low-impact timber architecture and mountain conservation."
    },
    highlights: ["Cedar Wood Stove", "Valley Balcony", "Star Gazing Loft", "Radiant Floor Heating"],
    description: "Handcrafted cedar cabin nestled amidst ancient pine groves with Himalayan peak vistas. Slow mornings with pour-over coffee, listening to the mountain stream below.",
    architecturalNote: "Traditional Kath-Kuni joinery combined with Scandinavian triple-glazed windows and Swedish wood-burning fireplaces.",
    neighborhoodGuide: {
      title: "Upper Manali & Valley Trails",
      description: "Quiet pine forests, apple orchards, and glacier streams away from commercial tourist routes.",
      spots: [
        { name: "Old Manali Village Trail", type: "Nature Walk", distance: "5 min walk", note: "Historic stone houses, artisanal cafes, and organic apple juice stalls." },
        { name: "Jogini Falls Trailhead", type: "Scenic Hike", distance: "15 min drive", note: "Breathtaking cascade through rhododendron and pine forest." },
        { name: "Drifters Cafe", type: "Acoustic & Hearth", distance: "8 min walk", note: "Warm soups, live folk music, and fireplace storytelling." }
      ]
    },
    amenityGroups: [
      { title: "Alpine Comfort", items: ["Nordic Cedar Wood Fireplace", "Radiant Hydronic Underfloor Heating", "Panoramic Glacial View Deck", "Star-Gazing Telescope in Loft"] },
      { title: "Kitchen & Hearth", items: ["Cast iron cookware & dutch ovens", "Selection of local artisanal teas", "Modern induction cooking suite", "Espresso machine & bean grinder"] },
      { title: "Rest & Sleep", items: ["Goose down duvets & wool blankets", "Natural latex mattresses", "Cedar aroma timber walls", "Quiet stream acoustic ambiance"] },
      { title: "Connectivity", items: ["Fiber Internet with Power Backup", "Dedicated writer's desk", "Board games & mountain literature", "Private enclosed car parking"] }
    ],
    reviews: [
      { author: "Siddharth Sen", location: "Kolkata", date: "October 2026", rating: 5, avatar: "/placeholder-user.jpg", comment: "The smell of cedar wood when you enter is divine. Sitting by the fire watching the snow on the peaks was peaceful beyond words." }
    ]
  },
  {
    slug: "olive-grove-house",
    name: "Olive Grove House",
    location: "Awas, Alibaug, Maharashtra",
    neighborhood: "Awas Coastal Countryside",
    type: "Country Estate Sanctuary",
    price: 21600,
    rating: 5.0,
    reviewCount: 46,
    image: "/images/property-tuscan-estate.jpg",
    gallery: [
      "/images/property-tuscan-estate.jpg",
      "/images/property-beach-villa.jpg",
      "/images/property-lakefront-modern.jpg",
      "/images/property-tropical-bungalow.jpg"
    ],
    guests: "8 Guests",
    beds: "4 King Suites",
    baths: "4.5 Bathrooms",
    sqft: "4,500 sq.ft",
    tag: "New on Homie",
    host: {
      name: "Natasha & Dev",
      title: "Restaurateurs & Estate Stewards",
      superhost: true,
      responseRate: "100%",
      responseTime: "within 20 mins",
      avatar: "/placeholder-user.jpg",
      bio: "We split our time between South Mumbai and Alibaug. Olive Grove House is our passion project for long family gatherings and weekend farm-to-table meals."
    },
    highlights: ["Private 2-Acre Orchard", "Lap Pool", "Outdoor Wood Oven", "Full Caretaker Staff"],
    description: "Tuscan-inspired stone manor surrounded by quiet olive groves, just 15 minutes from Mandwa jetty. Perfect for intimate family reunions and long alfresco dinners under starlight.",
    architecturalNote: "Hand-chiseled coursed rubble masonry, Roman terracotta roof tiles, and an expansive courtyard centered around an ancient banyan tree.",
    neighborhoodGuide: {
      title: "Awas & Mandwa Coast",
      description: "Quiet coastal farmlands, casuarina groves, and secluded sands accessible via speedboat from Gateway of India.",
      spots: [
        { name: "Awas Secluded Beach", type: "Quiet Shore", distance: "6 min drive", note: "Untouched sandy beach with flat waters and quiet fishing boats." },
        { name: "The Table Farm", type: "Organic Kitchen", distance: "12 min drive", note: "Farm tours and seasonal lunches in a lush permaculture setting." },
        { name: "Mandwa Marina", type: "Water Ferry", distance: "15 min drive", note: "Speedboat transfers to Mumbai in under 20 minutes." }
      ]
    },
    amenityGroups: [
      { title: "Estate Amenities", items: ["20-meter Chlorine-Free Lap Pool", "Outdoor Pizza Oven & BBQ Station", "2 Acres of Private Orchards & Lawns", "Bespoke Alfresco Dining Table for 12"] },
      { title: "Staff & Service", items: ["Resident Chef and Kitchen Team", "Daily Housekeeping and Laundry", "Estate Manager & Concierge Support", "Private Chauffeur Service on Request"] },
      { title: "Suites & Comfort", items: ["4 Ensuite Master Bedrooms", "Custom Egyptian Percale Linens", "Private Balconies Overlooking Grove", "Marble Soaking Tubs"] },
      { title: "Entertainment & Leisure", items: ["Badminton & Croquet Lawns", "Surround Sound Living Pavilion", "Curated Wine Cellar Access", "Children's Treehouse & Play Garden"] }
    ],
    reviews: [
      { author: "Samir Mehta", location: "Mumbai", date: "October 2026", rating: 5, avatar: "/placeholder-user.jpg", comment: "We hosted our parents' 40th anniversary here. The staff made us feel like royalty, and the estate is even more breathtaking in person." }
    ]
  },
  {
    slug: "sundowner-bungalow",
    name: "Sundowner Bungalow",
    location: "French Quarter, Pondicherry",
    neighborhood: "White Town Heritage Zone",
    type: "Colonial Heritage Sanctuary",
    price: 7800,
    rating: 4.82,
    reviewCount: 110,
    image: "/images/property-tropical-bungalow.jpg",
    gallery: [
      "/images/property-tropical-bungalow.jpg",
      "/images/property-beach-villa.jpg",
      "/images/property-city-loft.jpg",
      "/images/property-tuscan-estate.jpg"
    ],
    guests: "3 Guests",
    beds: "2 Queen Bedrooms",
    baths: "2 Heritage Baths",
    sqft: "1,600 sq.ft",
    tag: "Best value",
    host: {
      name: "Camille & Arvind",
      title: "Antiquarians & Historians",
      superhost: false,
      responseRate: "97%",
      responseTime: "within 2 hours",
      avatar: "/placeholder-user.jpg",
      bio: "Passionate about preserving Pondicherry's unique Franco-Tamil architectural syncretism."
    },
    highlights: ["Courtyard Garden", "Colonial Verandah", "5 Min to Promenade", "Bicycles Provided"],
    description: "Restored Franco-Tamil heritage home with arched colonnades, terracotta tiles, and fragrant frangipani. A peaceful retreat steps away from artisanal bakeries and the sea.",
    architecturalNote: "Restored yellow ochre lime-washed walls, high timber-rafter ceilings, and Belgian hand-cut glass transoms.",
    neighborhoodGuide: {
      title: "White Town & Promenade",
      description: "Quiet cobblestone streets lined with bougainvillea, colonial mansions, and French patisseries.",
      spots: [
        { name: "Baker Street", type: "French Boulangerie", distance: "3 min walk", note: "Authentic baguettes, croissants, and quiches baked daily." },
        { name: "Goubert Promenade", type: "Ocean Walkway", distance: "5 min walk", note: "Car-free evening promenade alongside the Bay of Bengal." },
        { name: "Coromandel Cafe", type: "Heritage Bistro", distance: "6 min walk", note: "Dining in a restored colonial mansion courtyard." }
      ]
    },
    amenityGroups: [
      { title: "Heritage Features", items: ["Private Frangipani Courtyard", "Colonial Wrap-around Verandah", "Vintage Wicker Reading Chairs", "Antique Teak Planters Chairs"] },
      { title: "Modern Conveniences", items: ["High-speed Wi-Fi throughout", "Quiet Inverter Air Conditioning", "Espresso & Filter Coffee Machine", "Kitchenette with Induction Cooktop"] },
      { title: "Bed & Bath", items: ["Handmade Madras Cotton Linens", "Terracotta Floor Bathrooms", "Auroville Herbals Amenities", "Organic Cotton Beach Towels"] },
      { title: "Exploration", items: ["2 Classic Roadster Bicycles", "Hand-drawn Neighborhood Map", "Umbrellas & Sun Hats Provided", "Night Security & Concierge"] }
    ],
    reviews: [
      { author: "Claire Dupont", location: "Paris", date: "September 2026", rating: 5, avatar: "/placeholder-user.jpg", comment: "The courtyard is paradise. Waking up to birdsong and cycling to the bakery made this the highlight of our trip to South India." }
    ]
  },
  {
    slug: "lakehouse-06",
    name: "Lakehouse 06",
    location: "Lake Pichola, Udaipur, Rajasthan",
    neighborhood: "Old City Lakefront",
    type: "Modern Lakefront Residence",
    price: 14900,
    rating: 4.95,
    reviewCount: 67,
    image: "/images/property-lakefront-modern.jpg",
    gallery: [
      "/images/property-lakefront-modern.jpg",
      "/images/property-city-loft.jpg",
      "/images/property-beach-villa.jpg",
      "/images/property-mountain-cabin.jpg"
    ],
    guests: "4 Guests",
    beds: "2 King Suites",
    baths: "2 Marble Baths",
    sqft: "2,200 sq.ft",
    tag: "Rare find",
    host: {
      name: "Maharaj Ranvijay",
      title: "Heritage Conservationist",
      superhost: true,
      responseRate: "100%",
      responseTime: "within 15 mins",
      avatar: "/placeholder-user.jpg",
      bio: "Our family has lived on the banks of Pichola for generations. Lakehouse 06 is our modern interpretation of Mewari lakefront living."
    },
    highlights: ["Private Lake Pier", "Sunset Rooftop Deck", "Heritage Architecture", "Private Boat Transfer"],
    description: "Contemporary glass-and-stone residence kissing the tranquil waters of Pichola with Palace views. Unparalleled sunrise reflections and private boat dock.",
    architecturalNote: "Local white marble screens (jali) filtering water reflections, paired with seamless structural glass panels.",
    neighborhoodGuide: {
      title: "Lake Pichola & Old Mewar",
      description: "Historic ghats, floating palaces, and ancient temple spires glowing golden at sunset.",
      spots: [
        { name: "Ambrai Ghat", type: "Sunset Viewpoint", distance: "4 min walk", note: "The most iconic view of the City Palace lit up across the water." },
        { name: "Upre by 1559 AD", type: "Rooftop Dining", distance: "6 min walk", note: "Royal Mewari dishes under the Udaipur night sky." },
        { name: "Bagore Ki Haveli", type: "Cultural Museum", distance: "8 min walk", note: "Evening folk dance and Rajasthani puppet theater." }
      ]
    },
    amenityGroups: [
      { title: "Lakefront Exclusivity", items: ["Private Direct Lake Access & Pier", "Sunset Rooftop Terrace with Palace View", "Complimentary Arrival Boat Transfer", "Private Morning Yoga Session on Pier"] },
      { title: "Culinary & Dining", items: ["Traditional Royal Breakfast Included", "Private Butler Service", "Modern Kitchenette & Coffee Bar", "Sunset High Tea Service"] },
      { title: "Living & Design", items: ["Floor-to-Ceiling Glass Lake Views", "Carved Makrana Marble Bathrooms", "Handwoven Silk Carpets & Furnishings", "Central High-efficiency AC"] },
      { title: "Concierge & Stays", items: ["Private Heritage City Guide on Request", "Airport Chauffeur Coordination", "High-speed Wi-Fi & Work Suite", "24/7 Estate Security"] }
    ],
    reviews: [
      { author: "Ananya Panday", location: "Mumbai", date: "October 2026", rating: 5, avatar: "/placeholder-user.jpg", comment: "Waking up to the water lapping right outside your glass window with the City Palace in the background is surreal. Worth every rupee." }
    ]
  }
]

export function generateStaticParams() {
  return propertyList.map(({ slug }) => ({ slug }))
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = propertyList.find((item) => item.slug === slug)
  if (!property) notFound()

  const relatedProperties = propertyList
    .filter((item) => item.slug !== slug)
    .slice(0, 3)
    .map((item) => ({
      slug: item.slug,
      name: item.name,
      location: item.location,
      type: item.type,
      price: item.price,
      rating: item.rating,
      image: item.image,
      tag: item.tag,
    }))

  return (
    <main className="min-h-screen bg-[#fbf9f5] text-[#15261f]">
      <Header />
      <PropertyDetailView property={property} relatedProperties={relatedProperties} />
    </main>
  )
}
