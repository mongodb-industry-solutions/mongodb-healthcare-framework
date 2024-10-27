/**
 * Generates an EHR document structure with the provided ehrId.
 *
 * @param {UUID} ehrId - The unique identifier for the EHR.
 * @returns {Object} An EHR document structure to be stored in MongoDB.
 */
function createEHRDocument(ehrId) {
  return {
    system_id: {
      _type: "HIER_OBJECT_ID",
      value: "local.ehrbase.org",
    },
    ehr_id: {
      _type: "HIER_OBJECT_ID",
      value: ehrId,
    },
    ehr_status: {
      uid: {
        _type: "OBJECT_VERSION_ID",
        value: "d29e525b-8fd0-4955-a140-546ab0cd0c6b::local.ehrbase.org::1",
      },
      archetype_node_id: "openEHR-EHR-EHR_STATUS.generic.v1",
      name: {
        _type: "DV_TEXT",
        value: "EHR Status",
      },
      subject: {
        _type: "PARTY_SELF",
      },
      is_queryable: true,
      is_modifiable: true,
      _type: "EHR_STATUS",
    },
    time_created: {
      _type: "DV_DATE_TIME",
      value: new Date().toISOString(),
    },
  };
}

module.exports = { createEHRDocument };
