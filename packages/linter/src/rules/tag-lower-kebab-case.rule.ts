import { createRule, isService, paramMessage } from '@typespec/compiler';
import { getTagsMetadata } from '@typespec/openapi';
import { isKebabCase } from './utils.js';

export const tagLowerKebabCaseRule = createRule({
  name: 'tag-lower-kebab-case',
  severity: 'warning',
  description: 'Enforce lower-kebab-case tag names.',
  messages: {
    default: paramMessage`Tag '${'tagName'}' must be lower-kebab-case.`,
  },
  create: (context) => ({
    namespace: (ns) => {
      if (!isService(context.program, ns)) return;
      const metadata = getTagsMetadata(context.program, ns);
      if (!metadata) return;

      for (const tagName of Object.keys(metadata)) {
        if (!isKebabCase(tagName)) {
          context.reportDiagnostic({
            format: { tagName },
            target: ns,
          });
        }
      }
    },
  }),
});
