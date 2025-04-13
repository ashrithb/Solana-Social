import { Badge } from "@/components/ui/badge"
import { ArrowLeftRight, Coins, DollarSign } from "lucide-react"

export default function TokenExchangeHistory() {
  const transactions = [
    {
      id: "tx1",
      type: "sol-to-usdc",
      amount: "0.5 SOL",
      received: "10.25 USDC",
      date: "Apr 10, 2025",
      status: "completed",
    },
    {
      id: "tx2",
      type: "usdc-to-sol",
      amount: "5 USDC",
      received: "0.25 SOL",
      date: "Apr 8, 2025",
      status: "completed",
    },
    {
      id: "tx3",
      type: "sol-to-usdc",
      amount: "0.25 SOL",
      received: "5.12 USDC",
      date: "Apr 5, 2025",
      status: "completed",
    },
  ]

  return (
    <div className="space-y-4">
      {transactions.length > 0 ? (
        transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between border-b pb-4 last:border-0">
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-full">
                <ArrowLeftRight className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {tx.type === "sol-to-usdc" ? (
                    <>
                      <Coins className="h-3 w-3 text-primary" />
                      <span className="font-medium">{tx.amount}</span>
                      <span className="text-muted-foreground">→</span>
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <span className="font-medium">{tx.received}</span>
                    </>
                  ) : (
                    <>
                      <DollarSign className="h-3 w-3 text-green-600" />
                      <span className="font-medium">{tx.amount}</span>
                      <span className="text-muted-foreground">→</span>
                      <Coins className="h-3 w-3 text-primary" />
                      <span className="font-medium">{tx.received}</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{tx.date}</p>
              </div>
            </div>
            <Badge variant={tx.status === "completed" ? "outline" : "secondary"}>{tx.status}</Badge>
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-muted-foreground">No transaction history found</div>
      )}
    </div>
  )
}
