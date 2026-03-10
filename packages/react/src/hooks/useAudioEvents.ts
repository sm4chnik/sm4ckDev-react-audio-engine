import { useEffect } from 'react'
import type { StoreApi, UseBoundStore } from 'zustand'
import type { AudioStoreState } from '../createStore'
import type { AudioEventConnector } from '@sm4ckdev/audio-connectors'

/**
 * Subscribes to an event source via a connector and plays sounds based on an event map.
 *
 * The connector is responsible for connecting/disconnecting.
 * The eventMap maps event names to sound file paths (effects category).
 *
 * @example
 * useAudioEvents(
 *   createEventEmitterConnector(EventBus, ['cast-spell']),
 *   { 'cast-spell': '/sfx/cast.mp3' }
 * )
 */
export function makeUseAudioEvents(
  useStore: UseBoundStore<StoreApi<AudioStoreState>>
) {
  return function useAudioEvents(
    connector: AudioEventConnector,
    eventMap: Record<string, string>
  ) {
    const playEffectsSound = useStore((s) => s.playEffectsSound)

    useEffect(() => {
      const cleanup = connector.connect((event, _payload) => {
        const src = eventMap[event]
        if (src) playEffectsSound(src)
      })
      return cleanup
      // connector and eventMap are intentionally not in deps —
      // they should be stable references (created outside render or memoized)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playEffectsSound])
  }
}
