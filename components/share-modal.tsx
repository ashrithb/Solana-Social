"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Check, Copy, Facebook, Link, Linkedin, Twitter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  postId: string
  postContent: string
}

export default function ShareModal({ isOpen, onClose, postId, postContent }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const shareUrl = `https://solanasocial.com/post/${postId}`
  const shareText = postContent.length > 100 ? `${postContent.substring(0, 97)}...` : postContent

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)

    toast({
      title: "Link copied!",
      description: "Post link has been copied to clipboard.",
    })
  }

  const handleShare = (platform: string) => {
    let shareLink = ""

    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
        break
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
      default:
        return
    }

    window.open(shareLink, "_blank")

    toast({
      title: `Shared on ${platform}!`,
      description: "Your post has been shared successfully.",
    })

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
          <DialogDescription>Share this post with your network or copy the link</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 mt-2">
          <div className="grid flex-1 gap-2">
            <Input value={shareUrl} readOnly className="pr-12" />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={handleCopyLink}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy</span>
          </Button>
        </div>

        <div className="flex justify-center gap-4 py-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-blue-50 border-blue-200 hover:bg-blue-100"
            onClick={() => handleShare("twitter")}
          >
            <Twitter className="h-5 w-5 text-blue-500" />
            <span className="sr-only">Share on Twitter</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-blue-50 border-blue-200 hover:bg-blue-100"
            onClick={() => handleShare("facebook")}
          >
            <Facebook className="h-5 w-5 text-blue-600" />
            <span className="sr-only">Share on Facebook</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 bg-blue-50 border-blue-200 hover:bg-blue-100"
            onClick={() => handleShare("linkedin")}
          >
            <Linkedin className="h-5 w-5 text-blue-700" />
            <span className="sr-only">Share on LinkedIn</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={handleCopyLink}>
            <Link className="h-5 w-5" />
            <span className="sr-only">Copy Link</span>
          </Button>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
