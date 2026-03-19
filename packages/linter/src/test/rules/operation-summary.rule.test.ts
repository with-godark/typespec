import { describe, it } from "vitest";
import { operationSummaryRule } from "../../rules/operation-summary.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("operation-summary rule", () => {
  it("emits diagnostics when summary is missing", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationSummaryRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get op read(): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/operation-summary" });
  });

  it("is valid when summary is present", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationSummaryRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @summary("List pets")
        @route("/pets") @get op read(): string;
      `)
      .toBeValid();
  });
});