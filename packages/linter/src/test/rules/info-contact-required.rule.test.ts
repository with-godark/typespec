import { describe, it } from "vitest";
import { infoContactRequiredRule } from "../../rules/info-contact-required.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("info-contact-required rule", () => {
  it("emits diagnostics when contact info is missing", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(infoContactRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @info(#{ version: "1.0.0", license: #{ name: "MIT" } })
        namespace PetApi;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/info-contact-required" });
  });

  it("is valid when contact info is present", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(infoContactRequiredRule);
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