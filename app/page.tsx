"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DollarSign, TrendingUp, Users } from "lucide-react"
import Link from "next/link"
import FeedPost from "@/components/feed-post"
import TrendingTopics from "@/components/trending-topics"
import SuggestedUsers from "@/components/suggested-users"
import WalletConnect from "@/components/wallet-connect"
import TokenBalance from "@/components/token-balance"
import StablecoinAlert from "@/components/stablecoin-alert"
import CreatePost from "@/components/create-post"

// Add these imports at the top
import { useState } from "react"

export default function Home() {
  const [posts, setPosts] = useState([
    {
      id: "post1",
      username: "crypto_enthusiast",
      handle: "@crypto_eth",
      content:
        "Just integrated USDC payments into my dApp! The transaction speed on Solana is incredible. #SolanaSpeed #Stablecoins",
      timeAgo: "2h",
      likes: 42,
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
      comments: 32,
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
      comments: 46,
      shares: 28,
      verified: true,
      isPremium: true,
      premiumPrice: 2,
    },
  ])
  return (
    <main className="container mx-auto px-4 py-6">
      <StablecoinAlert />

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Left sidebar */}
        <div className="w-full md:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20">
                <img src="/abstract-user-icon.png" alt="User profile" />
              </Avatar>
              <div className="text-center">
                <h3 className="font-medium">Username</h3>
                <p className="text-sm text-muted-foreground">@username</p>
              </div>
              <div className="flex gap-4 text-center">
                <div>
                  <p className="font-medium">120</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <div>
                  <p className="font-medium">2.5k</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
              </div>
              <WalletConnect />
            </CardContent>
            <CardFooter className="flex justify-center">
              <TokenBalance />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TrendingTopics />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Stablecoin Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <Link
                href="/stablecoin-features/marketplace"
                className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors"
              >
                <span className="text-sm">Content Marketplace</span>
                <DollarSign className="h-4 w-4 text-green-600" />
              </Link>
              <Link
                href="/stablecoin-features/escrow"
                className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors"
              >
                <span className="text-sm">Collaboration Escrow</span>
                <DollarSign className="h-4 w-4 text-green-600" />
              </Link>
              <Link
                href="/stablecoin-features/rewards"
                className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors"
              >
                <span className="text-sm">Moderation Rewards</span>
                <DollarSign className="h-4 w-4 text-green-600" />
              </Link>
              <Link
                href="/stablecoin-features/yield"
                className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors"
              >
                <span className="text-sm">Stablecoin Yield</span>
                <DollarSign className="h-4 w-4 text-green-600" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <div className="w-full md:w-2/4 space-y-6">
          {/* Replace the simple post input with the full CreatePost component */}
          <CreatePost
            onPostCreated={(newPost) => {
              console.log("New post created:", newPost)
              setPosts([newPost, ...posts])
            }}
          />

          <Tabs defaultValue="foryou">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="foryou">For You</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
            <TabsContent value="foryou" className="space-y-4 mt-4">
              {posts.map((post) => (
                <FeedPost
                  key={post.id}
                  id={post.id}
                  username={post.username}
                  handle={post.handle}
                  content={post.content}
                  timeAgo={post.timeAgo}
                  likes={post.likes}
                  comments={post.comments}
                  shares={post.shares}
                  verified={post.verified}
                  isPremium={post.isPremium}
                  premiumPrice={post.premiumPrice}
                />
              ))}
            </TabsContent>
            <TabsContent value="following" className="space-y-4 mt-4">
              <FeedPost
                id="post4"
                username="solana_dev"
                handle="@sol_builder"
                content="Just deployed my first Solana program! The developer experience is so smooth compared to other chains."
                timeAgo="3h"
                likes={89}
                comments={12}
                shares={5}
                verified={true}
                isPremium={false}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Right sidebar */}
        <div className="w-full md:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Who to Follow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SuggestedUsers />
            </CardContent>
            <CardFooter>
              <Link href="/discover" className="text-sm text-primary hover:underline w-full text-center">
                Show more
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stablecoin Rewards</CardTitle>
              <CardDescription>Earn USDC for platform activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Content creation</span>
                <Badge variant="outline" className="text-green-600">
                  +0.5 USDC
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Content moderation</span>
                <Badge variant="outline" className="text-green-600">
                  +0.2 USDC
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Quality engagement</span>
                <Badge variant="outline" className="text-green-600">
                  +0.1 USDC
                </Badge>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between items-center font-medium">
                <span>Claim rewards</span>
                <Link href="/rewards" className="text-primary hover:underline">
                  View Details
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">USDC Yield Farming</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current APY</span>
                  <span className="font-bold text-green-600">5.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Your deposit</span>
                  <span>10.5 USDC</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Earned interest</span>
                  <span>0.12 USDC</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                  <Link href="/stablecoin-features/yield">Manage Yield</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
