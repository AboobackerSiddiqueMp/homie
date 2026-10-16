import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check, Heart, MapPin, Share2, Star } from "lucide-react"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const properties = [
  { slug: "casa-amara", name: "Casa Amara", location: "Goa, India", type: "Villa", price: 18500, rating: 4.9, image: "/images/property-beach-villa.jpg" },
  { slug: "pine-and-peak", name: "Pine & Peak", location: "Manali, Himachal Pradesh", type: "Cabin", price: 9200, rating: 4.8, image: "/images/property-mountain-cabin.jpg" },
  { slug: "the-boulevard-loft", name: "The Boulevard Loft", location: "Bandra, Mumbai", type: "Loft", price: 12400, rating: 4.7, image: "/images/property-city-loft.jpg" },
  { slug: "olive-grove-house", name: "Olive Grove House", location: "Alibaug, Maharashtra", type: "Estate", price: 21600, rating: 5, image: "/images/property-tuscan-estate.jpg" },
  { slug: "sundowner-bungalow", name: "Sundowner Bungalow", location: "Pondicherry, India", type: "Bungalow", price: 7800, rating: 4.8, image: "/images/property-tropical-bungalow.jpg" },
  { slug: "lakehouse-06", name: "Lakehouse 06", location: "Udaipur, Rajasthan", type: "Modern home", price: 14900, rating: 4.9, image: "/images/property-lakefront-modern.jpg" },
]

const formatINR = (value: number) => `₹${value.toLocaleString("en-IN")}`
export function generateStaticParams() { return properties.map(({ slug }) => ({ slug })) }

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const property = properties.find((item) => item.slug === slug)
  if (!property) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="px-6 pb-20 pt-32 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Link href="/properties" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" /> Back to stays</Link>
          <div className="grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-[1.8rem] md:min-h-[620px]"><Image src={property.image} alt={property.name} fill priority className="object-cover" /></div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1"><div className="relative min-h-48 overflow-hidden rounded-[1.4rem]"><Image src={property.image} alt={`${property.name} interior`} fill className="object-cover brightness-90" /></div><div className="flex min-h-48 flex-col justify-end rounded-[1.4rem] bg-primary p-7 text-primary-foreground"><p className="text-xs uppercase tracking-[0.22em]">Curated by Homie</p><p className="mt-3 font-serif text-3xl leading-tight">A slower kind of stay.</p></div></div>
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px]">
            <div><div className="flex items-start justify-between gap-6"><div><p className="mb-3 text-xs uppercase tracking-[0.25em] text-primary">{property.type}</p><h1 className="font-serif text-5xl leading-none md:text-7xl">{property.name}</h1><p className="mt-5 flex items-center gap-2 text-muted-foreground"><MapPin className="size-4" />{property.location} <span>·</span> 2–6 guests</p></div><div className="flex gap-2"><button type="button" aria-label="Share property" className="grid size-11 place-items-center rounded-full border border-border"><Share2 className="size-4" /></button><button type="button" aria-label="Save property" className="grid size-11 place-items-center rounded-full border border-border"><Heart className="size-4" /></button></div></div><div className="my-10 border-y border-border py-8"><p className="max-w-2xl text-lg leading-8 text-muted-foreground">A considered stay for long mornings, local discoveries and the kind of quiet you remember long after checkout.</p><div className="mt-8 flex flex-wrap gap-6 text-sm"><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Verified home</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Thoughtful hosting</span><span className="flex items-center gap-2"><Check className="size-4 text-primary" /> Flexible arrival</span></div></div><h2 className="font-serif text-3xl">A place with character</h2><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Every Homie is chosen for its sense of place, considered details and connection to the neighbourhood around it.</p></div>
            <aside id="booking" className="h-fit rounded-[1.5rem] border border-border bg-card p-6 lg:sticky lg:top-28"><div className="flex items-end justify-between"><div><span className="text-3xl font-semibold">{formatINR(property.price)}</span><span className="text-sm text-muted-foreground"> / night</span></div><span className="flex items-center gap-1 text-sm"><Star className="size-4 fill-current" /> {property.rating}</span></div><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Check in</p><p className="mt-1 text-sm font-medium">Add date</p></div><div className="rounded-xl border border-border p-3"><p className="text-xs text-muted-foreground">Check out</p><p className="mt-1 text-sm font-medium">Add date</p></div></div><button type="button" className="mt-4 w-full rounded-xl bg-primary px-5 py-4 font-semibold text-primary-foreground transition hover:opacity-90">Request to book</button><p className="mt-3 text-center text-xs text-muted-foreground">You won&apos;t be charged yet</p></aside>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export { properties, formatINR }
