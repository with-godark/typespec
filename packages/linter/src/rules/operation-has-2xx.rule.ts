import { createRule } from '@typespec/compiler';
import { getHttpOperation } from '@typespec/http';

export const operationHas2xxRule = createRule({
  name: 'operation-has-2xx',
  severity: 'warning',
  description: 'Enforce at least one 2xx response per operation.',
  messages: {
    default: 'Operation must define at least one 2xx response.',
  },
  create: (context) => ({
    operation: (op) => {
      const [httpOperation] = getHttpOperation(context.program, op);

      const has2xx = httpOperation.responses.some((r) => {
        if (typeof r.statusCodes === 'number') {
          return r.statusCodes >= 200 && r.statusCodes <= 299;
        }
        if (r.statusCodes === '*') {
          return false;
        }
        return r.statusCodes.start <= 299 && r.statusCodes.end >= 200;
      });

      if (!has2xx) {
        context.reportDiagnostic({
          target: op,
        });
      }
    },
  }),
});
