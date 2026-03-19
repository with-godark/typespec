import { createRule, paramMessage } from '@typespec/compiler';

export const propertyNameCamelCaseRule = createRule({
  name: 'property-name-camel-case',
  severity: 'warning',
  description: 'Enforce camelCase model property names.',
  messages: {
    default: paramMessage`Property '${'propertyName'}' must be camelCase.`,
  },
  create: (context) => {
    return {
      model: (model) => {
        for (const property of model.properties.values()) {
          if (!isCamelCase(property.name)) {
            context.reportDiagnostic({
              format: { propertyName: property.name },
              target: property,
            });
          }
        }
      },
    };
  },
});

function isCamelCase(name: string): boolean {
  if (name === '') return true;
  return /^[a-z][a-zA-Z0-9]*$/.test(name);
}