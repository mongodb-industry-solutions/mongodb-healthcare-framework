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
