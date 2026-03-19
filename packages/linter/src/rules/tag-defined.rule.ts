import { createRule, paramMessage } from '@typespec/compiler';
import { getTagsMetadata } from '@typespec/openapi';
import { findServiceNamespace, getOperationTags } from './utils.js';

export const tagDefinedRule = createRule({
  name: 'tag-defined',
  severity: 'warning',
  description: 'Enforce declaration of operation tags in service tag metadata.',
  messages: {
    default: paramMessage`Tag '${'tagName'}' must be declared in @tagMetadata.`,
  },
  create: (context) => ({
    operation: (op) => {
      const serviceNs = findServiceNamespace(context.program, op);
      if (!serviceNs) return;

      const metadata = getTagsMetadata(context.program, serviceNs) ?? {};
      const tags = getOperationTags(context.program, op);

      for (const tag of tags) {
        if (!(tag in metadata)) {
          context.reportDiagnostic({
            format: { tagName: tag },
            target: op,
          });
        }
      }
    },
  }),
});
