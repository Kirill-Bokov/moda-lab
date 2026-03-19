import { useState, useCallback, useMemo, useRef, useEffect } from "react"
import {
  AnimationStateContext,
  AnimationActionsContext,
} from "./animationContext"

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [animateFavorite, setAnimateFavorite] = useState(false)
  const [animateCart, setAnimateCart] = useState(false)

  const favoriteTimeoutRef = useRef<number | null>(null)
  const cartTimeoutRef = useRef<number | null>(null)

  const triggerFavorite = useCallback(() => {
    setAnimateFavorite(false)
    requestAnimationFrame(() => {
      setAnimateFavorite(true)
    })

    if (favoriteTimeoutRef.current) {
      clearTimeout(favoriteTimeoutRef.current)
    }

    favoriteTimeoutRef.current = window.setTimeout(() => {
      setAnimateFavorite(false)
      favoriteTimeoutRef.current = null
    }, 600)
  }, [])

  const triggerCart = useCallback(() => {
    setAnimateCart(false)
    requestAnimationFrame(() => {
      setAnimateCart(true)
    })

    if (cartTimeoutRef.current) {
      clearTimeout(cartTimeoutRef.current)
    }

    cartTimeoutRef.current = window.setTimeout(() => {
      setAnimateCart(false)
      cartTimeoutRef.current = null
    }, 600)
  }, [])

  useEffect(() => {
    return () => {
      if (favoriteTimeoutRef.current) clearTimeout(favoriteTimeoutRef.current)
      if (cartTimeoutRef.current) clearTimeout(cartTimeoutRef.current)
    }
  }, [])

  const stateValue = useMemo(
    () => ({ animateFavorite, animateCart }),
    [animateFavorite, animateCart]
  )

  const actionsValue = useMemo(
    () => ({ triggerFavorite, triggerCart }),
    [triggerFavorite, triggerCart]
  )

  return (
    <AnimationStateContext.Provider value={stateValue}>
      <AnimationActionsContext.Provider value={actionsValue}>
        {children}
      </AnimationActionsContext.Provider>
    </AnimationStateContext.Provider>
  )
}
