export type ControlType = "select" | "boolean" | "number" | "text"

export type PlaygroundControl = {
  key: string
  label: string
  type: ControlType
  options?: string[]
  min?: number
  max?: number
  step?: number
  defaultValue: unknown
}

export type PlaygroundConfig = {
  componentName: string
  importPath: string
  controls: PlaygroundControl[]
}

export const playgroundConfigs: Record<string, PlaygroundConfig> = {
  button: {
    componentName: "Button",
    importPath: "@/components/ui/button",
    controls: [
      { key: "variant", label: "Variant", type: "select", options: ["default", "secondary", "outline", "ghost", "link", "destructive"], defaultValue: "default" },
      { key: "size", label: "Size", type: "select", options: ["default", "sm", "lg", "icon"], defaultValue: "default" },
      { key: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
      { key: "children", label: "Label", type: "text", defaultValue: "Button" },
    ],
  },
  badge: {
    componentName: "Badge",
    importPath: "@/components/ui/badge",
    controls: [
      { key: "variant", label: "Variant", type: "select", options: ["default", "secondary", "outline", "destructive"], defaultValue: "default" },
      { key: "children", label: "Text", type: "text", defaultValue: "Badge" },
    ],
  },
  switch: {
    componentName: "Switch",
    importPath: "@/components/ui/switch",
    controls: [
      { key: "checked", label: "Checked", type: "boolean", defaultValue: true },
      { key: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
    ],
  },
  slider: {
    componentName: "Slider",
    importPath: "@/components/ui/slider",
    controls: [
      { key: "defaultValue", label: "Value", type: "number", min: 0, max: 100, step: 1, defaultValue: 50 },
      { key: "max", label: "Max", type: "number", min: 1, max: 200, step: 1, defaultValue: 100 },
      { key: "step", label: "Step", type: "number", min: 1, max: 50, step: 1, defaultValue: 1 },
      { key: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
    ],
  },
  progress: {
    componentName: "Progress",
    importPath: "@/components/ui/progress",
    controls: [
      { key: "value", label: "Value", type: "number", min: 0, max: 100, step: 5, defaultValue: 60 },
    ],
  },
  input: {
    componentName: "Input",
    importPath: "@/components/ui/input",
    controls: [
      { key: "type", label: "Type", type: "select", options: ["text", "email", "password", "number", "search"], defaultValue: "text" },
      { key: "placeholder", label: "Placeholder", type: "text", defaultValue: "Type something..." },
      { key: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
    ],
  },
  checkbox: {
    componentName: "Checkbox",
    importPath: "@/components/ui/checkbox",
    controls: [
      { key: "checked", label: "Checked", type: "boolean", defaultValue: false },
      { key: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
    ],
  },
  toggle: {
    componentName: "Toggle",
    importPath: "@/components/ui/toggle",
    controls: [
      { key: "variant", label: "Variant", type: "select", options: ["default", "outline"], defaultValue: "default" },
      { key: "size", label: "Size", type: "select", options: ["default", "sm", "lg"], defaultValue: "default" },
      { key: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
    ],
  },
  textarea: {
    componentName: "Textarea",
    importPath: "@/components/ui/textarea",
    controls: [
      { key: "placeholder", label: "Placeholder", type: "text", defaultValue: "Type your message here." },
      { key: "disabled", label: "Disabled", type: "boolean", defaultValue: false },
    ],
  },
  separator: {
    componentName: "Separator",
    importPath: "@/components/ui/separator",
    controls: [
      { key: "orientation", label: "Orientation", type: "select", options: ["horizontal", "vertical"], defaultValue: "horizontal" },
    ],
  },
}
