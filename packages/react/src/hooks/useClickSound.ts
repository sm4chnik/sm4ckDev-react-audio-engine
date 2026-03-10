import { useCallback } from 'react'
import type { StoreApi, UseBoundStore } from 'zustand'
import type { AudioStoreState } from '../createStore'
import type { SfxConfig } from '../types'

/**
 * Returns a callback that plays the click sound (sfx.click from config).
 * Returns a no-op if sfx.click is not configured.
 *
 * @example
 * const onClick = useClickSound()
 * <button onClick={onClick}>...</button>
 */
export function makeUseClickSound<TSfx extends Partial<SfxConfig>>(
  useStore: UseBoundStore<StoreApi<AudioStoreState>>,
  sfx: TSfx
) {
  return function useClickSound() {
    const playInterfaceSound = useStore((s) => s.playInterfaceSound)

    return useCallback(() => {
      if (sfx.click) playInterfaceSound(sfx.click)
    }, [playInterfaceSound])
  }
}
