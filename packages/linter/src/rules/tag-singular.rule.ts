import { createRule, isService, paramMessage } from '@typespec/compiler';
import { getTagsMetadata } from '@typespec/openapi';

function isLikelySingular(name: string): boolean {
  const normalized = name.toLowerCase();
  return !normalized.endsWith('s') || normalized.endsWith('ss');
}

export const tagSingularRule = createRule({
  name: 'tag-singular',
  severity: 'warning',
  description: 'Enforce singular tag names.',
  messages: {
    default: paramMessage`Tag '${'tagName'}' must be singular.`,
  },
  create: (context) => ({
    namespace: (ns) => {
      if (!isService(context.program, ns)) return;
      const metadata = getTagsMetadata(context.program, ns);
      if (!metadata) return;

      for (const tagName of Object.keys(metadata)) {
        if (!isLikelySingular(tagName)) {
          context.reportDiagnostic({
            format: { tagName },
            target: ns,
          });
        }
      }
    },
  }),
});
