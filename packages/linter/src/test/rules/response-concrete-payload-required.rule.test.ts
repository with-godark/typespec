import { describe, it } from "vitest";
import { responseConcretePayloadRequiredRule } from "../../rules/response-concrete-payload-required.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("response-concrete-payload-required rule", () => {
  it("emits diagnostics when response payload is unknown", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(responseConcretePayloadRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        model Ok {
          @statusCode code: 200;
          @body body: unknown;
        }
        @route("/pets") @get op read(): Ok;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/response-concrete-payload-required" });
  });

  it("is valid when response payload is concrete", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(responseConcretePayloadRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        model Ok {
          @statusCode code: 200;
          @body body: string;
        }
        @route("/pets") @get op read(): Ok;
      `)
      .toBeValid();
  });
});