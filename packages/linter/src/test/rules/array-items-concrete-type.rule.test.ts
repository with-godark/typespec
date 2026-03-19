import { describe, it } from "vitest";
import { arrayItemsConcreteTypeRule } from "../../rules/array-items-concrete-type.rule.js";
import { createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("array-items-concrete-type rule", () => {
  it("emits diagnostics when array item type is unknown", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(arrayItemsConcreteTypeRule);
    await tester
      .expect(`
        model ItemContainer {
          items: unknown[];
        }
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/array-items-concrete-type" });
  });

  it("is valid when array item type is concrete", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(arrayItemsConcreteTypeRule);
    await tester
      .expect(`
        model ItemContainer {
          items: string[];
        }
      `)
      .toBeValid();
  });
});