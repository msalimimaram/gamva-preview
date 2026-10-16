export type Role = "student" | "coach" | "seller"

export type Screen = "splash" | "onboarding" | "auth" | "dashboard" | "social" | "content" | "explore" | "coaching" | "insights" | "profile" | "product" | "cart" | "comparison" | "report" | "loyalty"

export interface Product {
  id: string
  name: string
  brand: string
  price: number
  compareAtPrice?: number
  category: "Supplements" | "Equipment" | "Recovery"
  image: string
  imageAlt: string
  options: string[]
  description: string
  highlights: string[]
  specs: Record<string, string>
  demoRating?: number
  demoReviews?: number
  tag?: string
}

export interface CartItem {
  productId: string
  quantity: number
  option: string
}

export interface LoyaltyState {
  points: number
  completedSessions: number
  referrals: number
}
