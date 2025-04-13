import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar } from "@/components/ui/avatar"
import { Bell, Home, Menu, MessageSquare, Search, Settings } from "lucide-react"
import WalletContextProvider from "@/components/wallet-context-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Solana Social",
  description: "A decentralized social media platform powered by Solana and AI",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <WalletContextProvider>
            <div className="min-h-screen flex flex-col">
              <header className="border-b sticky top-0 bg-background z-10">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                    <Link href="/" className="flex items-center gap-2">
                      <div className="bg-primary text-primary-foreground p-1 rounded-md">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
                          <path
                            d="M2 17L12 22L22 17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 12L12 17L22 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="font-bold text-xl hidden sm:inline">Solana Social</span>
                    </Link>
                  </div>

                  <div className="hidden md:flex flex-1 max-w-md mx-4">
                    <div className="relative w-full">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-8 pr-4 py-2 rounded-md border border-input bg-background"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/">
                        <Home className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Bell className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/messages">
                        <MessageSquare className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/settings">
                        <Settings className="h-5 w-5" />
                      </Link>
                    </Button>
                    <Avatar className="h-8 w-8">
                      <img src="/diverse-online-profiles.png" alt="User profile" />
                    </Avatar>
                  </div>
                </div>
              </header>

              <div className="flex-1">{children}</div>

              <footer className="border-t py-4 text-center text-sm text-muted-foreground">
                <div className="container mx-auto">
                  <p>© {new Date().getFullYear()} Solana Social. All rights reserved.</p>
                </div>
              </footer>
            </div>
          </WalletContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'