import {
  createLinterRuleTester,
  createTestRunner,
  type LinterRuleTester,
} from "@typespec/compiler/testing";
import { beforeEach, describe, it } from "vitest";
import { modelNamePascalCaseRule } from "../../rules/model-name-pascal-case.rule.js";

describe("model-name-pascal-case rule", () => {
  let ruleTester: LinterRuleTester;

  beforeEach(async () => {
    const runner = await createTestRunner();
    ruleTester = createLinterRuleTester(
      runner,
      modelNamePascalCaseRule,
      "@godark/typespec-linter"
    );
  });

  it("emits diagnostics when a model name is not PascalCase", async () => {
    await ruleTester.expect(`model fooBar {}`).toEmitDiagnostics({
      code: "@godark/typespec-linter/model-name-pascal-case",
      message: "Model name must match expected casing 'PascalCase'.",
    });
  });

  it("is valid when a model name is PascalCase", async () => {
    await ruleTester.expect(`model FooBar {}`).toBeValid();
  });
});