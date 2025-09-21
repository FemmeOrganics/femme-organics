/**
 * remove leading space and replace double spaces with single space
 * @param  {string} input string input
 * @return {string} a clean string in lowercase
 */
export function cleanString(input: string) {
    // Remove trailing white spaces
    const trimmedEnd = input.trimEnd();
    // Replace any sequence of whitespace (spaces, tabs, etc.) with a single space
    const cleaned = trimmedEnd.replace(/\s+/g, " ");
    return cleaned.toLowerCase();
  }

export function capitalize(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}