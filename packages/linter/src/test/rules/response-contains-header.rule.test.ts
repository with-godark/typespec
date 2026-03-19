import { describe, it } from "vitest";
import { responseContainsHeaderRule } from "../../rules/response-contains-header.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("response-contains-header rule", () => {
  it("emits diagnostics when body response has no headers", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(responseContainsHeaderRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        model Ok {
          @statusCode code: 200;
          @body body: string;
        }
        @route("/pets") @get op read(): Ok;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/response-contains-header" });
  });

  it("is valid when body response includes headers", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(responseContainsHeaderRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        model Ok {
          @statusCode code: 200;
          @header etag: string;
          @body body: string;
        }
        @route("/pets") @get op read(): Ok;
      `)
      .toBeValid();
  });
});