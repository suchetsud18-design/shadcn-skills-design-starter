import { notFound } from "next/navigation"

import { componentDocs, getDoc } from "@/lib/docs"
import { demos } from "./demos"

export function generateStaticParams() {
  return componentDocs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDoc(slug)
  return { title: doc ? `${doc.title} — Docs Design` : "Not found" }
}

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) notFound()

  const demo = demos[slug]

  return (
    <article className="space-y-8">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Components</p>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{doc.title}</h1>
        <p className="text-lg text-muted-foreground">{doc.description}</p>
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-medium text-muted-foreground">Preview</h2>
          <code className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
            @/components/ui/{slug}
          </code>
        </div>
        <div className="flex min-h-[240px] items-center justify-center rounded-lg border bg-card p-10">
          {demo ?? <span className="text-sm text-muted-foreground">No preview yet.</span>}
        </div>
      </section>
    </article>
  )
}
