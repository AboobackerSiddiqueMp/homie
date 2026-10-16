export default function Loading() {
  return (
    <main className="min-h-screen bg-background px-6 pb-14 pt-36 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-4 w-40 rounded bg-muted" />
        <div className="mt-5 h-20 max-w-2xl rounded bg-muted" />
        <div className="mt-12 h-14 rounded-full bg-muted" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="overflow-hidden rounded-[1.6rem] border border-border">
              <div className="aspect-[1.08] bg-muted" />
              <div className="flex flex-col gap-3 p-4">
                <div className="h-6 w-3/4 rounded bg-muted" />
                <div className="h-4 w-1/2 rounded bg-muted" />
                <div className="h-4 w-1/3 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
