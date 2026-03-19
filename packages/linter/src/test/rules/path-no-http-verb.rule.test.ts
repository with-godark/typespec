import { describe, it } from "vitest";
import { pathNoHttpVerbRule } from "../../rules/path-no-http-verb.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("path-no-http-verb rule", () => {
  it("emits diagnostics when path includes HTTP verb segment", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathNoHttpVerbRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets/get") @get op read(): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/path-no-http-verb" });
  });

  it("is valid when path has no HTTP verb segment", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathNoHttpVerbRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets/list") @get op read(): string;
      `)
      .toBeValid();
  });
});