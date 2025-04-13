"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import FeedPost from "@/components/feed-post"
import Link from "next/link"
import type { CommentData } from "@/components/comment-item"

// Sample user data for comments
const users = [
  { username: "crypto_enthusiast", handle: "@crypto_eth", verified: true },
  { username: "defi_wizard", handle: "@defi_sol", verified: false },
  { username: "solana_dev", handle: "@sol_builder", verified: true },
  { username: "blockchain_guru", handle: "@block_guru", verified: false },
  { username: "nft_collector", handle: "@nft_whale", verified: true },
  { username: "stablecoin_fan", handle: "@stable_money", verified: false },
  { username: "web3_designer", handle: "@web3_ux", verified: true },
  { username: "token_trader", handle: "@token_pro", verified: false },
  { username: "crypto_analyst", handle: "@crypto_data", verified: true },
  { username: "defi_researcher", handle: "@defi_science", verified: false },
]

// Sample comment content with more diverse opinions
const commentContents = [
  "This is really insightful! Thanks for sharing.",
  "I've been thinking about this too. Great perspective.",
  "Have you considered the implications for DeFi protocols?",
  "Solana's speed makes this possible. Couldn't do this on ETH!",
  "I disagree. There are several factors you're not considering.",
  "Looking forward to more content like this!",
  "This is why I'm bullish on Solana ecosystem.",
  "USDC integration is a game changer for sure.",
  "How does this compare to other stablecoins?",
  "Great analysis! Would love to see more data points.",
  "I'm skeptical about this approach. Have you tested it at scale?",
  "This could revolutionize how we think about social tokens.",
  "Not sure I agree with your conclusion, but interesting perspective.",
  "The regulatory implications here are concerning.",
  "This is exactly what the ecosystem needs right now!",
  "Have you looked at the security implications?",
  "Impressive work! How long did this implementation take?",
  "This could be a major breakthrough if it works as described.",
  "I've tried something similar but ran into scaling issues.",
  "The UX needs work, but the concept is solid.",
]

// Generate random comments with replies
const generateRandomComments = (count: number): CommentData[] => {
  const comments: CommentData[] = []
  const actualCount = Math.min(Math.max(count, 1), 10) // Ensure between 1-10 comments

  for (let i = 0; i < actualCount; i++) {
    const user = users[Math.floor(Math.random() * users.length)]
    const content = commentContents[Math.floor(Math.random() * commentContents.length)]
    const timeAgo = `${Math.floor(Math.random() * 24)}h`
    const likes = Math.floor(Math.random() * 20)
    const dislikes = Math.floor(Math.random() * 10)

    // Randomly add replies to some comments
    const replies: CommentData[] = []
    if (Math.random() > 0.6) {
      const replyCount = Math.floor(Math.random() * 3) + 1
      for (let j = 0; j < replyCount; j++) {
        const replyUser = users[Math.floor(Math.random() * users.length)]
        const replyContent = commentContents[Math.floor(Math.random() * commentContents.length)]
        const replyTimeAgo = `${Math.floor(Math.random() * 12)}h`
        const replyLikes = Math.floor(Math.random() * 10)
        const replyDislikes = Math.floor(Math.random() * 5)

        replies.push({
          id: `reply-${Date.now()}-${i}-${j}`,
          username: replyUser.username,
          handle: replyUser.handle,
          content: replyContent,
          timeAgo: replyTimeAgo,
          likes: replyLikes,
          dislikes: replyDislikes,
          verified: replyUser.verified,
        })
      }
    }

    comments.push({
      id: `comment-${Date.now()}-${i}`,
      username: user.username,
      handle: user.handle,
      content,
      timeAgo,
      likes,
      dislikes,
      verified: user.verified,
      replies: replies.length > 0 ? replies : undefined,
    })
  }

  return comments
}

// Sample posts data with realistic comment counts
const samplePosts = {
  post1: {
    id: "post1",
    username: "crypto_enthusiast",
    handle: "@crypto_eth",
    content:
      "Just integrated USDC payments into my dApp! The transaction speed on Solana is incredible. #SolanaSpeed #Stablecoins",
    timeAgo: "2h",
    likes: 42,
    dislikes: 5,
    comments: 7,
    shares: 3,
    verified: true,
    isPremium: false,
    commentsList: generateRandomComments(7),
  },
  post2: {
    id: "post2",
    username: "defi_wizard",
    handle: "@defi_sol",
    content:
      "Opinion: Stablecoins are the bridge between traditional finance and crypto. They're essential for mainstream adoption. What do you think?",
    timeAgo: "5h",
    likes: 128,
    dislikes: 12,
    comments: 9,
    shares: 14,
    verified: false,
    isPremium: false,
    commentsList: generateRandomComments(9),
  },
  post3: {
    id: "post3",
    username: "ai_researcher",
    handle: "@ai_future",
    content:
      "Our AI just predicted the next big trend in DeFi based on social sentiment analysis. Hint: It involves stablecoins and social tokens! Full report coming soon.",
    timeAgo: "1d",
    likes: 215,
    dislikes: 18,
    comments: 5,
    shares: 28,
    verified: true,
    isPremium: true,
    premiumPrice: 2,
    commentsList: generateRandomComments(5),
  },
  post4: {
    id: "post4",
    username: "solana_dev",
    handle: "@sol_builder",
    content:
      "Just deployed my first Solana program! The developer experience is so smooth compared to other chains. Anyone else building on Solana right now?",
    timeAgo: "3h",
    likes: 89,
    dislikes: 3,
    comments: 4,
    shares: 5,
    verified: true,
    isPremium: false,
    commentsList: generateRandomComments(4),
  },
  post5: {
    id: "post5",
    username: "stablecoin_fan",
    handle: "@stable_money",
    content:
      "Hot take: Stablecoins will be the most important crypto innovation of the decade. They solve the volatility problem while maintaining all the benefits of blockchain technology.",
    timeAgo: "6h",
    likes: 76,
    dislikes: 8,
    comments: 10,
    shares: 12,
    verified: false,
    isPremium: false,
    commentsList: generateRandomComments(10),
  },
}

export default function PostPage() {
  const params = useParams()
  const postId = params.id as string

  const [post, setPost] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // Simulate fetching post data
    const timer = setTimeout(() => {
      if (samplePosts[postId]) {
        setPost(samplePosts[postId])
        setIsLoading(false)
      } else {
        setNotFound(true)
        setIsLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [postId])

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/feed">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Feed
            </Link>
          </Button>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4 items-center justify-center">
                <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <p className="text-muted-foreground">Loading post...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  if (notFound) {
    return (
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/feed">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Feed
            </Link>
          </Button>

          <Card>
            <CardContent className="p-6 text-center">
              <h2 className="text-xl font-bold mb-2">Post Not Found</h2>
              <p className="text-muted-foreground">The post you're looking for doesn't exist or has been removed.</p>
              <Button asChild className="mt-4">
                <Link href="/feed">Go to Feed</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/feed">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Feed
          </Link>
        </Button>

        <FeedPost
          id={post.id}
          username={post.username}
          handle={post.handle}
          content={post.content}
          timeAgo={post.timeAgo}
          likes={post.likes}
          dislikes={post.dislikes}
          comments={post.comments}
          shares={post.shares}
          verified={post.verified}
          isPremium={post.isPremium}
          premiumPrice={post.premiumPrice}
          image={post.image}
          commentsList={post.commentsList}
          alwaysShowComments={true}
        />
      </div>
    </main>
  )
}
