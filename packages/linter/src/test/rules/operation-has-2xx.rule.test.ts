import { describe, it } from "vitest";
import { operationHas2xxRule } from "../../rules/operation-has-2xx.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("operation-has-2xx rule", () => {
  it("emits diagnostics when operation has no 2xx response", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationHas2xxRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        model NotFound {
          @statusCode code: 404;
          message: string;
        }
        @route("/pets") @get op read(): NotFound;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/operation-has-2xx" });
  });

  it("is valid when operation includes a 2xx response", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(operationHas2xxRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        model Ok {
          @statusCode code: 200;
          body: string;
        }
        @route("/pets") @get op read(): Ok;
      `)
      .toBeValid();
  });
});