interface Props {
  label: string
  value: number
  onChange: (v: number) => void
}

export function VolumeSlider({ label, value, onChange }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
      <span style={{ width: 120, fontSize: 14, color: '#a0a0b8' }}>{label}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ flex: 1, accentColor: '#7c6af5' }}
      />
      <span style={{ width: 32, textAlign: 'right', fontSize: 14 }}>{value}</span>
    </div>
  )
}
