import {
  createLinterRuleTester,
  createTestHost,
  createTestLibrary,
  createTestRunner,
  type LinterRuleTester,
} from '@typespec/compiler/testing';

export async function createRuleTesterWithHttpOpenApi(
  rule: any
): Promise<LinterRuleTester> {
  const httpRoot = decodeURIComponent(
    new URL('../../../node_modules/@typespec/http', import.meta.url).pathname
  );
  const openApiRoot = decodeURIComponent(
    new URL('../../../node_modules/@typespec/openapi', import.meta.url).pathname
  );

  const httpLib = createTestLibrary({
    name: '@typespec/http',
    packageRoot: httpRoot,
  });

  const openapiLib = createTestLibrary({
    name: '@typespec/openapi',
    packageRoot: openApiRoot,
  });

  const host = await createTestHost({
    libraries: [httpLib, openapiLib],
  });
  const runner = await createTestRunner(host);

  return createLinterRuleTester(runner, rule, '@godark/typespec-linter');
}

export const HttpOpenApiImports = `
import "@typespec/http";
import "@typespec/openapi";
using Http;
using OpenAPI;
`;
