"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"

export default function WalletConnect() {
  const { connected, publicKey, disconnect } = useWallet()
  const [walletBalance, setWalletBalance] = useState<number | null>(null)
  const { toast } = useToast()

  // Format wallet address for display
  const formattedAddress = publicKey ? `${publicKey.toString().slice(0, 4)}...${publicKey.toString().slice(-4)}` : ""

  useEffect(() => {
    if (connected && publicKey) {
      toast({
        title: "Wallet connected",
        description: `Connected to ${formattedAddress}`,
      })
    }
  }, [connected, publicKey, toast, formattedAddress])

  const disconnectWallet = () => {
    disconnect()
    setWalletBalance(null)
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  return (
    <div className="w-full">
      {connected ? (
        <div className="space-y-2">
          <div className="text-center text-sm bg-muted p-2 rounded-md">{formattedAddress}</div>
          <Button variant="outline" className="w-full" onClick={disconnectWallet}>
            Disconnect
          </Button>
        </div>
      ) : (
        <WalletMultiButton className="w-full justify-center bg-primary hover:bg-primary/90 text-primary-foreground">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </WalletMultiButton>
      )}
    </div>
  )
}
