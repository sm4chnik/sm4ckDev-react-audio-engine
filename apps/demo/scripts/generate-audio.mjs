/**
 * Generates simple sine-wave WAV files for the demo app.
 * No dependencies — pure Node.js.
 *
 * Run: node apps/demo/scripts/generate-audio.mjs
 */

import { writeFileSync, mkdirSync } from 'fs'

const SAMPLE_RATE = 44100

/**
 * Generates a mono 16-bit PCM WAV buffer.
 * @param {Array<{freq: number, amp: number}>} partials - frequency components
 * @param {number} duration - seconds
 * @param {number} fadeOut  - fade-out duration in seconds
 */
function makeWAV(partials, duration, fadeOut = 0.05) {
  const numSamples = Math.floor(SAMPLE_RATE * duration)
  const buf = Buffer.alloc(44 + numSamples * 2)

  // RIFF header
  buf.write('RIFF', 0)
  buf.writeUInt32LE(36 + numSamples * 2, 4)
  buf.write('WAVE', 8)
  buf.write('fmt ', 12)
  buf.writeUInt32LE(16, 16)
  buf.writeUInt16LE(1, 20)           // PCM
  buf.writeUInt16LE(1, 22)           // mono
  buf.writeUInt32LE(SAMPLE_RATE, 24)
  buf.writeUInt32LE(SAMPLE_RATE * 2, 28)
  buf.writeUInt16LE(2, 32)
  buf.writeUInt16LE(16, 34)
  buf.write('data', 36)
  buf.writeUInt32LE(numSamples * 2, 40)

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE
    const envelope = Math.min(1, t / 0.005) * Math.min(1, (duration - t) / fadeOut)
    let sample = 0
    for (const { freq, amp } of partials) {
      sample += Math.sin(2 * Math.PI * freq * t) * amp
    }
    buf.writeInt16LE(Math.round(sample * envelope * 0x5FFF), 44 + i * 2)
  }

  return buf
}

/** Ascending arpeggio: plays notes in sequence */
function makeArpeggio(rootFreq, duration) {
  const numSamples = Math.floor(SAMPLE_RATE * duration)
  const buf = Buffer.alloc(44 + numSamples * 2)

  buf.write('RIFF', 0)
  buf.writeUInt32LE(36 + numSamples * 2, 4)
  buf.write('WAVE', 8)
  buf.write('fmt ', 12)
  buf.writeUInt32LE(16, 16)
  buf.writeUInt16LE(1, 20)
  buf.writeUInt16LE(1, 22)
  buf.writeUInt32LE(SAMPLE_RATE, 24)
  buf.writeUInt32LE(SAMPLE_RATE * 2, 28)
  buf.writeUInt16LE(2, 32)
  buf.writeUInt16LE(16, 34)
  buf.write('data', 36)
  buf.writeUInt32LE(numSamples * 2, 40)

  // major chord intervals: root, M3, P5, oct, M3', P5'
  const ratios = [1, 1.25, 1.5, 2, 2.5, 3, 2, 1.5, 1.25, 1]
  const noteDur = duration / ratios.length

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE
    const noteIdx = Math.min(Math.floor(t / noteDur), ratios.length - 1)
    const freq = rootFreq * (ratios[noteIdx] ?? 1)
    const tInNote = t - noteIdx * noteDur
    const env = Math.min(1, tInNote / 0.01) * Math.min(1, (noteDur - tInNote) / 0.05)
    const sample = Math.sin(2 * Math.PI * freq * t) * env
    buf.writeInt16LE(Math.round(sample * 0x5FFF), 44 + i * 2)
  }

  return buf
}

/** Low rumble + fast tremolo for battle feel */
function makeBattle(duration) {
  const numSamples = Math.floor(SAMPLE_RATE * duration)
  const buf = Buffer.alloc(44 + numSamples * 2)

  buf.write('RIFF', 0)
  buf.writeUInt32LE(36 + numSamples * 2, 4)
  buf.write('WAVE', 8)
  buf.write('fmt ', 12)
  buf.writeUInt32LE(16, 16)
  buf.writeUInt16LE(1, 20)
  buf.writeUInt16LE(1, 22)
  buf.writeUInt32LE(SAMPLE_RATE, 24)
  buf.writeUInt32LE(SAMPLE_RATE * 2, 28)
  buf.writeUInt16LE(2, 32)
  buf.writeUInt16LE(16, 34)
  buf.write('data', 36)
  buf.writeUInt32LE(numSamples * 2, 40)

  const pattern = [110, 110, 138.6, 110, 82.4, 110, 138.6, 146.8]
  const noteDur = duration / pattern.length

  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE
    const noteIdx = Math.min(Math.floor(t / noteDur), pattern.length - 1)
    const freq = pattern[noteIdx] ?? 110
    const tInNote = t - noteIdx * noteDur
    const env = Math.min(1, tInNote / 0.01) * Math.min(1, (noteDur - tInNote) / 0.03)
    // tremolo
    const tremolo = 0.7 + 0.3 * Math.sin(2 * Math.PI * 8 * t)
    const sample = (Math.sin(2 * Math.PI * freq * t) + 0.3 * Math.sin(2 * Math.PI * freq * 2 * t)) * env * tremolo
    buf.writeInt16LE(Math.round(sample * 0x4FFF), 44 + i * 2)
  }

  return buf
}

// ── Directories ────────────────────────────────────────────────────────────

mkdirSync('apps/demo/public/audio/sfx', { recursive: true })
mkdirSync('apps/demo/public/audio/music', { recursive: true })

// ── SFX ───────────────────────────────────────────────────────────────────

const sfx = [
  {
    name: 'hover',
    partials: [{ freq: 1200, amp: 0.5 }, { freq: 1800, amp: 0.2 }],
    duration: 0.06,
    fadeOut: 0.04,
  },
  {
    name: 'click',
    partials: [{ freq: 800, amp: 0.6 }, { freq: 1200, amp: 0.3 }],
    duration: 0.09,
    fadeOut: 0.06,
  },
  {
    name: 'modal-open',
    partials: [{ freq: 523, amp: 0.5 }, { freq: 659, amp: 0.3 }, { freq: 784, amp: 0.2 }],
    duration: 0.25,
    fadeOut: 0.12,
  },
  {
    name: 'modal-close',
    partials: [{ freq: 784, amp: 0.4 }, { freq: 523, amp: 0.4 }],
    duration: 0.2,
    fadeOut: 0.1,
  },
  {
    name: 'explosion',
    partials: [
      { freq: 60, amp: 0.5 },
      { freq: 120, amp: 0.3 },
      { freq: 180, amp: 0.2 },
      { freq: 240, amp: 0.1 },
    ],
    duration: 0.6,
    fadeOut: 0.4,
  },
]

for (const { name, partials, duration, fadeOut } of sfx) {
  writeFileSync(`apps/demo/public/audio/sfx/${name}.wav`, makeWAV(partials, duration, fadeOut))
  console.log(`✓ sfx/${name}.wav`)
}

// ── Music ─────────────────────────────────────────────────────────────────

writeFileSync('apps/demo/public/audio/music/main-theme.wav', makeArpeggio(261.6, 3))
console.log('✓ music/main-theme.wav')

writeFileSync('apps/demo/public/audio/music/battle.wav', makeBattle(3))
console.log('✓ music/battle.wav')

writeFileSync('apps/demo/public/audio/music/menu.wav', makeArpeggio(329.6, 3))
console.log('✓ music/menu.wav')

console.log('\nAll audio files generated in apps/demo/public/audio/')
