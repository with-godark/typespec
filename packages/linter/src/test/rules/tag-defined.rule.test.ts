import { describe, it } from "vitest";
import { tagDefinedRule } from "../../rules/tag-defined.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("tag-defined rule", () => {
  it("emits diagnostics when operation tag is not declared in metadata", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(tagDefinedRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @tagMetadata("pet", #{ description: "pet operations" })
        namespace PetApi {
          @tag("store")
          @route("/pets") @get op read(): string;
        }
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/tag-defined" });
  });

  it("is valid when operation tag is declared in metadata", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(tagDefinedRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @tagMetadata("pet", #{ description: "pet operations" })
        namespace PetApi {
          @tag("pet")
          @route("/pets") @get op read(): string;
        }
      `)
      .toBeValid();
  });
});