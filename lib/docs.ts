// Documentation registry — the single source of truth for the docs site.
// Add a component here and the sidebar, routes, and pages all pick it up.

export type DocMeta = {
  slug: string
  title: string
  description: string
}

export const intro: DocMeta = {
  slug: "",
  title: "Introduction",
  description:
    "Beautifully designed components you can copy and paste into your apps — themed with this project's design tokens.",
}

export const componentDocs: DocMeta[] = [
  { slug: "button", title: "Button", description: "Displays a button or a component that looks like a button." },
  { slug: "badge", title: "Badge", description: "Displays a badge or a component that looks like a badge." },
  { slug: "input", title: "Input", description: "Displays a form input field or a component that looks like one." },
  { slug: "label", title: "Label", description: "Renders an accessible label associated with a control." },
  { slug: "card", title: "Card", description: "A container with header, content, and footer sections." },
  { slug: "accordion", title: "Accordion", description: "A vertically stacked set of interactive headings that reveal content." },
  { slug: "tabs", title: "Tabs", description: "Layered sections of content displayed one panel at a time." },
  { slug: "switch", title: "Switch", description: "A control that toggles between an on and off state." },
  { slug: "checkbox", title: "Checkbox", description: "A control that allows a single value to be selected or cleared." },
  { slug: "alert", title: "Alert", description: "Displays a callout to draw the user's attention." },
  { slug: "avatar", title: "Avatar", description: "An image element with a text fallback for a user." },
  { slug: "tooltip", title: "Tooltip", description: "A popup that displays information related to an element on hover." },
  { slug: "separator", title: "Separator", description: "Visually or semantically separates content." },
  { slug: "skeleton", title: "Skeleton", description: "A placeholder to show while content is loading." },
]

export const allDocs: DocMeta[] = [intro, ...componentDocs]

export function getDoc(slug: string): DocMeta | undefined {
  return componentDocs.find((d) => d.slug === slug)
}
