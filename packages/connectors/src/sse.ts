import type { AudioEventConnector, AudioEventEmitter } from './types'

export interface SSEConnectorOptions {
  /**
   * List of SSE event types to subscribe to.
   * If not provided, only the generic 'message' event is used.
   */
  eventTypes?: string[]
  /**
   * Key in the parsed JSON data that holds the event name when using
   * the generic 'message' event (no named event types).
   * @default "type"
   */
  dataKey?: string
}

/**
 * Creates a connector that listens to Server-Sent Events (EventSource).
 *
 * @param url     - SSE endpoint URL
 * @param options - optional event type filters
 *
 * @example
 * createSSEConnector('/api/game-events', { eventTypes: ['round-end', 'player-hit'] })
 */
export function createSSEConnector(
  url: string,
  options: SSEConnectorOptions = {}
): AudioEventConnector {
  const { eventTypes, dataKey = 'type' } = options

  return {
    connect(emit: AudioEventEmitter) {
      const source = new EventSource(url)
      const handlers: Array<{ type: string; fn: (e: MessageEvent) => void }> = []

      if (eventTypes && eventTypes.length > 0) {
        eventTypes.forEach((type) => {
          const fn = (e: MessageEvent) => {
            try {
              const data = JSON.parse(e.data as string) as unknown
              emit(type, data)
            } catch {
              emit(type, e.data)
            }
          }
          source.addEventListener(type, fn)
          handlers.push({ type, fn })
        })
      } else {
        const fn = (e: MessageEvent) => {
          try {
            const data = JSON.parse(e.data as string) as Record<string, unknown>
            const eventName = data[dataKey]
            if (typeof eventName === 'string') {
              emit(eventName, data)
            }
          } catch {
            // ignore
          }
        }
        source.addEventListener('message', fn)
        handlers.push({ type: 'message', fn })
      }

      return () => {
        handlers.forEach(({ type, fn }) => source.removeEventListener(type, fn))
        source.close()
      }
    },
  }
}
