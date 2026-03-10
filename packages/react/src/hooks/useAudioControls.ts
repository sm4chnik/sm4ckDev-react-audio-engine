import type { StoreApi, UseBoundStore } from 'zustand'
import type { AudioStoreState } from '../createStore'

/**
 * Returns all volume controls and mute state.
 * Use this to build your own audio settings UI.
 *
 * @example
 * const { musicVolume, setMusicVolume, isMuted, toggleMute } = useAudioControls()
 */
export function makeUseAudioControls(
  useStore: UseBoundStore<StoreApi<AudioStoreState>>
) {
  return function useAudioControls() {
    const musicVolume = useStore((s) => s.musicVolume)
    const interfaceVolume = useStore((s) => s.interfaceVolume)
    const effectsVolume = useStore((s) => s.effectsVolume)
    const isMuted = useStore((s) => s.isMuted)
    const setMusicVolume = useStore((s) => s.setMusicVolume)
    const setInterfaceVolume = useStore((s) => s.setInterfaceVolume)
    const setEffectsVolume = useStore((s) => s.setEffectsVolume)
    const toggleMute = useStore((s) => s.toggleMute)
    const setMuted = useStore((s) => s.setMuted)

    return {
      musicVolume,
      interfaceVolume,
      effectsVolume,
      isMuted,
      setMusicVolume,
      setInterfaceVolume,
      setEffectsVolume,
      toggleMute,
      setMuted,
    }
  }
}
