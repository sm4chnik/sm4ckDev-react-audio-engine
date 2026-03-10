import { Howl, Howler } from 'howler'
import type { AudioServiceOptions, VolumeMap } from './types'

/**
 * AudioService manages Howl instance caches per category and global mute.
 * Categories are arbitrary strings (e.g. "music", "interface", "effects").
 * Music Howl instances are created on demand via createMusicHowl() and
 * owned externally (e.g. by a Zustand store).
 */
export class AudioService {
  private caches = new Map<string, Map<string, Howl>>()
  private volumes: VolumeMap = {}

  constructor(options: AudioServiceOptions = {}) {
    if (options.initialVolumes) {
      this.volumes = { ...options.initialVolumes }
    }
  }

  // ─── Music ───────────────────────────────────────────────────────────────

  createMusicHowl(src: string): Howl {
    return new Howl({
      src: [src],
      loop: true,
      preload: true,
      // html5: false — use Web Audio API so AudioContext.resume() works uniformly
    })
  }

  /**
   * Resumes the Web Audio AudioContext if it was suspended by the browser's
   * autoplay policy. Call this inside a user-gesture handler before playing.
   */
  resumeContext(): void {
    if (Howler.ctx && Howler.ctx.state === 'suspended') {
      void Howler.ctx.resume()
    }
  }

  setMusicVolume(volume: number): void {
    this.volumes['music'] = this.clamp(volume)
  }

  getMusicVolume(): number {
    return this.volumes['music'] ?? 100
  }

  // ─── Generic category sounds ─────────────────────────────────────────────

  setVolume(category: string, volume: number): void {
    const v = this.clamp(volume)
    this.volumes[category] = v
    this.getCache(category).forEach((howl) => howl.volume(v / 100))
  }

  getVolume(category: string): number {
    return this.volumes[category] ?? 100
  }

  playSound(category: string, src: string): void {
    const howl = this.getOrCreate(category, src)
    const volume = this.volumes[category] ?? 100
    howl.volume(volume / 100)
    howl.play()
  }

  cleanup(category?: string): void {
    if (category) {
      this.getCache(category).forEach((h) => h.unload())
      this.caches.delete(category)
    } else {
      this.caches.forEach((cache) => cache.forEach((h) => h.unload()))
      this.caches.clear()
    }
  }

  // ─── Global ──────────────────────────────────────────────────────────────

  setMuted(muted: boolean): void {
    Howler.mute(muted)
  }

  // ─── Private ─────────────────────────────────────────────────────────────

  private getCache(category: string): Map<string, Howl> {
    if (!this.caches.has(category)) {
      this.caches.set(category, new Map())
    }
    return this.caches.get(category)!
  }

  private getOrCreate(category: string, src: string): Howl {
    const cache = this.getCache(category)
    if (!cache.has(src)) {
      cache.set(src, new Howl({ src: [src], loop: false, preload: true }))
    }
    return cache.get(src)!
  }

  private clamp(v: number): number {
    return Math.max(0, Math.min(100, v))
  }
}
