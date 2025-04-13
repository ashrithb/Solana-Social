"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import FeedPost from "@/components/feed-post"
import CreatePost from "@/components/create-post"

// Initialize posts with proper IDs and ensure they have comments
const initializePostsWithComments = () => {
  const posts = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
  ]

  // We don't need to pre-generate comments here anymore
  // The FeedPost component will generate them on-demand
  return posts
}

export default function FeedPage() {
  const [posts, setPosts] = useState(initializePostsWithComments())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handlePostCreated = (newPost: any) => {
    console.log("Creating new post:", newPost)
    console.log("Current posts:", posts)

    // Add the new post to the beginning of the posts array
    setPosts([newPost, ...posts])

    console.log("Updated posts:", [newPost, ...posts])
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Feed</h1>

        <CreatePost onPostCreated={handlePostCreated} />

        <div className="mt-6">
          <Tabs defaultValue="foryou">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="foryou">For You</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="foryou" className="space-y-4 mt-4">
              {isLoading ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 items-center justify-center">
                      <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                      <p className="text-muted-foreground">Loading posts...</p>
                    </div>
                  </CardContent>
                </Card>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <FeedPost
                    key={post.id}
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
                  />
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">No posts yet. Create your first post!</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            <TabsContent value="following" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Following Feed</CardTitle>
                  <CardDescription>Posts from people you follow</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">Follow more users to see their posts here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
