import { describe, it } from "vitest";
import { operationIdKebabCaseRule } from "../../rules/operation-id-kebab-case.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("operation-id-kebab-case rule", () => {
  it("emits diagnostics when operationId is not kebab-case", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationIdKebabCaseRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets")
        @get @operationId("getPet")
        op read(): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/operation-id-kebab-case" });
  });

  it("is valid when operationId is kebab-case", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationIdKebabCaseRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets")
        @get @operationId("get-pet")
        op read(): string;
      `)
      .toBeValid();
  });
});