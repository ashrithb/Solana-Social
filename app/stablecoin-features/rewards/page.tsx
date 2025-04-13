"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle, DollarSign, Flag, Shield, Zap } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useWallet } from "@solana/wallet-adapter-react"
import { useConnection } from "@solana/wallet-adapter-react"
import { useToast } from "@/hooks/use-toast"
import { getUSDCBalance, incrementUSDCBalance } from "@/lib/solana-exchange"
import { calculateModerationStats, getTypeStats, getModerationHistory } from "@/lib/moderation-utils"
import ModeratePostModal from "@/components/moderation-modal"

export default function ModerationRewardsPage() {
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const { toast } = useToast()

  const [usdcBalance, setUsdcBalance] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)
  const [moderationStats, setModerationStats] = useState({
    totalReviews: 0,
    accuracyRate: 0,
    totalEarned: 0,
    thisWeek: 0,
    thisMonth: 0,
  })
  const [contentReviewStats, setContentReviewStats] = useState({ count: 0, accuracyRate: 0, earned: 0 })
  const [factCheckingStats, setFactCheckingStats] = useState({ count: 0, accuracyRate: 0, earned: 0 })
  const [qualityCurationStats, setQualityCurationStats] = useState({ count: 0, accuracyRate: 0, earned: 0 })
  const [moderationHistory, setModerationHistory] = useState([])

  // Moderation modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [moderationType, setModerationType] = useState<"content_review" | "fact_checking" | "quality_curation">(
    "content_review",
  )
  const [rewardAmount, setRewardAmount] = useState(0.05)

  // Function to update all stats
  const updateAllStats = () => {
    // Get moderation stats
    const stats = calculateModerationStats()
    setModerationStats(stats)

    // Get type-specific stats
    setContentReviewStats(getTypeStats("content_review"))
    setFactCheckingStats(getTypeStats("fact_checking"))
    setQualityCurationStats(getTypeStats("quality_curation"))

    // Get moderation history
    setModerationHistory(getModerationHistory())
  }

  // Fetch USDC balance and moderation stats when component mounts or publicKey changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        if (connected && publicKey) {
          // Fetch USDC balance
          const balance = await getUSDCBalance(connection, publicKey)
          setUsdcBalance(balance)
        }

        // Update all stats
        updateAllStats()
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load moderation data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Listen for balance updates
    const handleBalanceUpdate = () => {
      fetchData()
    }

    // Listen for moderation stats updates
    const handleStatsUpdate = () => {
      updateAllStats()
    }

    window.addEventListener("usdc-balance-update", handleBalanceUpdate)
    window.addEventListener("moderation-stats-update", handleStatsUpdate)

    return () => {
      window.removeEventListener("usdc-balance-update", handleBalanceUpdate)
      window.removeEventListener("moderation-stats-update", handleStatsUpdate)
    }
  }, [publicKey, connected, connection, toast])

  // Open moderation modal with specific type
  const handleStartModeration = (type: "content_review" | "fact_checking" | "quality_curation") => {
    setModerationType(type)

    // Set reward amount based on type
    switch (type) {
      case "content_review":
        setRewardAmount(0.05)
        break
      case "fact_checking":
        setRewardAmount(0.1)
        break
      case "quality_curation":
        setRewardAmount(0.2)
        break
    }

    setModalOpen(true)
  }

  // Handle claiming rewards
  const handleClaimRewards = async () => {
    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to claim rewards",
        variant: "destructive",
      })
      return
    }

    if (moderationStats.thisWeek <= 0) {
      toast({
        title: "No rewards to claim",
        description: "You don't have any rewards available to claim",
        variant: "destructive",
      })
      return
    }

    try {
      // Get the amount to claim
      const amount = moderationStats.thisWeek

      // Actually transfer the USDC to the wallet
      const success = await incrementUSDCBalance(publicKey, amount)

      if (success) {
        // Reset the weekly rewards in localStorage
        const moderationData = JSON.parse(localStorage.getItem("moderationData") || "{}")
        if (!moderationData.claimedRewards) {
          moderationData.claimedRewards = []
        }

        // Add this claim to history
        moderationData.claimedRewards.push({
          id: `claim-${Date.now()}`,
          amount,
          timestamp: Date.now(),
        })

        // Reset the weekly rewards
        moderationData.weeklyRewards = 0

        // Save back to localStorage
        localStorage.setItem("moderationData", JSON.stringify(moderationData))

        toast({
          title: "Rewards claimed!",
          description: `${amount.toFixed(2)} USDC has been added to your wallet`,
        })

        // Update the local state
        setModerationStats({
          ...moderationStats,
          thisWeek: 0, // Reset weekly rewards after claiming
        })

        // Refresh all stats to reflect the changes
        updateAllStats()

        // Explicitly dispatch the balance update event
        if (typeof window !== "undefined") {
          console.log("Dispatching USDC balance update event after claiming rewards")
          window.dispatchEvent(new CustomEvent("usdc-balance-update"))
        }
      } else {
        toast({
          title: "Error claiming rewards",
          description: "There was an issue processing your claim",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error claiming rewards:", error)
      toast({
        title: "Error claiming rewards",
        description: "There was an issue processing your claim",
        variant: "destructive",
      })
    }
  }

  // Format date for display
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
  }

  // Get task type display
  const getTaskTypeDisplay = (type: string) => {
    switch (type) {
      case "content_review":
        return (
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-tech-purple" />
            <span>Content Review</span>
          </div>
        )
      case "fact_checking":
        return (
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-tech-blue" />
            <span>Fact Checking</span>
          </div>
        )
      case "quality_curation":
        return (
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-tech-purple" />
            <span>Quality Curation</span>
          </div>
        )
      default:
        return type
    }
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Moderation Rewards</h1>
            <p className="text-muted-foreground mt-1">Earn USDC by helping maintain platform quality</p>
          </div>
          <Badge variant="outline" className="text-tech-blue text-lg py-1.5 px-3 self-start">
            <DollarSign className="h-4 w-4 mr-1" />
            <span>{moderationStats.thisWeek.toFixed(2)} USDC Available</span>
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Flag className="h-5 w-5 text-tech-purple" />
                Content Review
              </CardTitle>
              <CardDescription>Review flagged content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-tech-blue">0.05</span>
                <span className="text-tech-blue ml-1">USDC</span>
                <p className="text-sm text-muted-foreground">per review</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy Rate</span>
                  <span className="font-medium">
                    {contentReviewStats.accuracyRate ? contentReviewStats.accuracyRate.toFixed(0) : 0}%
                  </span>
                </div>
                <Progress
                  value={contentReviewStats.accuracyRate || 0}
                  className="h-2 bg-muted [&>div]:bg-primary-gradient"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="cta" className="w-full" onClick={() => handleStartModeration("content_review")}>
                Start Reviewing
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-tech-blue" />
                Fact Checking
              </CardTitle>
              <CardDescription>Verify claims in posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-tech-blue">0.1</span>
                <span className="text-tech-blue ml-1">USDC</span>
                <p className="text-sm text-muted-foreground">per verification</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Accuracy Rate</span>
                  <span className="font-medium">
                    {factCheckingStats.accuracyRate ? factCheckingStats.accuracyRate.toFixed(0) : 0}%
                  </span>
                </div>
                <Progress
                  value={factCheckingStats.accuracyRate || 0}
                  className="h-2 bg-muted [&>div]:bg-primary-gradient"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="cta" className="w-full" onClick={() => handleStartModeration("fact_checking")}>
                Start Fact Checking
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-tech-purple" />
                Quality Curation
              </CardTitle>
              <CardDescription>Curate high-quality content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-tech-blue">0.2</span>
                <span className="text-tech-blue ml-1">USDC</span>
                <p className="text-sm text-muted-foreground">per curation</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Curation Score</span>
                  <span className="font-medium">
                    {qualityCurationStats.accuracyRate ? qualityCurationStats.accuracyRate.toFixed(0) : 0}%
                  </span>
                </div>
                <Progress
                  value={qualityCurationStats.accuracyRate || 0}
                  className="h-2 bg-muted [&>div]:bg-primary-gradient"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="cta" className="w-full" onClick={() => handleStartModeration("quality_curation")}>
                Start Curating
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Moderation Stats</CardTitle>
                <CardDescription>Track your contribution and earnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted p-4 rounded-md text-center">
                    <h4 className="text-sm text-muted-foreground">Reviews Completed</h4>
                    <p className="text-2xl font-bold">{moderationStats.totalReviews}</p>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <h4 className="text-sm text-muted-foreground">Accuracy Rate</h4>
                    <p className="text-2xl font-bold">
                      {moderationStats.accuracyRate ? moderationStats.accuracyRate.toFixed(0) : 0}%
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-md text-center">
                    <h4 className="text-sm text-muted-foreground">Total Earned</h4>
                    <p className="text-2xl font-bold text-tech-blue">{moderationStats.totalEarned.toFixed(2)} USDC</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Earnings Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-tech-purple" />
                        <span>Content Review</span>
                      </div>
                      <span className="text-tech-blue">{contentReviewStats.earned.toFixed(2)} USDC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-tech-blue" />
                        <span>Fact Checking</span>
                      </div>
                      <span className="text-tech-blue">{factCheckingStats.earned.toFixed(2)} USDC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-tech-purple" />
                        <span>Quality Curation</span>
                      </div>
                      <span className="text-tech-blue">{qualityCurationStats.earned.toFixed(2)} USDC</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Current Period</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Period</span>
                      <span>April 5 - April 12, 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Reviews This Period</span>
                      <span>{moderationStats.totalReviews}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Available to Claim</span>
                      <span className="text-tech-blue font-medium">{moderationStats.thisWeek.toFixed(2)} USDC</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="cta"
                  className="w-full"
                  onClick={handleClaimRewards}
                  disabled={!connected || moderationStats.thisWeek <= 0}
                >
                  Claim Rewards ({moderationStats.thisWeek.toFixed(2)} USDC)
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How Moderation Rewards Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our moderation system uses a combination of AI and human reviewers to ensure content quality. When you
                  participate in moderation tasks, you earn USDC rewards directly to your wallet.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="bg-primary-gradient rounded-full h-10 w-10 flex items-center justify-center mx-auto text-white">
                      <span className="font-medium">1</span>
                    </div>
                    <h4 className="font-medium">Choose Task Type</h4>
                    <p className="text-xs text-muted-foreground">
                      Select from content review, fact checking, or quality curation
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-primary-gradient rounded-full h-10 w-10 flex items-center justify-center mx-auto text-white">
                      <span className="font-medium">2</span>
                    </div>
                    <h4 className="font-medium">Complete Reviews</h4>
                    <p className="text-xs text-muted-foreground">
                      Review content according to our community guidelines
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-primary-gradient rounded-full h-10 w-10 flex items-center justify-center mx-auto text-white">
                      <span className="font-medium">3</span>
                    </div>
                    <h4 className="font-medium">Earn USDC</h4>
                    <p className="text-xs text-muted-foreground">Receive USDC rewards directly to your wallet</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-md">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 mt-0.5" />
                    <div>
                      <p className="font-medium">Quality Matters</p>
                      <p className="text-sm mt-1">
                        Your accuracy rate affects your eligibility for tasks and bonus rewards. Maintain a high
                        accuracy rate by following our guidelines carefully.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Moderation History</CardTitle>
                <CardDescription>Your recent moderation activities and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Task Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead className="text-right">Reward</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {moderationHistory && moderationHistory.length > 0 ? (
                      moderationHistory.slice(0, 10).map((activity: any) => (
                        <TableRow key={activity.id}>
                          <TableCell>{formatDate(activity.timestamp)}</TableCell>
                          <TableCell>{getTaskTypeDisplay(activity.type)}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`${
                                activity.accuracy
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-amber-50 text-amber-700 border-amber-200"
                              }`}
                            >
                              {activity.accuracy ? "Completed" : "Disputed"}
                            </Badge>
                          </TableCell>
                          <TableCell>{activity.accuracy ? "100%" : "75%"}</TableCell>
                          <TableCell className="text-right text-tech-blue">{activity.reward.toFixed(2)} USDC</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No moderation history yet. Start reviewing to earn rewards!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>

                {moderationHistory && moderationHistory.length > 10 && (
                  <div className="flex justify-center mt-6">
                    <Button variant="outline">Load More</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Moderator Leaderboard</CardTitle>
                <CardDescription>Top contributors this month</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Moderator</TableHead>
                      <TableHead>Reviews</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead className="text-right">Earned</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-amber-50">
                      <TableCell>
                        <Badge className="bg-primary-gradient text-white">1</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-tech-purple" />
                          <span className="font-medium">crypto_guardian</span>
                        </div>
                      </TableCell>
                      <TableCell>248</TableCell>
                      <TableCell>98%</TableCell>
                      <TableCell className="text-right text-tech-blue">42.50 USDC</TableCell>
                    </TableRow>
                    <TableRow className="bg-slate-50">
                      <TableCell>
                        <Badge className="bg-primary-gradient text-white">2</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-tech-blue" />
                          <span className="font-medium">truth_seeker</span>
                        </div>
                      </TableCell>
                      <TableCell>215</TableCell>
                      <TableCell>97%</TableCell>
                      <TableCell className="text-right text-tech-blue">38.75 USDC</TableCell>
                    </TableRow>
                    <TableRow className="bg-amber-50/30">
                      <TableCell>
                        <Badge className="bg-primary-gradient text-white">3</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-tech-purple" />
                          <span className="font-medium">quality_control</span>
                        </div>
                      </TableCell>
                      <TableCell>187</TableCell>
                      <TableCell>96%</TableCell>
                      <TableCell className="text-right text-tech-blue">32.20 USDC</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>4</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>fact_checker</span>
                        </div>
                      </TableCell>
                      <TableCell>156</TableCell>
                      <TableCell>94%</TableCell>
                      <TableCell className="text-right text-tech-blue">28.45 USDC</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-muted-foreground" />
                          <span>content_curator</span>
                        </div>
                      </TableCell>
                      <TableCell>142</TableCell>
                      <TableCell>93%</TableCell>
                      <TableCell className="text-right text-tech-blue">25.80 USDC</TableCell>
                    </TableRow>
                    <TableRow className="bg-blue-50">
                      <TableCell>12</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-tech-blue" />
                          <span className="font-medium">You</span>
                        </div>
                      </TableCell>
                      <TableCell>{moderationStats.totalReviews}</TableCell>
                      <TableCell>{moderationStats.accuracyRate.toFixed(0)}%</TableCell>
                      <TableCell className="text-right text-tech-blue">
                        {moderationStats.totalEarned.toFixed(2)} USDC
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  <p>Leaderboard resets on the 1st of each month</p>
                  <p>Top 10 moderators receive bonus rewards</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Moderation Guidelines</CardTitle>
                <CardDescription>Follow these guidelines to maintain high accuracy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Flag className="h-5 w-5 text-tech-purple" />
                    Content Review Guidelines
                  </h3>
                  <div className="space-y-2 pl-7">
                    <p className="text-sm">When reviewing flagged content, evaluate against our community standards:</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Harmful or dangerous content</li>
                      <li>Harassment or bullying</li>
                      <li>Hate speech or discrimination</li>
                      <li>Misinformation or scams</li>
                      <li>Explicit or adult content</li>
                    </ul>
                    <p className="text-sm mt-2">
                      For each review, select whether the content violates our guidelines and provide a brief
                      explanation.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-tech-blue" />
                    Fact Checking Guidelines
                  </h3>
                  <div className="space-y-2 pl-7">
                    <p className="text-sm">When fact checking claims, follow these principles:</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Verify claims using multiple reliable sources</li>
                      <li>Focus on factual accuracy, not opinions</li>
                      <li>Check for context and completeness</li>
                      <li>Be especially vigilant with financial advice or market predictions</li>
                      <li>Provide links to sources that support your assessment</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium flex items-center gap-2">
                    <Zap className="h-5 w-5 text-tech-purple" />
                    Quality Curation Guidelines
                  </h3>
                  <div className="space-y-2 pl-7">
                    <p className="text-sm">When curating content for featured sections, look for:</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Original, high-quality content</li>
                      <li>Educational value or unique insights</li>
                      <li>Well-researched information</li>
                      <li>Clear and accessible presentation</li>
                      <li>Relevance to current trends or topics</li>
                    </ul>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Eligibility Requirements</h3>
                  <div className="space-y-2">
                    <p className="text-sm">To participate in the moderation program and earn rewards:</p>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Maintain a minimum accuracy rate of 80%</li>
                      <li>Complete at least 10 reviews per week to remain active</li>
                      <li>Have a connected Solana wallet to receive USDC rewards</li>
                      <li>Complete the moderator onboarding quiz (one-time requirement)</li>
                    </ul>
                  </div>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How is accuracy calculated?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Your accuracy rate is calculated by comparing your moderation decisions with those of other
                        moderators and our AI system. When multiple moderators review the same content, we use a
                        consensus model to determine the correct decision. Your accuracy rate is the percentage of your
                        decisions that match the consensus.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What happens if my accuracy drops?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        If your accuracy rate falls below 80%, you'll receive a notification and be placed in a training
                        mode. During training mode, you'll continue to review content but won't earn rewards until your
                        accuracy improves. We'll provide feedback to help you understand where improvements are needed.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How often are rewards distributed?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm">
                        Rewards are calculated daily and can be claimed weekly. Unclaimed rewards accumulate in your
                        account and can be claimed at any time. Rewards are paid directly to your connected Solana
                        wallet in USDC.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant="cta">
                  Take Moderator Training Quiz
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Moderation Modal */}
      <ModeratePostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={moderationType}
        rewardAmount={rewardAmount}
      />
    </main>
  )
}
