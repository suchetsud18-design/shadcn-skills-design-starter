import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "./providers";
import { ThemeControls } from "@/components/theme-controls";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Docs Design",
  description: "Component Documentation Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-sm">
                  <SidebarTrigger />
                  <span className="text-sm font-medium text-muted-foreground">
                    Component Documentation
                  </span>
                  <div className="ml-auto">
                    <ThemeControls />
                  </div>
                </header>
                <main className="flex-1 overflow-auto bg-background p-8 lg:p-12">
                  <div className="mx-auto max-w-5xl">
                    {children}
                  </div>
                </main>
              </div>
            </SidebarProvider>
          </TooltipProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
