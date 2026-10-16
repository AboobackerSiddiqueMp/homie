"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Footer } from "@/components/footer"
import {
  ArrowLeft,
  Check,
  Heart,
  MapPin,
  Share2,
  Star,
  Users,
  Bed,
  Bath,
  Sparkles,
  ShieldCheck,
  Wifi,
  Coffee,
  Tv,
  Wind,
  Maximize2,
  Calendar,
  ChevronRight,
  Clock,
  Compass,
  MessageSquare,
  X,
  CheckCircle2,
  Info
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface PropertyDetail {
  slug: string
  name: string
  location: string
  neighborhood: string
  type: string
  price: number
  rating: number
  reviewCount: number
  image: string
  gallery: string[]
  guests: string
  beds: string
  baths: string
  sqft: string
  tag: string
  host: {
    name: string
    title: string
    superhost: boolean
    responseRate: string
    responseTime: string
    avatar: string
    bio: string
  }
  highlights: string[]
  description: string
  architecturalNote: string
  neighborhoodGuide: {
    title: string
    description: string
    spots: { name: string; type: string; distance: string; note: string }[]
  }
  amenityGroups: {
    title: string
    items: string[]
  }[]
  reviews: {
    author: string
    location: string
    date: string
    rating: number
    avatar: string
    comment: string
  }[]
}

interface PropertyDetailViewProps {
  property: PropertyDetail
  relatedProperties: {
    slug: string
    name: string
    location: string
    type: string
    price: number
    rating: number
    image: string
    tag: string
  }[]
}

const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`

export function PropertyDetailView({ property, relatedProperties }: PropertyDetailViewProps) {
  const [isSaved, setIsSaved] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [selectedNights, setSelectedNights] = useState(3)
  const [guestCount, setGuestCount] = useState(2)
  const [checkInDate, setCheckInDate] = useState("Nov 14, 2026")
  const [checkOutDate, setCheckOutDate] = useState("Nov 17, 2026")
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)

  const showToast = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 2500)
  }

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href)
      showToast("Link copied to clipboard")
    }
  }

  const handleToggleSave = () => {
    setIsSaved((prev) => {
      const next = !prev
      showToast(next ? `Saved "${property.name}" to wishlist` : `Removed from wishlist`)
      return next
    })
  }

  const cleaningFee = 1500
  const serviceFee = 1200
  const subtotal = property.price * selectedNights
  const total = subtotal + cleaningFee + serviceFee

  return (
    <div className="relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#1e3a2f] text-[#fbf9f5] px-5 py-3 rounded-full text-xs font-semibold tracking-wide shadow-xl flex items-center gap-2 border border-white/10"
          >
            <Sparkles className="size-3.5 text-amber-300" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-6 pt-32 pb-24 md:px-12 lg:px-16">
        
        {/* Navigation & Actions Top Row */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7c72] hover:text-[#15261f] transition-colors"
          >
            <ArrowLeft className="size-4" /> Back to The Collection
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              type="button"
              className="flex items-center gap-2 rounded-full border border-[#ded8cd] bg-white px-4 py-2 text-xs font-semibold text-[#15261f] hover:border-[#1e3a2f] transition-colors"
            >
              <Share2 className="size-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={handleToggleSave}
              type="button"
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                isSaved
                  ? "border-rose-400 bg-rose-50 text-rose-600"
                  : "border-[#ded8cd] bg-white text-[#15261f] hover:border-[#1e3a2f]"
              }`}
            >
              <Heart className={`size-3.5 ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
              <span>{isSaved ? "Saved" : "Save Stay"}</span>
            </button>
          </div>
        </div>

        {/* Title Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#244b3c]">
            <span>{property.type}</span>
            <span>·</span>
            <span>{property.neighborhood}</span>
          </div>

          <h1 className="mt-2 font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#15261f]">
            {property.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs md:text-sm text-[#5a6a61]">
            <span className="flex items-center gap-1 font-bold text-[#1e3a2f]">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              <span>{property.rating}</span>
              <span className="font-normal text-[#6b7c72]">({property.reviewCount} reviews)</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5 text-[#244b3c]" />
              <span>{property.location}</span>
            </span>
            <span>·</span>
            <span className="rounded-full bg-[#eaf0eb] px-2.5 py-0.5 text-[11px] font-bold text-[#1e3a2f]">
              {property.tag}
            </span>
          </div>
        </div>

        {/* Editorial Photo Gallery Mosaic */}
        <div className="relative mb-14">
          <div className="grid gap-3 md:grid-cols-4 md:grid-rows-2 h-[420px] md:h-[560px] rounded-[2rem] overflow-hidden border border-[#e8e4db] shadow-sm">
            
            {/* Primary Main Photo */}
            <div
              onClick={() => { setSelectedPhotoIndex(0); setIsGalleryModalOpen(true); }}
              className="relative md:col-span-2 md:row-span-2 cursor-pointer group overflow-hidden bg-[#e8ede7]"
            >
              <Image
                src={property.image}
                alt={`${property.name} - Skyline view`}
                fill
                priority
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-4 left-4 rounded-full bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-xs font-bold text-[#1e3a2f]">
                Skyline Living & Kitchen
              </div>
            </div>

            {/* Top Right Photo 1 */}
            <div
              onClick={() => { setSelectedPhotoIndex(1); setIsGalleryModalOpen(true); }}
              className="relative hidden md:block cursor-pointer group overflow-hidden bg-[#e8ede7]"
            >
              <Image
                src={property.gallery[1] || property.image}
                alt="Master loft sleeping suite"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-95"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <span className="absolute bottom-3 left-3 text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur px-2.5 py-1 rounded-md">
                Loft Bedroom
              </span>
            </div>

            {/* Top Right Photo 2 */}
            <div
              onClick={() => { setSelectedPhotoIndex(2); setIsGalleryModalOpen(true); }}
              className="relative hidden md:block cursor-pointer group overflow-hidden bg-[#e8ede7]"
            >
              <Image
                src={property.gallery[2] || property.image}
                alt="Architectural detailing"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-95"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <span className="absolute bottom-3 left-3 text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur px-2.5 py-1 rounded-md">
                Designer Details
              </span>
            </div>

            {/* Bottom Right Photo 1 */}
            <div
              onClick={() => { setSelectedPhotoIndex(3); setIsGalleryModalOpen(true); }}
              className="relative hidden md:block cursor-pointer group overflow-hidden bg-[#e8ede7]"
            >
              <Image
                src={property.gallery[3] || property.image}
                alt="Sunlit lounge space"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-95"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
              <span className="absolute bottom-3 left-3 text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur px-2.5 py-1 rounded-md">
                Reading Nook
              </span>
            </div>

            {/* Bottom Right Photo 2 */}
            <div
              onClick={() => { setSelectedPhotoIndex(0); setIsGalleryModalOpen(true); }}
              className="relative hidden md:flex flex-col justify-end p-6 bg-[#1e3a2f] text-white cursor-pointer group"
            >
              <div className="absolute top-0 right-0 size-36 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#86af9a]">Homie Verified</p>
              <p className="font-serif text-xl font-normal leading-snug mt-1">A curated urban sanctuary.</p>
              <p className="text-xs text-white/70 mt-2 flex items-center gap-1 group-hover:underline">
                <span>View all 12 photos</span>
                <ChevronRight className="size-3" />
              </p>
            </div>
          </div>

          {/* Mobile All Photos Button */}
          <button
            onClick={() => setIsGalleryModalOpen(true)}
            className="md:hidden absolute bottom-4 right-4 rounded-full bg-white/95 backdrop-blur-md px-4 py-2 text-xs font-bold text-[#15261f] shadow-lg flex items-center gap-1.5"
          >
            <Maximize2 className="size-3.5" />
            <span>Show all photos</span>
          </button>
        </div>

        {/* 2-Column Split: Details & Sticky Booking Card */}
        <div className="grid gap-14 lg:grid-cols-[1fr_390px] items-start">
          
          {/* Left Column: Property Story & Specifications */}
          <div className="space-y-12">
            
            {/* Quick Specs Strip */}
            <div className="rounded-3xl bg-white p-6 md:p-8 border border-[#e8e4db] shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#f0ede6]">
                <div className="pt-2 sm:pt-0">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#7c8b82]">Capacity</p>
                  <p className="mt-1 font-serif text-xl font-bold text-[#15261f] flex items-center gap-2">
                    <Users className="size-4.5 text-[#244b3c]" />
                    <span>{property.guests}</span>
                  </p>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#7c8b82]">Bedrooms</p>
                  <p className="mt-1 font-serif text-xl font-bold text-[#15261f] flex items-center gap-2">
                    <Bed className="size-4.5 text-[#244b3c]" />
                    <span>{property.beds}</span>
                  </p>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#7c8b82]">Bathrooms</p>
                  <p className="mt-1 font-serif text-xl font-bold text-[#15261f] flex items-center gap-2">
                    <Bath className="size-4.5 text-[#244b3c]" />
                    <span>{property.baths}</span>
                  </p>
                </div>

                <div className="pt-4 sm:pt-0 sm:pl-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#7c8b82]">Floor Area</p>
                  <p className="mt-1 font-serif text-xl font-bold text-[#15261f] flex items-center gap-2">
                    <Maximize2 className="size-4.5 text-[#244b3c]" />
                    <span>{property.sqft}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Host Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-3xl bg-[#f4f2ec] p-6 md:p-8 border border-[#e8e4db]">
              <div className="flex items-center gap-4">
                <div className="relative size-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#e2e8f0]">
                  <Image
                    src={property.host.avatar}
                    alt={property.host.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl font-bold text-[#15261f]">Hosted by {property.host.name}</h3>
                    {property.host.superhost && (
                      <span className="rounded-full bg-[#1e3a2f] text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        Superhost
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5a6a61] mt-0.5">{property.host.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-[#5a6a61]">
                <div className="text-right sm:text-left">
                  <span className="block text-[#15261f] font-bold">{property.host.responseRate}</span>
                  <span>Response rate</span>
                </div>
                <span>·</span>
                <div>
                  <span className="block text-[#15261f] font-bold">{property.host.responseTime}</span>
                  <span>Response time</span>
                </div>
              </div>
            </div>

            {/* Narrative Story */}
            <div className="space-y-6">
              <h2 className="font-serif text-3xl font-normal text-[#15261f]">The Space & Architecture</h2>
              <p className="text-base md:text-lg leading-relaxed text-[#4a5a51]">
                {property.description}
              </p>
              <div className="rounded-2xl border-l-2 border-[#1e3a2f] bg-white p-5 text-sm text-[#5a6a61] leading-relaxed italic">
                &ldquo;{property.architecturalNote}&rdquo;
              </div>
            </div>

            {/* Key Curated Amenities */}
            <div className="space-y-6 border-t border-[#e7e3da] pt-10">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#15261f]">Curated Amenities</h2>
                <span className="text-xs uppercase tracking-wider text-[#6b7c72] font-semibold">Everything for a quiet stay</span>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {property.amenityGroups.map((group, i) => (
                  <div key={i} className="rounded-2xl bg-white p-5 border border-[#e8e4db]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#244b3c] mb-3">
                      {group.title}
                    </h4>
                    <ul className="space-y-2.5 text-sm text-[#4a5a51]">
                      {group.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2.5">
                          <Check className="size-4 text-[#244b3c] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Pali Hill / Neighborhood Guide */}
            <div className="space-y-6 border-t border-[#e7e3da] pt-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#244b3c]">Local Journal</span>
                <h2 className="mt-1 font-serif text-2xl md:text-3xl font-normal text-[#15261f]">
                  {property.neighborhoodGuide.title}
                </h2>
                <p className="mt-2 text-sm text-[#5a6a61] leading-relaxed">
                  {property.neighborhoodGuide.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {property.neighborhoodGuide.spots.map((spot, i) => (
                  <div key={i} className="rounded-2xl bg-white p-5 border border-[#e8e4db] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#7c8b82]">
                        <span className="font-semibold uppercase tracking-wider text-[#244b3c]">{spot.type}</span>
                        <span className="flex items-center gap-1"><Clock className="size-3" />{spot.distance}</span>
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[#15261f] mt-2">{spot.name}</h4>
                      <p className="text-xs text-[#5a6a61] mt-2 leading-relaxed">{spot.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Reviews Section */}
            <div className="space-y-6 border-t border-[#e7e3da] pt-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#15261f]">Guest Reflections</h2>
                  <p className="mt-1 text-xs text-[#6b7c72]">
                    Verified stays rated <strong className="text-[#15261f]">{property.rating} out of 5 stars</strong> across {property.reviewCount} visits
                  </p>
                </div>

                <div className="flex items-center gap-1.5 rounded-2xl bg-[#f4f7f4] px-4 py-2 text-sm font-bold text-[#1e3a2f]">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span>{property.rating}</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {property.reviews.map((rev, i) => (
                  <div key={i} className="rounded-2xl bg-white p-6 border border-[#e8e4db] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="size-10 rounded-full bg-[#1e3a2f]/10 text-[#1e3a2f] font-bold text-xs grid place-items-center">
                          {rev.author.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#15261f]">{rev.author}</p>
                          <p className="text-[11px] text-[#7c8b82]">{rev.location} · {rev.date}</p>
                        </div>
                      </div>
                      <p className="text-xs md:text-sm text-[#4a5a51] leading-relaxed italic">
                        &ldquo;{rev.comment}&rdquo;
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="size-3 fill-current" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules & Tranquility Policy */}
            <div className="rounded-3xl bg-[#fbf9f5] p-6 md:p-8 border border-[#e8e4db] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#15261f]">Things to Note</h3>
              <div className="grid gap-3 sm:grid-cols-3 text-xs text-[#5a6a61]">
                <div className="rounded-2xl bg-white p-4 border border-[#e8e4db]">
                  <p className="font-bold text-[#15261f]">Check-in / Check-out</p>
                  <p className="mt-1">Arrival: 2:00 PM</p>
                  <p>Departure: 11:00 AM</p>
                </div>
                <div className="rounded-2xl bg-white p-4 border border-[#e8e4db]">
                  <p className="font-bold text-[#15261f]">Tranquil Hours</p>
                  <p className="mt-1">Quiet after 10:00 PM</p>
                  <p>Residential building community</p>
                </div>
                <div className="rounded-2xl bg-white p-4 border border-[#e8e4db]">
                  <p className="font-bold text-[#15261f]">Cancellation</p>
                  <p className="mt-1">Full refund up to 48 hrs</p>
                  <p>before scheduled arrival</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Reservation Console */}
          <aside className="h-fit rounded-3xl border border-[#e8e4db] bg-white p-7 shadow-[0_12px_40px_rgb(0,0,0,0.06)] lg:sticky lg:top-28">
            
            {/* Price Header */}
            <div className="flex items-end justify-between border-b border-[#f0ede6] pb-5">
              <div>
                <span className="text-3xl font-bold text-[#15261f] tracking-tight">
                  {formatINR(property.price)}
                </span>
                <span className="text-xs text-[#6b7c72]"> / night</span>
              </div>
              <span className="flex items-center gap-1.5 rounded-xl bg-[#f4f7f4] px-3 py-1 text-xs font-bold text-[#1e3a2f]">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                <span>{property.rating}</span>
                <span className="font-normal text-[#6b7c72]">({property.reviewCount})</span>
              </span>
            </div>

            {/* Date & Guest Picker Controls */}
            <div className="mt-6 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl border border-[#ded8cd] bg-[#fbf9f5] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7c8b82]">Check-in</p>
                  <input
                    type="text"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="mt-1 w-full bg-transparent text-xs font-semibold text-[#15261f] focus:outline-none cursor-pointer"
                  />
                </div>
                <div className="rounded-2xl border border-[#ded8cd] bg-[#fbf9f5] p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7c8b82]">Check-out</p>
                  <input
                    type="text"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="mt-1 w-full bg-transparent text-xs font-semibold text-[#15261f] focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Nights Stepper Selector */}
              <div className="flex items-center justify-between rounded-2xl border border-[#ded8cd] bg-[#fbf9f5] px-4 py-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7c8b82]">Duration</p>
                  <p className="text-xs font-semibold text-[#15261f]">{selectedNights} Nights</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedNights((n) => Math.max(1, n - 1))}
                    className="size-7 rounded-full bg-white border border-[#ded8cd] text-xs font-bold text-[#15261f] hover:border-[#1e3a2f] grid place-items-center"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-[#15261f] w-4 text-center">{selectedNights}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedNights((n) => n + 1)}
                    className="size-7 rounded-full bg-white border border-[#ded8cd] text-xs font-bold text-[#15261f] hover:border-[#1e3a2f] grid place-items-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Guests Stepper */}
              <div className="flex items-center justify-between rounded-2xl border border-[#ded8cd] bg-[#fbf9f5] px-4 py-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#7c8b82]">Guests</p>
                  <p className="text-xs font-semibold text-[#15261f]">{guestCount} Guests (Max 2)</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuestCount((g) => Math.max(1, g - 1))}
                    className="size-7 rounded-full bg-white border border-[#ded8cd] text-xs font-bold text-[#15261f] hover:border-[#1e3a2f] grid place-items-center"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-[#15261f] w-4 text-center">{guestCount}</span>
                  <button
                    type="button"
                    onClick={() => setGuestCount((g) => Math.min(2, g + 1))}
                    className="size-7 rounded-full bg-white border border-[#ded8cd] text-xs font-bold text-[#15261f] hover:border-[#1e3a2f] grid place-items-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Request Stay CTA */}
            <button
              type="button"
              onClick={() => setIsBookingModalOpen(true)}
              className="mt-6 w-full rounded-full bg-[#1e3a2f] px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#2b5444] transition-colors shadow-md active:scale-[0.99]"
            >
              Request Sanctuary Stay
            </button>

            <div className="mt-4 text-center text-xs text-[#7c8b82]">
              <p>You won&apos;t be charged until host confirms</p>
              <p className="text-[11px] text-[#93a298] mt-1">Direct communication with host Kabir & Zoya</p>
            </div>

            {/* Real-time Transparent Price Breakdown */}
            <div className="mt-6 border-t border-[#f0ede6] pt-5 space-y-2.5 text-xs text-[#5a6a61]">
              <div className="flex justify-between">
                <span>{formatINR(property.price)} × {selectedNights} nights</span>
                <span className="font-semibold text-[#15261f]">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Homie care & sanitization fee</span>
                <span className="font-semibold text-[#15261f]">{formatINR(cleaningFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Direct concierge hospitality fee</span>
                <span className="font-semibold text-[#15261f]">{formatINR(serviceFee)}</span>
              </div>
              <div className="flex justify-between border-t border-[#f0ede6] pt-3 text-sm font-bold text-[#15261f]">
                <span>Total Due</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            {/* Host direct chat snippet */}
            <div className="mt-6 rounded-2xl bg-[#f7f5f0] p-4 text-xs text-[#5a6a61] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-[#244b3c]" />
                <span>Homie Protection Guarantee</span>
              </span>
              <a
                href={`mailto:inquiries@homie.stay?subject=Inquiry for ${property.name}`}
                className="font-bold text-[#1e3a2f] underline hover:text-[#2b5444]"
              >
                Ask Host
              </a>
            </div>
          </aside>
        </div>

        {/* Similar Sanctuaries Recommendations */}
        <div className="mt-24 border-t border-[#e7e3da] pt-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6b7c72]">Explore More</p>
              <h2 className="font-serif text-3xl font-normal text-[#15261f] mt-1">Other Considered Stays</h2>
            </div>
            <Link
              href="/properties"
              className="text-xs font-semibold uppercase tracking-wider text-[#1e3a2f] hover:underline"
            >
              View Full Collection →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProperties.map((rel) => (
              <Link
                key={rel.slug}
                href={`/properties/${rel.slug}`}
                className="group rounded-3xl bg-white p-4 border border-[#e8e4db] shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e8ede7]">
                  <Image
                    src={rel.image}
                    alt={rel.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-bold text-[#1e3a2f]">
                    {rel.tag}
                  </span>
                </div>
                <div className="pt-4 px-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#7c8b82]">{rel.type}</p>
                      <h3 className="font-serif text-xl font-bold text-[#15261f] group-hover:text-[#244b3c] transition-colors">
                        {rel.name}
                      </h3>
                      <p className="text-xs text-[#5a6a61] mt-0.5">{rel.location}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-[#1e3a2f]">
                      <Star className="size-3.5 fill-amber-400 text-amber-400" />
                      <span>{rel.rating}</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#15261f]">
                    {formatINR(rel.price)} <span className="text-xs font-normal text-[#7c8b82]">/ night</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Confirmation Booking Request Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-white p-8 border border-[#e8e4db] shadow-2xl relative"
            >
              <button
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute top-5 right-5 size-8 rounded-full bg-[#f4f2ec] grid place-items-center text-[#5a6a61] hover:text-[#15261f]"
              >
                <X className="size-4" />
              </button>

              <div className="size-12 rounded-full bg-[#eaf0eb] grid place-items-center text-[#1e3a2f] mb-4">
                <CheckCircle2 className="size-6 text-[#244b3c]" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-[#244b3c]">Booking Inquiry</span>
              <h3 className="font-serif text-2xl font-bold text-[#15261f] mt-1">
                Stay at {property.name}
              </h3>

              <div className="mt-5 rounded-2xl bg-[#fbf9f5] p-4 border border-[#e8e4db] space-y-2 text-xs text-[#5a6a61]">
                <div className="flex justify-between">
                  <span className="font-medium">Dates:</span>
                  <span className="font-bold text-[#15261f]">{checkInDate} → {checkOutDate} ({selectedNights} nights)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Guests:</span>
                  <span className="font-bold text-[#15261f]">{guestCount} Guests</span>
                </div>
                <div className="flex justify-between border-t border-[#f0ede6] pt-2 text-sm font-bold text-[#15261f]">
                  <span>Total Amount:</span>
                  <span className="text-[#1e3a2f]">{formatINR(total)}</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-[#5a6a61] leading-relaxed">
                Your request has been forwarded directly to host <strong>{property.host.name}</strong>. You will receive an email confirmation and personalized check-in itinerary within 1 hour.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsBookingModalOpen(false)
                    showToast("Reservation request sent to host!")
                  }}
                  className="flex-1 rounded-full bg-[#1e3a2f] py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2b5444] transition-colors"
                >
                  Confirm Request
                </button>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="rounded-full border border-[#ded8cd] px-6 py-3.5 text-xs font-semibold text-[#5a6a61] hover:bg-[#fbf9f5] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full Photo Gallery Modal */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <div className="relative w-full max-w-5xl h-[80vh] flex flex-col justify-between">
              <div className="flex items-center justify-between text-white pb-4">
                <span className="font-serif text-lg">{property.name} · Photo Gallery</span>
                <button
                  onClick={() => setIsGalleryModalOpen(false)}
                  className="size-10 rounded-full bg-white/20 text-white grid place-items-center hover:bg-white/30"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="relative flex-1 rounded-2xl overflow-hidden bg-black">
                <Image
                  src={property.gallery[selectedPhotoIndex] || property.image}
                  alt={`${property.name} photo`}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                {property.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={`relative size-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedPhotoIndex === idx ? "border-white scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumbnail" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
