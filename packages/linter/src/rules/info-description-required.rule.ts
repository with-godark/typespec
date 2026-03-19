import { createRule, isService } from '@typespec/compiler';
import { resolveInfo } from '@typespec/openapi';

export const infoDescriptionRequiredRule = createRule({
  name: 'info-description-required',
  severity: 'warning',
  description: 'Enforce OpenAPI info.description metadata on service namespaces.',
  messages: {
    default: 'Service namespace must define OpenAPI info.description metadata.',
  },
  create: (context) => ({
    namespace: (ns) => {
      if (!isService(context.program, ns)) return;
      const info = resolveInfo(context.program, ns);
      if (!info?.description || info.description.trim() === '') {
        context.reportDiagnostic({
          target: ns,
        });
      }
    },
  }),
});
