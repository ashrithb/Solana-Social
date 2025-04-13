"use client"

import { Avatar } from "@/components/ui/avatar"
import { ArrowDown, ArrowUp, Reply } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface CommentData {
  id: string
  username: string
  handle: string
  content: string
  timeAgo: string
  likes: number
  dislikes?: number
  userAvatar?: string
  verified?: boolean
  replies?: CommentData[]
}

interface CommentItemProps {
  comment: CommentData
  isReply?: boolean
  onReply?: (commentId: string) => void
}

export default function CommentItem({ comment, isReply = false, onReply }: CommentItemProps) {
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [likeCount, setLikeCount] = useState(comment.likes)
  const [dislikeCount, setDislikeCount] = useState(comment.dislikes || 0)

  // Ensure upvote/downvote functionality works properly
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

  const handleReplyClick = () => {
    if (onReply) {
      onReply(comment.id)
    }
  }

  return (
    <div className={`flex gap-3 py-3 ${isReply ? "ml-8 border-l-2 border-muted pl-4" : ""}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <img
          src={comment.userAvatar || `/placeholder.svg?height=32&width=32&query=${comment.username} profile`}
          alt={comment.username}
        />
      </Avatar>
      <div className="flex-1">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center gap-1 mb-1">
            <span className="font-medium text-sm">{comment.username}</span>
            {comment.verified && <CheckCircle className="h-3 w-3 fill-primary text-white" />}
            <span className="text-xs text-muted-foreground">{comment.handle}</span>
            <span className="text-xs text-muted-foreground ml-auto">{comment.timeAgo}</span>
          </div>
          <p className="text-sm">{comment.content}</p>
        </div>
        <div className="flex items-center gap-4 mt-2 pl-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 px-2 ${liked ? "text-primary" : "text-muted-foreground"}`}
                  onClick={handleLike}
                >
                  <ArrowUp className={`h-4 w-4 ${liked ? "fill-primary" : ""}`} />
                  <span className="ml-1 text-xs">{likeCount}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Upvote</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 px-2 ${disliked ? "text-destructive" : "text-muted-foreground"}`}
                  onClick={handleDislike}
                >
                  <ArrowDown className={`h-4 w-4 ${disliked ? "fill-destructive" : ""}`} />
                  <span className="ml-1 text-xs">{dislikeCount}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Downvote</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {!isReply && onReply && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-muted-foreground"
                    onClick={handleReplyClick}
                  >
                    <Reply className="h-4 w-4" />
                    <span className="ml-1 text-xs">Reply</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reply to this comment</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} isReply={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
