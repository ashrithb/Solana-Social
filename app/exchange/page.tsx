"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, Coins, DollarSign, History, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import TokenExchangeHistory from "@/components/token-exchange-history"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useConnection } from "@solana/wallet-adapter-react"
import { useToast } from "@/hooks/use-toast"
import { getSOLtoUSDCRate, getSOLBalance, getUSDCBalance, simulateSOLtoUSDCSwap } from "@/lib/solana-exchange"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ExchangePage() {
  const { connection } = useConnection()
  const { connected, publicKey, signTransaction } = useWallet()
  const { toast } = useToast()

  const [fromAmount, setFromAmount] = useState<string>("")
  const [toAmount, setToAmount] = useState<string>("")
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isExchanging, setIsExchanging] = useState<boolean>(false)
  const [solBalance, setSolBalance] = useState<number>(0)
  const [usdcBalance, setUsdcBalance] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [txSuccess, setTxSuccess] = useState<boolean>(false)
  const [txId, setTxId] = useState<string | null>(null)

  // Fetch exchange rate and balances when wallet is connected
  useEffect(() => {
    const fetchData = async () => {
      if (connected && publicKey) {
        setIsLoading(true)
        setError(null)

        try {
          // Fetch exchange rate
          const rate = await getSOLtoUSDCRate()
          setExchangeRate(rate)

          // Fetch SOL balance
          const solBal = await getSOLBalance(connection, publicKey)
          setSolBalance(solBal)

          // Fetch USDC balance
          const usdcBal = await getUSDCBalance(connection, publicKey)
          setUsdcBalance(usdcBal)
        } catch (err) {
          console.error("Error fetching data:", err)
          setError("Failed to fetch exchange data. Please try again.")
        } finally {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    // Set up interval to refresh data every 30 seconds
    const intervalId = setInterval(fetchData, 30000)

    return () => clearInterval(intervalId)
  }, [connected, publicKey, connection])

  // Calculate the exchange amount when fromAmount changes
  useEffect(() => {
    if (fromAmount && exchangeRate > 0) {
      const calculatedAmount = Number.parseFloat(fromAmount) * exchangeRate
      setToAmount(calculatedAmount.toFixed(2))
    } else {
      setToAmount("")
    }
  }, [fromAmount, exchangeRate])

  const handleExchange = async () => {
    if (!connected || !publicKey || !signTransaction) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to exchange tokens",
        variant: "destructive",
      })
      return
    }

    if (!fromAmount || Number(fromAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to exchange",
        variant: "destructive",
      })
      return
    }

    const solAmountToSwap = Number(fromAmount)
    const usdcAmountToReceive = Number(toAmount)

    // Check if user has enough SOL
    if (solAmountToSwap > solBalance) {
      toast({
        title: "Insufficient balance",
        description: `You don't have enough SOL. Your balance: ${solBalance.toFixed(4)} SOL`,
        variant: "destructive",
      })
      return
    }

    setIsExchanging(true)
    setError(null)
    setTxSuccess(false)
    setTxId(null)

    try {
      console.log("Starting SOL to USDC swap...")
      console.log(`Sending ${solAmountToSwap} SOL to receive ${usdcAmountToReceive} USDC`)

      // Perform the swap
      const txid = await simulateSOLtoUSDCSwap(
        connection,
        publicKey,
        signTransaction,
        solAmountToSwap,
        usdcAmountToReceive,
      )

      console.log("Swap transaction successful:", txid)

      // Update balances after swap
      const newSolBalance = await getSOLBalance(connection, publicKey)
      setSolBalance(newSolBalance)

      const newUsdcBalance = await getUSDCBalance(connection, publicKey)
      setUsdcBalance(newUsdcBalance)

      console.log(`Updated balances - SOL: ${newSolBalance}, USDC: ${newUsdcBalance}`)

      // Show success message
      setTxSuccess(true)
      setTxId(txid)

      toast({
        title: "Exchange successful!",
        description: `Successfully exchanged ${solAmountToSwap} SOL for ${usdcAmountToReceive} USDC`,
      })

      // Clear input fields
      setFromAmount("")
      setToAmount("")
    } catch (err: any) {
      console.error("Exchange error:", err)

      // More detailed error message
      const errorMessage = err.message || "Failed to complete the exchange. Please try again."
      setError(errorMessage)

      toast({
        title: "Exchange failed",
        description: errorMessage.substring(0, 100), // Limit length for toast
        variant: "destructive",
      })
    } finally {
      setIsExchanging(false)
    }
  }

  const handleMaxClick = () => {
    if (solBalance > 0) {
      // Leave a small amount for transaction fees
      const maxAmount = Math.max(0, solBalance - 0.01)
      setFromAmount(maxAmount.toFixed(4))
    }
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Token Exchange</h1>

        <Tabs defaultValue="exchange" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="exchange">Exchange</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="exchange" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Convert Tokens</CardTitle>
                <CardDescription>Exchange your SOL for USDC stablecoins on Solana devnet</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!connected ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">Connect your wallet to start exchanging tokens</p>
                    <WalletMultiButton className="bg-primary hover:bg-primary/90 text-primary-foreground" />
                  </div>
                ) : isLoading ? (
                  <div className="text-center py-6">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                    <p className="text-muted-foreground">Loading exchange data...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    {txSuccess && txId && (
                      <Alert className="bg-green-50 border-green-200 text-green-800">
                        <AlertTitle>Exchange Successful!</AlertTitle>
                        <AlertDescription className="space-y-2">
                          <p>Your transaction has been confirmed.</p>
                          <p className="text-xs break-all">Transaction ID: {txId}</p>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label>From</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input
                            type="number"
                            placeholder="0.00"
                            value={fromAmount}
                            onChange={(e) => setFromAmount(e.target.value)}
                            disabled={isExchanging}
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                            Balance: {solBalance.toFixed(4)}
                          </div>
                        </div>
                        <div className="w-1/3">
                          <Button variant="outline" className="w-full justify-start" disabled={isExchanging}>
                            <Coins className="mr-2 h-4 w-4 text-primary" />
                            SOL
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleMaxClick}
                          disabled={isExchanging || solBalance <= 0}
                        >
                          Max
                        </Button>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="ghost" size="icon" className="rounded-full" disabled={isExchanging}>
                        <ArrowLeftRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label>To</Label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input type="number" placeholder="0.00" value={toAmount} disabled />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                            Balance: {usdcBalance.toFixed(2)}
                          </div>
                        </div>
                        <div className="w-1/3">
                          <Button variant="outline" className="w-full justify-start" disabled>
                            <DollarSign className="mr-2 h-4 w-4 text-green-600" />
                            USDC
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted p-3 rounded-md space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Exchange Rate</span>
                        <span>1 SOL = {exchangeRate.toFixed(2)} USDC</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Network Fee</span>
                        <span>~0.000005 SOL</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>You will receive</span>
                        <span>{toAmount || "0.00"} USDC</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {connected && (
                  <Button
                    className="w-full"
                    onClick={handleExchange}
                    disabled={isExchanging || isLoading || !fromAmount || Number(fromAmount) <= 0}
                  >
                    {isExchanging ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Exchanging...
                      </>
                    ) : (
                      "Exchange SOL for USDC"
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About SOL/USDC Exchange</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Exchange your SOL for USDC stablecoins directly on the Solana blockchain. This exchange operates on
                  the Solana devnet for testing purposes.
                </p>
                <div className="space-y-2">
                  <h4 className="font-medium">Benefits:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Fast transactions with Solana's high throughput</li>
                    <li>Low transaction fees (less than $0.01)</li>
                    <li>USDC maintains a stable 1:1 peg with USD</li>
                    <li>Easily convert between volatile and stable assets</li>
                  </ul>
                </div>
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
                  <p className="text-sm font-medium">Devnet Simulation Notice</p>
                  <p className="text-sm mt-1">
                    This exchange is currently operating on Solana's devnet for testing purposes. The SOL transfer is
                    real (on devnet), but the USDC part is simulated in-memory since we don't have authority to mint
                    USDC tokens. In a production environment, you would be exchanging real SOL for real USDC through a
                    liquidity pool.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your recent token exchanges</CardDescription>
                </div>
                <History className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {!connected ? (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground mb-4">Connect your wallet to view transaction history</p>
                    <WalletMultiButton className="bg-primary hover:bg-primary/90 text-primary-foreground" />
                  </div>
                ) : (
                  <TokenExchangeHistory />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
