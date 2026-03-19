import { createRule } from '@typespec/compiler';
import { getHttpOperation } from '@typespec/http';

export const responseContainsHeaderRule = createRule({
  name: 'response-contains-header',
  severity: 'warning',
  description: 'Enforce at least one header on responses that include a body.',
  messages: {
    default: 'Response with a body must define at least one header.',
  },
  create: (context) => ({
    operation: (op) => {
      const [httpOperation] = getHttpOperation(context.program, op);
      const hasMissingHeaders = httpOperation.responses.some((response) =>
        response.responses.some((content) => {
          if (!content.body) return false;
          const headerCount = content.headers ? Object.keys(content.headers).length : 0;
          return headerCount === 0;
        })
      );

      if (hasMissingHeaders) {
        context.reportDiagnostic({
          target: op,
        });
      }
    },
  }),
});
