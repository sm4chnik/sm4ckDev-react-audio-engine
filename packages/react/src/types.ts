/**
 * Audio configuration passed to createAudio().
 *
 * Tracks  - keys become type-safe arguments to playTrack()
 * Sfx     - keys used by useHoverSound / useClickSound / useModalSound
 *
 * The sfx object has a fixed shape so the library knows which sounds
 * to play for built-in UI interactions. All keys are optional so you
 * can omit sounds you don't need.
 */
export interface AudioConfig<
  TTracks extends Record<string, string>,
  TSfx extends Partial<SfxConfig>,
> {
  tracks: TTracks
  sfx: TSfx
  /**
   * localStorage key for persisting volume/mute settings.
   * @default "react-audio-engine/audio-store"
   */
  storageKey?: string
  /**
   * Default volume values (0–100).
   */
  defaults?: Partial<AudioDefaults>
}

export interface SfxConfig {
  hover: string
  click: string
  modalOpen: string
  modalClose: string
  [key: string]: string
}

export interface AudioDefaults {
  musicVolume: number
  interfaceVolume: number
  effectsVolume: number
  isMuted: boolean
}

export interface AudioState {
  musicVolume: number
  interfaceVolume: number
  effectsVolume: number
  isMuted: boolean
}
