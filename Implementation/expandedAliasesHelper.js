const TEAM_ALIASES = {
  "ny": "new york",
  "la": "los angeles",
  "gs": "golden state",
  "warriors": "golden state warriors",
  "philly": "philadelphia",
  "phx": "phoenix",
  "lv": "las vegas",
  "usa": "united states",
  "okc": "oklahoma city"
};

/**
 * Cleans the string and replaces abbreviations with full names
 */
function resolveTeamName(name) {
  if (!name) return "";
  let cleanName = name.toLowerCase().trim();

  // Split name by spaces (e.g., "NY Knicks" -> ["ny", "knicks"])
  const words = cleanName.split(/\s+/);
  
  // Map words to aliases if they exist
  const expandedWords = words.map(word => TEAM_ALIASES[word] || word);
  
  return expandedWords.join(' ');
}
