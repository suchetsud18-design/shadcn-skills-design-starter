export type DoOrDont = {
  type: "do" | "dont"
  description: string
}

export type ComponentGuidelines = {
  items: DoOrDont[]
}

export const dosAndDonts: Record<string, ComponentGuidelines> = {
  button: {
    items: [
      { type: "do", description: "Use clear, action-oriented labels — \"Save\", \"Delete\", \"Send invite\"." },
      { type: "dont", description: "Avoid vague labels like \"Click here\" or \"Submit\"." },
      { type: "do", description: "Add aria-label to icon-only buttons for screen readers." },
      { type: "dont", description: "Don't nest interactive elements (links, other buttons) inside a button." },
    ],
  },
  dialog: {
    items: [
      { type: "do", description: "Keep dialogs focused on a single task or confirmation." },
      { type: "dont", description: "Don't open a dialog from within another dialog." },
      { type: "do", description: "Always provide a visible close mechanism — X button or Cancel." },
      { type: "dont", description: "Don't use dialogs for information that should be inline on the page." },
    ],
  },
  input: {
    items: [
      { type: "do", description: "Always pair inputs with a visible Label via htmlFor." },
      { type: "dont", description: "Don't rely on placeholder text as the only label." },
      { type: "do", description: "Show validation errors below the input with a clear message." },
      { type: "dont", description: "Don't use color alone to indicate error state — add an icon or text." },
    ],
  },
  card: {
    items: [
      { type: "do", description: "Use Card for grouping related content with clear header/body/footer sections." },
      { type: "dont", description: "Don't nest cards inside other cards — use sections or dividers instead." },
      { type: "do", description: "Keep card content scannable — titles, key info, and a clear action." },
      { type: "dont", description: "Don't overload a single card with too many actions or unrelated content." },
    ],
  },
  badge: {
    items: [
      { type: "do", description: "Use Badge for short status labels or metadata tags." },
      { type: "dont", description: "Don't use Badge for full sentences or long text." },
      { type: "do", description: "Use semantic variants — destructive for errors, secondary for neutral info." },
      { type: "dont", description: "Don't make badges interactive — use a Button or Link instead." },
    ],
  },
  checkbox: {
    items: [
      { type: "do", description: "Pair each Checkbox with a Label the user can click." },
      { type: "dont", description: "Don't use a checkbox when only one option exists — use a Switch instead." },
      { type: "do", description: "Group related checkboxes under a descriptive heading." },
      { type: "dont", description: "Don't use checkboxes for mutually exclusive options — use RadioGroup." },
    ],
  },
  switch: {
    items: [
      { type: "do", description: "Use Switch for binary settings that take effect immediately." },
      { type: "dont", description: "Don't use Switch when the change requires a save/submit action." },
      { type: "do", description: "Label should describe the \"on\" state clearly — \"Enable notifications\"." },
      { type: "dont", description: "Don't use double negatives — \"Disable dark mode\" when on means dark mode is off." },
    ],
  },
  select: {
    items: [
      { type: "do", description: "Use Select for 5+ options; use RadioGroup for 2-4 visible choices." },
      { type: "dont", description: "Don't use Select for binary choices — use a Switch or Toggle." },
      { type: "do", description: "Add a placeholder like \"Select an option...\" when no default applies." },
      { type: "dont", description: "Don't make the user scroll through 50+ items without search — use Combobox." },
    ],
  },
  tabs: {
    items: [
      { type: "do", description: "Use short, clear tab labels — one or two words max." },
      { type: "dont", description: "Don't use tabs for sequential steps — use a Stepper pattern instead." },
      { type: "do", description: "Keep related content within the same tab set." },
      { type: "dont", description: "Don't mix navigation tabs and content tabs — they serve different roles." },
    ],
  },
  toast: {
    items: [
      { type: "do", description: "Use toasts for non-critical, transient feedback — \"Saved\", \"Copied\"." },
      { type: "dont", description: "Don't use toasts for errors that require user action — use inline alerts." },
      { type: "do", description: "Keep toast messages under 10 words; include an undo action when possible." },
      { type: "dont", description: "Don't stack more than 3 toasts — queue them sequentially." },
    ],
  },
  "alert-dialog": {
    items: [
      { type: "do", description: "Use AlertDialog for destructive actions — delete, discard, leave page." },
      { type: "dont", description: "Don't use AlertDialog for informational messages — use Alert or Toast." },
      { type: "do", description: "Make the destructive action visually distinct — use the destructive variant." },
      { type: "dont", description: "Don't dismiss AlertDialog on overlay click — require an explicit choice." },
    ],
  },
  progress: {
    items: [
      { type: "do", description: "Use Progress for determinate operations where you know the percentage." },
      { type: "dont", description: "Don't use Progress for indeterminate loading — use Spinner instead." },
      { type: "do", description: "Add aria-label or visible text describing what's loading." },
      { type: "dont", description: "Don't let the bar jump backwards — show monotonic progress or reset to 0." },
    ],
  },
  slider: {
    items: [
      { type: "do", description: "Show the current value near the slider so users see exact numbers." },
      { type: "dont", description: "Don't use a slider for precise numeric entry — pair with an Input." },
      { type: "do", description: "Use step values that make sense for the range (e.g. 5 for 0–100)." },
      { type: "dont", description: "Don't use too many sliders in a form — they require careful interaction." },
    ],
  },
  textarea: {
    items: [
      { type: "do", description: "Set a reasonable min-height — at least 3 visible lines." },
      { type: "dont", description: "Don't use Textarea for single-line input — use Input instead." },
      { type: "do", description: "Show a character count if there's a max length." },
      { type: "dont", description: "Don't disable resize unless the layout absolutely requires it." },
    ],
  },
  avatar: {
    items: [
      { type: "do", description: "Always provide a text fallback (initials) for when images fail to load." },
      { type: "dont", description: "Don't use Avatar for decorative images — use plain img tags." },
      { type: "do", description: "Use consistent sizes within the same context (list, header, etc.)." },
      { type: "dont", description: "Don't use Avatar without alt text or aria-label." },
    ],
  },
}
