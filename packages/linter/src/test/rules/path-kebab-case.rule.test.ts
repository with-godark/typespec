import { describe, it } from "vitest";
import { pathKebabCaseRule } from "../../rules/path-kebab-case.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("path-kebab-case rule", () => {
  it("emits diagnostics for non-kebab path segments", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathKebabCaseRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/petStore") @get op read(): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/path-kebab-case" });
  });

  it("is valid for kebab-case path segments", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathKebabCaseRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pet-store") @get op read(): string;
      `)
      .toBeValid();
  });
});