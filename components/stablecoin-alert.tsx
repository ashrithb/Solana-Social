"use client"

import { useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { DollarSign } from "lucide-react"

export default function StablecoinAlert() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) {
    return null
  }

  return (
    <Alert className="mb-6 bg-green-50 border-green-200 text-green-800">
      <DollarSign className="h-4 w-4 text-green-600" />
      <AlertTitle>Get started with USDC on Solana</AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mt-2">
        <span>
          Deposit USDC to unlock premium features, earn rewards, and participate in the Solana Social economy.
        </span>
        <div className="flex gap-2 ml-auto">
          <Button variant="outline" size="sm" onClick={() => setDismissed(true)}>
            Dismiss
          </Button>
          <div
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-[#5A31F4] to-[#3D85C6] hover:opacity-90 cursor-pointer"
            onClick={() => (window.location.href = "/stablecoin-features")}
          >
            <DollarSign className="h-4 w-4 mr-1" />
            <span>Explore USDC Features</span>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
