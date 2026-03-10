import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { createCustomConnector } from '@sm4ckdev/audio-connectors';
import { audio } from '../audio';
/**
 * Demonstrates createCustomConnector:
 * a button manually triggers an audio event through the connector.
 */
export function ConnectorDemo() {
    const emitRef = useRef(null);
    const connector = useRef(createCustomConnector((emit) => {
        emitRef.current = emit;
        return () => {
            emitRef.current = null;
        };
    })).current;
    audio.useAudioEvents(connector, {
        explosion: '/audio/sfx/explosion.mp3',
        click: '/audio/sfx/click.mp3',
        hover: '/audio/sfx/hover.mp3',
    });
    const trigger = (event) => emitRef.current?.(event);
    return (_jsxs("section", { style: sectionStyle, children: [_jsx("h2", { style: headingStyle, children: "Custom Connector" }), _jsxs("p", { style: descStyle, children: ["These buttons manually emit audio events through", ' ', _jsx("code", { children: "createCustomConnector" }), " + ", _jsx("code", { children: "useAudioEvents" }), ". Swap the connector for ", _jsx("code", { children: "createEventEmitterConnector" }), ",", ' ', _jsx("code", { children: "createWebSocketConnector" }), ", or ", _jsx("code", { children: "createSSEConnector" }), ' ', "without changing any other code."] }), _jsx("div", { style: { display: 'flex', gap: 10, flexWrap: 'wrap' }, children: ['explosion', 'click', 'hover'].map((event) => (_jsxs("button", { onClick: () => trigger(event), style: eventButton, children: ["emit: ", event] }, event))) })] }));
}
const sectionStyle = {
    background: '#1a1a28',
    borderRadius: 12,
    padding: '24px 28px',
    marginBottom: 20,
};
const headingStyle = { margin: '0 0 4px', fontSize: 18, fontWeight: 600 };
const descStyle = { margin: '0 0 16px', fontSize: 13, color: '#7070a0' };
const eventButton = {
    padding: '8px 18px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    background: '#2a8a5a',
    color: '#fff',
};
//# sourceMappingURL=ConnectorDemo.js.map