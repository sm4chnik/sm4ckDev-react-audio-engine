import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { audio } from '../audio';
import { VolumeSlider } from './VolumeSlider';
export function AudioControls() {
    const { musicVolume, interfaceVolume, effectsVolume, isMuted, setMusicVolume, setInterfaceVolume, setEffectsVolume, toggleMute, } = audio.useAudioControls();
    return (_jsxs("section", { style: sectionStyle, children: [_jsx("h2", { style: headingStyle, children: "Audio Controls" }), _jsxs("p", { style: descStyle, children: ["Built with ", _jsx("code", { children: "useAudioControls()" }), " \u2014 connect any UI you like."] }), _jsx(VolumeSlider, { label: "Music", value: musicVolume, onChange: setMusicVolume }), _jsx(VolumeSlider, { label: "Interface", value: interfaceVolume, onChange: setInterfaceVolume }), _jsx(VolumeSlider, { label: "Effects", value: effectsVolume, onChange: setEffectsVolume }), _jsx("button", { onClick: toggleMute, style: buttonStyle(isMuted), children: isMuted ? 'Unmute' : 'Mute all' })] }));
}
const sectionStyle = {
    background: '#1a1a28',
    borderRadius: 12,
    padding: '24px 28px',
    marginBottom: 20,
};
const headingStyle = {
    margin: '0 0 4px',
    fontSize: 18,
    fontWeight: 600,
};
const descStyle = {
    margin: '0 0 20px',
    fontSize: 13,
    color: '#7070a0',
};
const buttonStyle = (active) => ({
    marginTop: 8,
    padding: '8px 20px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    background: active ? '#f55a5a' : '#7c6af5',
    color: '#fff',
});
//# sourceMappingURL=AudioControls.js.map