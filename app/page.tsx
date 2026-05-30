import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          Introduction
        </h1>
        <p className="text-xl text-muted-foreground">
          Beautifully designed components that you can copy and paste into your apps.
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Getting Started
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          This is a sample documentation page built with Next.js and shadcn/ui. 
          The sidebar on the left lets you navigate through different components and features easily.
        </p>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          You can use this layout as a foundation for building comprehensive documentation sites,
          knowledge bases, or complex applications that require a structured navigation menu.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Interactive Examples
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Here is an example of the <code>Button</code> component in action:
        </p>
        <div className="flex flex-wrap items-center gap-4 rounded-md border p-6 bg-card text-card-foreground">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Accordion (from Figma)
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          This is the Accordion component based on the Figma node you provided.
        </p>
        <div className="rounded-md border p-6 bg-card text-card-foreground">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other components' aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
