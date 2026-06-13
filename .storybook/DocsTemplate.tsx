import * as React from "react"
import {
  Controls,
  Description,
  Heading,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/addon-docs/blocks"

/**
 * Custom autodocs layout used for every component (wired via
 * `parameters.docs.page` in preview.tsx). Reorders + renames the default
 * sections so each component page reads consistently for Dev & QA:
 *
 *   Title · Subtitle · Description  →  Preview  →  Props  →  Examples
 */
export function DocsTemplate() {
  return (
    <>
      <Title />
      <Subtitle />
      <Description />

      <Heading>Preview</Heading>
      <Primary />

      <Heading>Props</Heading>
      <Controls />

      <Stories title="Examples" includePrimary={false} />
    </>
  )
}
