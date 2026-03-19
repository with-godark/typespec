import { createRule, getDoc, paramMessage } from '@typespec/compiler';

export const documentationRequiredRule = createRule({
  name: 'documentation-required',
  severity: 'warning',
  description: 'Enforce documentation on operations, models, and enums.',
  messages: {
    default: 'Operation must include documentation.',
    models: 'Model must include documentation.',
    enums: paramMessage`Enum '${'enumName'}' must include documentation.`,
  },
  create(context) {
    return {
      operation: (op) => {
        if (!getDoc(context.program, op)) {
          context.reportDiagnostic({
            target: op,
          });
        }
      },
      model: (model) => {
        if (!getDoc(context.program, model)) {
          context.reportDiagnostic({
            messageId: 'models',
            target: model,
          });
        }
      },
      enum: (type) => {
        if (!getDoc(context.program, type)) {
          context.reportDiagnostic({
            messageId: 'enums',
            format: { enumName: type.name },
            target: type,
          });
        }
      },
    };
  },
});