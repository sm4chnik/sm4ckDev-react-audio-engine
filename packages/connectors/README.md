# @sm4ckdev/audio-connectors

Event source adapters for [react-audio-engine](https://github.com/sm4ckDev/react-audio-engine).

Connect any event source to `useAudioEvents()`: game engines, WebSockets, SSE, or custom.

## Install

```bash
pnpm add @sm4ckdev/audio-connectors
```

## Connectors

### EventEmitter (Phaser, mitt, Node.js events)

```ts
import { createEventEmitterConnector } from '@sm4ckdev/audio-connectors'

// Works with Phaser EventBus, mitt, Node.js EventEmitter, or any object with .on/.off
const connector = createEventEmitterConnector(EventBus, ['cast-spell', 'player-hit'])
```

### WebSocket

```ts
import { createWebSocketConnector } from '@sm4ckdev/audio-connectors'

// Expects JSON messages: { "type": "event-name", ...rest }
const connector = createWebSocketConnector(ws, {
  eventKey: 'type',                         // key holding the event name
  eventTypes: ['cast-spell', 'round-end'],  // optional allowlist
})
```

### Server-Sent Events

```ts
import { createSSEConnector } from '@sm4ckdev/audio-connectors'

// Named SSE event types
const connector = createSSEConnector('/api/game-events', {
  eventTypes: ['round-end', 'player-hit'],
})

// Or generic 'message' with JSON body: { "type": "round-end" }
const connector = createSSEConnector('/api/game-events', {
  dataKey: 'type',
})
```

### Custom (escape hatch)

```ts
import { createCustomConnector } from '@sm4ckdev/audio-connectors'

const connector = createCustomConnector((emit) => {
  const handler = (e: CustomEvent) => emit(e.detail.type, e.detail)
  window.addEventListener('game-event', handler as EventListener)
  return () => window.removeEventListener('game-event', handler as EventListener)
})
```

## The `AudioEventConnector` interface

All connectors implement this interface. Implement it to create your own:

```ts
interface AudioEventConnector {
  connect(emit: (event: string, payload?: unknown) => void): () => void
}
```
