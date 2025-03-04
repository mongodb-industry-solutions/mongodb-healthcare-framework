const generateSwaggerDocument = async (config) => {
  const baseDocument = {
    openapi: "3.0.0",
    info: {
      title: "MongoDB Healthcare Framework",
      description: "API documentation for the Express application",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local development server",
      },
    ],
    tags: [{ name: "FHIR", description: "FHIR-related operations" }],
    paths: {},
  };

  if (config && config.fhirOperations) {
    const { read, create, update, delete: del } = config.fhirOperations;

    if (read) {
      baseDocument.paths["/fhir/{resource}"] = {
        get: {
          tags: ["FHIR"],
          summary: "Retrieve a FHIR resource",
          parameters: [
            {
              name: "resource",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Resource found" },
            404: { description: "Not found" },
          },
        },
      };
    }

    if (create) {
      baseDocument.paths["/fhir"] = {
        post: {
          tags: ["FHIR"],
          summary: "Create a FHIR resource",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object" } } },
          },
          responses: { 201: { description: "Created" } },
        },
      };
    }

    if (update) {
      baseDocument.paths["/fhir/{resourceId}"] = {
        ...baseDocument.paths["/fhir/{resourceId}"],
        put: {
          tags: ["FHIR"],
          summary: "Update a FHIR resource",
          parameters: [
            {
              name: "resourceId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object" } } },
          },
          responses: {
            200: { description: "Updated" },
            404: { description: "Not found" },
          },
        },
      };
    }

    if (del) {
      baseDocument.paths["/fhir/{resourceId}"] = {
        ...baseDocument.paths["/fhir/{resourceId}"],
        delete: {
          tags: ["FHIR"],
          summary: "Delete a FHIR resource",
          parameters: [
            {
              name: "resourceId",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Deleted" },
            404: { description: "Not found" },
          },
        },
      };
    }
  }

  return baseDocument;
};

module.exports = { generateSwaggerDocument };
