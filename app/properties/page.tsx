"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Heart,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Users,
  Bed,
  Bath,
  Sparkles,
  ShieldCheck,
  Coffee,
  Waves,
  ArrowRight,
  X,
  Compass,
  CheckCircle2,
  CalendarDays,
  Filter
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export interface Property {
  slug: string
  name: string
  location: string
  region: string
  type: string
  category: "all" | "beachfront" | "mountain" | "loft" | "estate" | "bungalow"
  price: number
  rating: number
  reviewCount: number
  image: string
  tag: string
  guests: number
  bedrooms: number
  bathrooms: number
  highlights: string[]
  description: string
  superhost: boolean
}

const properties: Property[] = [
  {
    slug: "casa-amara",
    name: "Casa Amara",
    location: "Ashwem Beach, Goa",
    region: "Goa",
    type: "Beach Villa",
    category: "beachfront",
    price: 18500,
    rating: 4.92,
    reviewCount: 128,
    image: "/images/property-beach-villa.jpg",
    tag: "Guest favourite",
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    highlights: ["Infinity Pool", "Private Beach Path", "In-house Chef"],
    description: "Sun-drenched minimalist sanctuary perched above the Arabian Sea with panoramic sunset views.",
    superhost: true,
  },
  {
    slug: "pine-and-peak",
    name: "Pine & Peak",
    location: "Old Manali, Himachal Pradesh",
    region: "Himachal Pradesh",
    type: "Timber Cabin",
    category: "mountain",
    price: 9200,
    rating: 4.86,
    reviewCount: 94,
    image: "/images/property-mountain-cabin.jpg",
    tag: "Quiet escape",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    highlights: ["Cedar Wood Stove", "Valley Balcony", "Star Gazing Loft"],
    description: "Handcrafted cedar cabin nestled amidst ancient pine groves with Himalayan peak vistas.",
    superhost: true,
  },
  {
    slug: "the-boulevard-loft",
    name: "The Boulevard Loft",
    location: "Pali Hill, Bandra, Mumbai",
    region: "Mumbai",
    type: "Urban Loft",
    category: "loft",
    price: 12400,
    rating: 4.78,
    reviewCount: 82,
    image: "/images/property-city-loft.jpg",
    tag: "Design stay",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1.5,
    highlights: ["Double-Height Ceilings", "Curated Art Collection", "Walk to Cafes"],
    description: "Architectural modernist loft featuring mid-century furnishings in the cultural heart of Bandra.",
    superhost: false,
  },
  {
    slug: "olive-grove-house",
    name: "Olive Grove House",
    location: "Awas, Alibaug, Maharashtra",
    region: "Maharashtra",
    type: "Country Estate",
    category: "estate",
    price: 21600,
    rating: 5.0,
    reviewCount: 46,
    image: "/images/property-tuscan-estate.jpg",
    tag: "New on Homie",
    guests: 8,
    bedrooms: 4,
    bathrooms: 4.5,
    highlights: ["Private 2-Acre Orchard", "Lap Pool", "Outdoor Wood Oven"],
    description: "Tuscan-inspired stone manor surrounded by quiet olive groves, just 15 minutes from Mandwa jetty.",
    superhost: true,
  },
  {
    slug: "sundowner-bungalow",
    name: "Sundowner Bungalow",
    location: "French Quarter, Pondicherry",
    region: "Pondicherry",
    type: "Heritage Bungalow",
    category: "bungalow",
    price: 7800,
    rating: 4.82,
    reviewCount: 110,
    image: "/images/property-tropical-bungalow.jpg",
    tag: "Best value",
    guests: 3,
    bedrooms: 2,
    bathrooms: 2,
    highlights: ["Courtyard Garden", "Colonial Verandah", "5 Min to Promenade"],
    description: "Restored Franco-Tamil heritage home with arched colonnades, terracotta tiles, and fragrant frangipani.",
    superhost: false,
  },
  {
    slug: "lakehouse-06",
    name: "Lakehouse 06",
    location: "Lake Pichola, Udaipur, Rajasthan",
    region: "Rajasthan",
    type: "Modern Lakefront",
    category: "beachfront",
    price: 14900,
    rating: 4.95,
    reviewCount: 67,
    image: "/images/property-lakefront-modern.jpg",
    tag: "Rare find",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    highlights: ["Private Lake Pier", "Sunset Rooftop Deck", "Heritage Architecture"],
    description: "Contemporary glass-and-stone residence kissing the tranquil waters of Pichola with Palace views.",
    superhost: true,
  },
]

const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`

const categories = [
  { id: "all", label: "All Sanctuaries", icon: Sparkles },
  { id: "beachfront", label: "Coastal & Lake", icon: Waves },
  { id: "mountain", label: "Mountain Cabins", icon: Compass },
  { id: "loft", label: "Design Lofts", icon: Coffee },
  { id: "estate", label: "Private Estates", icon: ShieldCheck },
]

export default function PropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [guestFilter, setGuestFilter] = useState<number>(0)
  const [sortBy, setSortBy] = useState<"recommended" | "price-asc" | "price-desc" | "rating">("recommended")
  const [savedProperties, setSavedProperties] = useState<Record<string, boolean>>({})
  const [notification, setNotification] = useState<string | null>(null)

  const toggleSave = (slug: string, name: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setSavedProperties((prev) => {
      const next = !prev[slug]
      setNotification(next ? `Saved "${name}" to your wishlist` : `Removed "${name}" from wishlist`)
      setTimeout(() => setNotification(null), 2400)
      return { ...prev, [slug]: next }
    })
  }

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        // Category filter
        if (selectedCategory !== "all" && p.category !== selectedCategory) {
          return false
        }
        // Guest filter
        if (guestFilter > 0 && p.guests < guestFilter) {
          return false
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase()
          const matchName = p.name.toLowerCase().includes(q)
          const matchLocation = p.location.toLowerCase().includes(q)
          const matchType = p.type.toLowerCase().includes(q)
          const matchHighlight = p.highlights.some((h) => h.toLowerCase().includes(q))
          if (!matchName && !matchLocation && !matchType && !matchHighlight) {
            return false
          }
        }
        return true
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price
        if (sortBy === "price-desc") return b.price - a.price
        if (sortBy === "rating") return b.rating - a.rating
        return 0 // recommended default order
      })
  }, [searchQuery, selectedCategory, guestFilter, sortBy])

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || guestFilter > 0 || sortBy !== "recommended"

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setGuestFilter(0)
    setSortBy("recommended")
  }

  return (
    <main className="min-h-screen bg-[#fbf9f5] text-[#15261f]">
      <Header />

      {/* Wishlist floating toast notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1e3a2f] text-[#fbf9f5] px-5 py-3 rounded-full text-xs font-medium tracking-wide shadow-xl flex items-center gap-2 border border-white/10"
          >
            <Heart className="size-3.5 fill-rose-400 text-rose-400" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Section */}
      <section className="relative px-6 pt-36 pb-12 md:px-12 lg:px-16 border-b border-[#e7e3da]">
        {/* Subtle decorative background organic glow */}
        <div className="absolute top-10 right-10 -z-10 size-96 rounded-full bg-[#e8ede7]/60 blur-3xl pointer-events-none" />
        <div className="absolute top-36 left-12 -z-10 size-80 rounded-full bg-[#f3efe6]/80 blur-2xl pointer-events-none" />

        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb path */}
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#6b7c72]">
            <Link href="/" className="hover:text-[#15261f] transition-colors">Homie</Link>
            <span>/</span>
            <span className="text-[#1e3a2f] font-semibold">The Collection</span>
          </div>

          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 mb-4 rounded-full bg-[#eaf0eb] text-[#1e3a2f] text-xs font-semibold tracking-wide border border-[#d2dfd4]">
                Curated Private Stays
              </span>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.04] tracking-tight text-[#15261f]">
                Stay somewhere <br />
                <em className="font-normal italic text-[#244b3c]">worth remembering.</em>
              </h1>
            </div>

            <div className="max-w-md space-y-4 lg:text-right">
              <p className="text-sm md:text-base leading-relaxed text-[#5a6a61]">
                A deliberate collection of characterful homes, coastal villas, and mountain sanctuaries vetted for character, tranquility, and warm hosting.
              </p>
              <div className="inline-flex items-center gap-4 text-xs text-[#6b7c72] pt-1">
                <span className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-[#244b3c]" /> 100% Verified</span>
                <span>·</span>
                <span className="flex items-center gap-1.5"><Star className="size-4 text-[#244b3c]" /> 4.8+ Rating Threshold</span>
                <span>·</span>
                <span>Direct Host Connection</span>
              </div>
            </div>
          </div>

          {/* Interactive Filter Console */}
          <div className="mt-12 rounded-3xl bg-white p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#e8e4db]">
            <div className="grid gap-3 lg:grid-cols-[1.6fr_auto_auto_auto] items-center">
              
              {/* Search destination or home name */}
              <div className="relative flex items-center">
                <Search className="absolute left-4 size-4.5 text-[#7c8b82] pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search destinations (Goa, Manali, Mumbai...), stays, or amenities..."
                  className="w-full rounded-2xl bg-[#f7f5f0] py-3.5 pl-11 pr-10 text-sm text-[#15261f] placeholder:text-[#8c9c93] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#244b3c]/20 transition-all border border-transparent focus:border-[#244b3c]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 size-6 rounded-full bg-[#e5e1d7] grid place-items-center text-[#5c6c63] hover:text-[#15261f]"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>

              {/* Guest Capacity Filter */}
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-auto">
                  <select
                    value={guestFilter}
                    onChange={(e) => setGuestFilter(Number(e.target.value))}
                    className="w-full sm:w-auto appearance-none rounded-2xl border border-[#ded8cd] bg-white py-3.5 pl-4 pr-10 text-xs font-semibold uppercase tracking-wider text-[#34463d] hover:border-[#1e3a2f] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value={0}>Any Guests</option>
                    <option value={2}>2+ Guests</option>
                    <option value={4}>4+ Guests</option>
                    <option value={6}>6+ Guests</option>
                    <option value={8}>8+ Guests</option>
                  </select>
                  <Users className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7c8b82]" />
                </div>
              </div>

              {/* Sort Order */}
              <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full sm:w-auto appearance-none rounded-2xl border border-[#ded8cd] bg-white py-3.5 pl-4 pr-10 text-xs font-semibold uppercase tracking-wider text-[#34463d] hover:border-[#1e3a2f] focus:outline-none transition-colors cursor-pointer"
                  >
                    <option value="recommended">Sort: Curated</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Top Rated (Stars)</option>
                  </select>
                  <SlidersHorizontal className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#7c8b82]" />
                </div>
              </div>

              {/* Reset filter trigger if active */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="rounded-2xl px-4 py-3.5 text-xs font-semibold text-[#8b4513] hover:bg-[#f9ece3] transition-colors flex items-center justify-center gap-1.5"
                >
                  <X className="size-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Category Pills Bar */}
            <div className="mt-4 pt-4 border-t border-[#f0ede6] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const Icon = cat.icon
                const isActive = selectedCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide transition-all ${
                      isActive
                        ? "bg-[#1e3a2f] text-white shadow-sm"
                        : "bg-[#f5f3ee] text-[#55665d] hover:bg-[#ebe7de] hover:text-[#15261f]"
                    }`}
                  >
                    <Icon className="size-3.5" />
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Properties Grid & Active Results */}
      <section className="px-6 py-16 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          {/* Section meta counter */}
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-[#e7e3da] pb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6b7c72]">Available Sanctuaries</p>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#15261f] mt-1">
                {filteredProperties.length} Handpicked {filteredProperties.length === 1 ? "Stay" : "Stays"}
              </h2>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#5a6a61]">
              <span>Updated in real-time</span>
              <span>·</span>
              <span>Instant inquiry available</span>
            </div>
          </div>

          {/* Properties Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => {
                const isSaved = !!savedProperties[property.slug]
                return (
                  <article
                    key={property.slug}
                    className="group flex flex-col justify-between rounded-3xl bg-white p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-[#e8e4db] hover:shadow-[0_16px_36px_rgb(30,58,47,0.08)] hover:border-[#cbd7cf] transition-all duration-300"
                  >
                    <div>
                      {/* Image container */}
                      <Link href={`/properties/${property.slug}`} className="block relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#e8ede7]">
                        <Image
                          src={property.image}
                          alt={property.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Top overlay pills */}
                        <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between pointer-events-none">
                          <span className="rounded-full bg-white/90 backdrop-blur-md px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#1e3a2f] shadow-sm">
                            {property.tag}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => toggleSave(property.slug, property.name, e)}
                            aria-label={`Save ${property.name}`}
                            className="pointer-events-auto size-9 rounded-full bg-white/90 backdrop-blur-md grid place-items-center text-[#15261f] hover:bg-white shadow-sm transition-transform active:scale-90"
                          >
                            <Heart
                              className={`size-4 transition-colors ${
                                isSaved ? "fill-rose-500 text-rose-500" : "text-[#15261f]"
                              }`}
                            />
                          </button>
                        </div>

                        {/* Superhost badge if applicable */}
                        {property.superhost && (
                          <div className="absolute bottom-3 left-3 rounded-full bg-[#1e3a2f]/85 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase flex items-center gap-1">
                            <Sparkles className="size-3 text-amber-300" />
                            <span>Superhost</span>
                          </div>
                        )}
                      </Link>

                      {/* Content Info */}
                      <div className="pt-5 px-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b7c72]">
                              {property.type}
                            </p>
                            <Link href={`/properties/${property.slug}`}>
                              <h3 className="font-serif text-2xl font-bold text-[#15261f] group-hover:text-[#244b3c] transition-colors mt-0.5">
                                {property.name}
                              </h3>
                            </Link>
                          </div>

                          {/* Star Rating */}
                          <div className="flex items-center gap-1 bg-[#f4f7f4] px-2.5 py-1 rounded-xl text-xs font-bold text-[#1e3a2f]">
                            <Star className="size-3.5 fill-amber-400 text-amber-400" />
                            <span>{property.rating.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* Location */}
                        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#5a6a61]">
                          <MapPin className="size-3.5 text-[#244b3c] shrink-0" />
                          <span>{property.location}</span>
                        </p>

                        {/* Capacity specs */}
                        <div className="mt-3.5 flex items-center gap-4 text-xs text-[#6b7c72] border-t border-[#f2eee7] pt-3">
                          <span className="flex items-center gap-1">
                            <Users className="size-3.5 text-[#7c8b82]" />
                            {property.guests} guests
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Bed className="size-3.5 text-[#7c8b82]" />
                            {property.bedrooms} beds
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Bath className="size-3.5 text-[#7c8b82]" />
                            {property.bathrooms} baths
                          </span>
                        </div>

                        {/* Highlight chips */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {property.highlights.slice(0, 2).map((hl, i) => (
                            <span
                              key={i}
                              className="rounded-lg bg-[#f6f4ee] px-2.5 py-1 text-[11px] font-medium text-[#4a5a51]"
                            >
                              {hl}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer with Price and View Link */}
                    <div className="mt-5 border-t border-[#f2eee7] pt-4 px-1 flex items-center justify-between">
                      <div>
                        <span className="text-xl font-bold text-[#15261f] tracking-tight">
                          {formatINR(property.price)}
                        </span>
                        <span className="text-xs text-[#6b7c72]"> / night</span>
                      </div>

                      <Link
                        href={`/properties/${property.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#1e3a2f] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2b5444] transition-colors shadow-sm"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            /* Empty state when filters return nothing */
            <div className="my-12 rounded-3xl bg-white p-12 text-center border border-[#e8e4db] max-w-lg mx-auto">
              <div className="size-16 rounded-full bg-[#f4f7f4] grid place-items-center mx-auto text-[#1e3a2f] mb-4">
                <Search className="size-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#15261f]">No matching stays found</h3>
              <p className="mt-2 text-sm text-[#5a6a61] leading-relaxed">
                We couldn&apos;t find any homes matching your current filter criteria. Try clearing your search or adjusting guest count.
              </p>
              <button
                onClick={resetFilters}
                className="mt-6 rounded-full bg-[#1e3a2f] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#2b5444] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Homie Editorial Trust Pillars */}
      <section className="bg-white border-y border-[#e7e3da] px-6 py-20 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#244b3c]">The Homie Difference</p>
            <h2 className="font-serif text-3xl md:text-5xl font-normal text-[#15261f] mt-2 leading-tight">
              A considered stay for <br />
              <em className="italic font-normal">the mindful traveler.</em>
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-[#fbf9f5] p-8 border border-[#e8e4db]">
              <span className="font-mono text-xs font-bold text-[#244b3c] tracking-widest">01 / VETTING</span>
              <h3 className="font-serif text-2xl font-bold text-[#15261f] mt-3">Strict 100-Point Audit</h3>
              <p className="mt-3 text-sm text-[#5a6a61] leading-relaxed">
                Only one in eight evaluated properties meets our high standards for architectural integrity, privacy, and exceptional comfort.
              </p>
            </div>

            <div className="rounded-3xl bg-[#fbf9f5] p-8 border border-[#e8e4db]">
              <span className="font-mono text-xs font-bold text-[#244b3c] tracking-widest">02 / HOSPITALITY</span>
              <h3 className="font-serif text-2xl font-bold text-[#15261f] mt-3">Personalized Hosting</h3>
              <p className="mt-3 text-sm text-[#5a6a61] leading-relaxed">
                Warm, direct communication with genuine owners and local caretakers who craft bespoke neighborhood guidebooks just for you.
              </p>
            </div>

            <div className="rounded-3xl bg-[#fbf9f5] p-8 border border-[#e8e4db]">
              <span className="font-mono text-xs font-bold text-[#244b3c] tracking-widest">03 / CONCIERGE</span>
              <h3 className="font-serif text-2xl font-bold text-[#15261f] mt-3">Dedicated Travel Care</h3>
              <p className="mt-3 text-sm text-[#5a6a61] leading-relaxed">
                From pre-arrival airport transfers and private chefs to curated boat charters, our concierge team is on call throughout your stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Request CTA */}
      <section className="px-6 py-20 md:px-12 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#1e3a2f] p-10 md:p-16 text-[#fbf9f5] relative overflow-hidden">
          <div className="absolute right-0 top-0 -z-0 h-full w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#86af9a] font-semibold">Bespoke Curation</span>
            <h2 className="font-serif text-3xl md:text-5xl font-normal leading-tight mt-3">
              Looking for a tailored long-term stay or private estate?
            </h2>
            <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed">
              Connect with our private travel curators for unlisted estates, extended sabbaticals, and custom retreat planning.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:concierge@homie.stay"
                className="rounded-full bg-[#fbf9f5] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#1e3a2f] hover:bg-white transition-colors"
              >
                Inquire with Concierge
              </a>
              <Link
                href="/"
                className="rounded-full border border-white/30 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
              >
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export { properties, formatINR }
