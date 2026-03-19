import { describe, it } from "vitest";
import { booleanParameterPrefixRule } from "../../rules/boolean-parameter-prefix.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("boolean-parameter-prefix rule", () => {
  it("emits diagnostics for invalid boolean parameter prefix", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(booleanParameterPrefixRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get
        op list(@query active: boolean): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/boolean-parameter-prefix" });
  });

  it("is valid for approved boolean parameter prefix", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(booleanParameterPrefixRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get
        op list(@query isActive: boolean): string;
      `)
      .toBeValid();
  });
});