import type { StyleName } from '../lib/renderMarkup';

const STYLES: { value: StyleName; label: string }[] = [
  { value: 'sketch', label: 'Sketch' },
  { value: 'clean', label: 'Clean' },
  { value: 'wireframe', label: 'Wireframe' },
  { value: 'material', label: 'Material' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'brutal', label: 'Brutal' },
  { value: 'none', label: 'None' },
];

interface Props {
  value: StyleName;
  onChange: (style: StyleName) => void;
}

export function StyleSelect({ value, onChange }: Props) {
  return (
    <div className="ed-style-selector">
      <span className="ed-style-selector__label">Style</span>
      <select
        className="ed-select"
        value={value}
        onChange={(e) => onChange(e.target.value as StyleName)}
      >
        {STYLES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
