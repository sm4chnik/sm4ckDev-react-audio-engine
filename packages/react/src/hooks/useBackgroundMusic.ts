import { useCallback } from 'react'
import type { StoreApi, UseBoundStore } from 'zustand'
import type { AudioStoreState } from '../createStore'

/**
 * Returns typed playTrack / stopMusic / pauseMusic / resumeMusic.
 * Track keys are inferred from the config passed to createAudio().
 *
 * @example
 * const { playTrack, stopMusic } = useBackgroundMusic()
 * playTrack('main')    // ✓ type-safe
 * playTrack('battle')  // ✓
 * playTrack('foo')     // ✗ TypeScript error
 */
export function makeUseBackgroundMusic<TTracks extends Record<string, string>>(
  useStore: UseBoundStore<StoreApi<AudioStoreState>>,
  tracks: TTracks
) {
  return function useBackgroundMusic() {
    const playMusic = useStore((s) => s.playMusic)
    const stopMusic = useStore((s) => s.stopMusic)
    const pauseMusic = useStore((s) => s.pauseMusic)
    const resumeMusic = useStore((s) => s.resumeMusic)

    const playTrack = useCallback(
      (key: keyof TTracks) => {
        const src = tracks[key]
        if (src) playMusic(src)
      },
      [playMusic]
    )

    return { playTrack, stopMusic, pauseMusic, resumeMusic }
  }
}
