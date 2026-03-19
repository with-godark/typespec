import { describe, it } from "vitest";
import { serverVariableEnumRequiredRule } from "../../rules/server-variable-enum-required.rule.js";
import { HttpOpenApiImports, createRuleTesterWithHttpOpenApi } from "./test-helpers.js";

describe("server-variable-enum-required rule", () => {
  it("emits diagnostics for unconstrained server variable", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(serverVariableEnumRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @server("https://{region}.example.com", "prod", {
          region: string;
        })
        namespace PetApi;
      `)
      .toEmitDiagnostics({ code: "@godark/typespec-linter/server-variable-enum-required" });
  });

  it("is valid for enum-like constrained server variable", async () => {
    const tester = await createRuleTesterWithHttpOpenApi(serverVariableEnumRequiredRule);
    await tester
      .expect(`
        ${HttpOpenApiImports}
        @service(#{ title: "Pet API" })
        @server("https://{region}.example.com", "prod", {
          region: "us" | "eu";
        })
        namespace PetApi;
      `)
      .toBeValid();
  });
});