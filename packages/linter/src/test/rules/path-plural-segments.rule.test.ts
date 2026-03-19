import { describe, it } from "vitest";
import { pathPluralSegmentsRule } from "../../rules/path-plural-segments.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("path-plural-segments rule", () => {
  it("emits diagnostics for singular path segment", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathPluralSegmentsRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pet") @get op read(): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/path-plural-segments" });
  });

  it("is valid for plural path segment", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathPluralSegmentsRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get op read(): string;
      `)
      .toBeValid();
  });

  it("is valid for irregular plural path segment", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathPluralSegmentsRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/people") @get op read(): string;
      `)
      .toBeValid();
  });

  it("emits diagnostics for singular word ending with s", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathPluralSegmentsRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/business") @get op read(): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/path-plural-segments" });
  });

  it("is valid for configured non-resource exception segment", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathPluralSegmentsRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/health") @get op read(): string;
      `)
      .toBeValid();
  });
});
