import { type LinterRuleTester, createLinterRuleTester, createTestRunner } from "@typespec/compiler/testing";
import { docRequiredRule } from "../../rules/doc-required.rule.js";
import { beforeEach, describe, it } from "vitest";

describe("doc-required rule", () => {
    let ruleTester: LinterRuleTester;

    beforeEach(async () => {
        const runner = await createTestRunner();
        ruleTester = createLinterRuleTester(runner, docRequiredRule, "@godark/typespec-linter");
    });
    describe("models", () => {
        it("emit diagnostics when doc is missing for model", async () => {
            await ruleTester.expect(`model Foo {}`).toEmitDiagnostics({
                code: "@godark/typespec-linter/no-model-doc",
                message: "Models must be documented.",
            });
        });

        it("should be valid when doc is provided", async () => {
            await ruleTester.expect(`@doc("documentation") model Bar {}`).toBeValid();
        });
    })
});