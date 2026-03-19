import { createRule } from '@typespec/compiler';
import { getOperationId } from '@typespec/openapi';

export const operationIdRequiredRule = createRule({
  name: 'operation-id-required',
  severity: 'warning',
  description: 'Enforce explicit operationId values on operations.',
  messages: {
    default: 'Operation must define an explicit operationId.',
  },
  create: (context) => ({
    operation: (op) => {
      const operationId = getOperationId(context.program, op);
      if (!operationId || operationId.trim().length === 0) {
        context.reportDiagnostic({
          target: op,
        });
      }
    },
  }),
});
