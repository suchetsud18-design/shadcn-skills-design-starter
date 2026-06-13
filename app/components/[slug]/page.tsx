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
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
    <div className="space-y-1 border-b pb-2">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-lg border bg-muted/50 p-4">
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
        {rows.map((r) => (
          <TableRow key={r.token}>
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

  return (
    <article className="space-y-10">
      <header className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Components</p>
            <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{doc.title}</h1>
            <p className="max-w-2xl text-lg text-muted-foreground">{doc.description}</p>
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
      </header>

      <section className="space-y-4">
        <SectionHeading title="Installation" description="Add the component with the shadcn/ui CLI." />
        <CodeBlock>{installCmd(slug, meta)}</CodeBlock>
        {meta?.importCode ? <CodeBlock>{meta.importCode}</CodeBlock> : null}
      </section>

      <section className="space-y-4">
        <SectionHeading title="Usage" description="Compose the primitives as shown below." />
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-muted-foreground">Preview</span>
          <code className="rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
            @/components/ui/{slug}
          </code>
        </div>
        <div className="flex min-h-[240px] items-center justify-center rounded-lg border bg-card p-10">
          {demo ?? <span className="text-sm text-muted-foreground">No preview yet.</span>}
        </div>
        {meta?.usageCode ? <CodeBlock>{meta.usageCode}</CodeBlock> : null}
      </section>

      {galls?.length ? (
        <section className="space-y-6">
          <SectionHeading title="Examples" description="Common variations, matching the shadcn/ui docs." />
          <div className="space-y-8">
            {galls.map((gallery) => (
              <div key={gallery.title} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-semibold tracking-tight">{gallery.title}</h3>
                  {gallery.description ? (
                    <p className="text-sm text-muted-foreground">{gallery.description}</p>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-end gap-6 rounded-lg border bg-card p-6">
                  {gallery.demos.map((d, i) => (
                    <div key={d.label ?? i} className="flex flex-col items-center gap-2">
                      {d.node}
                      {d.label ? (
                        <code className="font-mono text-[11px] text-muted-foreground">{d.label}</code>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {meta?.props?.length ? (
        <section className="space-y-4">
          <SectionHeading title="API Reference" description="The most-used props for each part." />
          <div className="rounded-lg border">
            <PropsTable rows={meta.props} />
          </div>
        </section>
      ) : null}

      {meta?.tokens?.length ? (
        <section className="space-y-4">
          <SectionHeading
            title="Design Tokens"
            description="The design tokens this component consumes."
          />
          <div className="rounded-lg border">
            <TokensTable rows={meta.tokens} />
          </div>
        </section>
      ) : null}

      {meta?.a11y?.length ? (
        <section className="space-y-4">
          <SectionHeading title="Accessibility" description={meta.a11yNote} />
          <div className="rounded-lg border">
            <A11yTable rows={meta.a11y} />
          </div>
        </section>
      ) : null}
    </article>
  )
}
