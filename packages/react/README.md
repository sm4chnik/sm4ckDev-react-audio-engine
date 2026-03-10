# @sm4ckdev/audio-react

React hooks and Zustand store for [react-audio-engine](https://github.com/sm4ckDev/react-audio-engine).

Configure once with `createAudio()`, get fully typed hooks — bring your own UI.

## Install

```bash
pnpm add @sm4ckdev/audio-react @sm4ckdev/audio-connectors howler zustand
```

## Setup

Create an `audio.ts` file in your project and configure once:

```ts
// src/audio.ts
import { createAudio } from '@sm4ckdev/audio-react'

export const audio = createAudio({
  tracks: {
    main:   '/audio/music/main.mp3',
    battle: '/audio/music/battle.mp3',
  },
  sfx: {
    hover:      '/audio/sfx/hover.mp3',
    click:      '/audio/sfx/click.mp3',
    modalOpen:  '/audio/sfx/modal-open.mp3',
    modalClose: '/audio/sfx/modal-close.mp3',
  },
  storageKey: 'my-game/audio',   // localStorage key for persisting volumes
  defaults: {
    musicVolume: 50,             // 0–100
    interfaceVolume: 70,
    effectsVolume: 80,
    isMuted: false,
  },
})
```

## Hooks

### `useAudioControls()`

All volume and mute controls. Use this to build your own audio settings UI.

```ts
const {
  musicVolume,        // number 0–100
  interfaceVolume,
  effectsVolume,
  isMuted,
  setMusicVolume,     // (v: number) => void
  setInterfaceVolume,
  setEffectsVolume,
  toggleMute,
  setMuted,
} = audio.useAudioControls()
```

### `useBackgroundMusic()`

Play, stop, pause, resume. Track keys are inferred from your config — TypeScript will error on unknown keys.

```ts
const { playTrack, stopMusic, pauseMusic, resumeMusic } = audio.useBackgroundMusic()

playTrack('main')    // ✓
playTrack('battle')  // ✓
playTrack('foo')     // ✗ TypeScript error
```

### `usePreloadMusic()`

Preload all tracks to avoid first-play delay. Call on app mount.

```ts
const preload = audio.usePreloadMusic()
useEffect(() => { preload() }, [preload])
```

### `useHoverSound()` / `useClickSound()`

```ts
const onHover = audio.useHoverSound()
const onClick = audio.useClickSound()

<button onMouseEnter={onHover} onClick={onClick}>...</button>
```

### `useModalSound()`

Automatically plays open/close sounds on mount/unmount.

```ts
function MyModal() {
  audio.useModalSound()
  return <div>...</div>
}
```

### `useAudioEvents(connector, eventMap)`

Connects any event source to audio playback. See `@sm4ckdev/audio-connectors` for available connectors.

```ts
import { createEventEmitterConnector } from '@sm4ckdev/audio-connectors'

function GameComponent() {
  audio.useAudioEvents(
    createEventEmitterConnector(EventBus, ['cast-spell', 'player-hit']),
    {
      'cast-spell': '/audio/sfx/cast.mp3',
      'player-hit': '/audio/sfx/hit.mp3',
    }
  )
}
```

## Volume persistence

Volume settings are automatically persisted to `localStorage` under the `storageKey` you provide. Runtime state (which track is playing, Howl instances) is never persisted.
