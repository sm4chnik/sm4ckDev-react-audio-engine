import { useEffect } from 'react'
import type { StoreApi, UseBoundStore } from 'zustand'
import type { AudioStoreState } from '../createStore'
import type { SfxConfig } from '../types'

/**
 * Plays modal-open sound on mount and modal-close sound on unmount.
 * Drop this inside any modal component — no arguments needed.
 *
 * @example
 * function MyModal() {
 *   useModalSound()
 *   return <div>...</div>
 * }
 */
export function makeUseModalSound<TSfx extends Partial<SfxConfig>>(
  useStore: UseBoundStore<StoreApi<AudioStoreState>>,
  sfx: TSfx
) {
  return function useModalSound() {
    const playInterfaceSound = useStore((s) => s.playInterfaceSound)

    useEffect(() => {
      if (sfx.modalOpen) playInterfaceSound(sfx.modalOpen)
      return () => {
        if (sfx.modalClose) playInterfaceSound(sfx.modalClose)
      }
    }, [playInterfaceSound])
  }
}
