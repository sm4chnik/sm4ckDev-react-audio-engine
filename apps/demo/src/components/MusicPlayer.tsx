import { useEffect } from 'react'
import { audio } from '../audio'

const TRACKS = ['main', 'battle', 'menu'] as const

export function MusicPlayer() {
  const preload = audio.usePreloadMusic()
  const { playTrack, stopMusic } = audio.useBackgroundMusic()

  useEffect(() => {
    preload()
  }, [preload])

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Background Music</h2>
      <p style={descStyle}>
        Built with <code>useBackgroundMusic()</code> — playTrack keys are type-safe.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {TRACKS.map((key) => (
          <button key={key} onClick={() => playTrack(key)} style={trackButton}>
            ▶ {key}
          </button>
        ))}
        <button onClick={stopMusic} style={{ ...trackButton, background: '#3a3a58' }}>
          ■ stop
        </button>
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

const trackButton: React.CSSProperties = {
  padding: '8px 18px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 14,
  background: '#7c6af5',
  color: '#fff',
}
