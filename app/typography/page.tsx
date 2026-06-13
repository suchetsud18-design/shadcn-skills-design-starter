import { Badge } from "@/components/ui/badge"

export const metadata = { title: "Typography — Docs Design" }

// DESIGN.md §3. Class strings are literals so Tailwind's scanner generates them.
const typeScale = [
  { role: "Display", cls: "text-5xl font-bold", meta: "48 / 700" },
  { role: "H1", cls: "text-4xl font-bold", meta: "36 / 700" },
  { role: "H2", cls: "text-3xl font-semibold", meta: "30 / 600" },
  { role: "H3", cls: "text-2xl font-semibold", meta: "24 / 600" },
  { role: "H4", cls: "text-xl font-medium", meta: "20 / 500" },
  { role: "Body", cls: "text-base", meta: "16 / 400" },
  { role: "Small", cls: "text-sm", meta: "14 / 400" },
  { role: "Caption", cls: "text-xs text-muted-foreground", meta: "12 / 400" },
]

const fontSizes = [
  { cls: "text-xs", px: "12px", rem: "0.75rem" },
  { cls: "text-sm", px: "14px", rem: "0.875rem" },
  { cls: "text-base", px: "16px", rem: "1rem" },
  { cls: "text-lg", px: "18px", rem: "1.125rem" },
  { cls: "text-xl", px: "20px", rem: "1.25rem" },
  { cls: "text-2xl", px: "24px", rem: "1.5rem" },
  { cls: "text-3xl", px: "30px", rem: "1.875rem" },
  { cls: "text-4xl", px: "36px", rem: "2.25rem" },
  { cls: "text-5xl", px: "48px", rem: "3rem" },
  { cls: "text-6xl", px: "60px", rem: "3.75rem" },
]

const fontWeights = [
  { cls: "font-thin", w: "100" },
  { cls: "font-extralight", w: "200" },
  { cls: "font-light", w: "300" },
  { cls: "font-normal", w: "400" },
  { cls: "font-medium", w: "500" },
  { cls: "font-semibold", w: "600" },
  { cls: "font-bold", w: "700" },
  { cls: "font-extrabold", w: "800" },
  { cls: "font-black", w: "900" },
]

const tracking = [
  { cls: "tracking-tighter", v: "-0.8px" },
  { cls: "tracking-tight", v: "-0.4px" },
  { cls: "tracking-normal", v: "0px" },
  { cls: "tracking-wide", v: "0.4px" },
  { cls: "tracking-wider", v: "0.8px" },
  { cls: "tracking-widest", v: "1.6px" },
]

export default function TypographyPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Design Tokens</p>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">Typography</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          <span className="font-sans font-semibold">Inter</span> for UI text and{" "}
          <span className="font-mono font-medium">Geist Mono</span> for code — sized on a
          modular scale.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge variant="secondary">Inter (sans)</Badge>
          <Badge variant="secondary">Geist Mono (mono)</Badge>
        </div>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Font Families</h2>
          <p className="text-sm text-muted-foreground">Loaded via next/font.</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg border bg-card p-6">
            <p className="font-sans text-3xl">Ag</p>
            <p className="mt-3 font-sans text-base">The quick brown fox jumps over the lazy dog.</p>
            <code className="mt-3 block font-mono text-xs text-muted-foreground">font-sans · Inter</code>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <p className="font-mono text-3xl">Ag</p>
            <p className="mt-3 font-mono text-base">const value = 42 // the quick brown fox</p>
            <code className="mt-3 block font-mono text-xs text-muted-foreground">font-mono · Geist Mono</code>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Type Scale</h2>
          <p className="text-sm text-muted-foreground">Semantic roles and their classes.</p>
        </div>
        <div className="divide-y rounded-lg border bg-card">
          {typeScale.map((t) => (
            <div key={t.role} className="flex items-center justify-between gap-4 p-4">
              <p className={t.cls}>{t.role}</p>
              <div className="shrink-0 text-right">
                <code className="font-mono text-xs text-muted-foreground">{t.cls}</code>
                <p className="font-mono text-[11px] text-muted-foreground/70">{t.meta}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Font Sizes</h2>
        </div>
        <div className="divide-y rounded-lg border bg-card">
          {fontSizes.map((f) => (
            <div key={f.cls} className="flex items-center justify-between gap-4 px-4 py-3">
              <p className={`${f.cls} truncate`}>Almost before we knew it</p>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-[11px] text-muted-foreground/70">
                  {f.px} · {f.rem}
                </span>
                <code className="font-mono text-xs text-muted-foreground">{f.cls}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Font Weights</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {fontWeights.map((f) => (
            <div key={f.cls} className="flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3">
              <span className={`${f.cls} text-lg`}>Aa {f.w}</span>
              <code className="font-mono text-xs text-muted-foreground">{f.cls}</code>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Letter Spacing</h2>
        </div>
        <div className="divide-y rounded-lg border bg-card">
          {tracking.map((t) => (
            <div key={t.cls} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className={`${t.cls} text-base`}>Tracking sample</span>
              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-[11px] text-muted-foreground/70">{t.v}</span>
                <code className="font-mono text-xs text-muted-foreground">{t.cls}</code>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
