import { createContext, useContext } from "react"

export const AnimationStateContext = createContext<{
  animateFavorite: boolean
  animateCart: boolean
} | null>(null)

export const AnimationActionsContext = createContext<{
  triggerFavorite: () => void
  triggerCart: () => void
} | null>(null)

export function useAnimationState() {
  const ctx = useContext(AnimationStateContext)
  if (!ctx) throw new Error("useAnimationState must be used within AnimationProvider")
  return ctx
}

export function useAnimationActions() {
  const ctx = useContext(AnimationActionsContext)
  if (!ctx) throw new Error("useAnimationActions must be used within AnimationProvider")
  return ctx
}
