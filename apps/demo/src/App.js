import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AudioControls } from './components/AudioControls';
import { MusicPlayer } from './components/MusicPlayer';
import { ConnectorDemo } from './components/ConnectorDemo';
export function App() {
    return (_jsxs("div", { style: layout, children: [_jsxs("header", { style: header, children: [_jsx("h1", { style: { margin: 0, fontSize: 24, fontWeight: 700 }, children: "react-audio-engine" }), _jsx("p", { style: { margin: '4px 0 0', fontSize: 14, color: '#7070a0' }, children: "@sm4ckdev/audio-react \u00B7 @sm4ckdev/audio-connectors \u00B7 @sm4ckdev/audio-core" })] }), _jsx(MusicPlayer, {}), _jsx(AudioControls, {}), _jsx(ConnectorDemo, {})] }));
}
const layout = {
    maxWidth: 680,
    margin: '0 auto',
    padding: '40px 20px',
};
const header = {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: '1px solid #2a2a40',
};
//# sourceMappingURL=App.js.map