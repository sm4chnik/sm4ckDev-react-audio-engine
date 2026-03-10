import { AudioControls } from './components/AudioControls'
import { MusicPlayer } from './components/MusicPlayer'
import { ConnectorDemo } from './components/ConnectorDemo'

export function App() {
  return (
    <div style={layout}>
      <header style={header}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>react-audio-engine</h1>
        <p style={{ margin: '4px 0 0', fontSize: 14, color: '#7070a0' }}>
          @sm4ckdev/audio-react · @sm4ckdev/audio-connectors · @sm4ckdev/audio-core
        </p>
      </header>

      <MusicPlayer />
      <AudioControls />
      <ConnectorDemo />
    </div>
  )
}

const layout: React.CSSProperties = {
  maxWidth: 680,
  margin: '0 auto',
  padding: '40px 20px',
}

const header: React.CSSProperties = {
  marginBottom: 32,
  paddingBottom: 24,
  borderBottom: '1px solid #2a2a40',
}
