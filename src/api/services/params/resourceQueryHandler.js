/**
 * Transforms an object containing key-value pairs into another object where each key is prefixed with 'resource.'.
 *
 * @param {Object} regularParams - The input object to transform. It can contain any key-value pairs.
 * @returns {{[key: string]: any}} A new object where each key from the input object is prefixed with 'resource.' and has the same value as in the input object.
 */
function addResourcePrefix(regularParams) {
  const resourceQuery = {};
  for (const key in regularParams) {
    resourceQuery[`resource.${key}`] = regularParams[key];
  }
  return resourceQuery;
}

module.exports = { addResourcePrefix };
