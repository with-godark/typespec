import { describe, it } from "vitest";
import { serverHttpsRequiredRule } from "../../rules/server-https-required.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("server-https-required rule", () => {
  it("emits diagnostics for non-https server URLs", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(serverHttpsRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @server("http://api.example.com", "prod")
        namespace PetApi;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/server-https-required" });
  });

  it("is valid for https server URLs", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(serverHttpsRequiredRule);
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