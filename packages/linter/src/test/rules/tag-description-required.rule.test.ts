import { describe, it } from "vitest";
import { tagDescriptionRequiredRule } from "../../rules/tag-description-required.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("tag-description-required rule", () => {
  it("emits diagnostics when tag metadata description is missing", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(tagDescriptionRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @tagMetadata("pet", #{})
        namespace PetApi;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/tag-description-required" });
  });

  it("is valid when tag metadata description is present", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(tagDescriptionRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @tagMetadata("pet", #{ description: "pet operations" })
        namespace PetApi;
      `)
      .toBeValid();
  });
});