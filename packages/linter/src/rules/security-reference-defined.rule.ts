import { createRule } from '@typespec/compiler';
import { getHttpOperation } from '@typespec/http';

export const securityReferenceDefinedRule = createRule({
  name: 'security-reference-defined',
  severity: 'warning',
  description:
    'Enforce defined authentication schemes for operation security requirements.',
  messages: {
    default: 'Operation security must reference at least one defined authentication scheme.',
  },
  create: (context) => ({
    operation: (op) => {
      const [httpOperation] = getHttpOperation(context.program, op);
      const auth = httpOperation.authentication;
      if (!auth) return;

      const hasScheme = auth.options.some((opt) => opt.schemes.length > 0);
      if (!hasScheme) {
        context.reportDiagnostic({
          target: op,
        });
      }
    },
  }),
});
