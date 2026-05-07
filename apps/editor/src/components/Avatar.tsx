const PALETTE = [
  '#5b8dee', '#e85d75', '#f5a623', '#2cb67d', '#9b5de5',
  '#00b4d8', '#e06c75', '#56b6c2', '#d19a66', '#7c83fd',
];

export function nameToInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';
  return words
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

export function nameToColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  }
  return PALETTE[hash % PALETTE.length];
}

interface Props {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 26 }: Props) {
  const initials = nameToInitials(name);
  const bg = nameToColor(name);
  return (
    <span
      data-testid="avatar"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: bg,
        color: '#fff',
        fontSize: `${Math.round(size * 0.42)}px`,
        fontWeight: 700,
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {initials}
    </span>
  );
}
