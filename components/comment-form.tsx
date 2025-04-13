"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Smile, X } from "lucide-react"
import type { CommentData } from "./comment-item"

// Generate a random ID to ensure uniqueness
const generateRandomId = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

interface CommentFormProps {
  postId: string
  onCommentSubmit: (comment: CommentData) => void
  userAvatar?: string
  replyingTo?: { id: string; username: string } | null
  onCancelReply?: () => void
  inDialog?: boolean
}

export default function CommentForm({
  postId,
  onCommentSubmit,
  userAvatar = "/abstract-user-icon.png",
  replyingTo = null,
  onCancelReply,
  inDialog = false,
}: CommentFormProps) {
  const [commentText, setCommentText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Focus the textarea when replying to a comment or when in dialog
  useEffect(() => {
    if ((replyingTo || inDialog) && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [replyingTo, inDialog])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!commentText.trim()) return

    setIsSubmitting(true)

    // Create new comment object with unique ID
    const newComment: CommentData = {
      id: `comment-${generateRandomId(10)}`,
      username: "username",
      handle: "@username",
      content: commentText,
      timeAgo: "Just now",
      likes: 0,
      dislikes: 0,
      userAvatar,
      verified: false,
    }

    // Simulate network request with shorter timeout for better UX
    setTimeout(() => {
      onCommentSubmit(newComment)
      setCommentText("")
      setIsSubmitting(false)
      if (replyingTo && onCancelReply) {
        onCancelReply()
      }
    }, 100)
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-3 ${inDialog ? "" : "pt-3"}`}>
      <Avatar className="h-8 w-8 flex-shrink-0">
        <img src={userAvatar || "/placeholder.svg"} alt="User profile" />
      </Avatar>
      <div className="flex-1 flex flex-col gap-2">
        {replyingTo && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-md">
            <span>Replying to {replyingTo.username}</span>
            {onCancelReply && (
              <Button type="button" variant="ghost" size="icon" className="h-5 w-5 ml-auto" onClick={onCancelReply}>
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            placeholder={replyingTo ? `Reply to ${replyingTo.username}...` : "Write a comment..."}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className={`min-h-[${inDialog ? "80px" : "40px"}] text-sm resize-none flex-1`}
          />
          <div className="flex flex-col gap-2">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
              <Smile className="h-4 w-4" />
            </Button>
            <Button type="submit" size="sm" className="h-8 px-3" disabled={!commentText.trim() || isSubmitting}>
              Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
