import { createRule, isService, paramMessage } from '@typespec/compiler';
import { getTagsMetadata } from '@typespec/openapi';

export const tagDescriptionRequiredRule = createRule({
  name: 'tag-description-required',
  severity: 'warning',
  description: 'Enforce descriptions on all tag metadata entries.',
  messages: {
    default: paramMessage`Tag '${'tagName'}' must define a description in @tagMetadata.`,
  },
  create: (context) => ({
    namespace: (ns) => {
      if (!isService(context.program, ns)) return;
      const metadata = getTagsMetadata(context.program, ns);
      if (!metadata) return;

      for (const [tagName, details] of Object.entries(metadata)) {
        if (!details?.description || details.description.trim() === '') {
          context.reportDiagnostic({
            format: { tagName },
            target: ns,
          });
        }
      }
    },
  }),
});
