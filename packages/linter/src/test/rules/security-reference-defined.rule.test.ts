import { describe, it } from "vitest";
import { securityReferenceDefinedRule } from "../../rules/security-reference-defined.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("security-reference-defined rule", () => {
  it("emits diagnostics when auth config has no schemes", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(securityReferenceDefinedRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @useAuth([])
        namespace PetApi {
          @route("/pets") @get op read(): string;
        }
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/security-reference-defined" });
  });

  it("is valid with defined auth scheme reference", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(securityReferenceDefinedRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @useAuth(ApiKeyAuth<ApiKeyLocation.header, "x-api-key">)
        namespace PetApi {
          @route("/pets") @get op read(): string;
        }
      `)
      .toBeValid();
  });
});