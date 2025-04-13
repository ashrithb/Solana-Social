"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Coins, DollarSign, Plus } from "lucide-react"
import Link from "next/link"
import { useWallet, useConnection } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { getUSDCBalance } from "@/lib/solana-exchange"

export default function TokenBalance() {
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const [solBalance, setSolBalance] = useState<number>(0)
  const [usdcBalance, setUsdcBalance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBalances = async () => {
      if (!connected || !publicKey) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)

        // Fetch SOL balance
        const solBalanceRaw = await connection.getBalance(publicKey)
        setSolBalance(solBalanceRaw / LAMPORTS_PER_SOL)

        // Fetch USDC balance (including simulated balance)
        const usdcBal = await getUSDCBalance(connection, publicKey)
        setUsdcBalance(usdcBal)

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching balances:", error)
        setIsLoading(false)
      }
    }

    fetchBalances()

    // Set up interval to refresh balances every 10 seconds (reduced from 15)
    const intervalId = setInterval(fetchBalances, 10000)

    // Listen for balance updates from other components
    const handleBalanceUpdate = () => {
      console.log("USDC balance update event received")
      fetchBalances()
    }

    window.addEventListener("usdc-balance-update", handleBalanceUpdate)

    return () => {
      clearInterval(intervalId)
      window.removeEventListener("usdc-balance-update", handleBalanceUpdate)
    }
  }, [publicKey, connected, connection])

  if (!connected) {
    return (
      <div className="w-full text-center p-4">
        <p className="text-sm text-muted-foreground">Connect your wallet to view balances</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4 text-tech-purple" />
              <span className="text-sm">SOL</span>
            </div>
            <Badge variant="secondary">Loading...</Badge>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4 text-tech-blue" />
              <span className="text-sm">USDC</span>
            </div>
            <Badge variant="outline" className="text-tech-blue">
              Loading...
            </Badge>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Coins className="h-4 w-4 text-tech-purple" />
            <span className="text-sm">SOL</span>
          </div>
          <Badge variant="secondary">{solBalance.toFixed(4)}</Badge>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-tech-blue" />
            <span className="text-sm">USDC</span>
          </div>
          <Badge
            variant="outline"
            className="text-tech-blue transition-all duration-300"
            key={usdcBalance} // Force re-render when balance changes
          >
            {usdcBalance.toFixed(2)}
          </Badge>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/exchange">
            <Coins className="h-3 w-3 mr-1" />
            Exchange
          </Link>
        </Button>
        <Button variant="cta" size="sm" className="w-full" asChild>
          <Link href="/deposit">
            <Plus className="h-3 w-3 mr-1" />
            Deposit
          </Link>
        </Button>
      </div>
    </div>
  )
}
