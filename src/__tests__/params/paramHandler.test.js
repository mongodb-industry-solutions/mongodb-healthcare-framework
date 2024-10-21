const { splitQueryParams } = require("../../api/services/params/paramHandler"); // Adjust path if needed

describe("splitQueryParams", () => {
  it('should split keys that start with "_" into specialParams and the rest into regularParams', () => {
    const query = {
      _id: "123",
      name: "John",
      _type: "person",
      age: 30,
    };

    const { specialParams, regularParams } = splitQueryParams(query);

    expect(specialParams).toEqual({ _id: "123", _type: "person" });
    expect(regularParams).toEqual({ name: "John", age: 30 });
  });

  it('should return empty specialParams if no keys start with "_"', () => {
    const query = {
      name: "John",
      age: 30,
    };

    const { specialParams, regularParams } = splitQueryParams(query);

    expect(specialParams).toEqual({});
    expect(regularParams).toEqual({ name: "John", age: 30 });
  });

  it('should return empty regularParams if all keys start with "_"', () => {
    const query = {
      _id: "123",
      _type: "person",
    };

    const { specialParams, regularParams } = splitQueryParams(query);

    expect(specialParams).toEqual({ _id: "123", _type: "person" });
    expect(regularParams).toEqual({});
  });

  it("should return empty objects if the query is empty", () => {
    const query = {};

    const { specialParams, regularParams } = splitQueryParams(query);

    expect(specialParams).toEqual({});
    expect(regularParams).toEqual({});
  });
});
