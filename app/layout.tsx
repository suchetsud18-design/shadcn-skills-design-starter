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
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                  <SidebarTrigger />
                  <span className="text-sm font-medium text-muted-foreground">
                    Component Documentation
                  </span>
                  <div className="ml-auto">
                    <ThemeControls />
                  </div>
                </header>
                <main className="flex-1 overflow-auto bg-background p-6 lg:p-10">
                  <div className="mx-auto max-w-4xl">
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
