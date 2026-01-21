2. Updated resolveTeamName

We’ll update this function to check the dictionary and expand any abbreviations it finds.

JavaScript
function resolveTeamName(name) {
  if (!name) return "";
  let cleanName = name.toLowerCase().trim();

  // Split the name into words and check if any word is in our alias map
  // Example: "NY Knicks" becomes "new york knicks"
  const words = cleanName.split(' ');
  const expandedWords = words.map(word => TEAM_ALIASES[word] || word);
  
  return expandedWords.join(' ');
}
