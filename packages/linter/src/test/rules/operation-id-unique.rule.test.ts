import { describe, it } from "vitest";
import { operationIdUniqueRule } from "../../rules/operation-id-unique.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("operation-id-unique rule", () => {
  it("emits diagnostics when operationIds are duplicated", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationIdUniqueRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get @operationId("get-pet") op read1(): string;
        @route("/pets2") @get @operationId("get-pet") op read2(): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/operation-id-unique" });
  });

  it("is valid when operationIds are unique", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationIdUniqueRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get @operationId("get-pet") op read1(): string;
        @route("/pets2") @get @operationId("get-pet-by-id") op read2(): string;
      `)
      .toBeValid();
  });

  it("is valid when operations omit explicit operationId", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationIdUniqueRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get op read(): string;
        namespace Admin {
          @route("/admin/pets") @get op read(): string;
        }
      `)
      .toBeValid();
  });
});