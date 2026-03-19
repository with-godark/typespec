import { describe, it } from "vitest";
import { tagLowerKebabCaseRule } from "../../rules/tag-lower-kebab-case.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("tag-lower-kebab-case rule", () => {
  it("emits diagnostics when tag name is not lower-kebab-case", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(tagLowerKebabCaseRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @tagMetadata("PetTag", #{ description: "pet operations" })
        namespace PetApi;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/tag-lower-kebab-case" });
  });

  it("is valid when tag name is lower-kebab-case", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(tagLowerKebabCaseRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @tagMetadata("pet-tag", #{ description: "pet operations" })
        namespace PetApi;
      `)
      .toBeValid();
  });
});