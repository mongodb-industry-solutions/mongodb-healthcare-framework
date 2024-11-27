/**
 * Deconstructs regular parameters to handle arrays and range operators like 'ge' and 'le'.
 * This function prepares the parameters for use in a MongoDB query.
 *
 * @param {Object} regularParams - The regular parameters to deconstruct.
 * @returns {Object} An object with deconstructed parameters ready for MongoDB queries.
 */
function deconstructRegularParams(regularParams) {
  const deconstructedParams = {};

  for (const key in regularParams) {
    const value = regularParams[key];

    if (Array.isArray(value)) {
      const [ge, le] = value;
      deconstructedParams[`resource.${key}`] = {
        ...(ge && { $gte: new Date(ge.substring(2)) }),
        ...(le && { $lte: new Date(le.substring(2)) }),
      };
    } else if (typeof value === "string" && value.includes(",")) {
      deconstructedParams[`resource.${key}`] = { $in: value.split(",") };
    } else {
      deconstructedParams[`resource.${key}`] = value;
    }
  }

  return deconstructedParams;
}

module.exports = { deconstructRegularParams };
