import { describe, it } from "vitest";
import { serverUrlRequiredRule } from "../../rules/server-url-required.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("server-url-required rule", () => {
  it("emits diagnostics when no server is defined", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(serverUrlRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        namespace PetApi;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/server-url-required" });
  });

  it("is valid when at least one server URL is defined", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(serverUrlRequiredRule);
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