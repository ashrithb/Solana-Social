import { Badge } from "@/components/ui/badge"

export default function TrendingTopics() {
  const topics = [
    { name: "Solana", posts: 1240 },
    { name: "Stablecoins", posts: 856 },
    { name: "USDC", posts: 721 },
    { name: "SocialFi", posts: 543 },
    { name: "AIModeration", posts: 412 },
  ]

  return (
    <div className="space-y-3">
      {topics.map((topic, index) => (
        <div key={index} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">#{topic.name}</Badge>
          </div>
          <span className="text-xs text-muted-foreground">{topic.posts} posts</span>
        </div>
      ))}
    </div>
  )
}
