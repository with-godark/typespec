import { createTypeSpecLibrary } from '@typespec/compiler';

export const $lib = createTypeSpecLibrary({
  name: '@godark/typespec-linter',
  diagnostics: {},
} as const);

export const { reportDiagnostic, createDiagnostic } = $lib;
