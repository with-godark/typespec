import {
    createLinterRuleTester,
    createTestRunner, type LinterRuleTester,
} from "@typespec/compiler/testing";
import { beforeEach, describe, it } from "vitest";
import {casingRule} from "../../rules/casing.rule.js";

describe("casing rule", () => {
  let ruleTester: LinterRuleTester;

  beforeEach(async () => {
    const runner = await createTestRunner();
    ruleTester = createLinterRuleTester(runner, casingRule, "@godark/typespec-linter");
  });

  describe("models", () => {
    it("emit diagnostics if model is camelCase", async () => {
      await ruleTester.expect(`model fooBar {}`).toEmitDiagnostics({
        code: "@godark/typespec-linter/casing",
        message: "Must match expected casing 'PascalCase'",
      });
    });

    it("should be valid if model is pascal case", async () => {
      await ruleTester.expect(`model FooBar {}`).toBeValid();
    });
  });
});
