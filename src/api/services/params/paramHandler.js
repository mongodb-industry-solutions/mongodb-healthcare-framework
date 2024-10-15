/**
 * Splits the provided query object into two objects - one containing keys starting with '_', and another containing all other keys.
 *
 * @param {Object} query - The input query object to split. It can contain any key-value pairs.
 * @returns {{specialParams: Object, regularParams: Object}} An object containing the special parameters (keys that start with '_') and regular parameters (all other keys).
 */
function splitQueryParams(query) {
  const specialParams = {};
  const regularParams = {};

  for (const key in query) {
    if (key.startsWith("_")) {
      specialParams[key] = query[key];
    } else {
      regularParams[key] = query[key];
    }
  }

  return { specialParams, regularParams };
}

module.exports = { splitQueryParams };
