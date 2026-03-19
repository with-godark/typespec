import { describe, it } from "vitest";
import { infoDescriptionRequiredRule } from "../../rules/info-description-required.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("info-description-required rule", () => {
  it("emits diagnostics when description is missing", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(infoDescriptionRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @info(#{ version: "1.0.0", contact: #{ email: "api@example.com" }, license: #{ name: "MIT" } })
        namespace PetApi;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/info-description-required" });
  });

  it("is valid when description is present", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(infoDescriptionRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @doc("Public API")
        @service(#{ title: "Pet API" })
        @info(#{ version: "1.0.0", contact: #{ email: "api@example.com" }, license: #{ name: "MIT" } })
        namespace PetApi;
      `)
      .toBeValid();
  });
});