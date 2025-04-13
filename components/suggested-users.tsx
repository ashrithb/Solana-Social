import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export default function SuggestedUsers() {
  const users = [
    { username: "solana_official", verified: true, followers: "1.2M" },
    { username: "usdc_stablecoin", verified: true, followers: "845K" },
    { username: "defi_expert", verified: false, followers: "56K" },
    { username: "crypto_news", verified: true, followers: "320K" },
  ]

  return (
    <div className="space-y-4">
      {users.map((user, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <img src={`/placeholder.svg?height=32&width=32&query=${user.username} profile`} alt={user.username} />
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{user.username}</span>
                {user.verified && <CheckCircle className="h-3 w-3 fill-primary text-white" />}
              </div>
              <p className="text-xs text-muted-foreground">{user.followers} followers</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Follow
          </Button>
        </div>
      ))}
    </div>
  )
}
