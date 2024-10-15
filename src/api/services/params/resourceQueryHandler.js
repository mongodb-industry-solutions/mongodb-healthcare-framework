function addResourcePrefix(regularParams) {
  const resourceQuery = {};
  for (const key in regularParams) {
    resourceQuery[`resource.${key}`] = regularParams[key];
  }
  return resourceQuery;
}

module.exports = { addResourcePrefix };
