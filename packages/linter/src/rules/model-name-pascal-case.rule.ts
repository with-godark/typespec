import { createRule, paramMessage } from '@typespec/compiler';

export const modelNamePascalCaseRule = createRule({
  name: 'model-name-pascal-case',
  severity: 'warning',
  description: 'Enforce PascalCase model names.',
  messages: {
    default: paramMessage`Model name must match expected casing '${'casing'}'.`,
  },
  create: (context) => {
    return {
      model: (model) => {
        if (!isPascalCaseNoAcronyms(model.name)) {
          context.reportDiagnostic({
            format: { casing: 'PascalCase' },
            target: model,
          });
        }
      },
    };
  },
});

function isPascalCaseNoAcronyms(name: string): boolean {
  if (name === '') return true;
  return /^([A-Z][a-z0-9]+)*[A-Z]?$/.test(name);
}