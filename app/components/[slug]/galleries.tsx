import type { ReactNode } from "react"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bell,
  Bold,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Inbox,
  Italic,
  Search,
  Settings,
  Underline,
  User,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ChartDemo,
  LineChartDemo,
  AreaChartDemo,
  PieChartDemo,
  ComboboxDemo,
  ComboboxMultipleDemo,
  ComboboxClearDemo,
  ComboboxAutoHighlightDemo,
  ComboboxDisabledDemo,
  ComboboxInvalidDemo,
  DatePickerDemo,
  DatePickerRangeDemo,
  DatePickerDobDemo,
  DatePickerInputDemo,
  DatePickerDateTimeDemo,
  SonnerDemo,
  SonnerVariantsDemo,
} from "@/components/demos/interactive"

export type GalleryDemo = { label?: string; node: ReactNode }
export type Gallery = { title: string; description?: string; demos: GalleryDemo[] }

// Per-component demo galleries (Variants / Sizes / States / Examples), matching the
// section structure of the reference docs. Add an entry to give a component these
// sections; omit it and only the Preview shows.
export const galleries: Record<string, Gallery[]> = {
  accordion: [
    {
      title: "States",
      description: "Collapsed and expanded, with chevron rotation.",
      demos: [
        {
          label: "Collapsed",
          node: (
            <Accordion type="single" collapsible className="w-64">
              <AccordionItem value="a">
                <AccordionTrigger>Product Information</AccordionTrigger>
                <AccordionContent>Sleek design, cutting-edge tech.</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        },
        {
          label: "Expanded",
          node: (
            <Accordion type="single" collapsible defaultValue="a" className="w-64">
              <AccordionItem value="a">
                <AccordionTrigger>Product Information</AccordionTrigger>
                <AccordionContent>Sleek design, cutting-edge tech.</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
        },
      ],
    },
  ],

  button: [
    {
      title: "Variants",
      demos: [
        { label: "default", node: <Button>Default</Button> },
        { label: "secondary", node: <Button variant="secondary">Secondary</Button> },
        { label: "outline", node: <Button variant="outline">Outline</Button> },
        { label: "ghost", node: <Button variant="ghost">Ghost</Button> },
        { label: "link", node: <Button variant="link">Link</Button> },
        { label: "destructive", node: <Button variant="destructive">Destructive</Button> },
      ],
    },
    {
      title: "Sizes",
      demos: [
        { label: "sm", node: <Button size="sm">Small</Button> },
        { label: "default", node: <Button>Default</Button> },
        { label: "lg", node: <Button size="lg">Large</Button> },
        { label: "icon", node: <Button size="icon" aria-label="Bell"><Bell /></Button> },
      ],
    },
    {
      title: "States",
      demos: [
        { label: "disabled", node: <Button disabled>Disabled</Button> },
        { label: "loading", node: <Button disabled><Spinner /> Saving…</Button> },
      ],
    },
  ],

  badge: [
    {
      title: "Variants",
      demos: [
        { node: <Badge>Default</Badge> },
        { node: <Badge variant="secondary">Secondary</Badge> },
        { node: <Badge variant="outline">Outline</Badge> },
        { node: <Badge variant="destructive">Destructive</Badge> },
      ],
    },
    {
      title: "In context",
      demos: [
        { node: <Badge variant="secondary"><CheckCircle2 className="size-3" /> Verified</Badge> },
        { node: <Badge>New</Badge> },
        { node: <Badge variant="outline">v1.0.0</Badge> },
      ],
    },
  ],

  alert: [
    {
      title: "Variants",
      demos: [
        {
          label: "default",
          node: (
            <Alert className="w-80">
              <Bell />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>You can add components to your app.</AlertDescription>
            </Alert>
          ),
        },
        {
          label: "destructive",
          node: (
            <Alert variant="destructive" className="w-80">
              <Bell />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Your session has expired.</AlertDescription>
            </Alert>
          ),
        },
      ],
    },
  ],

  input: [
    {
      title: "States",
      demos: [
        { label: "default", node: <Input className="w-56" placeholder="Default" /> },
        { label: "disabled", node: <Input className="w-56" disabled placeholder="Disabled" /> },
        { label: "invalid", node: <Input className="w-56" aria-invalid placeholder="Invalid" /> },
        { label: "with value", node: <Input className="w-56" defaultValue="hello@example.com" /> },
      ],
    },
    {
      title: "With label",
      demos: [
        {
          node: (
            <div className="grid w-56 gap-2">
              <Label htmlFor="g-email">Email</Label>
              <Input id="g-email" type="email" placeholder="name@example.com" />
            </div>
          ),
        },
      ],
    },
  ],

  textarea: [
    {
      title: "States",
      demos: [
        { label: "default", node: <Textarea className="w-64" placeholder="Type here…" /> },
        { label: "disabled", node: <Textarea className="w-64" disabled placeholder="Disabled" /> },
      ],
    },
  ],

  label: [
    {
      title: "Examples",
      demos: [
        {
          node: (
            <div className="flex items-center gap-2">
              <Checkbox id="g-terms" />
              <Label htmlFor="g-terms">Accept terms and conditions</Label>
            </div>
          ),
        },
      ],
    },
  ],

  checkbox: [
    {
      title: "States",
      demos: [
        { label: "unchecked", node: <Checkbox aria-label="unchecked" /> },
        { label: "checked", node: <Checkbox defaultChecked aria-label="checked" /> },
        { label: "disabled", node: <Checkbox disabled aria-label="disabled" /> },
        { label: "disabled checked", node: <Checkbox disabled defaultChecked aria-label="disabled checked" /> },
      ],
    },
  ],

  switch: [
    {
      title: "States",
      demos: [
        { label: "off", node: <Switch aria-label="off" /> },
        { label: "on", node: <Switch defaultChecked aria-label="on" /> },
        { label: "disabled", node: <Switch disabled aria-label="disabled" /> },
        { label: "disabled on", node: <Switch disabled defaultChecked aria-label="disabled on" /> },
      ],
    },
  ],

  "radio-group": [
    {
      title: "Example",
      demos: [
        {
          node: (
            <RadioGroup defaultValue="comfortable" className="gap-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="default" id="g-r1" />
                <Label htmlFor="g-r1">Default</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="comfortable" id="g-r2" />
                <Label htmlFor="g-r2">Comfortable</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="compact" id="g-r3" disabled />
                <Label htmlFor="g-r3">Compact (disabled)</Label>
              </div>
            </RadioGroup>
          ),
        },
      ],
    },
  ],

  slider: [
    {
      title: "Examples",
      demos: [
        { label: "single", node: <Slider defaultValue={[50]} max={100} step={1} className="w-56" /> },
        { label: "range", node: <Slider defaultValue={[25, 75]} max={100} step={1} className="w-56" /> },
      ],
    },
  ],

  progress: [
    {
      title: "Values",
      demos: [
        { label: "25%", node: <Progress value={25} className="w-56" /> },
        { label: "60%", node: <Progress value={60} className="w-56" /> },
        { label: "100%", node: <Progress value={100} className="w-56" /> },
      ],
    },
  ],

  skeleton: [
    {
      title: "Examples",
      demos: [
        {
          label: "card",
          node: (
            <div className="flex items-center gap-3">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ),
        },
      ],
    },
  ],

  spinner: [
    {
      title: "Sizes",
      demos: [
        { label: "sm", node: <Spinner className="size-4" /> },
        { label: "default", node: <Spinner /> },
        { label: "lg", node: <Spinner className="size-8" /> },
      ],
    },
  ],

  avatar: [
    {
      title: "Examples",
      demos: [
        {
          label: "image",
          node: (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ),
        },
        {
          label: "fallback",
          node: (
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ),
        },
      ],
    },
  ],

  toggle: [
    {
      title: "States",
      demos: [
        { label: "off", node: <Toggle aria-label="bold"><Bold className="size-4" /></Toggle> },
        { label: "on", node: <Toggle defaultPressed aria-label="bold on"><Bold className="size-4" /></Toggle> },
        { label: "outline", node: <Toggle variant="outline" aria-label="italic"><Italic className="size-4" /></Toggle> },
        { label: "disabled", node: <Toggle disabled aria-label="underline"><Underline className="size-4" /></Toggle> },
      ],
    },
  ],

  "toggle-group": [
    {
      title: "Examples",
      demos: [
        {
          label: "single",
          node: (
            <ToggleGroup type="single" defaultValue="center">
              <ToggleGroupItem value="left" aria-label="left"><AlignLeft className="size-4" /></ToggleGroupItem>
              <ToggleGroupItem value="center" aria-label="center"><AlignCenter className="size-4" /></ToggleGroupItem>
              <ToggleGroupItem value="right" aria-label="right"><AlignRight className="size-4" /></ToggleGroupItem>
            </ToggleGroup>
          ),
        },
        {
          label: "multiple",
          node: (
            <ToggleGroup type="multiple" defaultValue={["bold"]}>
              <ToggleGroupItem value="bold" aria-label="bold"><Bold className="size-4" /></ToggleGroupItem>
              <ToggleGroupItem value="italic" aria-label="italic"><Italic className="size-4" /></ToggleGroupItem>
              <ToggleGroupItem value="underline" aria-label="underline"><Underline className="size-4" /></ToggleGroupItem>
            </ToggleGroup>
          ),
        },
      ],
    },
  ],

  separator: [
    {
      title: "Orientation",
      demos: [
        {
          label: "horizontal",
          node: (
            <div className="w-48">
              <p className="text-sm">Above</p>
              <Separator className="my-2" />
              <p className="text-sm">Below</p>
            </div>
          ),
        },
        {
          label: "vertical",
          node: (
            <div className="flex h-8 items-center gap-3 text-sm">
              <span>Docs</span>
              <Separator orientation="vertical" />
              <span>Source</span>
            </div>
          ),
        },
      ],
    },
  ],

  kbd: [
    {
      title: "Examples",
      demos: [
        { label: "shortcut", node: <KbdGroup><Kbd>Ctrl</Kbd><Kbd>K</Kbd></KbdGroup> },
        { label: "single", node: <Kbd>Esc</Kbd> },
      ],
    },
  ],

  "input-otp": [
    {
      title: "Example",
      demos: [
        {
          node: (
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          ),
        },
      ],
    },
  ],

  breadcrumb: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          ),
        },
      ],
    },
  ],

  pagination: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Pagination>
              <PaginationContent>
                <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
                <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
                <PaginationItem><PaginationNext href="#" /></PaginationItem>
              </PaginationContent>
            </Pagination>
          ),
        },
      ],
    },
  ],

  "native-select": [
    {
      title: "States",
      demos: [
        {
          label: "default",
          node: (
            <NativeSelect className="w-44">
              <NativeSelectOption value="apple">Apple</NativeSelectOption>
              <NativeSelectOption value="banana">Banana</NativeSelectOption>
            </NativeSelect>
          ),
        },
        {
          label: "disabled",
          node: (
            <NativeSelect className="w-44" disabled>
              <NativeSelectOption value="apple">Apple</NativeSelectOption>
            </NativeSelect>
          ),
        },
      ],
    },
  ],

  select: [
    {
      title: "States",
      demos: [
        {
          label: "default",
          node: (
            <Select>
              <SelectTrigger className="w-44"><SelectValue placeholder="Theme" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          ),
        },
        {
          label: "disabled",
          node: (
            <Select disabled>
              <SelectTrigger className="w-44"><SelectValue placeholder="Disabled" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
              </SelectContent>
            </Select>
          ),
        },
      ],
    },
  ],

  field: [
    {
      title: "States",
      demos: [
        {
          label: "default",
          node: (
            <FieldGroup className="w-64">
              <Field>
                <FieldLabel htmlFor="g-f1">Username</FieldLabel>
                <Input id="g-f1" placeholder="shadcn" />
                <FieldDescription>Your public display name.</FieldDescription>
              </Field>
            </FieldGroup>
          ),
        },
        {
          label: "invalid",
          node: (
            <FieldGroup className="w-64">
              <Field data-invalid>
                <FieldLabel htmlFor="g-f2">Email</FieldLabel>
                <Input id="g-f2" aria-invalid defaultValue="not-an-email" />
                <FieldError>Enter a valid email.</FieldError>
              </Field>
            </FieldGroup>
          ),
        },
      ],
    },
  ],

  "input-group": [
    {
      title: "Examples",
      demos: [
        {
          node: (
            <InputGroup className="w-64">
              <InputGroupAddon><Search className="size-4" /></InputGroupAddon>
              <InputGroupInput placeholder="Search…" />
            </InputGroup>
          ),
        },
      ],
    },
  ],

  empty: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Empty className="w-80 border">
              <EmptyHeader>
                <EmptyMedia variant="icon"><Inbox /></EmptyMedia>
                <EmptyTitle>No messages</EmptyTitle>
                <EmptyDescription>You&rsquo;re all caught up.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button size="sm">Refresh</Button>
              </EmptyContent>
            </Empty>
          ),
        },
      ],
    },
  ],

  "aspect-ratio": [
    {
      title: "Ratios",
      demos: [
        {
          label: "16 / 9",
          node: (
            <div className="w-56">
              <AspectRatio ratio={16 / 9} className="rounded-md bg-muted" />
            </div>
          ),
        },
        {
          label: "1 / 1",
          node: (
            <div className="w-32">
              <AspectRatio ratio={1} className="rounded-md bg-muted" />
            </div>
          ),
        },
      ],
    },
  ],

  card: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Card className="w-72">
              <CardHeader>
                <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one click.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Name, framework, and region settings go here.
              </CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline" size="sm">Cancel</Button>
                <Button size="sm">Deploy</Button>
              </CardFooter>
            </Card>
          ),
        },
      ],
    },
  ],

  tabs: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Tabs defaultValue="account" className="w-72">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="text-sm text-muted-foreground">
                Make changes to your account.
              </TabsContent>
              <TabsContent value="password" className="text-sm text-muted-foreground">
                Change your password here.
              </TabsContent>
            </Tabs>
          ),
        },
      ],
    },
  ],

  "button-group": [
    {
      title: "Orientation",
      demos: [
        {
          label: "horizontal",
          node: (
            <ButtonGroup>
              <Button variant="outline">Years</Button>
              <Button variant="outline">Months</Button>
              <Button variant="outline">Days</Button>
            </ButtonGroup>
          ),
        },
        {
          label: "vertical",
          node: (
            <ButtonGroup orientation="vertical">
              <Button variant="outline">Top</Button>
              <Button variant="outline">Middle</Button>
              <Button variant="outline">Bottom</Button>
            </ButtonGroup>
          ),
        },
      ],
    },
  ],

  "alert-dialog": [
    {
      title: "Example",
      demos: [
        {
          node: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Delete account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ),
        },
      ],
    },
  ],

  calendar: [
    { title: "Example", demos: [{ node: <Calendar mode="single" className="rounded-md border" /> }] },
  ],

  carousel: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Carousel className="w-full max-w-[16rem]">
              <CarouselContent>
                {Array.from({ length: 4 }).map((_, i) => (
                  <CarouselItem key={i}>
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">{i + 1}</span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ),
        },
      ],
    },
  ],

  chart: [
    { title: "Bar Chart", description: "Categorical data as vertical bars.", demos: [{ node: <div className="w-full max-w-xl"><ChartDemo /></div> }] },
    { title: "Line Chart", description: "A trend across continuous points.", demos: [{ node: <div className="w-full max-w-xl"><LineChartDemo /></div> }] },
    { title: "Area Chart", description: "A filled trend showing volume.", demos: [{ node: <div className="w-full max-w-xl"><AreaChartDemo /></div> }] },
    { title: "Pie Chart", description: "Proportional parts of a whole.", demos: [{ node: <PieChartDemo /> }] },
  ],

  collapsible: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Collapsible className="w-72 space-y-2">
              <div className="flex items-center justify-between gap-4 rounded-md border px-4 py-2">
                <span className="text-sm font-medium">@peduarte starred 3 repos</span>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Toggle">
                    <ChevronRight className="size-4" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/primitives</div>
                <div className="rounded-md border px-4 py-2 text-sm">@radix-ui/colors</div>
              </CollapsibleContent>
            </Collapsible>
          ),
        },
      ],
    },
  ],

  combobox: [
    { title: "Basic", description: "Search and select a single value.", demos: [{ node: <ComboboxDemo /> }] },
    { title: "Multiple", description: "Select several values as removable chips.", demos: [{ node: <ComboboxMultipleDemo /> }] },
    { title: "Clear Button", description: "Show a clear button via the showClear prop.", demos: [{ node: <ComboboxClearDemo /> }] },
    { title: "Auto Highlight", description: "Highlight the first match as you type.", demos: [{ node: <ComboboxAutoHighlightDemo /> }] },
    { title: "Disabled", description: "A non-interactive, disabled combobox.", demos: [{ node: <ComboboxDisabledDemo /> }] },
    { title: "Invalid", description: "Error styling via aria-invalid.", demos: [{ node: <ComboboxInvalidDemo /> }] },
  ],

  command: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Command className="max-w-sm rounded-lg border shadow-sm">
              <CommandInput placeholder="Type a command…" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem><Search className="mr-2 size-4" /> Search</CommandItem>
                  <CommandItem><User className="mr-2 size-4" /> Profile</CommandItem>
                  <CommandItem><Settings className="mr-2 size-4" /> Settings</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          ),
        },
      ],
    },
  ],

  "context-menu": [
    {
      title: "Example",
      demos: [
        {
          node: (
            <ContextMenu>
              <ContextMenuTrigger className="flex h-32 w-72 items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                Right-click here
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Back</ContextMenuItem>
                <ContextMenuItem>Forward</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Reload</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ),
        },
      ],
    },
  ],

  "data-table": [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Table className="w-full max-w-lg">
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell><Badge variant="secondary">Paid</Badge></TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ),
        },
      ],
    },
  ],

  "date-picker": [
    { title: "Basic", description: "A single date in a popover.", demos: [{ node: <DatePickerDemo /> }] },
    { title: "Date Range", description: "Select a start and end date across two months.", demos: [{ node: <DatePickerRangeDemo /> }] },
    { title: "Date of Birth", description: "Dropdown month and year caption for fast navigation.", demos: [{ node: <DatePickerDobDemo /> }] },
    { title: "With Input", description: "Type a date or pick it from the calendar.", demos: [{ node: <DatePickerInputDemo /> }] },
    { title: "Date and Time", description: "A date popover beside a native time input.", demos: [{ node: <DatePickerDateTimeDemo /> }] },
  ],

  dialog: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>Make changes to your profile.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-2">
                  <Label htmlFor="g-dlg">Name</Label>
                  <Input id="g-dlg" defaultValue="Pedro Duarte" />
                </div>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ),
        },
      ],
    },
  ],

  drawer: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Open drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>Move goal</DrawerTitle>
                    <DrawerDescription>Set your daily activity goal.</DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          ),
        },
      ],
    },
  ],

  "dropdown-menu": [
    {
      title: "Example",
      demos: [
        {
          node: (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><User className="mr-2 size-4" /> Profile</DropdownMenuItem>
                <DropdownMenuItem><CreditCard className="mr-2 size-4" /> Billing</DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 size-4" /> Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ),
        },
      ],
    },
  ],

  "hover-card": [
    {
      title: "Example",
      demos: [
        {
          node: (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">@nextjs</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-72 text-sm">
                The React Framework — created and maintained by Vercel.
              </HoverCardContent>
            </HoverCard>
          ),
        },
      ],
    },
  ],

  item: [
    {
      title: "Variants",
      demos: [
        {
          label: "default",
          node: (
            <Item className="w-72">
              <ItemMedia>
                <Avatar><AvatarFallback>CN</AvatarFallback></Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>shadcn</ItemTitle>
                <ItemDescription>Last seen 5 months ago</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">Follow</Button>
              </ItemActions>
            </Item>
          ),
        },
        {
          label: "outline",
          node: (
            <Item variant="outline" className="w-72">
              <ItemContent>
                <ItemTitle>Outline</ItemTitle>
                <ItemDescription>Bordered row</ItemDescription>
              </ItemContent>
            </Item>
          ),
        },
        {
          label: "muted",
          node: (
            <Item variant="muted" className="w-72">
              <ItemContent>
                <ItemTitle>Muted</ItemTitle>
                <ItemDescription>Subtle surface</ItemDescription>
              </ItemContent>
            </Item>
          ),
        },
      ],
    },
  ],

  menubar: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>New Tab</MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Print</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Undo</MenubarItem>
                  <MenubarItem>Redo</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          ),
        },
      ],
    },
  ],

  "navigation-menu": [
    {
      title: "Example",
      demos: [
        {
          node: (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-64 gap-1 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block rounded-md p-2 text-sm hover:bg-accent">Introduction</a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a href="#" className="block rounded-md p-2 text-sm hover:bg-accent">Installation</a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ),
        },
      ],
    },
  ],

  popover: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 text-sm">
                <p className="font-medium">Dimensions</p>
                <p className="text-muted-foreground">Set the dimensions for the layer.</p>
              </PopoverContent>
            </Popover>
          ),
        },
      ],
    },
  ],

  "scroll-area": [
    {
      title: "Example",
      demos: [
        {
          node: (
            <ScrollArea className="h-48 w-64 rounded-md border p-4">
              <div className="space-y-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="text-sm">Item {i + 1}</div>
                ))}
              </div>
            </ScrollArea>
          ),
        },
      ],
    },
  ],

  sheet: [
    {
      title: "Sides",
      description: "Slides in from any edge.",
      demos: [
        {
          label: "top",
          node: (
            <Sheet>
              <SheetTrigger asChild><Button variant="outline">Top</Button></SheetTrigger>
              <SheetContent side="top">
                <SheetHeader><SheetTitle>Top sheet</SheetTitle><SheetDescription>Enters from the top.</SheetDescription></SheetHeader>
              </SheetContent>
            </Sheet>
          ),
        },
        {
          label: "right",
          node: (
            <Sheet>
              <SheetTrigger asChild><Button variant="outline">Right</Button></SheetTrigger>
              <SheetContent side="right">
                <SheetHeader><SheetTitle>Right sheet</SheetTitle><SheetDescription>Enters from the right.</SheetDescription></SheetHeader>
              </SheetContent>
            </Sheet>
          ),
        },
        {
          label: "bottom",
          node: (
            <Sheet>
              <SheetTrigger asChild><Button variant="outline">Bottom</Button></SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader><SheetTitle>Bottom sheet</SheetTitle><SheetDescription>Enters from the bottom.</SheetDescription></SheetHeader>
              </SheetContent>
            </Sheet>
          ),
        },
        {
          label: "left",
          node: (
            <Sheet>
              <SheetTrigger asChild><Button variant="outline">Left</Button></SheetTrigger>
              <SheetContent side="left">
                <SheetHeader><SheetTitle>Left sheet</SheetTitle><SheetDescription>Enters from the left.</SheetDescription></SheetHeader>
              </SheetContent>
            </Sheet>
          ),
        },
      ],
    },
  ],

  sidebar: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <p className="max-w-md text-sm text-muted-foreground">
              The navigation on the left <strong>is</strong> the Sidebar — composed with{" "}
              <code className="rounded bg-muted px-1">SidebarProvider</code>,{" "}
              <code className="rounded bg-muted px-1">SidebarMenu</code>, and{" "}
              <code className="rounded bg-muted px-1">SidebarMenuButton</code>.
            </p>
          ),
        },
      ],
    },
  ],

  sonner: [
    { title: "Default", description: "A basic toast with a description.", demos: [{ node: <SonnerDemo /> }] },
    { title: "Variants", description: "Success, info, warning, error, action, and promise toasts.", demos: [{ node: <SonnerVariantsDemo /> }] },
  ],

  table: [
    {
      title: "Example",
      demos: [
        {
          node: (
            <Table className="w-full max-w-lg">
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ),
        },
      ],
    },
  ],

  tooltip: [
    {
      title: "Sides",
      demos: [
        {
          label: "top",
          node: (
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline">Top</Button></TooltipTrigger>
              <TooltipContent side="top">Top tooltip</TooltipContent>
            </Tooltip>
          ),
        },
        {
          label: "right",
          node: (
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline">Right</Button></TooltipTrigger>
              <TooltipContent side="right">Right tooltip</TooltipContent>
            </Tooltip>
          ),
        },
        {
          label: "bottom",
          node: (
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline">Bottom</Button></TooltipTrigger>
              <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
            </Tooltip>
          ),
        },
        {
          label: "left",
          node: (
            <Tooltip>
              <TooltipTrigger asChild><Button variant="outline">Left</Button></TooltipTrigger>
              <TooltipContent side="left">Left tooltip</TooltipContent>
            </Tooltip>
          ),
        },
      ],
    },
  ],
}
