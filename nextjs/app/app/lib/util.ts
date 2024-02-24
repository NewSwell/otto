export function toTitleCase(slug: string) {
    return slug.split("-").map(function(word: string) {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    }).join(' ')
}

export function toUrlCase(string: string) {
  return string.replace(/ /g, '-').toLowerCase()
}
