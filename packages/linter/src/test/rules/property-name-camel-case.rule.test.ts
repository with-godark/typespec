import {
  type LinterRuleTester,
  createLinterRuleTester,
  createTestRunner,
} from "@typespec/compiler/testing";
import { beforeEach, describe, it } from "vitest";
import { propertyNameCamelCaseRule } from "../../rules/property-name-camel-case.rule.js";

describe("property-name-camel-case rule", () => {
  let ruleTester: LinterRuleTester;

  beforeEach(async () => {
    const runner = await createTestRunner();
    ruleTester = createLinterRuleTester(
      runner,
      propertyNameCamelCaseRule,
      "@godark/typespec-linter"
    );
  });

  it("emits diagnostics when property is not camelCase", async () => {
    await ruleTester
      .expect(`
        model Pet {
          PetName: string;
        }
      `)
      .toEmitDiagnostics({
        code: "@godark/typespec-linter/property-name-camel-case",
        message: "Property 'PetName' must be camelCase.",
      });
  });

  it("is valid when all properties are camelCase", async () => {
    await ruleTester
      .expect(`
        model Pet {
          petName: string;
          petAge1: int32;
        }
      `)
      .toBeValid();
  });
});