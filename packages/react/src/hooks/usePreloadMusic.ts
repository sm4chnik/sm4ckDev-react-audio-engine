import { useCallback } from 'react'
import type { StoreApi, UseBoundStore } from 'zustand'
import type { AudioStoreState } from '../createStore'

/**
 * Returns a function that preloads all tracks defined in the config.
 * Call it once on app mount to avoid playback delay.
 *
 * @example
 * const preload = usePreloadMusic()
 * useEffect(() => { preload() }, [preload])
 */
export function makeUsePreloadMusic<TTracks extends Record<string, string>>(
  useStore: UseBoundStore<StoreApi<AudioStoreState>>,
  tracks: TTracks
) {
  return function usePreloadMusic() {
    const preloadMusic = useStore((s) => s.preloadMusic)

    return useCallback(() => {
      preloadMusic(Object.values(tracks))
    }, [preloadMusic])
  }
}
