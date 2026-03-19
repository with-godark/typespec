import { describe, it } from "vitest";
import { serverNoTrailingSlashRule } from "../../rules/server-no-trailing-slash.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("server-no-trailing-slash rule", () => {
  it("emits diagnostics when server URL has trailing slash", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(serverNoTrailingSlashRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @server("https://api.example.com/", "prod")
        namespace PetApi;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/server-no-trailing-slash" });
  });

  it("is valid when server URL has no trailing slash", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(serverNoTrailingSlashRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @server("https://api.example.com", "prod")
        namespace PetApi;
      `)
      .toBeValid();
  });
});