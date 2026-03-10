import { createAudio } from '@sm4ckdev/audio-react';
/**
 * Configure once — use everywhere.
 * In a real project these paths would point to your actual audio files.
 */
export const audio = createAudio({
    tracks: {
        main: '/audio/main-theme.mp3',
        battle: '/audio/battle.mp3',
        menu: '/audio/menu.mp3',
    },
    sfx: {
        hover: '/audio/sfx/hover.mp3',
        click: '/audio/sfx/click.mp3',
        modalOpen: '/audio/sfx/modal-open.mp3',
        modalClose: '/audio/sfx/modal-close.mp3',
        explosion: '/audio/sfx/explosion.mp3',
    },
    storageKey: 'react-audio-engine-demo/audio',
    defaults: {
        musicVolume: 60,
        interfaceVolume: 80,
        effectsVolume: 80,
        isMuted: false,
    },
});
//# sourceMappingURL=audio.js.map