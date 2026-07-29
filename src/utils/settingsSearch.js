// Search index for the Settings page.
//
// Each entry mirrors one top-level card in Settings.jsx, keyed by the `id` that
// component passes to its `show()` helper. `keywords` exist so people can find
// a control using the words they'd actually type ("dark mode", "am/pm", "wipe")
// instead of only the heading it happens to live under, so it's worth listing
// the field labels and synonyms, not just the title again.
//
// WHEN YOU ADD A SECTION to Settings.jsx, add it here too: an unindexed section
// can never match, so it would vanish the moment anyone types in the search box.

export const SETTINGS_SECTIONS = [
  {
    id: 'account',
    title: 'Account & Sync',
    keywords: [
      'account', 'sync', 'cloud', 'sign in', 'signin', 'log in', 'login', 'sign out',
      'email', 'magic link', 'password', 'supabase', 'backup', 'cross device',
      'devices', 'online', 'offline',
    ],
  },
  {
    id: 'recovery',
    title: 'Data Recovery',
    keywords: [
      'data recovery', 'recover', 'corrupt', 'corrupted', 'quarantine', 'quarantined',
      'restore', 'discard', 'backup', 'unparseable', 'broken', 'repair',
    ],
  },
  {
    id: 'timezone',
    title: 'Timezone Settings',
    keywords: [
      'timezone', 'time zone', 'tz', 'utc', 'gmt', 'offset', 'region', 'country',
      'city', 'location', 'remote', 'local time', 'business hours',
    ],
  },
  {
    id: 'clock',
    title: 'Clock Format',
    keywords: [
      'clock', 'clock format', 'time format', '12 hour', '24 hour', 'am pm', 'military time',
      'date format', 'date display', 'iso', 'numeric', 'day month year', 'weekday',
      'navigation bar', 'navbar', 'time only',
    ],
  },
  {
    id: 'schedule',
    title: 'Work Schedule',
    keywords: [
      'work schedule', 'week start', 'start of week', 'first day of week', 'sunday', 'monday',
      'weekend', 'weekend days', 'non work days', 'days off', 'holiday', 'streak',
      'daily hours goal', 'hour goal', 'target hours', 'hours per day', 'goal ring',
    ],
  },
  {
    id: 'heatmap',
    title: 'Heatmap Colors',
    keywords: [
      'heatmap', 'heat map', 'colors', 'colours', 'color stops', 'progress stops',
      'gradient', 'palette', 'goal met', 'completion color', 'empty color',
      'no time tracked', 'reports', 'contribution graph',
    ],
  },
  {
    id: 'goalring',
    title: 'Goal Ring Colors',
    keywords: [
      'goal ring', 'ring', 'progress ring', 'donut', 'colors', 'colours',
      'in progress color', 'completion color', 'goal met', 'reports', 'palette',
    ],
  },
  {
    id: 'save',
    title: 'Save Changes',
    keywords: ['save', 'save settings', 'apply', 'apply changes', 'confirm', 'unsaved'],
  },
  {
    id: 'reset-onboarding',
    title: 'Reset Onboarding',
    keywords: [
      'onboarding', 'reset onboarding', 'setup', 'set up', 'welcome', 'welcome screen',
      'tutorial', 'walkthrough', 'intro', 'first run', 'getting started', 'preview',
    ],
  },
  {
    id: 'clear-data',
    title: 'Clear All Data',
    keywords: [
      'clear all data', 'clear', 'delete', 'delete everything', 'erase', 'wipe',
      'remove', 'reset app', 'factory reset', 'start over', 'entries', 'danger',
      'destructive', 'nuke',
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    keywords: [
      'appearance', 'theme', 'dark mode', 'darkmode', 'light mode', 'night mode',
      'system theme', 'color scheme', 'contrast', 'looks', 'style',
    ],
  },
  {
    id: 'about',
    title: 'About',
    keywords: [
      'about', 'version', 'release', 'changelog', 'what is new', 'github', 'repo',
      'repository', 'source', 'open source', 'star', 'license', 'credits', 'author',
      'userkace', 'kronos',
    ],
  },
];

// Punctuation and case are noise here: it lets "12-hour", "12 hour" and
// "12hour"-adjacent typing all reach the same section.
const normalize = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const HAYSTACKS = SETTINGS_SECTIONS.map(({ id, title, keywords }) => ({
  id,
  text: normalize([title, ...keywords].join(' ')),
}));

const ALL_IDS = SETTINGS_SECTIONS.map(s => s.id);

/**
 * Ids of the sections matching `query`. Every whitespace-separated term must
 * appear somewhere in a section's title or keywords (AND, not OR), so extra
 * words narrow the list the way people expect. An empty query matches all.
 */
export const matchSettingsSections = (query) => {
  const terms = normalize(query || '').split(' ').filter(Boolean);
  if (terms.length === 0) return new Set(ALL_IDS);
  return new Set(
    HAYSTACKS
      .filter(({ text }) => terms.every(term => text.includes(term)))
      .map(({ id }) => id)
  );
};
