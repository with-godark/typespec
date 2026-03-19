import { createRule, paramMessage } from '@typespec/compiler';
import { getHttpOperation } from '@typespec/http';
import { isLikelyPluralWord, isPathParameterSegment, splitPathSegments } from './utils.js';

const EXCEPTIONS = new Set(['health', 'status', 'metrics']);

export const pathPluralSegmentsRule = createRule({
  name: 'path-plural-segments',
  severity: 'warning',
  description: 'Enforce plural resource path segments.',
  messages: {
    default: paramMessage`Path segment '${'segment'}' must be plural.`,
  },
  create: (context) => ({
    operation: (op) => {
      const [httpOperation] = getHttpOperation(context.program, op);
      const segments = splitPathSegments(httpOperation.path);

      for (const segment of segments) {
        if (isPathParameterSegment(segment)) continue;
        const normalized = segment.toLowerCase();
        if (EXCEPTIONS.has(normalized)) continue;
        if (!isLikelyPluralWord(normalized)) {
          context.reportDiagnostic({
            format: { segment },
            target: op,
          });
        }
      }
    },
  }),
});
