/**
 * remove leading space and replace double spaces with single space
 * @param  {string} input string input
 * @return {string} a clean string in lowercase
 */
function cleanString(input) {
    // Remove trailing white spaces
    const trimmedEnd = input.trimEnd();
    // Replace any sequence of whitespace (spaces, tabs, etc.) with a single space
    const cleaned = trimmedEnd.replace(/\s+/g, " ");
    return cleaned.toLowerCase();
  }

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

module.exports = {
  cleanString
}