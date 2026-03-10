import { useRef } from 'react'
import { createCustomConnector } from '@sm4ckdev/audio-connectors'
import { audio } from '../audio'

/**
 * Demonstrates createCustomConnector:
 * a button manually triggers an audio event through the connector.
 */
export function ConnectorDemo() {
  const emitRef = useRef<((event: string, payload?: unknown) => void) | null>(null)

  const connector = useRef(
    createCustomConnector((emit) => {
      emitRef.current = emit
      return () => {
        emitRef.current = null
      }
    })
  ).current

  audio.useAudioEvents(connector, {
    explosion: '/audio/sfx/explosion.wav',
    click:     '/audio/sfx/click.wav',
    hover:     '/audio/sfx/hover.wav',
  })

  const trigger = (event: string) => emitRef.current?.(event)

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Custom Connector</h2>
      <p style={descStyle}>
        These buttons manually emit audio events through{' '}
        <code>createCustomConnector</code> + <code>useAudioEvents</code>.
        Swap the connector for <code>createEventEmitterConnector</code>,{' '}
        <code>createWebSocketConnector</code>, or <code>createSSEConnector</code>
        {' '}without changing any other code.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {['explosion', 'click', 'hover'].map((event) => (
          <button key={event} onClick={() => trigger(event)} style={eventButton}>
            emit: {event}
          </button>
        ))}
      </div>
    </section>
  )
}

const sectionStyle: React.CSSProperties = {
  background: '#1a1a28',
  borderRadius: 12,
  padding: '24px 28px',
  marginBottom: 20,
}

const headingStyle: React.CSSProperties = { margin: '0 0 4px', fontSize: 18, fontWeight: 600 }
const descStyle: React.CSSProperties = { margin: '0 0 16px', fontSize: 13, color: '#7070a0' }

const eventButton: React.CSSProperties = {
  padding: '8px 18px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 14,
  background: '#2a8a5a',
  color: '#fff',
}
