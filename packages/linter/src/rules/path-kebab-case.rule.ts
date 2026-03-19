import { createRule, paramMessage } from '@typespec/compiler';
import { getHttpOperation } from '@typespec/http';
import { isKebabCase, isPathParameterSegment, splitPathSegments } from './utils.js';

export const pathKebabCaseRule = createRule({
  name: 'path-kebab-case',
  severity: 'warning',
  description: 'Enforce kebab-case literal path segments.',
  messages: {
    default: paramMessage`Path segment '${'segment'}' must be kebab-case.`,
  },
  create: (context) => ({
    operation: (op) => {
      const [httpOperation] = getHttpOperation(context.program, op);
      const segments = splitPathSegments(httpOperation.path);

      for (const segment of segments) {
        if (isPathParameterSegment(segment)) continue;
        if (!isKebabCase(segment)) {
          context.reportDiagnostic({
            format: { segment },
            target: op,
          });
        }
      }
    },
  }),
});
