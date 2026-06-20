// Generates lib/component-meta.ts from the authored data below.
// Run: node scripts/gen-meta.mjs
import { writeFileSync } from "node:fs"

// ---- shared accessibility presets ----------------------------------------
const A_MENU = [["↑ / ↓", "Move between items"], ["→ / ←", "Open / close submenu"], ["Enter / Space", "Select item"], ["Esc", "Close menu"], ["A–Z", "Type-ahead to item"]]
const A_SELECT = [["↑ / ↓", "Move between options"], ["Enter / Space", "Select option"], ["Esc", "Close"], ["A–Z", "Type-ahead"]]
const A_DIALOG = [["Tab / Shift+Tab", "Cycle focus (trapped)"], ["Esc", "Close"]]
const A_POPOVER = [["Esc", "Close"], ["Tab", "Move focus out"]]
const A_TABS = [["→ / ←", "Move between tabs"], ["Home / End", "First / last tab"], ["Enter / Space", "Activate tab"]]
const A_TOGGLE = [["Space / Enter", "Toggle state"]]
const A_RADIO = [["↑ / ↓", "Move selection"], ["Space", "Select focused"]]
const A_SLIDER = [["← / →", "Adjust by step"], ["Home / End", "Min / max value"]]
const A_DISCLOSURE = [["Enter / Space", "Toggle open"], ["Tab", "Move to next focusable"]]

// swatch helper
const sw = (token, cls, usage) => [token, cls, usage, true]

// ---- per-component authored data -----------------------------------------
// Fields: figma, imp (import code), use (usage snippet), props [[component,prop,type,default,desc]],
// tok [[token,value,usage,swatch?]], a11y [[keys,action]], note (a11y note).
const M = {
  accordion: {
    figma: "72-2591",
    imp: `import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from "@/components/ui/accordion"`,
    use: `<Accordion type="single" collapsible className="w-full">\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Product Information</AccordionTrigger>\n    <AccordionContent>\n      Our flagship product combines cutting-edge technology.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`,
    props: [
      ["Accordion", "type", `"single" | "multiple"`, "—", "Single or multiple open items."],
      ["Accordion", "collapsible", "boolean", "false", `Allow closing when type="single".`],
      ["Accordion", "defaultValue", "string | string[]", "—", "Default open item(s) — uncontrolled."],
      ["AccordionItem", "value", "string", "—", "Unique identifier for this item."],
      ["AccordionItem", "disabled", "boolean", "false", "Prevents interaction."],
    ],
    tok: [sw("--border", "border-border", "Item separator"), sw("--foreground", "text-foreground", "Label + content text"), sw("--muted-foreground", "text-muted-foreground", "Chevron icon"), ["text-sm", "14px", "Trigger + content size"], ["font-medium", "500", "Trigger weight"]],
    a11y: A_DISCLOSURE,
    note: "Implements the WAI-ARIA Accordion pattern via Radix UI.",
  },
  alert: {
    figma: "72-2633",
    imp: `import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"`,
    use: `<Alert>\n  <Terminal />\n  <AlertTitle>Heads up!</AlertTitle>\n  <AlertDescription>You can add components to your app.</AlertDescription>\n</Alert>`,
    props: [
      ["Alert", "variant", `"default" | "destructive"`, `"default"`, "Visual tone of the callout."],
    ],
    tok: [sw("--card", "bg-card", "Alert surface"), sw("--foreground", "text-foreground", "Title text"), sw("--muted-foreground", "text-muted-foreground", "Description text"), sw("--destructive", "text-destructive", "Destructive variant")],
    note: "Use role=\"alert\" only for time-sensitive messages; this is a static callout by default.",
  },
  "alert-dialog": {
    figma: "72-2675",
    imp: `import {\n  AlertDialog,\n  AlertDialogAction,\n  AlertDialogCancel,\n  AlertDialogContent,\n  AlertDialogDescription,\n  AlertDialogFooter,\n  AlertDialogHeader,\n  AlertDialogTitle,\n  AlertDialogTrigger,\n} from "@/components/ui/alert-dialog"`,
    use: `<AlertDialog>\n  <AlertDialogTrigger asChild>\n    <Button variant="outline">Delete</Button>\n  </AlertDialogTrigger>\n  <AlertDialogContent>\n    <AlertDialogHeader>\n      <AlertDialogTitle>Are you sure?</AlertDialogTitle>\n      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>\n    </AlertDialogHeader>\n    <AlertDialogFooter>\n      <AlertDialogCancel>Cancel</AlertDialogCancel>\n      <AlertDialogAction>Continue</AlertDialogAction>\n    </AlertDialogFooter>\n  </AlertDialogContent>\n</AlertDialog>`,
    props: [
      ["AlertDialog", "open", "boolean", "—", "Controlled open state."],
      ["AlertDialog", "onOpenChange", "(open: boolean) => void", "—", "Open-state change handler."],
      ["AlertDialogAction", "asChild", "boolean", "false", "Merge props onto child."],
    ],
    tok: [sw("--card", "bg-card", "Dialog surface"), sw("--foreground", "text-foreground", "Title text"), sw("--muted-foreground", "text-muted-foreground", "Description"), sw("--primary", "bg-primary", "Action button")],
    a11y: A_DIALOG,
    note: "A modal that interrupts and requires a choice; focus is trapped until dismissed.",
  },
  "aspect-ratio": {
    figma: "1098-924",
    imp: `import { AspectRatio } from "@/components/ui/aspect-ratio"`,
    use: `<AspectRatio ratio={16 / 9}>\n  <img src="/cover.jpg" alt="Cover" className="size-full object-cover" />\n</AspectRatio>`,
    props: [["AspectRatio", "ratio", "number", "1", "Width-to-height ratio, e.g. 16 / 9."]],
    note: "Layout-only wrapper — it constrains dimensions and consumes no color tokens; styling comes from the child you place inside. Give media an alt attribute.",
  },
  avatar: {
    figma: "72-2717",
    imp: `import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"`,
    use: `<Avatar>\n  <AvatarImage src="/user.png" alt="@shadcn" />\n  <AvatarFallback>CN</AvatarFallback>\n</Avatar>`,
    props: [
      ["AvatarImage", "src", "string", "—", "Image source."],
      ["AvatarImage", "alt", "string", "—", "Alt text for the image."],
      ["AvatarFallback", "delayMs", "number", "—", "Delay before showing the fallback."],
    ],
    tok: [sw("--muted", "bg-muted", "Fallback background"), sw("--muted-foreground", "text-muted-foreground", "Fallback initials"), ["rounded-full", "9999px", "Circular shape"]],
    note: "Always provide AvatarFallback and an alt on AvatarImage.",
  },
  badge: {
    figma: "72-2718",
    imp: `import { Badge } from "@/components/ui/badge"`,
    use: `<Badge>Default</Badge>\n<Badge variant="secondary">Secondary</Badge>\n<Badge variant="outline">Outline</Badge>\n<Badge variant="destructive">Destructive</Badge>`,
    props: [
      ["Badge", "variant", `"default" | "secondary" | "destructive" | "outline"`, `"default"`, "Visual style."],
      ["Badge", "asChild", "boolean", "false", "Render as the child element (e.g. a link)."],
    ],
    tok: [sw("--primary", "bg-primary", "Default fill"), sw("--secondary", "bg-secondary", "Secondary fill"), sw("--destructive", "bg-destructive", "Destructive fill"), ["rounded-md", "6px", "Corner radius"]],
    note: "Decorative status label — not focusable unless rendered asChild as a link.",
  },
  breadcrumb: {
    figma: "101-2",
    imp: `import {\n  Breadcrumb,\n  BreadcrumbItem,\n  BreadcrumbLink,\n  BreadcrumbList,\n  BreadcrumbPage,\n  BreadcrumbSeparator,\n} from "@/components/ui/breadcrumb"`,
    use: `<Breadcrumb>\n  <BreadcrumbList>\n    <BreadcrumbItem>\n      <BreadcrumbLink href="/">Home</BreadcrumbLink>\n    </BreadcrumbItem>\n    <BreadcrumbSeparator />\n    <BreadcrumbItem>\n      <BreadcrumbPage>Docs</BreadcrumbPage>\n    </BreadcrumbItem>\n  </BreadcrumbList>\n</Breadcrumb>`,
    props: [["BreadcrumbLink", "asChild", "boolean", "false", "Render with a custom link (e.g. next/link)."]],
    tok: [sw("--muted-foreground", "text-muted-foreground", "Inactive crumbs"), sw("--foreground", "text-foreground", "Current page")],
    note: "Wrapped in nav aria-label=\"breadcrumb\"; the current page uses aria-current=\"page\".",
  },
  button: {
    figma: "72-2719",
    imp: `import { Button } from "@/components/ui/button"`,
    use: `<Button>Save</Button>\n<Button variant="secondary">Cancel</Button>\n<Button variant="outline">View</Button>\n<Button variant="ghost" size="icon"><Settings /></Button>\n<Button variant="destructive">Delete</Button>`,
    props: [
      ["Button", "variant", `"default" | "secondary" | "outline" | "ghost" | "link" | "destructive"`, `"default"`, "Visual style."],
      ["Button", "size", `"default" | "sm" | "lg" | "icon"`, `"default"`, "Control size."],
      ["Button", "asChild", "boolean", "false", "Render as the child (e.g. a link)."],
      ["Button", "disabled", "boolean", "false", "Disable interaction."],
    ],
    tok: [sw("--primary", "bg-primary", "Default fill"), sw("--primary-foreground", "text-primary-foreground", "Label on primary"), sw("--ring", "ring-ring", "Focus ring"), ["h-9 px-4", "36 / 16px", "Default size"]],
    a11y: [["Enter / Space", "Activate"], ["Tab", "Move focus"]],
    note: "Icon-only buttons need an aria-label.",
  },
  "button-group": {
    figma: "1185-1979",
    imp: `import { ButtonGroup } from "@/components/ui/button-group"\nimport { Button } from "@/components/ui/button"`,
    use: `<ButtonGroup>\n  <Button variant="outline">Bold</Button>\n  <Button variant="outline">Italic</Button>\n  <Button variant="outline">Underline</Button>\n</ButtonGroup>`,
    props: [["ButtonGroup", "orientation", `"horizontal" | "vertical"`, `"horizontal"`, "Layout direction of the grouped buttons."]],
    tok: [sw("--border", "border-border", "Shared borders"), ["rounded-md", "6px", "Outer corner radius"]],
    note: "Groups related buttons with shared borders; each button keeps its own focus.",
  },
  calendar: {
    figma: "72-2720",
    imp: `import { Calendar } from "@/components/ui/calendar"`,
    use: `const [date, setDate] = React.useState<Date | undefined>(new Date())\n\n<Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />`,
    props: [
      ["Calendar", "mode", `"single" | "multiple" | "range"`, `"single"`, "Selection mode."],
      ["Calendar", "selected", "Date | Date[] | DateRange", "—", "Selected date(s)."],
      ["Calendar", "onSelect", "(date) => void", "—", "Selection handler."],
      ["Calendar", "disabled", "Matcher | Matcher[]", "—", "Disabled days."],
    ],
    tok: [sw("--primary", "bg-primary", "Selected day"), sw("--accent", "bg-accent", "Hover / today"), sw("--muted-foreground", "text-muted-foreground", "Outside days")],
    a11y: [["← / →", "Previous / next day"], ["↑ / ↓", "Previous / next week"], ["Home / End", "Start / end of week"], ["PageUp / PageDown", "Previous / next month"]],
    note: "Built on React DayPicker with full keyboard grid navigation.",
  },
  card: {
    figma: "72-2721",
    imp: `import {\n  Card,\n  CardHeader,\n  CardTitle,\n  CardDescription,\n  CardContent,\n  CardFooter,\n} from "@/components/ui/card"`,
    use: `<Card>\n  <CardHeader>\n    <CardTitle>Title</CardTitle>\n    <CardDescription>Description</CardDescription>\n  </CardHeader>\n  <CardContent>Content</CardContent>\n  <CardFooter>Footer</CardFooter>\n</Card>`,
    props: [
      ["Card", "className", "string", "—", "Surface container; compose the parts below inside it."],
      ["CardHeader", "className", "string", "—", "Top section — holds CardTitle and CardDescription."],
      ["CardTitle", "className", "string", "—", "Accessible heading for the card."],
      ["CardDescription", "className", "string", "—", "Muted supporting text under the title."],
      ["CardContent", "className", "string", "—", "Main body region."],
      ["CardFooter", "className", "string", "—", "Bottom section — typically actions."],
    ],
    tok: [sw("--card", "bg-card", "Surface"), sw("--card-foreground", "text-card-foreground", "Text on card"), sw("--border", "border-border", "Outline"), ["p-6", "24px", "Section padding"]],
    note: "Layout container — do not nest a Card inside a Card.",
  },
  carousel: {
    figma: "72-2722",
    imp: `import {\n  Carousel,\n  CarouselContent,\n  CarouselItem,\n  CarouselNext,\n  CarouselPrevious,\n} from "@/components/ui/carousel"`,
    use: `<Carousel className="w-full max-w-xs">\n  <CarouselContent>\n    {items.map((i) => (\n      <CarouselItem key={i}>{i}</CarouselItem>\n    ))}\n  </CarouselContent>\n  <CarouselPrevious />\n  <CarouselNext />\n</Carousel>`,
    props: [
      ["Carousel", "orientation", `"horizontal" | "vertical"`, `"horizontal"`, "Scroll direction."],
      ["Carousel", "opts", "EmblaOptionsType", "—", "Embla carousel options."],
    ],
    tok: [sw("--background", "bg-background", "Control surface"), sw("--border", "border-border", "Control outline")],
    a11y: [["← / →", "Previous / next slide"], ["Tab", "Reach prev/next controls"]],
    note: "Built on Embla; arrow controls expose aria-labels.",
  },
  chart: {
    figma: "296-42",
    imp: `import {\n  ChartContainer,\n  ChartTooltip,\n  ChartTooltipContent,\n} from "@/components/ui/chart"`,
    use: `<ChartContainer config={chartConfig} className="h-[200px] w-full">\n  <BarChart data={data}>\n    <Bar dataKey="value" fill="var(--chart-1)" radius={4} />\n    <ChartTooltip content={<ChartTooltipContent />} />\n  </BarChart>\n</ChartContainer>`,
    props: [
      ["ChartContainer", "config", "ChartConfig", "—", "Maps data keys to label + color."],
    ],
    tok: [sw("--chart-1", "var(--chart-1)", "Series 1"), sw("--chart-2", "var(--chart-2)", "Series 2"), sw("--chart-3", "var(--chart-3)", "Series 3"), sw("--chart-4", "var(--chart-4)", "Series 4"), sw("--chart-5", "var(--chart-5)", "Series 5")],
    note: "Wraps Recharts; colors come from the --chart-* tokens for theme + dark support.",
  },
  checkbox: {
    figma: "72-2723",
    imp: `import { Checkbox } from "@/components/ui/checkbox"\nimport { Label } from "@/components/ui/label"`,
    use: `<div className="flex items-center gap-2">\n  <Checkbox id="terms" />\n  <Label htmlFor="terms">Accept terms</Label>\n</div>`,
    props: [
      ["Checkbox", "checked", `boolean | "indeterminate"`, "—", "Controlled checked state."],
      ["Checkbox", "onCheckedChange", "(checked) => void", "—", "Change handler."],
      ["Checkbox", "disabled", "boolean", "false", "Disable the control."],
      ["Checkbox", "aria-invalid", "boolean", "false", "Mark invalid for error styling."],
    ],
    tok: [sw("--primary", "bg-primary", "Checked fill"), sw("--primary-foreground", "text-primary-foreground", "Check mark"), sw("--input", "border-input", "Unchecked border"), sw("--ring", "ring-ring", "Focus ring")],
    a11y: [["Space", "Toggle checked"], ["Tab", "Move focus"]],
    note: "Pair with a Label via htmlFor; compose with Field/FieldDescription for helper text.",
  },
  collapsible: {
    figma: "72-2724",
    imp: `import {\n  Collapsible,\n  CollapsibleContent,\n  CollapsibleTrigger,\n} from "@/components/ui/collapsible"`,
    use: `<Collapsible>\n  <CollapsibleTrigger>Toggle</CollapsibleTrigger>\n  <CollapsibleContent>Hidden content</CollapsibleContent>\n</Collapsible>`,
    props: [
      ["Collapsible", "open", "boolean", "—", "Controlled open state."],
      ["Collapsible", "defaultOpen", "boolean", "false", "Initial open state (uncontrolled)."],
      ["Collapsible", "disabled", "boolean", "false", "Disable toggling."],
    ],
    tok: [sw("--foreground", "text-foreground", "Trigger + content")],
    a11y: A_DISCLOSURE,
    note: "Single open/close disclosure; trigger exposes aria-expanded.",
  },
  combobox: {
    figma: "73-187",
    imp: `import {\n  Combobox,\n  ComboboxInput,\n  ComboboxContent,\n  ComboboxList,\n  ComboboxItem,\n  ComboboxEmpty,\n} from "@/components/ui/combobox"`,
    use: `<Combobox items={frameworks}>\n  <ComboboxInput placeholder="Select a framework" />\n  <ComboboxContent>\n    <ComboboxEmpty>No framework found.</ComboboxEmpty>\n    <ComboboxList>\n      {(item) => (\n        <ComboboxItem key={item} value={item}>{item}</ComboboxItem>\n      )}\n    </ComboboxList>\n  </ComboboxContent>\n</Combobox>`,
    props: [
      ["Combobox", "items", "T[]", "—", "The list of selectable items."],
      ["Combobox", "multiple", "boolean", "false", "Allow multiple values (renders chips)."],
      ["Combobox", "value / onValueChange", "T | T[] / fn", "—", "Controlled selection."],
      ["ComboboxInput", "showClear", "boolean", "false", "Show a clear button."],
    ],
    tok: [sw("--popover", "bg-popover", "Dropdown surface"), sw("--accent", "bg-accent", "Highlighted option")],
    a11y: A_SELECT,
    note: "Built on the Base UI Combobox primitive (npx shadcn add combobox).",
  },
  command: {
    figma: "73-223",
    imp: `import {\n  Command,\n  CommandEmpty,\n  CommandGroup,\n  CommandInput,\n  CommandItem,\n  CommandList,\n  CommandSeparator,\n} from "@/components/ui/command"`,
    use: `<Command className="rounded-lg border shadow-md">\n  <CommandInput placeholder="Type a command…" />\n  <CommandList>\n    <CommandEmpty>No results found.</CommandEmpty>\n    <CommandGroup heading="Suggestions">\n      <CommandItem>Calendar</CommandItem>\n      <CommandItem>Search</CommandItem>\n    </CommandGroup>\n  </CommandList>\n</Command>`,
    props: [
      ["CommandItem", "onSelect", "(value: string) => void", "—", "Fires when the item is chosen."],
      ["CommandItem", "disabled", "boolean", "false", "Disable the item."],
    ],
    tok: [sw("--popover", "bg-popover", "Menu surface"), sw("--accent", "bg-accent", "Active item"), sw("--muted-foreground", "text-muted-foreground", "Group heading")],
    a11y: A_SELECT,
    note: "Built on cmdk with fuzzy search and full keyboard control.",
  },
  "context-menu": {
    figma: "73-224",
    imp: `import {\n  ContextMenu,\n  ContextMenuContent,\n  ContextMenuItem,\n  ContextMenuSeparator,\n  ContextMenuTrigger,\n} from "@/components/ui/context-menu"`,
    use: `<ContextMenu>\n  <ContextMenuTrigger>Right-click here</ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem>Back</ContextMenuItem>\n    <ContextMenuSeparator />\n    <ContextMenuItem>Reload</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
    props: [
      ["ContextMenuItem", "inset", "boolean", "false", "Indent to align with checkbox items."],
      ["ContextMenuItem", "disabled", "boolean", "false", "Disable the item."],
    ],
    tok: [sw("--popover", "bg-popover", "Menu surface"), sw("--accent", "bg-accent", "Highlighted item")],
    a11y: A_MENU,
    note: "Opens at the pointer on right-click / long-press.",
  },
  "data-table": {
    figma: "73-225",
    imp: `import {\n  Table,\n  TableBody,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from "@/components/ui/table"\nimport {\n  useReactTable,\n  getCoreRowModel,\n  flexRender,\n} from "@tanstack/react-table"`,
    use: `const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })\n\n<Table>{/* render table.getHeaderGroups() and table.getRowModel().rows */}</Table>`,
    props: [["—", "—", "—", "—", "Composed from Table + @tanstack/react-table."]],
    tok: [sw("--border", "border-border", "Row dividers"), sw("--muted", "bg-muted", "Header / hover row")],
    note: "A pattern, not a primitive: shadcn Table styling + TanStack Table for state.",
  },
  "date-picker": {
    figma: "73-226",
    imp: `import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"\nimport { Calendar } from "@/components/ui/calendar"`,
    use: `<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">{date ? format(date, "PPP") : "Pick a date"}</Button>\n  </PopoverTrigger>\n  <PopoverContent className="p-0">\n    <Calendar mode="single" selected={date} onSelect={setDate} />\n  </PopoverContent>\n</Popover>`,
    props: [["—", "—", "—", "—", "Composed from Popover + Calendar."]],
    tok: [sw("--popover", "bg-popover", "Panel surface"), sw("--primary", "bg-primary", "Selected day")],
    a11y: A_POPOVER,
    note: "Calendar in a Popover. See Calendar for grid navigation keys.",
  },
  dialog: {
    figma: "73-227",
    imp: `import {\n  Dialog,\n  DialogContent,\n  DialogDescription,\n  DialogFooter,\n  DialogHeader,\n  DialogTitle,\n  DialogTrigger,\n} from "@/components/ui/dialog"`,
    use: `<Dialog>\n  <DialogTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Title</DialogTitle>\n      <DialogDescription>Description</DialogDescription>\n    </DialogHeader>\n  </DialogContent>\n</Dialog>`,
    props: [
      ["Dialog", "open", "boolean", "—", "Controlled open state."],
      ["Dialog", "onOpenChange", "(open) => void", "—", "Open-state handler."],
      ["Dialog", "modal", "boolean", "true", "Block interaction with the rest of the page."],
      ["DialogContent", "showCloseButton", "boolean", "true", "Show the built-in close (X) button."],
    ],
    tok: [sw("--card", "bg-card", "Dialog surface"), sw("--foreground", "text-foreground", "Title"), sw("--muted-foreground", "text-muted-foreground", "Description")],
    a11y: A_DIALOG,
    note: "Always include DialogTitle (visually hidden is fine) for screen readers.",
  },
  drawer: {
    figma: "73-228",
    imp: `import {\n  Drawer,\n  DrawerContent,\n  DrawerDescription,\n  DrawerFooter,\n  DrawerHeader,\n  DrawerTitle,\n  DrawerTrigger,\n} from "@/components/ui/drawer"`,
    use: `<Drawer>\n  <DrawerTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Title</DrawerTitle>\n      <DrawerDescription>Description</DrawerDescription>\n    </DrawerHeader>\n  </DrawerContent>\n</Drawer>`,
    props: [
      ["Drawer", "open", "boolean", "—", "Controlled open state."],
      ["Drawer", "direction", `"top" | "right" | "bottom" | "left"`, `"bottom"`, "Edge the drawer enters from."],
      ["Drawer", "shouldScaleBackground", "boolean", "true", "Scale the page behind the drawer."],
    ],
    tok: [sw("--background", "bg-background", "Drawer surface"), sw("--muted", "bg-muted", "Drag handle")],
    a11y: A_DIALOG,
    note: "Mobile-first bottom sheet built on Vaul; drag or Esc to dismiss.",
  },
  "dropdown-menu": {
    figma: "73-229",
    imp: `import {\n  DropdownMenu,\n  DropdownMenuContent,\n  DropdownMenuItem,\n  DropdownMenuLabel,\n  DropdownMenuSeparator,\n  DropdownMenuTrigger,\n} from "@/components/ui/dropdown-menu"`,
    use: `<DropdownMenu>\n  <DropdownMenuTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </DropdownMenuTrigger>\n  <DropdownMenuContent>\n    <DropdownMenuLabel>My Account</DropdownMenuLabel>\n    <DropdownMenuSeparator />\n    <DropdownMenuItem>Profile</DropdownMenuItem>\n    <DropdownMenuItem>Settings</DropdownMenuItem>\n  </DropdownMenuContent>\n</DropdownMenu>`,
    props: [
      ["DropdownMenuCheckboxItem", "checked", "boolean", "—", "Checkbox item state."],
      ["DropdownMenuItem", "inset", "boolean", "false", "Indent to align with checkbox items."],
      ["DropdownMenuItem", "disabled", "boolean", "false", "Disable the item."],
    ],
    tok: [sw("--popover", "bg-popover", "Menu surface"), sw("--accent", "bg-accent", "Highlighted item"), sw("--muted-foreground", "text-muted-foreground", "Label / shortcut")],
    a11y: A_MENU,
    note: "Triggered by a button; supports checkbox, radio, and submenu items.",
  },
  empty: {
    figma: "1186-3809",
    imp: `import {\n  Empty,\n  EmptyContent,\n  EmptyDescription,\n  EmptyHeader,\n  EmptyMedia,\n  EmptyTitle,\n} from "@/components/ui/empty"`,
    use: `<Empty>\n  <EmptyHeader>\n    <EmptyMedia variant="icon"><Inbox /></EmptyMedia>\n    <EmptyTitle>No data yet</EmptyTitle>\n    <EmptyDescription>Add your first item to get started.</EmptyDescription>\n  </EmptyHeader>\n  <EmptyContent>\n    <Button>Add item</Button>\n  </EmptyContent>\n</Empty>`,
    props: [["EmptyMedia", "variant", `"default" | "icon"`, `"default"`, "Media presentation."]],
    tok: [sw("--muted", "bg-muted", "Icon background"), sw("--muted-foreground", "text-muted-foreground", "Description")],
    note: "Layout for empty states; pair with a clear primary action.",
  },
  field: {
    figma: "1188-4205",
    imp: `import {\n  Field,\n  FieldContent,\n  FieldDescription,\n  FieldError,\n  FieldGroup,\n  FieldLabel,\n  FieldLegend,\n  FieldSeparator,\n  FieldSet,\n} from "@/components/ui/field"`,
    use: `<FieldGroup>\n  <Field>\n    <FieldLabel htmlFor="email">Email</FieldLabel>\n    <Input id="email" type="email" />\n    <FieldDescription>We never share it.</FieldDescription>\n  </Field>\n  <Field data-invalid>\n    <FieldLabel htmlFor="pw">Password</FieldLabel>\n    <Input id="pw" type="password" aria-invalid />\n    <FieldError>Required</FieldError>\n  </Field>\n</FieldGroup>`,
    props: [
      ["Field", "orientation", `"vertical" | "horizontal" | "responsive"`, `"vertical"`, "Layout direction."],
      ["Field", "data-invalid", "boolean", "—", "Marks the field as invalid (styles FieldError)."],
    ],
    tok: [sw("--foreground", "text-foreground", "Label"), sw("--muted-foreground", "text-muted-foreground", "Description"), sw("--destructive", "text-destructive", "Error text")],
    note: "Form-library-agnostic field scaffolding; this project uses it instead of Form. Compose with FieldSet/FieldLegend, FieldContent, FieldSeparator.",
  },
  "hover-card": {
    figma: "73-231",
    imp: `import {\n  HoverCard,\n  HoverCardContent,\n  HoverCardTrigger,\n} from "@/components/ui/hover-card"`,
    use: `<HoverCard>\n  <HoverCardTrigger asChild>\n    <Button variant="link">@nextjs</Button>\n  </HoverCardTrigger>\n  <HoverCardContent>The React Framework — by Vercel.</HoverCardContent>\n</HoverCard>`,
    props: [
      ["HoverCard", "openDelay", "number", "700", "ms before opening on hover."],
      ["HoverCard", "closeDelay", "number", "300", "ms before closing."],
    ],
    tok: [sw("--popover", "bg-popover", "Card surface"), sw("--border", "border-border", "Outline")],
    note: "Hover/focus preview for sighted pointer users — don't hide essential info here.",
  },
  input: {
    figma: "73-1977",
    imp: `import { Input } from "@/components/ui/input"\nimport { Label } from "@/components/ui/label"`,
    use: `<div className="grid gap-2">\n  <Label htmlFor="email">Email</Label>\n  <Input id="email" type="email" placeholder="name@example.com" />\n</div>`,
    props: [
      ["Input", "type", "string", `"text"`, "Native input type."],
      ["Input", "disabled", "boolean", "false", "Disable the field."],
      ["Input", "aria-invalid", "boolean", "—", "Apply the invalid styling + a11y state."],
    ],
    tok: [sw("--input", "border-input", "Border"), sw("--ring", "ring-ring", "Focus ring"), sw("--muted-foreground", "text-muted-foreground", "Placeholder"), ["h-9 px-3", "36 / 12px", "Size"]],
    a11y: [["Tab", "Move focus"]],
    note: "Every input needs an associated Label (htmlFor); compose with Field for description + error.",
  },
  "input-group": {
    figma: "1188-5363",
    imp: `import {\n  InputGroup,\n  InputGroupAddon,\n  InputGroupButton,\n  InputGroupInput,\n  InputGroupText,\n  InputGroupTextarea,\n} from "@/components/ui/input-group"`,
    use: `<InputGroup>\n  <InputGroupAddon><Search className="size-4" /></InputGroupAddon>\n  <InputGroupInput placeholder="Search…" />\n</InputGroup>`,
    props: [["InputGroupAddon", "align", `"inline-start" | "inline-end" | "block-start" | "block-end"`, `"inline-start"`, "Addon position."]],
    tok: [sw("--input", "border-input", "Group border"), sw("--muted-foreground", "text-muted-foreground", "Addon icon")],
    note: "Compose inputs with leading/trailing icons, text, buttons, or a spinner; supports InputGroupTextarea.",
  },
  "input-otp": {
    figma: "101-698",
    imp: `import {\n  InputOTP,\n  InputOTPGroup,\n  InputOTPSlot,\n  InputOTPSeparator,\n} from "@/components/ui/input-otp"`,
    use: `<InputOTP maxLength={6}>\n  <InputOTPGroup>\n    <InputOTPSlot index={0} />\n    <InputOTPSlot index={1} />\n    <InputOTPSlot index={2} />\n  </InputOTPGroup>\n</InputOTP>`,
    props: [
      ["InputOTP", "maxLength", "number", "—", "Number of slots."],
      ["InputOTP", "pattern", "string", "—", "Allowed-character regex (e.g. REGEXP_ONLY_DIGITS)."],
      ["InputOTP", "value", "string", "—", "Controlled value."],
      ["InputOTP", "disabled", "boolean", "false", "Disable the input."],
      ["InputOTPSlot", "index", "number", "—", "Slot position."],
    ],
    tok: [sw("--input", "border-input", "Slot border"), sw("--ring", "ring-ring", "Active slot ring")],
    a11y: [["← / →", "Move between slots"], ["Backspace", "Clear + step back"], ["Cmd/Ctrl+V", "Paste full code"]],
    note: "Accessible one-time-password input with copy-paste support.",
  },
  item: {
    figma: "1196-923",
    imp: `import {\n  Item,\n  ItemContent,\n  ItemMedia,\n  ItemActions,\n  ItemTitle,\n  ItemDescription,\n} from "@/components/ui/item"`,
    use: `<Item>\n  <ItemMedia><Avatar>…</Avatar></ItemMedia>\n  <ItemContent>\n    <ItemTitle>Jane Doe</ItemTitle>\n    <ItemDescription>jane@example.com</ItemDescription>\n  </ItemContent>\n  <ItemActions><Button size="sm">View</Button></ItemActions>\n</Item>`,
    props: [["Item", "variant", `"default" | "outline" | "muted"`, `"default"`, "Surface style."]],
    tok: [sw("--foreground", "text-foreground", "Title"), sw("--muted-foreground", "text-muted-foreground", "Description"), sw("--border", "border-border", "Outline variant")],
    note: "A flexible list row with media, content, and actions slots.",
  },
  kbd: {
    figma: "1196-1097",
    imp: `import { Kbd, KbdGroup } from "@/components/ui/kbd"`,
    use: `<KbdGroup>\n  <Kbd>Ctrl</Kbd>\n  <Kbd>K</Kbd>\n</KbdGroup>`,
    props: [
      ["Kbd", "className", "string", "—", "A single keyboard key."],
      ["KbdGroup", "className", "string", "—", "Groups keys into a shortcut (e.g. Ctrl + K)."],
    ],
    tok: [sw("--muted", "bg-muted", "Key surface"), sw("--muted-foreground", "text-muted-foreground", "Key text")],
    note: "Presentational — displays keyboard keys and shortcuts.",
  },
  label: {
    figma: "73-1978",
    imp: `import { Label } from "@/components/ui/label"`,
    use: `<Label htmlFor="email">Your email</Label>`,
    props: [["Label", "htmlFor", "string", "—", "Associates the label with a control id."]],
    tok: [sw("--foreground", "text-foreground", "Label text"), ["text-sm font-medium", "14 / 500", "Type"]],
    note: "Clicking the label focuses its associated control; use FieldLabel inside a Field.",
  },
  menubar: {
    figma: "73-1979",
    imp: `import {\n  Menubar,\n  MenubarContent,\n  MenubarItem,\n  MenubarMenu,\n  MenubarSeparator,\n  MenubarTrigger,\n} from "@/components/ui/menubar"`,
    use: `<Menubar>\n  <MenubarMenu>\n    <MenubarTrigger>File</MenubarTrigger>\n    <MenubarContent>\n      <MenubarItem>New Tab</MenubarItem>\n      <MenubarSeparator />\n      <MenubarItem>Share</MenubarItem>\n    </MenubarContent>\n  </MenubarMenu>\n</Menubar>`,
    props: [["MenubarItem", "inset", "boolean", "false", "Indent to align with checkbox items."]],
    tok: [sw("--background", "bg-background", "Bar surface"), sw("--popover", "bg-popover", "Menu surface"), sw("--accent", "bg-accent", "Highlighted item")],
    a11y: [["← / →", "Move between menus"], ...A_MENU],
    note: "Desktop-style application menu bar.",
  },
  "native-select": {
    figma: "1254-65",
    imp: `import {\n  NativeSelect,\n  NativeSelectOptGroup,\n  NativeSelectOption,\n} from "@/components/ui/native-select"`,
    use: `<NativeSelect>\n  <NativeSelectOption value="apple">Apple</NativeSelectOption>\n  <NativeSelectOption value="banana">Banana</NativeSelectOption>\n</NativeSelect>`,
    props: [
      ["NativeSelect", "disabled", "boolean", "false", "Disable the control."],
      ["NativeSelect", "aria-invalid", "boolean", "—", "Apply invalid styling + a11y state."],
      ["NativeSelectOption", "value", "string", "—", "Option value."],
      ["NativeSelectOption", "disabled", "boolean", "false", "Disable the option."],
      ["NativeSelectOptGroup", "label", "string", "—", "Group heading."],
    ],
    tok: [sw("--input", "border-input", "Border"), sw("--ring", "ring-ring", "Focus ring")],
    a11y: [["↑ / ↓", "Change option (native)"], ["Tab", "Move focus"]],
    note: "Styled wrapper over the native <select> — best for long/mobile lists; compose with Field for label + error.",
  },
  "navigation-menu": {
    figma: "73-1980",
    imp: `import {\n  NavigationMenu,\n  NavigationMenuContent,\n  NavigationMenuItem,\n  NavigationMenuLink,\n  NavigationMenuList,\n  NavigationMenuTrigger,\n} from "@/components/ui/navigation-menu"`,
    use: `<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger>Products</NavigationMenuTrigger>\n      <NavigationMenuContent>{/* links */}</NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`,
    props: [["NavigationMenu", "viewport", "boolean", "true", "Render content in a shared viewport."]],
    tok: [sw("--accent", "bg-accent", "Hover item"), sw("--popover", "bg-popover", "Flyout surface")],
    a11y: [["← / →", "Move between top items"], ["Enter / Space", "Open content"], ["Esc", "Close"]],
    note: "Top-level site navigation with optional flyout panels.",
  },
  pagination: {
    figma: "73-1981",
    imp: `import {\n  Pagination,\n  PaginationContent,\n  PaginationItem,\n  PaginationLink,\n  PaginationNext,\n  PaginationPrevious,\n} from "@/components/ui/pagination"`,
    use: `<Pagination>\n  <PaginationContent>\n    <PaginationItem><PaginationPrevious href="#" /></PaginationItem>\n    <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>\n    <PaginationItem><PaginationNext href="#" /></PaginationItem>\n  </PaginationContent>\n</Pagination>`,
    props: [["PaginationLink", "isActive", "boolean", "false", "Marks the current page (aria-current)."]],
    tok: [sw("--accent", "bg-accent", "Active page"), sw("--foreground", "text-foreground", "Page link")],
    note: "Rendered as nav aria-label=\"pagination\"; the active page sets aria-current=\"page\".",
  },
  popover: {
    figma: "73-1982",
    imp: `import {\n  Popover,\n  PopoverContent,\n  PopoverTrigger,\n} from "@/components/ui/popover"`,
    use: `<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </PopoverTrigger>\n  <PopoverContent>Place content here.</PopoverContent>\n</Popover>`,
    props: [
      ["Popover", "open", "boolean", "—", "Controlled open state."],
      ["PopoverContent", "align", `"start" | "center" | "end"`, `"center"`, "Alignment to the trigger."],
      ["PopoverContent", "sideOffset", "number", "4", "Gap from the trigger."],
    ],
    tok: [sw("--popover", "bg-popover", "Surface"), sw("--popover-foreground", "text-popover-foreground", "Text"), sw("--border", "border-border", "Outline")],
    a11y: A_POPOVER,
    note: "Non-modal floating content anchored to a trigger.",
  },
  progress: {
    figma: "73-1983",
    imp: `import { Progress } from "@/components/ui/progress"`,
    use: `<Progress value={60} className="w-full" />`,
    props: [["Progress", "value", "number", "—", "Completion 0–100."]],
    tok: [sw("--primary", "bg-primary", "Fill"), sw("--primary", "bg-primary/20", "Track (20% primary)")],
    note: "Exposes role=\"progressbar\" with aria-valuenow.",
  },
  "radio-group": {
    figma: "73-1984",
    imp: `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"\nimport { Label } from "@/components/ui/label"`,
    use: `<RadioGroup defaultValue="comfortable">\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="default" id="r1" />\n    <Label htmlFor="r1">Default</Label>\n  </div>\n  <div className="flex items-center gap-2">\n    <RadioGroupItem value="comfortable" id="r2" />\n    <Label htmlFor="r2">Comfortable</Label>\n  </div>\n</RadioGroup>`,
    props: [
      ["RadioGroup", "value", "string", "—", "Controlled selected value."],
      ["RadioGroup", "defaultValue", "string", "—", "Initial value (uncontrolled)."],
      ["RadioGroupItem", "value", "string", "—", "This item's value."],
      ["RadioGroupItem", "disabled", "boolean", "false", "Disable this item."],
      ["RadioGroupItem", "aria-invalid", "boolean", "false", "Mark invalid for error styling."],
    ],
    tok: [sw("--primary", "text-primary", "Selected dot"), sw("--input", "border-input", "Ring border"), sw("--ring", "ring-ring", "Focus ring")],
    a11y: A_RADIO,
    note: "Arrow keys move and select within the group; only one item is checked. Compose with Field for descriptions / choice cards.",
  },
  "scroll-area": {
    figma: "73-1985",
    imp: `import { ScrollArea } from "@/components/ui/scroll-area"`,
    use: `<ScrollArea className="h-72 w-48 rounded-md border p-4">\n  {/* long content */}\n</ScrollArea>`,
    props: [["ScrollArea", "type", `"auto" | "always" | "scroll" | "hover"`, `"hover"`, "When to show the scrollbar."]],
    tok: [sw("--border", "border-border", "Scrollbar thumb")],
    note: "Custom-styled scrollbars over native scrolling; keyboard scroll is preserved.",
  },
  select: {
    figma: "73-1986",
    imp: `import {\n  Select,\n  SelectContent,\n  SelectGroup,\n  SelectItem,\n  SelectLabel,\n  SelectSeparator,\n  SelectTrigger,\n  SelectValue,\n} from "@/components/ui/select"`,
    use: `<Select>\n  <SelectTrigger className="w-[180px]">\n    <SelectValue placeholder="Theme" />\n  </SelectTrigger>\n  <SelectContent>\n    <SelectItem value="light">Light</SelectItem>\n    <SelectItem value="dark">Dark</SelectItem>\n  </SelectContent>\n</Select>`,
    props: [
      ["Select", "value", "string", "—", "Controlled value."],
      ["Select", "defaultValue", "string", "—", "Initial value (uncontrolled)."],
      ["SelectTrigger", "aria-invalid", "boolean", "—", "Apply invalid styling + a11y state."],
      ["SelectContent", "position", `"item-aligned" | "popper"`, `"item-aligned"`, "Dropdown alignment strategy."],
      ["SelectItem", "value", "string", "—", "Option value (required)."],
      ["SelectItem", "disabled", "boolean", "false", "Disable the option."],
    ],
    tok: [sw("--popover", "bg-popover", "Menu surface"), sw("--accent", "bg-accent", "Highlighted option"), sw("--input", "border-input", "Trigger border")],
    a11y: A_SELECT,
    note: "Custom listbox for a known set of options; use Native Select for very long lists.",
  },
  separator: {
    figma: "73-1987",
    imp: `import { Separator } from "@/components/ui/separator"`,
    use: `<Separator />\n<Separator orientation="vertical" className="h-6" />`,
    props: [
      ["Separator", "orientation", `"horizontal" | "vertical"`, `"horizontal"`, "Line direction."],
      ["Separator", "decorative", "boolean", "true", "If false, exposes a semantic separator role."],
    ],
    tok: [sw("--border", "bg-border", "Line color")],
    note: "Decorative by default; set decorative={false} for a semantic divider.",
  },
  sheet: {
    figma: "73-1988",
    imp: `import {\n  Sheet,\n  SheetContent,\n  SheetDescription,\n  SheetHeader,\n  SheetTitle,\n  SheetTrigger,\n} from "@/components/ui/sheet"`,
    use: `<Sheet>\n  <SheetTrigger asChild>\n    <Button variant="outline">Open</Button>\n  </SheetTrigger>\n  <SheetContent side="right">\n    <SheetHeader>\n      <SheetTitle>Title</SheetTitle>\n      <SheetDescription>Description</SheetDescription>\n    </SheetHeader>\n  </SheetContent>\n</Sheet>`,
    props: [
      ["SheetContent", "side", `"top" | "right" | "bottom" | "left"`, `"right"`, "Edge the sheet enters from."],
      ["SheetContent", "showCloseButton", "boolean", "true", "Show the built-in close (X) button."],
      ["Sheet", "open", "boolean", "—", "Controlled open state."],
    ],
    tok: [sw("--background", "bg-background", "Sheet surface"), sw("--border", "border-border", "Edge border")],
    a11y: A_DIALOG,
    note: "A Dialog that slides from an edge; focus is trapped while open.",
  },
  sidebar: {
    figma: "269-32",
    imp: `import {\n  Sidebar,\n  SidebarContent,\n  SidebarGroup,\n  SidebarMenu,\n  SidebarMenuButton,\n  SidebarMenuItem,\n  SidebarProvider,\n  SidebarTrigger,\n} from "@/components/ui/sidebar"`,
    use: `<SidebarProvider>\n  <Sidebar>\n    <SidebarContent>\n      <SidebarGroup>{/* menu */}</SidebarGroup>\n    </SidebarContent>\n  </Sidebar>\n  <main><SidebarTrigger /></main>\n</SidebarProvider>`,
    props: [
      ["Sidebar", "side", `"left" | "right"`, `"left"`, "Which edge it docks to."],
      ["Sidebar", "variant", `"sidebar" | "floating" | "inset"`, `"sidebar"`, "Visual variant."],
      ["Sidebar", "collapsible", `"offcanvas" | "icon" | "none"`, `"offcanvas"`, "Collapse behaviour."],
    ],
    tok: [sw("--sidebar", "bg-sidebar", "Sidebar surface"), sw("--sidebar-accent", "bg-sidebar-accent", "Active / hover item"), sw("--sidebar-border", "border-sidebar-border", "Separators")],
    a11y: [["Cmd/Ctrl+B", "Toggle sidebar"], ["Tab", "Move through items"]],
    note: "Composable app shell sidebar with its own dedicated --sidebar-* tokens.",
  },
  skeleton: {
    figma: "73-1989",
    imp: `import { Skeleton } from "@/components/ui/skeleton"`,
    use: `<div className="space-y-2">\n  <Skeleton className="h-4 w-[250px]" />\n  <Skeleton className="h-4 w-[200px]" />\n</div>`,
    props: [["Skeleton", "className", "string", "—", "Set the placeholder size and shape (e.g. h-4 w-48, size-12 rounded-full)."]],
    tok: [sw("--muted", "bg-muted", "Placeholder fill"), ["animate-pulse", "—", "Loading animation"]],
    note: "Use during loading instead of blank space; wrap with role=\"status\".",
  },
  slider: {
    figma: "73-2895",
    imp: `import { Slider } from "@/components/ui/slider"`,
    use: `<Slider defaultValue={[50]} max={100} step={1} className="w-full" />`,
    props: [
      ["Slider", "defaultValue", "number[]", "—", "Initial thumb value(s)."],
      ["Slider", "max", "number", "100", "Maximum value."],
      ["Slider", "step", "number", "1", "Step increment."],
      ["Slider", "orientation", `"horizontal" | "vertical"`, `"horizontal"`, "Layout direction."],
      ["Slider", "disabled", "boolean", "false", "Disable the slider."],
    ],
    tok: [sw("--primary", "bg-primary", "Range + thumb"), sw("--muted", "bg-muted", "Track"), sw("--ring", "ring-ring", "Focus ring")],
    a11y: A_SLIDER,
    note: "Thumb exposes role=\"slider\" with aria-valuenow.",
  },
  sonner: {
    figma: "73-2896",
    imp: `import { Toaster } from "@/components/ui/sonner"\nimport { toast } from "sonner"`,
    use: `// app/layout.tsx → <Toaster />\n\ntoast.success("Saved successfully")\ntoast.error("Something went wrong")`,
    props: [
      ["Toaster", "position", `"top-center" | "bottom-right" | …`, `"bottom-right"`, "Where toasts appear."],
      ["Toaster", "richColors", "boolean", "false", "Tinted success/error toasts."],
    ],
    tok: [sw("--popover", "bg-popover", "Toast surface"), sw("--border", "border-border", "Outline")],
    note: "The current toast system (replaces the old toast component).",
  },
  spinner: {
    figma: "1196-1174",
    imp: `import { Spinner } from "@/components/ui/spinner"`,
    use: `<Spinner />\n<Button disabled><Spinner /> Saving…</Button>`,
    props: [["Spinner", "className", "string", "—", "Size and color via utilities (e.g. size-6 text-primary); extends native <svg> props."]],
    tok: [sw("--muted-foreground", "text-muted-foreground", "Spinner color"), ["animate-spin", "—", "Rotation"]],
    note: "Indeterminate loading indicator; add an accessible label nearby.",
  },
  switch: {
    figma: "73-2897",
    imp: `import { Switch } from "@/components/ui/switch"\nimport { Label } from "@/components/ui/label"`,
    use: `<div className="flex items-center gap-2">\n  <Switch id="airplane" />\n  <Label htmlFor="airplane">Airplane mode</Label>\n</div>`,
    props: [
      ["Switch", "checked", "boolean", "—", "Controlled on/off state."],
      ["Switch", "onCheckedChange", "(checked) => void", "—", "Change handler."],
      ["Switch", "disabled", "boolean", "false", "Disable the control."],
      ["Switch", "size", `"sm" | "default"`, `"default"`, "Control size."],
      ["Switch", "aria-invalid", "boolean", "false", "Mark invalid for error styling."],
    ],
    tok: [sw("--primary", "bg-primary", "On track"), sw("--input", "bg-input", "Off track"), sw("--background", "bg-background", "Thumb")],
    a11y: A_TOGGLE,
    note: "Toggles immediately (no submit). Pair with a Label; compose with Field for descriptions.",
  },
  table: {
    figma: "73-2898",
    imp: `import {\n  Table,\n  TableBody,\n  TableCell,\n  TableHead,\n  TableHeader,\n  TableRow,\n} from "@/components/ui/table"`,
    use: `<Table>\n  <TableHeader>\n    <TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead></TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow><TableCell>Jane</TableCell><TableCell>Active</TableCell></TableRow>\n  </TableBody>\n</Table>`,
    props: [
      ["Table", "className", "string", "—", "The <table> element wrapper."],
      ["TableHeader", "className", "string", "—", "The <thead> region."],
      ["TableBody", "className", "string", "—", "The <tbody> region."],
      ["TableRow", "className", "string", "—", "A <tr> row."],
      ["TableHead", "className", "string", "—", "A header cell (<th>)."],
      ["TableCell", "className", "string", "—", "A body cell (<td>)."],
      ["TableCaption", "className", "string", "—", "Accessible caption describing the table."],
    ],
    tok: [sw("--border", "border-border", "Row dividers"), sw("--muted", "bg-muted", "Header / hover"), sw("--muted-foreground", "text-muted-foreground", "Head text")],
    note: "Static markup table. For sorting/filtering use the Data Table pattern.",
  },
  tabs: {
    figma: "73-2899",
    imp: `import {\n  Tabs,\n  TabsContent,\n  TabsList,\n  TabsTrigger,\n} from "@/components/ui/tabs"`,
    use: `<Tabs defaultValue="account">\n  <TabsList>\n    <TabsTrigger value="account">Account</TabsTrigger>\n    <TabsTrigger value="password">Password</TabsTrigger>\n  </TabsList>\n  <TabsContent value="account">Account settings</TabsContent>\n  <TabsContent value="password">Password settings</TabsContent>\n</Tabs>`,
    props: [
      ["Tabs", "value", "string", "—", "Controlled active tab."],
      ["Tabs", "defaultValue", "string", "—", "Initial active tab."],
      ["Tabs", "orientation", `"horizontal" | "vertical"`, `"horizontal"`, "Tab list direction."],
    ],
    tok: [sw("--muted", "bg-muted", "Tab list track"), sw("--background", "bg-background", "Active tab"), sw("--muted-foreground", "text-muted-foreground", "Inactive tab")],
    a11y: A_TABS,
    note: "Keep to ≤ 7 tabs; arrow keys move between triggers.",
  },
  textarea: {
    figma: "73-2900",
    imp: `import { Textarea } from "@/components/ui/textarea"\nimport { Label } from "@/components/ui/label"`,
    use: `<div className="grid gap-2">\n  <Label htmlFor="msg">Message</Label>\n  <Textarea id="msg" placeholder="Type here…" />\n</div>`,
    props: [
      ["Textarea", "disabled", "boolean", "false", "Disable the field."],
      ["Textarea", "rows", "number", "—", "Visible text rows."],
      ["Textarea", "aria-invalid", "boolean", "—", "Apply the invalid styling + a11y state."],
    ],
    tok: [sw("--input", "border-input", "Border"), sw("--ring", "ring-ring", "Focus ring"), sw("--muted-foreground", "text-muted-foreground", "Placeholder")],
    a11y: [["Tab", "Move focus"]],
    note: "Multi-line input; pair with a Label, or compose with Field for label + description.",
  },
  toggle: {
    figma: "73-2902",
    imp: `import { Toggle } from "@/components/ui/toggle"`,
    use: `<Toggle aria-label="Toggle bold"><Bold className="size-4" /></Toggle>`,
    props: [
      ["Toggle", "pressed", "boolean", "—", "Controlled pressed state."],
      ["Toggle", "variant", `"default" | "outline"`, `"default"`, "Visual style."],
      ["Toggle", "size", `"default" | "sm" | "lg"`, `"default"`, "Control size."],
    ],
    tok: [sw("--accent", "bg-accent", "Pressed background"), sw("--muted-foreground", "text-muted-foreground", "Idle icon")],
    a11y: A_TOGGLE,
    note: "Two-state button; icon-only toggles need an aria-label.",
  },
  "toggle-group": {
    figma: "73-2903",
    imp: `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"`,
    use: `<ToggleGroup type="single" defaultValue="center">\n  <ToggleGroupItem value="left"><AlignLeft /></ToggleGroupItem>\n  <ToggleGroupItem value="center"><AlignCenter /></ToggleGroupItem>\n  <ToggleGroupItem value="right"><AlignRight /></ToggleGroupItem>\n</ToggleGroup>`,
    props: [
      ["ToggleGroup", "type", `"single" | "multiple"`, "—", "One or many pressed items."],
      ["ToggleGroup", "value", "string | string[]", "—", "Controlled value."],
      ["ToggleGroupItem", "value", "string", "—", "This item's value."],
    ],
    tok: [sw("--accent", "bg-accent", "Pressed item"), sw("--border", "border-border", "Outline variant")],
    a11y: [["← / →", "Move between items"], ["Space / Enter", "Toggle focused item"]],
    note: "A set of toggles behaving as single- or multi-select.",
  },
  tooltip: {
    figma: "73-2904",
    imp: `import {\n  Tooltip,\n  TooltipContent,\n  TooltipProvider,\n  TooltipTrigger,\n} from "@/components/ui/tooltip"`,
    use: `<TooltipProvider>\n  <Tooltip>\n    <TooltipTrigger asChild>\n      <Button variant="outline">Hover</Button>\n    </TooltipTrigger>\n    <TooltipContent>Add to library</TooltipContent>\n  </Tooltip>\n</TooltipProvider>`,
    props: [
      ["Tooltip", "delayDuration", "number", "700", "ms before showing on hover."],
      ["TooltipContent", "side", `"top" | "right" | "bottom" | "left"`, `"top"`, "Preferred side."],
    ],
    tok: [sw("--primary", "bg-primary", "Tooltip surface"), sw("--primary-foreground", "text-primary-foreground", "Tooltip text")],
    a11y: [["Tab / focus", "Show tooltip"], ["Esc", "Dismiss"]],
    note: "Hint ≤ 10 words; never put essential or interactive content inside.",
  },
}

// ---- emit -----------------------------------------------------------------
function tsLit(s) { return JSON.stringify(s) }
function entry(slug, m) {
  const lines = [`  ${JSON.stringify(slug)}: {`]
  if (m.figma) lines.push(`    figmaNode: ${tsLit(m.figma)},`)
  if (m.imp) lines.push(`    importCode: ${tsLit(m.imp)},`)
  if (m.use) lines.push(`    usageCode: ${tsLit(m.use)},`)
  if (m.props && m.props.length) {
    lines.push(`    props: [`)
    for (const [c, p, t, d, desc] of m.props)
      lines.push(`      { component: ${tsLit(c)}, prop: ${tsLit(p)}, type: ${tsLit(t)}, default: ${tsLit(d)}, description: ${tsLit(desc)} },`)
    lines.push(`    ],`)
  }
  if (m.tok && m.tok.length) {
    lines.push(`    tokens: [`)
    for (const row of m.tok) {
      const [tk, val, usage, swatch] = row
      lines.push(`      { token: ${tsLit(tk)}, value: ${tsLit(val)}, usage: ${tsLit(usage)}${swatch ? ", swatch: true" : ""} },`)
    }
    lines.push(`    ],`)
  }
  if (m.note) lines.push(`    a11yNote: ${tsLit(m.note)},`)
  if (m.a11y && m.a11y.length) {
    lines.push(`    a11y: [`)
    for (const [keys, action] of m.a11y)
      lines.push(`      { keys: ${tsLit(keys)}, action: ${tsLit(action)} },`)
    lines.push(`    ],`)
  }
  lines.push(`  },`)
  return lines.join("\n")
}

const header = `// AUTO-GENERATED by scripts/gen-meta.mjs — do not edit by hand.
// Rich per-component documentation (Props, Design Tokens, Accessibility, Usage).
// The component page renders any section that is present.

export type PropRow = {
  component: string
  prop: string
  type: string
  default: string
  description: string
}

export type TokenRow = {
  token: string
  value: string
  usage: string
  /** Render a live color swatch for \`var(<token>)\`. */
  swatch?: boolean
}

export type A11yRow = { keys: string; action: string }

export type ComponentMeta = {
  importCode?: string
  usageCode?: string
  props?: PropRow[]
  tokens?: TokenRow[]
  a11y?: A11yRow[]
  a11yNote?: string
  install?: string
  shadcnSlug?: string
  figmaNode?: string
}

const FIGMA_FILE =
  "https://www.figma.com/design/NN6Wp4Hgsug3OKhiQdL27d/-shadcn_ui-components-not-token--Fluke---Copy-"

export function figmaUrl(node?: string) {
  return node ? \`\${FIGMA_FILE}?node-id=\${node}\` : FIGMA_FILE
}

export function shadcnUrl(slug: string, meta?: ComponentMeta) {
  return \`https://ui.shadcn.com/docs/components/\${meta?.shadcnSlug ?? slug}\`
}

export function installCmd(slug: string, meta?: ComponentMeta) {
  return meta?.install ?? \`npx shadcn@latest add \${slug}\`
}

export const componentMeta: Record<string, ComponentMeta> = {
`

const body = Object.entries(M).map(([slug, m]) => entry(slug, m)).join("\n")
const footer = `
}

export function getMeta(slug: string): ComponentMeta | undefined {
  return componentMeta[slug]
}
`

writeFileSync("lib/component-meta.ts", header + body + footer)
const count = Object.keys(M).length
console.log(`wrote lib/component-meta.ts — ${count} components`)
