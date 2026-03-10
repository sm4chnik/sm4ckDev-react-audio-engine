# @sm4ckdev/audio-core

Pure TypeScript audio service for games and applications, built on [Howler.js](https://howlerjs.com/).

Framework-agnostic — no React dependency. Used internally by `@sm4ckdev/audio-react`.

## Install

```bash
pnpm add @sm4ckdev/audio-core howler
```

## Usage

```ts
import { AudioService } from '@sm4ckdev/audio-core'

const service = new AudioService({
  initialVolumes: { music: 50, interface: 70, effects: 80 }
})

// Music (Howl instance owned by caller)
const howl = service.createMusicHowl('/audio/main-theme.mp3')
howl.play()

// SFX by category
service.playSound('interface', '/audio/sfx/hover.mp3')
service.playSound('effects', '/audio/sfx/explosion.mp3')

// Volume per category (0–100)
service.setVolume('interface', 50)

// Global mute
service.setMuted(true)

// Cleanup
service.cleanup('effects')  // one category
service.cleanup()           // all
```

## API

### `new AudioService(options?)`

| Option | Type | Description |
|--------|------|-------------|
| `initialVolumes` | `Record<string, number>` | Initial volume per category (0–100) |

### Methods

| Method | Description |
|--------|-------------|
| `createMusicHowl(src)` | Creates a looping `Howl` instance for background music |
| `playSound(category, src)` | Plays a sound in the given category (cached) |
| `setVolume(category, volume)` | Sets volume for a category and updates cached Howls |
| `getVolume(category)` | Returns current volume for a category |
| `setMusicVolume(volume)` | Shortcut for `setVolume('music', volume)` |
| `setMuted(muted)` | Global mute via `Howler.mute()` |
| `cleanup(category?)` | Unloads and clears Howl cache (all or per category) |
