"use client"

import { useState, useEffect } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, ArrowUp, CheckCircle, DollarSign, Lock, MessageSquare, Share2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import CommentItem, { type CommentData } from "./comment-item"
import CommentForm from "./comment-form"
import ShareModal from "./share-modal"
import { Separator } from "@/components/ui/separator"
import { generateRandomComments } from "@/utils/comment-utils"
import { useWallet } from "@solana/wallet-adapter-react"
import { useConnection } from "@solana/wallet-adapter-react"
import { getUSDCBalance, decrementUSDCBalance } from "@/lib/solana-exchange"

interface FeedPostProps {
  id: string
  username: string
  handle: string
  content: string
  timeAgo: string
  likes: number
  dislikes?: number
  comments: number
  shares: number
  verified?: boolean
  isPremium?: boolean
  premiumPrice?: number
  image?: string | null
  commentsList?: CommentData[]
  alwaysShowComments?: boolean
}

export default function FeedPost({
  id,
  username,
  handle,
  content,
  timeAgo,
  likes,
  dislikes = 0,
  comments,
  shares,
  verified = false,
  isPremium = false,
  premiumPrice = 1,
  image = null,
  commentsList = [],
  alwaysShowComments = false,
}: FeedPostProps) {
  // Ensure we have a valid post ID
  const postId = id || `post-${Math.random().toString(36).substring(2, 15)}`

  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const [dislikeCount, setDislikeCount] = useState(dislikes)
  const [showPremiumDialog, setShowPremiumDialog] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [showComments, setShowComments] = useState(alwaysShowComments)
  const [postComments, setPostComments] = useState<CommentData[]>([])
  const [commentCount, setCommentCount] = useState(comments)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareCount, setShareCount] = useState(shares)
  const [replyingTo, setReplyingTo] = useState<{ id: string; username: string } | null>(null)
  const [hasCommented, setHasCommented] = useState(false)
  const [showCommentPrompt, setShowCommentPrompt] = useState(false)
  const [fakeCommentsGenerated, setFakeCommentsGenerated] = useState(false)
  const { toast } = useToast()
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [usdcBalance, setUsdcBalance] = useState<number>(0)

  // Fetch USDC balance when component mounts or publicKey changes
  useEffect(() => {
    const fetchUsdcBalance = async () => {
      if (publicKey && isPremium) {
        try {
          const balance = await getUSDCBalance(connection, publicKey)
          setUsdcBalance(balance)
        } catch (error) {
          console.error("Error fetching USDC balance:", error)
        }
      }
    }

    fetchUsdcBalance()

    // Listen for balance updates
    const handleBalanceUpdate = () => {
      fetchUsdcBalance()
    }

    window.addEventListener("usdc-balance-update", handleBalanceUpdate)

    return () => {
      window.removeEventListener("usdc-balance-update", handleBalanceUpdate)
    }
  }, [publicKey, connection, isPremium])

  // Debug log for component props
  useEffect(() => {
    console.log(`FeedPost mounted/updated for post ${postId}:`, {
      id: postId,
      commentsList,
      comments,
      postComments,
      fakeCommentsGenerated,
    })
  }, [postId, commentsList, comments, postComments, fakeCommentsGenerated])

  // Initialize comments from props or generate fake comments
  useEffect(() => {
    // If we already have comments in state, don't override them
    if (postComments.length > 0) {
      console.log(`Post ${postId} already has ${postComments.length} comments in state, skipping initialization`)
      return
    }

    // If commentsList is provided and not empty, use it
    if (commentsList && commentsList.length > 0) {
      console.log(`Loading ${commentsList.length} comments from props for post ${postId}`)
      setPostComments([...commentsList])
      setHasCommented(true)
      return
    }

    // If we have a comments count but no commentsList, generate fake comments
    if (comments > 0 && !fakeCommentsGenerated) {
      console.log(`Generating ${comments} fake comments for post ${postId}`)
      const fakeComments = generateRandomComments(comments, postId)
      setPostComments(fakeComments)
      setFakeCommentsGenerated(true)
      setHasCommented(true)
    } else {
      console.log(`No comments to load for post ${postId}`)
    }
  }, [postId, commentsList, comments, postComments.length, fakeCommentsGenerated])

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
      setLiked(false)
    } else {
      setLikeCount(likeCount + 1)
      setLiked(true)
      if (disliked) {
        setDisliked(false)
        setDislikeCount(dislikeCount - 1)
      }
    }
  }

  const handleDislike = () => {
    if (disliked) {
      setDislikeCount(dislikeCount - 1)
      setDisliked(false)
    } else {
      setDislikeCount(dislikeCount + 1)
      setDisliked(true)
      if (liked) {
        setLiked(false)
        setLikeCount(likeCount - 1)
      }
    }
  }

  const handleUnlockContent = async () => {
    if (!publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to unlock premium content",
        variant: "destructive",
      })
      return
    }

    // Check if user has enough USDC
    const currentBalance = await getUSDCBalance(connection, publicKey)
    if (currentBalance < premiumPrice) {
      toast({
        title: "Insufficient USDC balance",
        description: `You need ${premiumPrice} USDC to unlock this content. Your balance: ${currentBalance.toFixed(2)} USDC`,
        variant: "destructive",
      })
      return
    }

    // Process the payment
    const success = await decrementUSDCBalance(publicKey, premiumPrice)

    if (success) {
      setUnlocked(true)
      setShowPremiumDialog(false)
      toast({
        title: "Content unlocked!",
        description: `You paid ${premiumPrice} USDC for this premium content.`,
      })

      // Update the local balance state
      setUsdcBalance(currentBalance - premiumPrice)
    } else {
      toast({
        title: "Payment failed",
        description: "Failed to process your payment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCommentSubmit = (newComment: CommentData) => {
    console.log(`Submitting new comment for post ${postId}:`, newComment)
    console.log("Current postComments:", postComments)

    // Ensure we have fake comments generated before adding a new comment
    if (comments > 0 && postComments.length === 0 && !fakeCommentsGenerated) {
      console.log(`Generating ${comments} fake comments before adding new comment`)
      const fakeComments = generateRandomComments(comments, postId)

      // Add the new comment to the beginning of the fake comments
      const updatedComments = [newComment, ...fakeComments]
      console.log(`Setting ${updatedComments.length} comments for post ${postId}`)

      setPostComments(updatedComments)
      setFakeCommentsGenerated(true)
    } else {
      // Normal comment submission logic
      if (replyingTo) {
        // Find the comment we're replying to and add the reply
        const updatedComments = postComments.map((comment) => {
          if (comment.id === replyingTo.id) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment],
            }
          }
          return comment
        })
        setPostComments(updatedComments)
      } else {
        // Add the new comment to the beginning of the list
        setPostComments([newComment, ...postComments])
      }
    }

    // Always set hasCommented to true and show comments when a user comments
    setHasCommented(true)
    setShowComments(true)
    setCommentCount((prev) => prev + 1)

    // Close the comment prompt if it was open
    if (showCommentPrompt) {
      setShowCommentPrompt(false)
    }

    toast({
      title: "Comment posted!",
      description: "Your comment has been added to the post.",
    })
  }

  const handleReply = (commentId: string) => {
    // Find the comment username
    const comment = postComments.find((c) => c.id === commentId)
    if (comment) {
      setReplyingTo({ id: commentId, username: comment.username })
    }
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
  }

  const handleShare = () => {
    setShowShareModal(true)
    // Only increment share count when modal is opened
    // In a real app, you might want to track actual shares
    setShareCount(shareCount + 1)
  }

  const handleViewComments = () => {
    // If we have a comments count but no comments loaded yet, generate them now
    if (comments > 0 && postComments.length === 0 && !fakeCommentsGenerated) {
      console.log(`Generating ${comments} fake comments on view request for post ${postId}`)
      const fakeComments = generateRandomComments(comments, postId)
      setPostComments(fakeComments)
      setFakeCommentsGenerated(true)
      setHasCommented(true)
      setShowComments(true)
      return
    }

    // If we have comments but they're not showing, show them
    if (postComments.length > 0 && !showComments) {
      setShowComments(true)
      return
    }

    // Otherwise follow normal flow
    if (!hasCommented && !alwaysShowComments) {
      setShowCommentPrompt(true)
    } else {
      setShowComments(!showComments)
    }
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <Avatar>
              <img src={`/abstract-geometric-shapes.png?height=40&width=40&query=${username} profile`} alt={username} />
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{username}</span>
                {verified && <CheckCircle className="h-4 w-4 fill-primary text-white" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{handle}</span>
                <span className="text-xs text-muted-foreground">· {timeAgo}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isPremium && !unlocked ? (
            <div className="bg-muted rounded-md p-4 text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="font-medium">Premium Content</span>
              </div>
              <p className="text-sm text-muted-foreground">Unlock this premium content for {premiumPrice} USDC</p>
              <Button size="sm" onClick={() => setShowPremiumDialog(true)}>
                <DollarSign className="h-4 w-4 mr-1" />
                Unlock with USDC
              </Button>
            </div>
          ) : (
            <>
              <p className="whitespace-pre-wrap">{content}</p>
              {image && (
                <div className="mt-3">
                  <img
                    src={image || "/placeholder.svg"}
                    alt="Post attachment"
                    className="rounded-md max-h-[400px] w-auto"
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4 flex-col items-stretch">
          <div className="flex justify-between w-full">
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className={`gap-1 ${liked ? "text-primary" : ""}`} onClick={handleLike}>
                <ArrowUp className={`h-4 w-4 ${liked ? "fill-primary" : ""}`} />
                <span>{likeCount}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1 ${disliked ? "text-destructive" : ""}`}
                onClick={handleDislike}
              >
                <ArrowDown className={`h-4 w-4 ${disliked ? "fill-destructive" : ""}`} />
                <span>{dislikeCount}</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" onClick={handleViewComments}>
              <MessageSquare className="h-4 w-4" />
              <span>{commentCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-1" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
              <span>{shareCount}</span>
            </Button>
            <div className="flex items-center gap-2">
              {isPremium && (
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  <DollarSign className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
              <Badge variant="outline" className="text-green-600">
                +0.1 USDC
              </Badge>
            </div>
          </div>

          {(showComments || alwaysShowComments) && (
            <div className="mt-4 w-full">
              <Separator className="mb-3" />
              <CommentForm
                postId={postId}
                onCommentSubmit={handleCommentSubmit}
                replyingTo={replyingTo}
                onCancelReply={handleCancelReply}
              />

              <div className="mt-3 space-y-1">
                {postComments.length > 0 ? (
                  postComments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} onReply={handleReply} />
                  ))
                ) : (
                  <div className="text-center py-4 text-sm text-muted-foreground">
                    No comments yet. Be the first to comment!
                  </div>
                )}
              </div>
            </div>
          )}
        </CardFooter>
      </Card>

      <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlock Premium Content</DialogTitle>
            <DialogDescription>Pay with USDC to access this premium content from {username}.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span>Content price</span>
              <span className="font-medium">{premiumPrice} USDC</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Network fee</span>
              <span>~0.000005 SOL</span>
            </div>
            <div className="bg-muted p-3 rounded-md">
              <div className="flex justify-between items-center font-medium">
                <span>Total</span>
                <span>{premiumPrice} USDC</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPremiumDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUnlockContent}>
              <DollarSign className="h-4 w-4 mr-1" />
              Pay with USDC
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showCommentPrompt} onOpenChange={setShowCommentPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join the conversation</DialogTitle>
            <DialogDescription>Share your thoughts to see what others are saying about this post</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <CommentForm postId={postId} onCommentSubmit={handleCommentSubmit} inDialog={true} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCommentPrompt(false)}>
              Maybe later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        postId={postId}
        postContent={content}
      />
    </>
  )
}
