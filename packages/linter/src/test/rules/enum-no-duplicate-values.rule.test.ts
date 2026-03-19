import { describe, it } from "vitest";
import { enumNoDuplicateValuesRule } from "../../rules/enum-no-duplicate-values.rule.js";
import { createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("enum-no-duplicate-values rule", () => {
  it("emits diagnostics when enum values are duplicated", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(enumNoDuplicateValuesRule);
    await tester
      .expect(`
        enum Status {
          A: "ok",
          B: "ok"
        }
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/enum-no-duplicate-values" });
  });

  it("is valid when enum values are unique", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(enumNoDuplicateValuesRule);
    await tester
      .expect(`
        enum Status {
          A: "ok",
          B: "error"
        }
      `)
      .toBeValid();
  });
});