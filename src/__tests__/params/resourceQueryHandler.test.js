const {
  addResourcePrefix,
} = require("../../api/services/params/resourceQueryHandler");

describe("addResourcePrefix", () => {
  it('should prefix all keys with "resource."', () => {
    const input = { id: "123", name: "John" };
    const expectedOutput = { "resource.id": "123", "resource.name": "John" };

    expect(addResourcePrefix(input)).toEqual(expectedOutput);
  });

  it("should return an empty object if input is an empty object", () => {
    const input = {};
    const expectedOutput = {};

    expect(addResourcePrefix(input)).toEqual(expectedOutput);
  });

  it('should handle keys with "." in their names correctly', () => {
    const input = { "key.with.dot": "value" };
    const expectedOutput = { "resource.key.with.dot": "value" };

    expect(addResourcePrefix(input)).toEqual(expectedOutput);
  });
});
