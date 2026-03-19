import { describe, it } from "vitest";
import { pathNoTrailingSlashRule } from "../../rules/path-no-trailing-slash.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("path-no-trailing-slash rule", () => {
  it("emits diagnostics for trailing slash routes", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathNoTrailingSlashRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets/") @get op read(): string;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/path-no-trailing-slash" });
  });

  it("is valid for routes without trailing slash", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(pathNoTrailingSlashRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @route("/pets") @get op read(): string;
      `)
      .toBeValid();
  });
});
