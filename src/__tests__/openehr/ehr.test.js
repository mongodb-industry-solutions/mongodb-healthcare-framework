const { createEHRDocument } = require("../../api/services/openehr/ehr");

describe("createEHRDocument", () => {
  it("should create an EHR document with the provided ehrId", () => {
    const ehrId = "d29e525b-8fd0-4955-a140-546ab0cd0c6b";
    const expectedOutput = {
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
        value: expect.any(String),
      },
    };

    const result = createEHRDocument(ehrId);
    expect(result).toEqual(expectedOutput);
  });

  it("should create an EHR document with the current time for time_created", () => {
    const ehrId = "d29e525b-8fd0-4955-a140-546ab0cd0c6b";
    const result = createEHRDocument(ehrId);

    expect(new Date(result.time_created.value).toISOString()).toEqual(
      result.time_created.value
    );
  });
});
