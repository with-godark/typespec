import { describe, it } from "vitest";
import { tagUniqueRule } from "../../rules/tag-unique.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("tag-unique rule", () => {
  it("emits diagnostics for duplicate tags on an operation", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(tagUniqueRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets")
        @tag("pet")
        @tag("pet")
        @get
        op read(): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/tag-unique" });
  });

  it("is valid when operation tags are unique", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(tagUniqueRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets")
        @tag("pet")
        @tag("store")
        @get
        op read(): string;
      `)
      .toBeValid();
  });
});