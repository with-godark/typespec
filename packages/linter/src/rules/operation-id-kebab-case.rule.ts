import { createRule, paramMessage } from '@typespec/compiler';
import { isKebabCaseOperationId, resolveOperationId } from './utils.js';

export const operationIdKebabCaseRule = createRule({
  name: 'operation-id-kebab-case',
  severity: 'warning',
  description: 'Enforce kebab-case operationId values.',
  messages: {
    default: paramMessage`operationId '${'operationId'}' must be kebab-case.`,
  },
  create: (context) => ({
    operation: (op) => {
      const operationId = resolveOperationId(context.program, op);
      if (!operationId) return;

      if (!isKebabCaseOperationId(operationId)) {
        context.reportDiagnostic({
          format: { operationId },
          target: op,
        });
      }
    },
  }),
});
