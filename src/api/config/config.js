require("dotenv").config();

const collectionMode = process.env.MONGO_COLLECTION_MODE;

const config = {
  isSingleCollection: collectionMode === "single",
  collections: {},
};

if (config.isSingleCollection) {
  config.collections.main =
    process.env.MONGO_SINGLE_COLLECTION_NAME || "clinical_documents";
} else {
  config.collections = {
    users: process.env.MONGO_FHIR_COLLECTION_NAME || "fhir",
    products: process.env.MONGO_OPEN_EHR_COLLECTION_NAME || "openehr",
  };
}

module.exports = config;
