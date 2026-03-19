import { createRule } from '@typespec/compiler';
import { getHttpOperation } from '@typespec/http';

export const pathNoTrailingSlashRule = createRule({
  name: 'path-no-trailing-slash',
  severity: 'warning',
  description: 'Disallow trailing slashes in paths except for the root path.',
  messages: {
    default: 'Path must not end with a trailing slash.',
  },
  create: (context) => ({
    operation: (op) => {
      const [httpOperation] = getHttpOperation(context.program, op);
      const path = httpOperation.path;
      if (path.length > 1 && path.endsWith('/')) {
        context.reportDiagnostic({
          target: op,
        });
      }
    },
  }),
});
