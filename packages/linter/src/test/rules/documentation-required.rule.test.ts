import {
  type LinterRuleTester,
  createLinterRuleTester,
  createTestRunner,
} from "@typespec/compiler/testing";
import { documentationRequiredRule } from "../../rules/documentation-required.rule.js";
import { beforeEach, describe, it } from "vitest";

describe("documentation-required rule", () => {
  let ruleTester: LinterRuleTester;

  beforeEach(async () => {
    const runner = await createTestRunner();
    ruleTester = createLinterRuleTester(
      runner,
      documentationRequiredRule,
      "@godark/typespec-linter"
    );
  });

  describe("models", () => {
    it("emits diagnostics when model documentation is missing", async () => {
      await ruleTester.expect(`model Foo {}`).toEmitDiagnostics({
        code: "@godark/typespec-linter/documentation-required",
        message: "Model must include documentation.",
      });
    });

    it("is valid when model documentation is present", async () => {
      await ruleTester.expect(`@doc("documentation") model Bar {}`).toBeValid();
    });
  });
});