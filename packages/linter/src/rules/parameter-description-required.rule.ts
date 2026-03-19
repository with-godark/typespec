import { createRule, getDoc, paramMessage } from '@typespec/compiler';

export const parameterDescriptionRequiredRule = createRule({
  name: 'parameter-description-required',
  severity: 'warning',
  description: 'Enforce documentation on operation parameters.',
  messages: {
    default: paramMessage`Parameter '${'parameterName'}' must include documentation.`,
  },
  create: (context) => ({
    operation: (op) => {
      for (const param of op.parameters.properties.values()) {
        if (!getDoc(context.program, param)) {
          context.reportDiagnostic({
            format: { parameterName: param.name },
            target: param,
          });
        }
      }
    },
  }),
});
