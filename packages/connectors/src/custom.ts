import type { AudioEventConnector, AudioEventEmitter } from './types'

/**
 * Creates a connector from any custom subscribe function.
 * The function receives `emit` and must return a cleanup/unsubscribe function.
 *
 * This is the escape hatch for any event source not covered by built-in connectors.
 *
 * @example
 * createCustomConnector((emit) => {
 *   const handler = (e: CustomEvent) => emit(e.detail.type, e.detail)
 *   window.addEventListener('game-event', handler as EventListener)
 *   return () => window.removeEventListener('game-event', handler as EventListener)
 * })
 */
export function createCustomConnector(
  subscribe: (emit: AudioEventEmitter) => () => void
): AudioEventConnector {
  return { connect: subscribe }
}
