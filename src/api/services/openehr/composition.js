const { v4: uuidv4 } = require("uuid");

/**
 * Generates a Composition document structure with the provided ehrId and compositionData.
 *
 * @param {UUID} ehrId - The unique identifier for the EHR.
 * @param {Object} compositionData - The composition data for the document.
 * @returns {Object} A Composition document structure to be stored in MongoDB.
 */
function createComposition(compositionData) {
  return {
    _type: "COMPOSITION",
    name: {
      _type: "DV_TEXT",
      value: compositionData.name?.value || "Composition",
    },
    archetype_details: compositionData.archetype_details,
    language: {
      _type: "CODE_PHRASE",
      terminology_id: {
        _type: "TERMINOLOGY_ID",
        value: compositionData.language?.terminology_id?.value || "ISO_639-1",
      },
      code_string: compositionData.language?.code_string || "en",
    },
    territory: {
      _type: "CODE_PHRASE",
      terminology_id: {
        _type: "TERMINOLOGY_ID",
        value: compositionData.territory?.terminology_id?.value || "ISO_3166-1",
      },
      code_string: compositionData.territory?.code_string || "US",
    },
    category: {
      _type: "DV_CODED_TEXT",
      value: compositionData.category?.value || "event",
      defining_code: {
        _type: "CODE_PHRASE",
        terminology_id: {
          _type: "TERMINOLOGY_ID",
          value:
            compositionData.category?.defining_code?.terminology_id?.value ||
            "openehr",
        },
        code_string:
          compositionData.category?.defining_code?.code_string || "433",
      },
    },
    composer: compositionData.composer,
    archetype_node_id: compositionData.archetype_node_id,
    uid: {
      _type: "OBJECT_VERSION_ID",
      value: `${uuidv4()}::local.ehrbase.org::1`,
    },
  };
}

module.exports = { createComposition };
