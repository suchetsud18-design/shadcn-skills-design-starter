import { notFound } from "next/navigation"
import { ExternalLink } from "lucide-react"

import { componentDocs, getDoc } from "@/lib/docs"
import {
  figmaUrl,
  getMeta,
  installCmd,
  shadcnUrl,
  type A11yRow,
  type PropRow,
  type TokenRow,
} from "@/lib/component-meta"
import { playgroundConfigs } from "@/lib/playground-config"
import { dosAndDonts } from "@/lib/dos-and-donts"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AnimateOnScroll } from "@/components/animate-on-scroll"
import { DoDontCards } from "@/components/do-dont-cards"
import { A11yCallout } from "@/components/a11y-callout"
import { SlugPlayground } from "./playgrounds"
import { demos } from "./demos"
import { galleries } from "./galleries"

export function generateStaticParams() {
  return componentDocs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = getDoc(slug)
  return { title: doc ? `${doc.title} — Docs Design` : "Not found" }
}

function SectionHeading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="space-y-1.5 pb-1">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {description ? <p className="text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border bg-muted/50 p-4 shadow-xs">
      <code className="font-mono text-xs leading-relaxed">{children}</code>
    </pre>
  )
}

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Component</TableHead>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={`${r.component}-${r.prop}-${i}`}>
            <TableCell className="font-mono text-xs text-muted-foreground">{r.component}</TableCell>
            <TableCell className="font-mono text-xs font-medium">{r.prop}</TableCell>
            <TableCell className="font-mono text-xs text-primary">{r.type}</TableCell>
            <TableCell className="font-mono text-xs text-muted-foreground">{r.default}</TableCell>
            <TableCell className="text-sm">{r.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function TokensTable({ rows }: { rows: TokenRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Token</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Usage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, i) => (
          <TableRow key={`${r.token}-${i}`}>
            <TableCell className="font-mono text-xs font-medium">{r.token}</TableCell>
            <TableCell>
              <span className="flex items-center gap-2">
                {r.swatch ? (
                  <span
                    className="inline-block size-3.5 shrink-0 rounded-sm border"
                    style={{ backgroundColor: `var(${r.token})` }}
                  />
                ) : null}
                <span className="font-mono text-xs text-muted-foreground">{r.value}</span>
              </span>
            </TableCell>
            <TableCell className="text-sm">{r.usage}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function A11yTable({ rows }: { rows: A11yRow[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.keys}>
            <TableCell className="font-mono text-xs font-medium">{r.keys}</TableCell>
            <TableCell className="text-sm">{r.action}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
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
  const meta = getMeta(slug)
  const galls = galleries[slug]
  const hasPlayground = Boolean(playgroundConfigs[slug])
  const guidelines = dosAndDonts[slug]

  return (
    <article className="space-y-14">
      {/* Hero */}
      <header className="space-y-6">
        <AnimateOnScroll animation="fade-up">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2.5">
              <p className="text-sm font-medium text-muted-foreground">Components</p>
              <h1 className="scroll-m-20 text-4xl font-bold leading-[1.1] tracking-tight lg:text-5xl">{doc.title}</h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{doc.description}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={figmaUrl(meta?.figmaNode)} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-3.5" /> Figma
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href={shadcnUrl(slug, meta)} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-3.5" /> shadcn/ui
                </a>
              </Button>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="flex min-h-[320px] items-center justify-center rounded-2xl border bg-card p-10 shadow-sm">
          {demo ?? <span className="text-sm text-muted-foreground">No preview yet.</span>}
        </div>
      </header>

      {/* Playground */}
      {hasPlayground ? (
        <AnimateOnScroll animation="fade-up">
          <section className="space-y-5">
            <SectionHeading title="Playground" description="Adjust the props and see changes live." />
            <SlugPlayground slug={slug} />
          </section>
        </AnimateOnScroll>
      ) : null}

      {/* Installation — side-by-side */}
      <AnimateOnScroll animation="fade-up">
        <section className="space-y-5">
          <SectionHeading title="Installation" description="Add the component with the shadcn/ui CLI." />
          <div className={meta?.importCode ? "grid gap-4 lg:grid-cols-2" : ""}>
            <CodeBlock>{installCmd(slug, meta)}</CodeBlock>
            {meta?.importCode ? <CodeBlock>{meta.importCode}</CodeBlock> : null}
          </div>
        </section>
      </AnimateOnScroll>

      {/* Usage code */}
      {meta?.usageCode ? (
        <AnimateOnScroll animation="fade-up">
          <section className="space-y-5">
            <SectionHeading title="Usage" description="Compose the primitives as shown below." />
            <CodeBlock>{meta.usageCode}</CodeBlock>
          </section>
        </AnimateOnScroll>
      ) : null}

      {/* Do / Don't guidelines */}
      {guidelines ? (
        <AnimateOnScroll animation="fade-up">
          <section className="space-y-5">
            <SectionHeading title="Usage Guidelines" description="Patterns to follow and pitfalls to avoid." />
            <DoDontCards items={guidelines.items} />
          </section>
        </AnimateOnScroll>
      ) : null}

      {/* A11y callout */}
      {meta?.a11yNote ? (
        <AnimateOnScroll animation="fade">
          <A11yCallout note={meta.a11yNote} />
        </AnimateOnScroll>
      ) : null}

      {/* Examples / Gallery — magazine-style cards */}
      {galls?.length ? (
        <AnimateOnScroll animation="fade-up">
          <section className="space-y-6">
            <SectionHeading title="Examples" description="Common variations, matching the shadcn/ui docs." />
            <div className="grid gap-6 sm:grid-cols-2">
              {galls.map((gallery) => (
                <div
                  key={gallery.title}
                  className="group space-y-3 overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30"
                >
                  <div className="px-5 pt-5">
                    <h3 className="text-sm font-semibold tracking-tight">{gallery.title}</h3>
                    {gallery.description ? (
                      <p className="mt-1 text-xs text-muted-foreground">{gallery.description}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap items-end gap-4 bg-muted/30 p-5">
                    {gallery.demos.map((d, i) => (
                      <div key={d.label ?? i} className="flex flex-col items-center gap-1.5">
                        {d.node}
                        {d.label ? (
                          <code className="font-mono text-[10px] text-muted-foreground">{d.label}</code>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimateOnScroll>
      ) : null}

      {/* API Reference */}
      {meta?.props?.length ? (
        <AnimateOnScroll animation="fade-up">
          <section className="space-y-4">
            <SectionHeading title="API Reference" description="The most-used props for each part." />
            <div className="overflow-hidden rounded-xl border">
              <PropsTable rows={meta.props} />
            </div>
          </section>
        </AnimateOnScroll>
      ) : null}

      {/* Design Tokens */}
      {meta?.tokens?.length ? (
        <AnimateOnScroll animation="fade-up">
          <section className="space-y-4">
            <SectionHeading title="Design Tokens" description="The design tokens this component consumes." />
            <div className="overflow-hidden rounded-xl border">
              <TokensTable rows={meta.tokens} />
            </div>
          </section>
        </AnimateOnScroll>
      ) : null}

      {/* Keyboard accessibility */}
      {meta?.a11y?.length ? (
        <AnimateOnScroll animation="fade-up">
          <section className="space-y-4">
            <SectionHeading title="Keyboard Shortcuts" description="Keyboard interactions for this component." />
            <div className="overflow-hidden rounded-xl border">
              <A11yTable rows={meta.a11y} />
            </div>
          </section>
        </AnimateOnScroll>
      ) : null}
    </article>
  )
}
