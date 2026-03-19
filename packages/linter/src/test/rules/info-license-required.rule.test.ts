import { describe, it } from "vitest";
import { infoLicenseRequiredRule } from "../../rules/info-license-required.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("info-license-required rule", () => {
  it("emits diagnostics when license is missing", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(infoLicenseRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @info(#{ version: "1.0.0", contact: #{ email: "api@example.com" } })
        namespace PetApi;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/info-license-required" });
  });

  it("is valid when license is present", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(infoLicenseRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @info(#{ version: "1.0.0", contact: #{ email: "api@example.com" }, license: #{ name: "MIT" } })
        namespace PetApi;
      `)
      .toBeValid();
  });
});