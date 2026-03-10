# react-audio-engine

A framework-agnostic audio engine for React games and applications.

## Packages

| Package | Description |
|---------|-------------|
| [`@sm4ckdev/audio-core`](./packages/core) | Pure TypeScript audio service built on Howler.js |
| [`@sm4ckdev/audio-react`](./packages/react) | React hooks and Zustand store via `createAudio()` factory |
| [`@sm4ckdev/audio-connectors`](./packages/connectors) | Event source adapters (EventEmitter, WebSocket, SSE, Custom) |

## Quick start

```ts
// 1. Configure once
import { createAudio } from '@sm4ckdev/audio-react'

export const audio = createAudio({
  tracks: {
    main: '/audio/main-theme.mp3',
    battle: '/audio/battle.mp3',
  },
  sfx: {
    hover: '/audio/sfx/hover.mp3',
    click: '/audio/sfx/click.mp3',
    modalOpen: '/audio/sfx/modal-open.mp3',
    modalClose: '/audio/sfx/modal-close.mp3',
  },
  storageKey: 'my-game/audio',
})

// 2. Use hooks anywhere
import { audio } from './audio'

function MyComponent() {
  const { musicVolume, setMusicVolume, isMuted, toggleMute } = audio.useAudioControls()
  const { playTrack } = audio.useBackgroundMusic()
  // ...
}
```

## Connecting to event sources

```ts
import { createEventEmitterConnector } from '@sm4ckdev/audio-connectors'
import { audio } from './audio'

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

## Development

```bash
pnpm install
pnpm build
pnpm dev
```
