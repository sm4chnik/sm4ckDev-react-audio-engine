import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function VolumeSlider({ label, value, onChange }) {
    return (_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }, children: [_jsx("span", { style: { width: 120, fontSize: 14, color: '#a0a0b8' }, children: label }), _jsx("input", { type: "range", min: 0, max: 100, value: value, onChange: (e) => onChange(Number(e.target.value)), style: { flex: 1, accentColor: '#7c6af5' } }), _jsx("span", { style: { width: 32, textAlign: 'right', fontSize: 14 }, children: value })] }));
}
//# sourceMappingURL=VolumeSlider.js.map