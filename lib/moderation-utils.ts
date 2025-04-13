// Store moderation history in localStorage
export interface ModerationActivity {
  id: string
  type: "content_review" | "fact_checking" | "quality_curation"
  timestamp: number
  decision: string
  accuracy: boolean
  reward: number
}

// Get moderation history from localStorage
export const getModerationHistory = (): ModerationActivity[] => {
  if (typeof window === "undefined") return []

  try {
    const moderationData = JSON.parse(localStorage.getItem("moderationData") || "{}")
    return moderationData.activities || []
  } catch (error) {
    console.error("Error getting moderation history:", error)
    return []
  }
}

// Update the addModerationActivity function to track weekly rewards
export function addModerationActivity(activity: any) {
  if (typeof window === "undefined") return false

  try {
    const moderationData = JSON.parse(localStorage.getItem("moderationData") || "{}")

    // Initialize activities array if it doesn't exist
    if (!moderationData.activities) {
      moderationData.activities = []
    }

    // Add the new activity
    moderationData.activities.unshift(activity)

    // Update weekly rewards
    if (!moderationData.weeklyRewards) {
      moderationData.weeklyRewards = 0
    }
    moderationData.weeklyRewards += activity.reward

    // Save back to localStorage
    localStorage.setItem("moderationData", JSON.stringify(moderationData))

    return true
  } catch (error) {
    console.error("Error adding moderation activity:", error)
    return false
  }
}

// Calculate moderation stats
export function calculateModerationStats() {
  if (typeof window === "undefined") {
    return {
      totalReviews: 0,
      accuracyRate: 0,
      totalEarned: 0,
      thisWeek: 0,
      thisMonth: 0,
    }
  }

  try {
    const moderationData = JSON.parse(localStorage.getItem("moderationData") || "{}")
    const activities = moderationData.activities || []

    // Get total reviews
    const totalReviews = activities.length

    // Calculate accuracy rate
    const accurateReviews = activities.filter((activity: any) => activity.accuracy).length
    const accuracyRate = totalReviews > 0 ? (accurateReviews / totalReviews) * 100 : 0

    // Calculate total earned
    const totalEarned = activities.reduce((sum: number, activity: any) => sum + activity.reward, 0)

    // Get weekly rewards (this should be 0 if already claimed)
    const weeklyRewards = moderationData.weeklyRewards || 0

    // Calculate monthly rewards
    const now = Date.now()
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
    const monthlyActivities = activities.filter((activity: any) => activity.timestamp >= thirtyDaysAgo)
    const thisMonth = monthlyActivities.reduce((sum: number, activity: any) => sum + activity.reward, 0)

    return {
      totalReviews,
      accuracyRate,
      totalEarned,
      thisWeek: weeklyRewards,
      thisMonth,
    }
  } catch (error) {
    console.error("Error calculating moderation stats:", error)
    return {
      totalReviews: 0,
      accuracyRate: 0,
      totalEarned: 0,
      thisWeek: 0,
      thisMonth: 0,
    }
  }
}

// Get type-specific stats
export const getTypeStats = (type: "content_review" | "fact_checking" | "quality_curation") => {
  if (typeof window === "undefined") {
    return {
      count: 0,
      accuracyRate: 0,
      earned: 0,
    }
  }

  try {
    const moderationData = JSON.parse(localStorage.getItem("moderationData") || "{}")
    const activities = moderationData.activities || []

    // Filter activities by type
    const typeActivities = activities.filter((item: ModerationActivity) => item.type === type)

    if (typeActivities.length === 0) {
      return {
        count: 0,
        accuracyRate: 0,
        earned: 0,
      }
    }

    // Calculate stats
    const accurateReviews = typeActivities.filter((item: ModerationActivity) => item.accuracy).length
    const count = typeActivities.length
    const accuracyRate = count > 0 ? (accurateReviews / count) * 100 : 0
    const earned = typeActivities.reduce((sum: number, item: ModerationActivity) => sum + item.reward, 0)

    return {
      count,
      accuracyRate,
      earned,
    }
  } catch (error) {
    console.error("Error calculating type stats:", error)
    return {
      count: 0,
      accuracyRate: 0,
      earned: 0,
    }
  }
}
