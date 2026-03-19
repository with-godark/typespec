import { describe, it } from "vitest";
import { enumValueTypeConsistentRule } from "../../rules/enum-value-type-consistent.rule.js";
import { createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("enum-value-type-consistent rule", () => {
  it("emits diagnostics for mixed enum literal types", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(enumValueTypeConsistentRule);
    await tester
      .expect(`
        enum Mixed {
          One: 1,
          Two: "2"
        }
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/enum-value-type-consistent" });
  });

  it("is valid when enum literal types are consistent", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(enumValueTypeConsistentRule);
    await tester
      .expect(`
        enum Status {
          One: 1,
          Two: 2
        }
      `)
      .toBeValid();
  });
});