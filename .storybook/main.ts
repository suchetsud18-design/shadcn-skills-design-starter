import type { StorybookConfig } from "@storybook/nextjs-vite"

const config: StorybookConfig = {
  // Stories live next to the components they document (components/ui/*.stories.tsx).
  stories: ["../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest"
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
}
export default config
