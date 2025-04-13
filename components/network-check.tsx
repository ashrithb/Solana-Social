"use client"

import { useConnection } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function NetworkCheck() {
  const { connection } = useConnection()
  const [network, setNetwork] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const checkNetwork = async () => {
      try {
        // Check if we're on devnet based on the RPC endpoint
        const isDevnet = connection.rpcEndpoint.includes("devnet")
        setNetwork(isDevnet ? "Devnet" : "Other network")
      } catch (error) {
        console.error("Error checking network:", error)
        setNetwork("Unknown")
      } finally {
        setIsLoading(false)
      }
    }

    checkNetwork()
  }, [connection])

  if (isLoading) {
    return <Badge variant="outline">Checking network...</Badge>
  }

  return (
    <Badge variant={network === "Devnet" ? "outline" : "destructive"}>
      {network === "Devnet" ? "Connected to Devnet" : "Warning: Not on Devnet"}
    </Badge>
  )
}
