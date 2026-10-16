"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Search, SlidersHorizontal, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const properties = [
  { slug: "casa-amara", name: "Casa Amara", location: "Goa, India", type: "Villa", price: 18500, rating: 4.9, image: "/images/property-beach-villa.jpg", tag: "Guest favourite" },
  { slug: "pine-and-peak", name: "Pine & Peak", location: "Manali, Himachal Pradesh", type: "Cabin", price: 9200, rating: 4.8, image: "/images/property-mountain-cabin.jpg", tag: "Quiet escape" },
  { slug: "the-boulevard-loft", name: "The Boulevard Loft", location: "Bandra, Mumbai", type: "Loft", price: 12400, rating: 4.7, image: "/images/property-city-loft.jpg", tag: "Design stay" },
  { slug: "olive-grove-house", name: "Olive Grove House", location: "Alibaug, Maharashtra", type: "Estate", price: 21600, rating: 5.0, image: "/images/property-tuscan-estate.jpg", tag: "New on Homie" },
  { slug: "sundowner-bungalow", name: "Sundowner Bungalow", location: "Pondicherry, India", type: "Bungalow", price: 7800, rating: 4.8, image: "/images/property-tropical-bungalow.jpg", tag: "Best value" },
  { slug: "lakehouse-06", name: "Lakehouse 06", location: "Udaipur, Rajasthan", type: "Modern home", price: 14900, rating: 4.9, image: "/images/property-lakefront-modern.jpg", tag: "Rare find" },
]

const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="px-6 pb-14 pt-36 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-primary">The Homie collection</p>
              <h1 className="max-w-3xl font-serif text-5xl leading-[0.96] tracking-tight md:text-7xl">Stay somewhere <em className="font-normal text-primary">worth remembering.</em></h1>
            </div>
            <p className="max-w-xs text-sm leading-6 text-muted-foreground">Thoughtful homes, characterful corners and hosts who make every arrival feel personal.</p>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-3 border-y border-border py-4">
            <div className="flex min-w-60 flex-1 items-center gap-3 rounded-full border border-border bg-card px-4 py-3 text-sm"><Search className="size-4 text-muted-foreground" /><span className="text-muted-foreground">Where are you going?</span></div>
            {['Dates', 'Guests', 'Property type'].map((filter) => <button key={filter} className="rounded-full border border-border px-5 py-3 text-sm transition-colors hover:bg-primary hover:text-primary-foreground">{filter}</button>)}
            <button className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground"><SlidersHorizontal className="size-4" /> Filters</button>
          </div>
          <div className="mb-6 mt-10 flex items-center justify-between"><p className="text-sm text-muted-foreground">Showing <span className="font-medium text-foreground">{properties.length} stays</span></p><button className="text-sm underline underline-offset-4">Sort: Recommended</button></div>
          <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => <article key={property.slug} className="group">
              <Link href={`/properties/${property.slug}`} className="block">
                <div className="relative aspect-[1.08] overflow-hidden rounded-[1.6rem] bg-muted"><Image src={property.image} alt={property.name} fill className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-x-4 top-4 flex items-center justify-between"><span className="rounded-full bg-background/85 px-3 py-1.5 text-[11px] font-medium backdrop-blur">{property.tag}</span><button aria-label={`Save ${property.name}`} onClick={(e) => e.preventDefault()} className="grid size-9 place-items-center rounded-full bg-background/80 backdrop-blur transition hover:bg-background"><Heart className="size-4" /></button></div></div>
                <div className="flex items-start justify-between gap-4 pt-4"><div><h2 className="font-serif text-2xl">{property.name}</h2><p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="size-3.5" />{property.location}</p><p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">{property.type} · 2–6 guests</p></div><div className="flex items-center gap-1 text-sm"><Star className="size-3.5 fill-current" /> {property.rating}</div></div>
                <p className="mt-4 text-sm"><strong>{formatINR(property.price)}</strong> <span className="text-muted-foreground">night</span></p>
              </Link>
            </article>)}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export { properties, formatINR }

