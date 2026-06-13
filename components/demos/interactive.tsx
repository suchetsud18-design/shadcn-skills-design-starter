"use client"

import * as React from "react"
import { format } from "date-fns"
import { type DateRange } from "react-day-picker"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
} from "recharts"
import { Check, ChevronsUpDown, CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { toast } from "sonner"

/* ----------------------------------------------------------------- sonner */

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event created", { description: "Sunday, December 03 at 9:00 AM" })
      }
    >
      Show toast
    </Button>
  )
}

/* Toast variants — success / info / warning / error / action / promise / description */
export function SonnerVariantsDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success("Changes saved")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.info("A new update is available")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Your trial ends in 3 days")}>
        Warning
      </Button>
      <Button variant="outline" onClick={() => toast.error("Something went wrong")}>
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event created", { description: "Sunday, December 03 at 9:00 AM" })
        }
      >
        Description
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Event created", {
            action: { label: "Undo", onClick: () => toast("Undone") },
          })
        }
      >
        Action
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
            loading: "Saving…",
            success: "Saved",
            error: "Could not save",
          })
        }
      >
        Promise
      </Button>
    </div>
  )
}

/* ------------------------------------------------------------------ chart */

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full max-w-xl">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(v) => v.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

/* Line chart */
export function LineChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full max-w-xl">
      <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(v) => v.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}

/* Area chart */
export function AreaChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[260px] w-full max-w-xl">
      <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(v) => v.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" />
      </AreaChart>
    </ChartContainer>
  )
}

/* Pie chart */
const pieData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]
const pieConfig = {
  visitors: { label: "Visitors" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

export function PieChartDemo() {
  return (
    <ChartContainer config={pieConfig} className="mx-auto aspect-square h-[260px]">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={pieData} dataKey="visitors" nameKey="browser" />
      </PieChart>
    </ChartContainer>
  )
}

/* --------------------------------------------------------------- combobox */

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between"
        >
          {value ? frameworks.find((f) => f.value === value)?.label : "Select framework..."}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((f) => (
                <CommandItem
                  key={f.value}
                  value={f.value}
                  onSelect={(cur) => {
                    setValue(cur === value ? "" : cur)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 size-4", value === f.value ? "opacity-100" : "opacity-0")} />
                  {f.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

/* ------------------------------------------------------------- date picker */

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} autoFocus />
      </PopoverContent>
    </Popover>
  )
}

/* Date range — two-month range selection */
export function DatePickerRangeDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[260px] justify-start text-left font-normal", !range && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 size-4" />
          {range?.from ? (
            range.to ? (
              `${format(range.from, "LLL dd, y")} - ${format(range.to, "LLL dd, y")}`
            ) : (
              format(range.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} autoFocus />
      </PopoverContent>
    </Popover>
  )
}

/* Date of birth — dropdown month/year caption */
export function DatePickerDobDemo() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "PPP") : <span>Date of birth</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} captionLayout="dropdown" autoFocus />
      </PopoverContent>
    </Popover>
  )
}

/* With input — type a date or pick from the calendar */
function formatInputDate(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
}
function isValidDate(date: Date | undefined) {
  return !!date && !isNaN(date.getTime())
}

export function DatePickerInputDemo() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(new Date("2025-06-01"))
  const [month, setMonth] = React.useState<Date | undefined>(date)
  const [value, setValue] = React.useState(formatInputDate(date))

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date-picker-input" className="px-1">
        Subscription date
      </Label>
      <div className="relative flex gap-2">
        <Input
          id="date-picker-input"
          value={value}
          placeholder="June 01, 2025"
          className="bg-background pr-10"
          onChange={(e) => {
            const next = new Date(e.target.value)
            setValue(e.target.value)
            if (isValidDate(next)) {
              setDate(next)
              setMonth(next)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end" alignOffset={-8} sideOffset={10}>
            <Calendar
              mode="single"
              selected={date}
              month={month}
              onMonthChange={setMonth}
              captionLayout="dropdown"
              onSelect={(next) => {
                setDate(next)
                setValue(formatInputDate(next))
                setOpen(false)
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

/* Date and time — date popover beside a native time input */
export function DatePickerDateTimeDemo() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker-datetime" className="px-1">
          Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date-picker-datetime"
              variant="outline"
              className={cn("w-[180px] justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 size-4" />
              {date ? format(date, "PPP") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} captionLayout="dropdown" autoFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          defaultValue="10:30:00"
          className="bg-background w-[140px]"
        />
      </div>
    </div>
  )
}
