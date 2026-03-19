import { describe, it } from "vitest";
import { tagSingularRule } from "../../rules/tag-singular.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("tag-singular rule", () => {
  it("emits diagnostics for plural tag names", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(tagSingularRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @tagMetadata("pets", #{ description: "pet operations" })
        namespace PetApi;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/tag-singular" });
  });

  it("is valid for singular tag names", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(tagSingularRule);
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