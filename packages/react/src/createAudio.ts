import type { SfxConfig } from './types'
import type { AudioConfig } from './types'
import { createAudioStore } from './createStore'
import { makeUseAudioControls } from './hooks/useAudioControls'
import { makeUseBackgroundMusic } from './hooks/useBackgroundMusic'
import { makeUsePreloadMusic } from './hooks/usePreloadMusic'
import { makeUseHoverSound } from './hooks/useHoverSound'
import { makeUseClickSound } from './hooks/useClickSound'
import { makeUseModalSound } from './hooks/useModalSound'
import { makeUseAudioEvents } from './hooks/useAudioEvents'

/**
 * Creates a fully configured audio system for your app.
 * Call this once (outside of any component) and export the returned hooks.
 *
 * @example
 * // audio.ts
 * import { createAudio } from '@sm4ckdev/audio-react'
 *
 * export const audio = createAudio({
 *   tracks: {
 *     main:   '/audio/music/main.mp3',
 *     battle: '/audio/music/battle.mp3',
 *   },
 *   sfx: {
 *     hover:      '/audio/sfx/hover.mp3',
 *     click:      '/audio/sfx/click.mp3',
 *     modalOpen:  '/audio/sfx/modal-open.mp3',
 *     modalClose: '/audio/sfx/modal-close.mp3',
 *   },
 *   storageKey: 'my-game/audio',
 * })
 *
 * // Anywhere in your app:
 * const { playTrack } = audio.useBackgroundMusic()
 * playTrack('main')
 */
export function createAudio<
  TTracks extends Record<string, string>,
  TSfx extends Partial<SfxConfig>,
>(config: AudioConfig<TTracks, TSfx>) {
  const useAudioStore = createAudioStore(config)

  return {
    /** Raw Zustand store — use sparingly, prefer the hooks below */
    useAudioStore,
    /** Volume sliders and mute controls — use to build your own audio settings UI */
    useAudioControls: makeUseAudioControls(useAudioStore),
    /** Play, stop, pause, resume music tracks defined in config */
    useBackgroundMusic: makeUseBackgroundMusic(useAudioStore, config.tracks),
    /** Preload all music tracks to avoid playback delays */
    usePreloadMusic: makeUsePreloadMusic(useAudioStore, config.tracks),
    /** Returns a callback that plays sfx.hover on call */
    useHoverSound: makeUseHoverSound(useAudioStore, config.sfx),
    /** Returns a callback that plays sfx.click on call */
    useClickSound: makeUseClickSound(useAudioStore, config.sfx),
    /** Plays sfx.modalOpen on mount, sfx.modalClose on unmount */
    useModalSound: makeUseModalSound(useAudioStore, config.sfx),
    /** Subscribe to any event source and play sounds based on an event map */
    useAudioEvents: makeUseAudioEvents(useAudioStore),
  }
}
