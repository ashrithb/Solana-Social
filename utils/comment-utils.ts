import type { CommentData } from "@/components/comment-item"

// Generate a random ID to ensure uniqueness
export const generateRandomId = (length: number): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  return result
}

// Sample user data for comments
export const users = [
  { username: "crypto_enthusiast", handle: "@crypto_eth", verified: true },
  { username: "defi_wizard", handle: "@defi_sol", verified: false },
  { username: "solana_dev", handle: "@sol_builder", verified: true },
  { username: "blockchain_guru", handle: "@block_guru", verified: false },
  { username: "nft_collector", handle: "@nft_whale", verified: true },
  { username: "stablecoin_fan", handle: "@stable_money", verified: false },
  { username: "web3_designer", handle: "@web3_ux", verified: true },
  { username: "token_trader", handle: "@token_pro", verified: false },
]

// Sample comment content with more diverse opinions
export const commentContents = [
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
]

// Generate random comments with replies
export const generateRandomComments = (count: number, postId: string): CommentData[] => {
  console.log(`Generating ${count} random comments for post ${postId}`)

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
          id: `reply-${postId}-${i}-${j}-${generateRandomId(5)}`,
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
      id: `comment-${postId}-${i}-${generateRandomId(5)}`,
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

  console.log(
    `Generated ${comments.length} comments with ${comments.reduce((acc, comment) => acc + (comment.replies?.length || 0), 0)} replies for post ${postId}`,
  )
  return comments
}
