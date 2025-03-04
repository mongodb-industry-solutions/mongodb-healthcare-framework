const {
  generateSwaggerDocument,
} = require("../../api/services/docs/swaggerGenerator");

describe("Generate Swagger Document", () => {
  it("should generate swagger with correct paths", async () => {
    const config = {
      fhirOperations: {
        read: true,
        create: true,
        update: true,
        delete: true,
      },
    };

    const result = await generateSwaggerDocument(config);

    expect(result.paths).toHaveProperty("/fhir/{resource}");
    expect(result.paths).toHaveProperty("/fhir");
    expect(result.paths["/fhir/{resourceId}"]).toHaveProperty("put");
    expect(result.paths["/fhir/{resourceId}"]).toHaveProperty("delete");
  });

  it("should not include update path if disabled", async () => {
    const config = {
      fhirOperations: {
        read: true,
        create: true,
        update: false,
        delete: true,
      },
    };

    const result = await generateSwaggerDocument(config);

    expect(result.paths["/fhir/{resourceId}"]).not.toHaveProperty("put");
    expect(result.paths["/fhir/{resourceId}"]).toHaveProperty("delete");
  });
});
