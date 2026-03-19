import { describe, it } from "vitest";
import { operationIdRequiredRule } from "../../rules/operation-id-required.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("operation-id-required rule", () => {
  it("emits diagnostics when operationId is missing", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationIdRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get op read(): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/operation-id-required" });
  });

  it("is valid when operationId is present", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationIdRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get @operationId("read-pets") op read(): string;
      `)
      .toBeValid();
  });
});