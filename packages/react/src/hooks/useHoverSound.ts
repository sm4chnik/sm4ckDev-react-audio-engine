import { useCallback } from 'react'
import type { StoreApi, UseBoundStore } from 'zustand'
import type { AudioStoreState } from '../createStore'
import type { SfxConfig } from '../types'

/**
 * Returns a callback that plays the hover sound (sfx.hover from config).
 * Returns a no-op if sfx.hover is not configured.
 *
 * @example
 * const onHover = useHoverSound()
 * <button onMouseEnter={onHover}>...</button>
 */
export function makeUseHoverSound<TSfx extends Partial<SfxConfig>>(
  useStore: UseBoundStore<StoreApi<AudioStoreState>>,
  sfx: TSfx
) {
  return function useHoverSound() {
    const playInterfaceSound = useStore((s) => s.playInterfaceSound)

    return useCallback(() => {
      if (sfx.hover) playInterfaceSound(sfx.hover)
    }, [playInterfaceSound])
  }
}
