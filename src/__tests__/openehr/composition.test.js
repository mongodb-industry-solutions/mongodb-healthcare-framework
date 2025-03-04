const { createComposition } = require("../../api/services/openehr/composition");

describe("createComposition", () => {
  it("should create a composition with default values", () => {
    const compositionData = {};
    const expectedOutput = {
      _type: "COMPOSITION",
      name: {
        _type: "DV_TEXT",
        value: "Composition",
      },
      archetype_details: undefined,
      language: {
        _type: "CODE_PHRASE",
        terminology_id: {
          _type: "TERMINOLOGY_ID",
          value: "ISO_639-1",
        },
        code_string: "en",
      },
      territory: {
        _type: "CODE_PHRASE",
        terminology_id: {
          _type: "TERMINOLOGY_ID",
          value: "ISO_3166-1",
        },
        code_string: "US",
      },
      category: {
        _type: "DV_CODED_TEXT",
        value: "event",
        defining_code: {
          _type: "CODE_PHRASE",
          terminology_id: {
            _type: "TERMINOLOGY_ID",
            value: "openehr",
          },
          code_string: "433",
        },
      },
      composer: undefined,
      archetype_node_id: undefined,
      uid: {
        _type: "OBJECT_VERSION_ID",
        value: expect.stringMatching(
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}::local.ehrbase.org::1$/
        ),
      },
    };

    const result = createComposition(compositionData);
    expect(result).toEqual(expectedOutput);
  });

  it("should create a composition with provided values", () => {
    const compositionData = {
      name: { value: "Test Composition" },
      archetype_details: { someDetail: "detail" },
      language: {
        terminology_id: { value: "ISO_639-1" },
        code_string: "en",
      },
      territory: {
        terminology_id: { value: "ISO_3166-1" },
        code_string: "US",
      },
      category: {
        value: "event",
        defining_code: {
          terminology_id: { value: "openehr" },
          code_string: "433",
        },
      },
      composer: { name: "John Doe" },
      archetype_node_id: "some-node-id",
    };

    const result = createComposition(compositionData);
    expect(result).toEqual({
      _type: "COMPOSITION",
      name: {
        _type: "DV_TEXT",
        value: "Test Composition",
      },
      archetype_details: { someDetail: "detail" },
      language: {
        _type: "CODE_PHRASE",
        terminology_id: {
          _type: "TERMINOLOGY_ID",
          value: "ISO_639-1",
        },
        code_string: "en",
      },
      territory: {
        _type: "CODE_PHRASE",
        terminology_id: {
          _type: "TERMINOLOGY_ID",
          value: "ISO_3166-1",
        },
        code_string: "US",
      },
      category: {
        _type: "DV_CODED_TEXT",
        value: "event",
        defining_code: {
          _type: "CODE_PHRASE",
          terminology_id: {
            _type: "TERMINOLOGY_ID",
            value: "openehr",
          },
          code_string: "433",
        },
      },
      composer: { name: "John Doe" },
      archetype_node_id: "some-node-id",
      uid: {
        _type: "OBJECT_VERSION_ID",
        value: expect.stringMatching(
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}::local.ehrbase.org::1$/
        ),
      },
    });
  });
});
