import { audio } from '../audio'
import { VolumeSlider } from './VolumeSlider'

export function AudioControls() {
  const {
    musicVolume,
    interfaceVolume,
    effectsVolume,
    isMuted,
    setMusicVolume,
    setInterfaceVolume,
    setEffectsVolume,
    toggleMute,
  } = audio.useAudioControls()

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Audio Controls</h2>
      <p style={descStyle}>
        Built with <code>useAudioControls()</code> — connect any UI you like.
      </p>

      <VolumeSlider label="Music" value={musicVolume} onChange={setMusicVolume} />
      <VolumeSlider label="Interface" value={interfaceVolume} onChange={setInterfaceVolume} />
      <VolumeSlider label="Effects" value={effectsVolume} onChange={setEffectsVolume} />

      <button onClick={toggleMute} style={buttonStyle(isMuted)}>
        {isMuted ? 'Unmute' : 'Mute all'}
      </button>
    </section>
  )
}

const sectionStyle: React.CSSProperties = {
  background: '#1a1a28',
  borderRadius: 12,
  padding: '24px 28px',
  marginBottom: 20,
}

const headingStyle: React.CSSProperties = {
  margin: '0 0 4px',
  fontSize: 18,
  fontWeight: 600,
}

const descStyle: React.CSSProperties = {
  margin: '0 0 20px',
  fontSize: 13,
  color: '#7070a0',
}

const buttonStyle = (active: boolean): React.CSSProperties => ({
  marginTop: 8,
  padding: '8px 20px',
  borderRadius: 8,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 14,
  background: active ? '#f55a5a' : '#7c6af5',
  color: '#fff',
})
