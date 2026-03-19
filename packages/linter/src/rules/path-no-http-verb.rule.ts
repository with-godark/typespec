import { createRule, paramMessage } from '@typespec/compiler';
import { getHttpOperation } from '@typespec/http';
import { isPathParameterSegment, splitPathSegments } from './utils.js';

const HTTP_VERBS = new Set(['get', 'put', 'post', 'patch', 'delete', 'head']);

export const pathNoHttpVerbRule = createRule({
  name: 'path-no-http-verb',
  severity: 'warning',
  description: 'Disallow HTTP verbs in literal path segments.',
  messages: {
    default: paramMessage`Path segment '${'segment'}' must not be an HTTP verb.`,
  },
  create: (context) => ({
    operation: (op) => {
      const [httpOperation] = getHttpOperation(context.program, op);
      const segments = splitPathSegments(httpOperation.path);

      for (const segment of segments) {
        if (isPathParameterSegment(segment)) continue;
        const normalized = segment.toLowerCase();
        if (HTTP_VERBS.has(normalized)) {
          context.reportDiagnostic({
            format: { segment },
            target: op,
          });
        }
      }
    },
  }),
});
