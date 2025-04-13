"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Copy, DollarSign, ExternalLink, QrCode } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import NetworkCheck from "@/components/network-check"
import { useToast } from "@/hooks/use-toast"

export default function DepositPage() {
  const { publicKey, connected } = useWallet()
  const { toast } = useToast()
  const [amount, setAmount] = useState<string>("")

  // Format wallet address for display
  const formattedAddress = publicKey ? `${publicKey.toString()}` : ""

  const shortenedAddress = publicKey ? `${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-4)}` : ""

  const handleCopyAddress = () => {
    if (formattedAddress) {
      navigator.clipboard.writeText(formattedAddress)
      toast({
        title: "Address copied!",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const handleBuyUSDC = () => {
    // In a real app, this would integrate with a fiat onramp
    alert(`Buy USDC initiated for $${amount}`)
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
          <h1 className="text-3xl font-bold">Deposit USDC</h1>
          <NetworkCheck />
        </div>
        <p className="text-muted-foreground mb-6">Add USDC to your Solana Social wallet</p>

        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="buy">Buy USDC</TabsTrigger>
          </TabsList>

          <TabsContent value="deposit" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Deposit USDC from External Wallet</CardTitle>
                <CardDescription>Send USDC (SPL token) to your Solana Social wallet address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!connected ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">Connect your wallet to view deposit address</p>
                    <WalletMultiButton className="bg-primary hover:bg-primary/90 text-primary-foreground" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="bg-muted p-4 rounded-md w-48 h-48 flex items-center justify-center">
                      {publicKey ? (
                        <QrCode className="h-32 w-32" />
                      ) : (
                        <div className="text-center text-muted-foreground">No wallet connected</div>
                      )}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Your Solana Address</p>
                      <div className="flex items-center justify-center gap-2 bg-muted px-3 py-2 rounded-md">
                        <code className="text-sm">{shortenedAddress}</code>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleCopyAddress}>
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
                  <p className="text-sm font-medium">Important</p>
                  <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                    <li>Only send USDC (SPL token) on the Solana network</li>
                    <li>Do not send USDC from other networks (Ethereum, etc.)</li>
                    <li>Minimum deposit: 1 USDC</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                {!connected ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">Connect your wallet to view deposit history</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="font-medium">USDC Deposit</p>
                        <p className="text-sm text-muted-foreground">Apr 8, 2025</p>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        +10.00 USDC
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">USDC Deposit</p>
                        <p className="text-sm text-muted-foreground">Apr 3, 2025</p>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        +15.50 USDC
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="buy" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Buy USDC with Credit/Debit Card</CardTitle>
                <CardDescription>
                  Purchase USDC directly with your card and receive it in your Solana Social wallet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!connected ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">Connect your wallet to buy USDC</p>
                    <WalletMultiButton className="bg-primary hover:bg-primary/90 text-primary-foreground" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Amount (USD)</Label>
                      <div className="flex gap-2">
                        <Input
                          type="number"
                          placeholder="0"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <Button variant="outline" className="whitespace-nowrap">
                          <DollarSign className="h-4 w-4 mr-1" />
                          USD
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Minimum purchase: $10</p>
                    </div>

                    <div className="bg-muted p-4 rounded-md space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Amount</span>
                        <span>${amount || "0.00"}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Processing Fee (3%)</span>
                        <span>${amount ? (Number.parseFloat(amount) * 0.03).toFixed(2) : "0.00"}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>You will receive</span>
                        <span>{amount ? Number.parseFloat(amount).toFixed(2) : "0.00"} USDC</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                {connected && (
                  <>
                    <Button
                      className="w-full"
                      onClick={handleBuyUSDC}
                      disabled={!amount || Number.parseFloat(amount) < 10}
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      Buy USDC
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      By proceeding, you agree to our{" "}
                      <Link href="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>
                    </p>
                  </>
                )}
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 hover:bg-muted rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <img src="/abstract-exchange.png" alt="Exchange" className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Buy on Exchange</p>
                      <p className="text-sm text-muted-foreground">Purchase USDC on a crypto exchange</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 hover:bg-muted rounded-md transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-muted p-2 rounded-full">
                      <img src="/modern-wallet-logo.png" alt="Wallet" className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">Use Wallet Swap</p>
                      <p className="text-sm text-muted-foreground">Swap other tokens for USDC in your wallet</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
