"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Flag, CheckCircle, Zap, AlertTriangle, ThumbsUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@solana/wallet-adapter-react"
import { addModerationActivity } from "@/lib/moderation-utils"
import { v4 as uuidv4 } from "uuid"

// Sample posts for moderation
const samplePosts = [
  {
    id: "post1",
    author: "crypto_enthusiast",
    content:
      "Just discovered this amazing new token that's guaranteed to 100x in the next week! DM me for details on how to get in early!",
    image: "/abstract-geometric-shapes.png",
  },
  {
    id: "post2",
    author: "web3_developer",
    content:
      "Working on a new DeFi protocol that will revolutionize lending. Looking for beta testers who want to try it out!",
    image: "/abstract-geometric-preview.png",
  },
  {
    id: "post3",
    author: "nft_collector",
    content:
      "This new NFT collection is absolutely stunning. The artist has created something truly unique with these generative pieces.",
    image: "/data-insights-glimpse.png",
  },
]

// Sample claims for fact checking
const sampleClaims = [
  {
    id: "claim1",
    author: "market_analyst",
    claim: "Solana transaction volume exceeded Ethereum's for the third consecutive month.",
    context: "Posted in a discussion about blockchain scalability and performance.",
  },
  {
    id: "claim2",
    author: "tech_news",
    claim: "The new Solana mobile device sold out within 24 hours of its release.",
    context: "Posted in an article about Web3 hardware adoption.",
  },
  {
    id: "claim3",
    author: "defi_tracker",
    claim: "Total value locked in Solana DeFi protocols has grown by 150% since January.",
    context: "Posted in a market analysis thread.",
  },
]

// Sample content for quality curation
const sampleContent = [
  {
    id: "content1",
    title: "Understanding Solana's Proof of History",
    author: "blockchain_educator",
    excerpt: "A deep dive into how Proof of History works and why it's a game-changer for blockchain scalability...",
    category: "Education",
    readTime: "8 min read",
  },
  {
    id: "content2",
    title: "Building Your First Solana dApp",
    author: "dev_mentor",
    excerpt: "Step-by-step tutorial for creating a simple decentralized application on Solana...",
    category: "Development",
    readTime: "12 min read",
  },
  {
    id: "content3",
    title: "The Evolution of NFTs on Solana",
    author: "digital_artist",
    excerpt: "How the NFT ecosystem on Solana has grown and what makes it unique compared to other chains...",
    category: "NFTs",
    readTime: "6 min read",
  },
]

interface ModeratePostModalProps {
  isOpen: boolean
  onClose: () => void
  type: "content_review" | "fact_checking" | "quality_curation"
  rewardAmount: number
}

export default function ModeratePostModal({ isOpen, onClose, type, rewardAmount }: ModeratePostModalProps) {
  const { toast } = useToast()
  const { publicKey, connected } = useWallet()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [decision, setDecision] = useState("")
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get the appropriate content based on moderation type
  const getContent = () => {
    switch (type) {
      case "content_review":
        return samplePosts[currentIndex % samplePosts.length]
      case "fact_checking":
        return sampleClaims[currentIndex % sampleClaims.length]
      case "quality_curation":
        return sampleContent[currentIndex % sampleContent.length]
      default:
        return null
    }
  }

  const content = getContent()

  // Handle submission of moderation decision
  const handleSubmit = async () => {
    if (!decision) {
      toast({
        title: "Decision required",
        description: "Please make a decision before submitting",
        variant: "destructive",
      })
      return
    }

    if (!connected || !publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to earn rewards",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call to submit moderation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Randomly determine if the moderation was accurate (for simulation)
      const isAccurate = Math.random() > 0.2 // 80% chance of being accurate

      // Create the activity object
      const activity = {
        id: uuidv4(),
        type,
        timestamp: Date.now(),
        decision,
        accuracy: isAccurate,
        reward: isAccurate ? rewardAmount : rewardAmount / 2, // Reduced reward for inaccurate moderation
      }

      // Add to moderation history
      const success = addModerationActivity(activity)

      if (success) {
        // Increment USDC balance
        const rewardEvent = new CustomEvent("usdc-balance-update", {
          detail: {
            amount: activity.reward,
            type: "increment",
          },
        })
        window.dispatchEvent(rewardEvent)

        // Dispatch event to update moderation stats
        const statsUpdateEvent = new CustomEvent("moderation-stats-update")
        window.dispatchEvent(statsUpdateEvent)

        toast({
          title: "Moderation submitted",
          description: `You earned ${activity.reward.toFixed(2)} USDC for this moderation`,
        })

        // Reset form and move to next item
        setDecision("")
        setReason("")
        setCurrentIndex((prev) => prev + 1)
      } else {
        toast({
          title: "Error",
          description: "Failed to save moderation data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting moderation:", error)
      toast({
        title: "Error",
        description: "Failed to submit moderation",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Render different content based on moderation type
  const renderContent = () => {
    switch (type) {
      case "content_review":
        const post = content as (typeof samplePosts)[0]
        return (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{post.author}</p>
                <p className="text-sm text-muted-foreground">Posted 2 hours ago</p>
              </div>
            </div>
            <p>{post.content}</p>
            {post.image && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <img src={post.image || "/placeholder.svg"} alt="Post image" className="object-cover w-full h-full" />
              </div>
            )}
            <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Flagged for review</p>
                  <p className="text-sm">This post was flagged for potential violation of community guidelines.</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "fact_checking":
        const claim = content as (typeof sampleClaims)[0]
        return (
          <div className="space-y-4">
            <div className="p-4 border rounded-md bg-blue-50 border-blue-200">
              <p className="font-medium text-blue-800">Claim to verify:</p>
              <p className="mt-2">{claim.claim}</p>
              <div className="mt-3 flex items-center gap-2 text-sm text-blue-700">
                <span>Posted by:</span>
                <span className="font-medium">{claim.author}</span>
              </div>
            </div>
            <div>
              <p className="font-medium">Context:</p>
              <p className="text-muted-foreground">{claim.context}</p>
            </div>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium">Fact Checking Guidelines:</p>
              <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                <li>Verify using multiple reliable sources</li>
                <li>Consider the context and completeness</li>
                <li>Focus on factual accuracy, not opinions</li>
              </ul>
            </div>
          </div>
        )

      case "quality_curation":
        const contentItem = content as (typeof sampleContent)[0]
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {contentItem.category}
                </span>
                <span className="text-xs text-muted-foreground">{contentItem.readTime}</span>
              </div>
              <h3 className="text-xl font-bold">{contentItem.title}</h3>
              <p className="text-sm text-muted-foreground">By {contentItem.author}</p>
            </div>
            <div className="border-l-4 border-purple-300 pl-4">
              <p className="italic">{contentItem.excerpt}</p>
              <p className="mt-2">
                [Content continues with detailed explanations, code examples, and illustrations...]
              </p>
            </div>
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm font-medium">Curation Guidelines:</p>
              <ul className="text-sm list-disc pl-5 mt-1 space-y-1">
                <li>Evaluate educational value and unique insights</li>
                <li>Check for clarity and accessibility</li>
                <li>Consider relevance to current trends</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  // Render different decision options based on moderation type
  const renderDecisionOptions = () => {
    switch (type) {
      case "content_review":
        return (
          <RadioGroup value={decision} onValueChange={setDecision} className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="approve" id="approve" />
              <Label htmlFor="approve" className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-green-600" />
                <span>Approve - No violation</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flag-misleading" id="flag-misleading" />
              <Label htmlFor="flag-misleading">Flag - Misleading content</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flag-harmful" id="flag-harmful" />
              <Label htmlFor="flag-harmful">Flag - Harmful content</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flag-spam" id="flag-spam" />
              <Label htmlFor="flag-spam">Flag - Spam or scam</Label>
            </div>
          </RadioGroup>
        )

      case "fact_checking":
        return (
          <RadioGroup value={decision} onValueChange={setDecision} className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="accurate" id="accurate" />
              <Label htmlFor="accurate" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Accurate - Claim is correct</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="partially-accurate" id="partially-accurate" />
              <Label htmlFor="partially-accurate">Partially accurate - Needs context</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="inaccurate" id="inaccurate" />
              <Label htmlFor="inaccurate">Inaccurate - Claim is false</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="unverifiable" id="unverifiable" />
              <Label htmlFor="unverifiable">Unverifiable - Cannot be determined</Label>
            </div>
          </RadioGroup>
        )

      case "quality_curation":
        return (
          <RadioGroup value={decision} onValueChange={setDecision} className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="feature" id="feature" />
              <Label htmlFor="feature" className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <span>Feature - Exceptional quality</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="promote" id="promote" />
              <Label htmlFor="promote">Promote - Good quality</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard">Standard - Average quality</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low-quality" id="low-quality" />
              <Label htmlFor="low-quality">Low quality - Do not promote</Label>
            </div>
          </RadioGroup>
        )

      default:
        return null
    }
  }

  // Get icon based on moderation type
  const getTypeIcon = () => {
    switch (type) {
      case "content_review":
        return <Flag className="h-5 w-5 text-amber-500" />
      case "fact_checking":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      case "quality_curation":
        return <Zap className="h-5 w-5 text-purple-500" />
      default:
        return null
    }
  }

  // Get title based on moderation type
  const getTypeTitle = () => {
    switch (type) {
      case "content_review":
        return "Content Review"
      case "fact_checking":
        return "Fact Checking"
      case "quality_curation":
        return "Quality Curation"
      default:
        return "Moderation"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getTypeIcon()}
            {getTypeTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">{renderContent()}</CardContent>
          </Card>

          <div className="space-y-4">
            <h4 className="font-medium">Your Decision</h4>
            {renderDecisionOptions()}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Explain your decision..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm">
              <span className="text-muted-foreground">Reward: </span>
              <span className="font-medium text-green-600">{rewardAmount} USDC</span>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={!decision || isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
