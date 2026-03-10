export type AudioCategory = string

export interface VolumeMap {
  [category: AudioCategory]: number
}

export interface AudioServiceOptions {
  /**
   * Initial volume per category (0–100).
   * Categories not listed here default to 100.
   */
  initialVolumes?: VolumeMap
}
