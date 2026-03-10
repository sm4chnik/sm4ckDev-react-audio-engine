import type { AudioEventConnector, AudioEventEmitter } from './types'

/**
 * Minimal interface that any EventEmitter-like object must satisfy.
 * Compatible with: Phaser EventEmitter, mitt, Node.js EventEmitter, etc.
 */
export interface EventEmitterLike {
  on(event: string, listener: (...args: unknown[]) => void): unknown
  off(event: string, listener: (...args: unknown[]) => void): unknown
}

/**
 * Creates a connector that listens to a set of events on any EventEmitter-like object.
 *
 * @param emitter - Phaser EventBus, mitt emitter, Node EventEmitter, etc.
 * @param events  - list of event names to forward
 *
 * @example
 * createEventEmitterConnector(EventBus, ['cast-spell', 'player-hit'])
 */
export function createEventEmitterConnector(
  emitter: EventEmitterLike,
  events: string[]
): AudioEventConnector {
  return {
    connect(emit: AudioEventEmitter) {
      const handlers = new Map<string, (...args: unknown[]) => void>()

      events.forEach((event) => {
        const handler = (...args: unknown[]) => emit(event, args[0])
        handlers.set(event, handler)
        emitter.on(event, handler)
      })

      return () => {
        handlers.forEach((handler, event) => emitter.off(event, handler))
        handlers.clear()
      }
    },
  }
}
