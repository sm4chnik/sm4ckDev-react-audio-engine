import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Howl } from 'howler'
import { AudioService } from '@sm4ckdev/audio-core'
import type { AudioConfig, AudioDefaults, SfxConfig } from './types'

export interface AudioStoreState {
  musicVolume: number
  interfaceVolume: number
  effectsVolume: number
  isMuted: boolean
  musicCache: Map<string, Howl>
  currentMusicHowl: Howl | null
  currentMusicTrack: string | null
  isInitialized: boolean

  initialize: () => void
  setMusicVolume: (v: number) => void
  setInterfaceVolume: (v: number) => void
  setEffectsVolume: (v: number) => void
  toggleMute: () => void
  setMuted: (muted: boolean) => void
  preloadMusic: (tracks: string[]) => void
  playMusic: (src: string) => void
  stopMusic: () => void
  pauseMusic: () => void
  resumeMusic: () => void
  playInterfaceSound: (src: string) => void
  playEffectsSound: (src: string) => void
  cleanup: () => void
}

const DEFAULT_VOLUMES: AudioDefaults = {
  musicVolume: 50,
  interfaceVolume: 70,
  effectsVolume: 80,
  isMuted: false,
}

export function createAudioStore<
  TTracks extends Record<string, string>,
  TSfx extends Partial<SfxConfig>,
>(config: AudioConfig<TTracks, TSfx>) {
  const storageKey = config.storageKey ?? 'react-audio-engine/audio-store'
  const defaults = { ...DEFAULT_VOLUMES, ...config.defaults }
  const service = new AudioService()

  return create<AudioStoreState>()(
    persist(
      (set, get) => {
        if (typeof window !== 'undefined') {
          window.addEventListener('beforeunload', () => get().cleanup())
        }

        return {
          musicVolume: defaults.musicVolume,
          interfaceVolume: defaults.interfaceVolume,
          effectsVolume: defaults.effectsVolume,
          isMuted: defaults.isMuted,
          musicCache: new Map(),
          currentMusicHowl: null,
          currentMusicTrack: null,
          isInitialized: false,

          initialize() {
            const { musicVolume, interfaceVolume, effectsVolume, isMuted } = get()
            service.setMusicVolume(musicVolume)
            service.setVolume('interface', interfaceVolume)
            service.setVolume('effects', effectsVolume)
            service.setMuted(isMuted)
            set({ isInitialized: true })
          },

          setMusicVolume(volume) {
            const v = clamp(volume)
            get().musicCache.forEach((howl) => howl.volume(v / 100))
            service.setMusicVolume(v)
            set({ musicVolume: v })
          },

          setInterfaceVolume(volume) {
            const v = clamp(volume)
            service.setVolume('interface', v)
            set({ interfaceVolume: v })
          },

          setEffectsVolume(volume) {
            const v = clamp(volume)
            service.setVolume('effects', v)
            set({ effectsVolume: v })
          },

          toggleMute() {
            const next = !get().isMuted
            service.setMuted(next)
            set({ isMuted: next })
          },

          setMuted(muted) {
            service.setMuted(muted)
            set({ isMuted: muted })
          },

          preloadMusic(tracks) {
            if (!get().isInitialized) get().initialize()
            const { musicCache, musicVolume } = get()
            let changed = false
            tracks.forEach((src) => {
              if (!musicCache.has(src)) {
                const howl = service.createMusicHowl(src)
                howl.volume(musicVolume / 100)
                musicCache.set(src, howl)
                changed = true
              }
            })
            if (changed) set({ musicCache: new Map(musicCache) })
          },

          playMusic(src) {
            const state = get()
            if (state.currentMusicTrack === src) return
            if (!state.isInitialized) get().initialize()

            const { musicCache, musicVolume, isMuted } = get()
            let howl = musicCache.get(src)
            if (!howl) {
              howl = service.createMusicHowl(src)
              musicCache.set(src, howl)
              set({ musicCache: new Map(musicCache) })
            }

            if (state.currentMusicHowl && state.currentMusicHowl !== howl) {
              state.currentMusicHowl.stop()
            }
            if (howl.playing()) howl.stop()

            howl.volume(isMuted ? 0 : musicVolume / 100)
            howl.play()
            set({ currentMusicHowl: howl, currentMusicTrack: src })
          },

          stopMusic() {
            get().currentMusicHowl?.stop()
            set({ currentMusicHowl: null, currentMusicTrack: null })
          },

          pauseMusic() {
            get().currentMusicHowl?.pause()
          },

          resumeMusic() {
            get().currentMusicHowl?.play()
          },

          playInterfaceSound(src) {
            if (!get().isInitialized) get().initialize()
            service.playSound('interface', src)
          },

          playEffectsSound(src) {
            if (!get().isInitialized) get().initialize()
            service.playSound('effects', src)
          },

          cleanup() {
            const { musicCache, currentMusicHowl } = get()
            currentMusicHowl?.stop()
            musicCache.forEach((h) => h.unload())
            service.cleanup()
            set({ musicCache: new Map(), currentMusicHowl: null, currentMusicTrack: null })
          },
        }
      },
      {
        name: storageKey,
        storage: createJSONStorage(() => localStorage),
        partialize: (s) => ({
          musicVolume: s.musicVolume,
          interfaceVolume: s.interfaceVolume,
          effectsVolume: s.effectsVolume,
          isMuted: s.isMuted,
        }),
      }
    )
  )
}

function clamp(v: number): number {
  return Math.max(0, Math.min(100, v))
}
