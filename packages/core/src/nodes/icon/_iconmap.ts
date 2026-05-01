/**
 * Icon character map. Shared by HTML / React / Tailwind icon renderers.
 *
 * The HTML renderer carries a much larger map (60+ glyphs); React and
 * Tailwind use a smaller subset. We keep both here so the per-target
 * modules can pick the one they need.
 */

export const ICON_MAP_FULL: Record<string, string> = {
  // Social media
  twitter: '𝕏',
  github: '⊙',
  linkedin: 'in',
  facebook: 'f',
  instagram: '◉',
  youtube: '▶',

  // Common UI icons
  home: '🏠',
  user: '👤',
  settings: '⚙️',
  search: '🔍',
  star: '⭐',
  heart: '❤️',
  mail: '✉️',
  phone: '📞',
  calendar: '📅',
  clock: '🕐',
  location: '📍',
  link: '🔗',
  download: '⬇️',
  upload: '⬆️',
  edit: '✏️',
  delete: '🗑️',
  plus: '➕',
  minus: '➖',
  check: '✓',
  close: '✕',
  menu: '☰',
  more: '⋯',
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
  success: '✅',

  // Arrows
  'arrow-up': '↑',
  'arrow-down': '↓',
  'arrow-left': '←',
  'arrow-right': '→',

  // Business/Finance
  chart: '📊',
  dollar: '$',
  euro: '€',
  pound: '£',

  // Tech
  code: '</>',
  database: '🗄️',
  cloud: '☁️',
  wifi: '📶',

  // Communication
  chat: '💬',
  video: '🎥',
  microphone: '🎤',
  bell: '🔔',

  // Files
  file: '📄',
  folder: '📁',
  image: '🖼️',
  document: '📃',
  pdf: '📑',

  // Brand placeholders
  logo: '◈',
  brand: '◆',

  // Activities
  rocket: '🚀',
  bulb: '💡',
  shield: '🛡️',
  lock: '🔒',
  unlock: '🔓',
  key: '🔑',
  gift: '🎁',
  trophy: '🏆',
  flag: '🚩',
  bookmark: '🔖',
  tag: '🏷️',
  cart: '🛒',
  'credit-card': '💳',

  // Default
  default: '●',
};

export const ICON_MAP_SMALL: Record<string, string> = {
  home: '🏠',
  user: '👤',
  settings: '⚙️',
  search: '🔍',
  star: '⭐',
  heart: '❤️',
  mail: '✉️',
  phone: '📞',
  check: '✓',
  close: '✕',
  menu: '☰',
  more: '⋯',
  default: '●',
};

export const SOCIAL_ICONS = ['twitter', 'github', 'linkedin', 'facebook', 'instagram', 'youtube'];
