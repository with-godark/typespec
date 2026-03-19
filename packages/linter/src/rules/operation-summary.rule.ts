import { createRule } from '@typespec/compiler';
import { getSummary } from '@typespec/compiler';

export const operationSummaryRule = createRule({
  name: 'operation-summary',
  severity: 'warning',
  description: 'Enforce summaries on operations.',
  messages: {
    default: 'Operation must define a summary.',
  },
  create: (context) => ({
    operation: (op) => {
      if (!getSummary(context.program, op)) {
        context.reportDiagnostic({
          target: op,
        });
      }
    },
  }),
});
