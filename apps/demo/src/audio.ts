import { createAudio } from '@sm4ckdev/audio-react'

/**
 * Configure once — use everywhere.
 * In a real project these paths would point to your actual audio files.
 */
export const audio = createAudio({
  tracks: {
    main:   '/audio/music/main-theme.wav',
    battle: '/audio/music/battle.wav',
    menu:   '/audio/music/menu.wav',
  },
  sfx: {
    hover:      '/audio/sfx/hover.wav',
    click:      '/audio/sfx/click.wav',
    modalOpen:  '/audio/sfx/modal-open.wav',
    modalClose: '/audio/sfx/modal-close.wav',
    explosion:  '/audio/sfx/explosion.wav',
  },
  storageKey: 'react-audio-engine-demo/audio',
  defaults: {
    musicVolume: 60,
    interfaceVolume: 80,
    effectsVolume: 80,
    isMuted: false,
  },
})
