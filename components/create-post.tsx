"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Paperclip, Smile, Sparkles, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { generateRandomComments, generateRandomId } from "@/utils/comment-utils"

interface CreatePostProps {
  onPostCreated: (post: any) => void
  userAvatar?: string
}

export default function CreatePost({ onPostCreated, userAvatar = "/abstract-user-icon.png" }: CreatePostProps) {
  const [postContent, setPostContent] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [attachedImage, setAttachedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Add this function near the top of the component, after the useState declarations
  const preventSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const handleInputFocus = () => {
    setIsExpanded(true)
  }

  const handleCancel = () => {
    setIsExpanded(false)
    setPostContent("")
    setAttachedImage(null)
  }

  const handleImageAttach = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file)
      setAttachedImage(imageUrl)
    }
  }

  const handleRemoveImage = () => {
    setAttachedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const generateAIPost = async () => {
    setIsSubmitting(true)
    // Simulate AI generating a post
    setTimeout(() => {
      const aiSuggestions = [
        "Just explored the potential of stablecoins in DeFi applications. The liquidity benefits are impressive! What's your experience with stablecoins in DeFi? #Crypto #Stablecoins",
        "Comparing transaction speeds: Solana vs other blockchains. The results might surprise you! #Solana #Blockchain #Performance",
        "How stablecoins are changing the way we think about cross-border payments. Thread 🧵 #Stablecoins #Payments #GlobalFinance",
      ]
      const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)]
      setPostContent(randomSuggestion)
      setIsSubmitting(false)
      setIsExpanded(true)
    }, 1000)
  }

  const handleSubmitPost = () => {
    console.log("Submit post button clicked", { postContent, attachedImage })

    // Only validate if there's no content AND no image
    if (!postContent.trim() && !attachedImage) {
      toast({
        title: "Post cannot be empty",
        description: "Please write something or attach an image.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Generate a unique post ID
    const postId = `post-${generateRandomId(10)}`

    // Generate random number of comments (0-3 for simplicity)
    const randomCommentCount = Math.floor(Math.random() * 4)
    console.log(`Generating ${randomCommentCount} fake comments for new post ${postId}`)
    const fakeComments = randomCommentCount > 0 ? generateRandomComments(randomCommentCount, postId) : []

    // Create a new post object
    const newPost = {
      id: postId,
      username: "username",
      handle: "@username",
      content: postContent,
      timeAgo: "Just now",
      likes: 0,
      dislikes: 0,
      comments: fakeComments.length,
      shares: 0,
      verified: true,
      isPremium: false,
      image: attachedImage,
      commentsList: fakeComments,
    }

    console.log("Creating new post:", newPost)

    // Simulate network request with shorter timeout for better UX
    setTimeout(() => {
      onPostCreated(newPost)
      setPostContent("")
      setAttachedImage(null)
      setIsExpanded(false)
      setIsSubmitting(false)

      toast({
        title: "Post created!",
        description: "Your post has been published to your feed.",
      })
    }, 300)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={preventSubmit}>
          <div className="flex gap-4">
            <Avatar>
              <img src={userAvatar || "/placeholder.svg"} alt="User profile" />
            </Avatar>
            <div className="flex-1">
              {isExpanded ? (
                <Textarea
                  placeholder="What's on your mind?"
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="mb-2 min-h-[100px]"
                  autoFocus
                />
              ) : (
                <Input placeholder="What's on your mind?" onFocus={handleInputFocus} className="mb-2" />
              )}

              {attachedImage && (
                <div className="relative mb-2">
                  <img
                    src={attachedImage || "/placeholder.svg"}
                    alt="Attached"
                    className="rounded-md max-h-[200px] w-auto"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

              <div className="flex justify-between">
                {isExpanded ? (
                  <>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleImageAttach}>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Image
                      </Button>
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4 mr-2" />
                        Attach
                      </Button>
                      <Button variant="outline" size="sm">
                        <Smile className="h-4 w-4 mr-2" />
                        Emoji
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSubmitPost} disabled={isSubmitting}>
                        {isSubmitting ? "Posting..." : "Post"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" onClick={generateAIPost} disabled={isSubmitting}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      AI Generate
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault() // Prevent default form submission behavior
                        // If there's already content, submit directly
                        if (postContent.trim() || attachedImage) {
                          handleSubmitPost()
                        } else {
                          // Otherwise just expand the form
                          handleInputFocus()
                        }
                      }}
                    >
                      Post
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
