import { describe, it } from "vitest";
import { parameterDescriptionRequiredRule } from "../../rules/parameter-description-required.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("parameter-description-required rule", () => {
  it("emits diagnostics when parameter doc is missing", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(parameterDescriptionRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get
        op read(@query isActive: boolean): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/parameter-description-required" });
  });

  it("is valid when all parameters are documented", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(parameterDescriptionRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get
        op read(@doc("Filter by active flag") @query isActive: boolean): string;
      `)
      .toBeValid();
  });
});