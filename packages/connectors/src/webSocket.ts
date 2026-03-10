import type { AudioEventConnector, AudioEventEmitter } from './types'

export interface WebSocketConnectorOptions {
  /**
   * Key in the parsed message object that holds the event name.
   * @default "type"
   */
  eventKey?: string
  /**
   * Optional filter: only forward messages whose eventKey value is in this list.
   */
  eventTypes?: string[]
}

/**
 * Minimal WebSocket-like interface.
 * Compatible with native WebSocket and socket.io Socket.
 */
export interface WebSocketLike {
  addEventListener(event: 'message', listener: (e: { data: string }) => void): void
  removeEventListener(event: 'message', listener: (e: { data: string }) => void): void
}

/**
 * Creates a connector that listens to WebSocket messages and emits them as audio events.
 *
 * Expects JSON messages: `{ "type": "cast-spell", ... }`
 *
 * @example
 * createWebSocketConnector(ws, { eventKey: 'type', eventTypes: ['cast-spell'] })
 */
export function createWebSocketConnector(
  socket: WebSocketLike,
  options: WebSocketConnectorOptions = {}
): AudioEventConnector {
  const { eventKey = 'type', eventTypes } = options

  return {
    connect(emit: AudioEventEmitter) {
      const handler = (e: { data: string }) => {
        try {
          const msg = JSON.parse(e.data) as Record<string, unknown>
          const eventName = msg[eventKey]
          if (typeof eventName !== 'string') return
          if (eventTypes && !eventTypes.includes(eventName)) return
          emit(eventName, msg)
        } catch {
          // ignore non-JSON messages
        }
      }

      socket.addEventListener('message', handler)
      return () => socket.removeEventListener('message', handler)
    },
  }
}
