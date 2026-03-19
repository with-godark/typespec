import { createRule, paramMessage } from '@typespec/compiler';
import { getOperationId } from '@typespec/openapi';

export const operationIdUniqueRule = createRule({
  name: 'operation-id-unique',
  severity: 'warning',
  description: 'Enforce globally unique explicit operationId values.',
  messages: {
    default: paramMessage`operationId '${'operationId'}' must be globally unique.`,
  },
  create: (context) => {
    const seen = new Set<string>();

    return {
      operation: (op) => {
        const operationId = getOperationId(context.program, op);
        if (!operationId) return;

        if (seen.has(operationId)) {
          context.reportDiagnostic({
            format: { operationId },
            target: op,
          });
          return;
        }

        seen.add(operationId);
      },
    };
  },
});
