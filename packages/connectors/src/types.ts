/**
 * Callback signature for emitting a named audio event with optional payload.
 */
export type AudioEventEmitter = (event: string, payload?: unknown) => void

/**
 * Universal interface for all event source adapters.
 * Implement this to connect any event source to useAudioEvents().
 *
 * @example
 * const connector: AudioEventConnector = {
 *   connect(emit) {
 *     const handler = (e: CustomEvent) => emit(e.detail.type, e.detail)
 *     window.addEventListener('game-event', handler)
 *     return () => window.removeEventListener('game-event', handler)
 *   }
 * }
 */
export interface AudioEventConnector {
  /**
   * Subscribe to the event source.
   * @param emit - call this whenever an event fires
   * @returns cleanup function (called on unmount)
   */
  connect(emit: AudioEventEmitter): () => void
}
