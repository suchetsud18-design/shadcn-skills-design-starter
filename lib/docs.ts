// Documentation registry — the single source of truth for the docs site.
// Add a component here (and a demo in app/components/[slug]/demos.tsx) and the
// sidebar, routes, and pages all pick it up automatically.

export type DocMeta = {
  slug: string
  title: string
  description: string
}

export const intro: DocMeta = {
  slug: "",
  title: "Introduction",
  description:
    "Every shadcn/ui component from the Figma file — themed with this project's design tokens.",
}

export const componentDocs: DocMeta[] = [
  { slug: "accordion", title: "Accordion", description: "A vertically stacked set of interactive headings that reveal content." },
  { slug: "alert", title: "Alert", description: "Displays a callout to draw the user's attention." },
  { slug: "alert-dialog", title: "Alert Dialog", description: "A modal dialog that interrupts the user and expects a response." },
  { slug: "aspect-ratio", title: "Aspect Ratio", description: "Constrains content to a desired width-to-height ratio." },
  { slug: "avatar", title: "Avatar", description: "An image element with a text fallback for a user." },
  { slug: "badge", title: "Badge", description: "Displays a badge or a component that looks like a badge." },
  { slug: "breadcrumb", title: "Breadcrumb", description: "Shows the path to the current resource using a hierarchy of links." },
  { slug: "button", title: "Button", description: "Displays a button or a component that looks like a button." },
  { slug: "button-group", title: "Button Group", description: "Groups related buttons together with shared borders." },
  { slug: "calendar", title: "Calendar", description: "A date field component for selecting dates." },
  { slug: "card", title: "Card", description: "A container with header, content, and footer sections." },
  { slug: "carousel", title: "Carousel", description: "A carousel with motion and swipe, built with Embla." },
  { slug: "chart", title: "Chart", description: "Composable charts built on Recharts." },
  { slug: "checkbox", title: "Checkbox", description: "A control that allows a single value to be selected or cleared." },
  { slug: "collapsible", title: "Collapsible", description: "An interactive component that expands and collapses content." },
  { slug: "combobox", title: "Combobox", description: "An autocomplete input built from Popover and Command." },
  { slug: "command", title: "Command", description: "Fast, composable command menu for your app." },
  { slug: "context-menu", title: "Context Menu", description: "A menu displayed on right-click of an element." },
  { slug: "data-table", title: "Data Table", description: "A table for displaying structured rows of data." },
  { slug: "date-picker", title: "Date Picker", description: "A date picker built from Popover and Calendar." },
  { slug: "dialog", title: "Dialog", description: "A window overlaid on the primary content." },
  { slug: "drawer", title: "Drawer", description: "A panel that slides in from the edge of the screen." },
  { slug: "dropdown-menu", title: "Dropdown Menu", description: "A menu of actions or options triggered by a button." },
  { slug: "empty", title: "Empty", description: "A placeholder for empty states." },
  { slug: "field", title: "Field", description: "Composable form field with label, description, and error." },
  { slug: "hover-card", title: "Hover Card", description: "Preview content available behind a link on hover." },
  { slug: "input", title: "Input", description: "Displays a form input field or a component that looks like one." },
  { slug: "input-group", title: "Input Group", description: "Group inputs with addons, buttons, and text." },
  { slug: "input-otp", title: "Input OTP", description: "Accessible one-time-password input with copy-paste." },
  { slug: "item", title: "Item", description: "A flexible row for lists, with media, content, and actions." },
  { slug: "kbd", title: "Kbd", description: "Displays keyboard keys and shortcuts." },
  { slug: "label", title: "Label", description: "Renders an accessible label associated with a control." },
  { slug: "menubar", title: "Menubar", description: "A desktop-style menu bar with menus and commands." },
  { slug: "native-select", title: "Native Select", description: "A styled wrapper around the native select element." },
  { slug: "navigation-menu", title: "Navigation Menu", description: "A collection of links for navigating a site." },
  { slug: "pagination", title: "Pagination", description: "Page navigation with previous and next links." },
  { slug: "popover", title: "Popover", description: "Rich content in a portal, triggered by a button." },
  { slug: "progress", title: "Progress", description: "Displays an indicator showing completion progress." },
  { slug: "radio-group", title: "Radio Group", description: "A set of checkable buttons where only one can be selected." },
  { slug: "scroll-area", title: "Scroll Area", description: "A scrollable region with custom styled scrollbars." },
  { slug: "select", title: "Select", description: "Displays a list of options for the user to pick from." },
  { slug: "separator", title: "Separator", description: "Visually or semantically separates content." },
  { slug: "sheet", title: "Sheet", description: "A dialog that slides in from the side of the screen." },
  { slug: "sidebar", title: "Sidebar", description: "A composable, themeable application sidebar." },
  { slug: "skeleton", title: "Skeleton", description: "A placeholder to show while content is loading." },
  { slug: "slider", title: "Slider", description: "An input for selecting a value from a range." },
  { slug: "sonner", title: "Sonner", description: "An opinionated toast notification component." },
  { slug: "spinner", title: "Spinner", description: "An indeterminate loading indicator." },
  { slug: "switch", title: "Switch", description: "A control that toggles between an on and off state." },
  { slug: "table", title: "Table", description: "A responsive table component." },
  { slug: "tabs", title: "Tabs", description: "Layered sections of content displayed one panel at a time." },
  { slug: "textarea", title: "Textarea", description: "Displays a multi-line text input field." },
  { slug: "toggle", title: "Toggle", description: "A two-state button that can be on or off." },
  { slug: "toggle-group", title: "Toggle Group", description: "A set of two-state buttons that can be toggled." },
  { slug: "tooltip", title: "Tooltip", description: "A popup that displays information on hover." },
]

export const allDocs: DocMeta[] = [intro, ...componentDocs]

export function getDoc(slug: string): DocMeta | undefined {
  return componentDocs.find((d) => d.slug === slug)
}
