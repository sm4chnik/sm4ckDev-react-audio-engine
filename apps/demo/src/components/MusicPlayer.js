import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { audio } from '../audio';
const TRACKS = ['main', 'battle', 'menu'];
export function MusicPlayer() {
    const preload = audio.usePreloadMusic();
    const { playTrack, stopMusic } = audio.useBackgroundMusic();
    useEffect(() => {
        preload();
    }, [preload]);
    return (_jsxs("section", { style: sectionStyle, children: [_jsx("h2", { style: headingStyle, children: "Background Music" }), _jsxs("p", { style: descStyle, children: ["Built with ", _jsx("code", { children: "useBackgroundMusic()" }), " \u2014 playTrack keys are type-safe."] }), _jsxs("div", { style: { display: 'flex', gap: 10, flexWrap: 'wrap' }, children: [TRACKS.map((key) => (_jsxs("button", { onClick: () => playTrack(key), style: trackButton, children: ["\u25B6 ", key] }, key))), _jsx("button", { onClick: stopMusic, style: { ...trackButton, background: '#3a3a58' }, children: "\u25A0 stop" })] })] }));
}
const sectionStyle = {
    background: '#1a1a28',
    borderRadius: 12,
    padding: '24px 28px',
    marginBottom: 20,
};
const headingStyle = { margin: '0 0 4px', fontSize: 18, fontWeight: 600 };
const descStyle = { margin: '0 0 16px', fontSize: 13, color: '#7070a0' };
const trackButton = {
    padding: '8px 18px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    background: '#7c6af5',
    color: '#fff',
};
//# sourceMappingURL=MusicPlayer.js.map