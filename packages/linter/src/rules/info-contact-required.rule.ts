import { createRule, isService } from '@typespec/compiler';
import { resolveInfo } from '@typespec/openapi';

export const infoContactRequiredRule = createRule({
  name: 'info-contact-required',
  severity: 'warning',
  description: 'Enforce OpenAPI info.contact metadata on service namespaces.',
  messages: {
    default: 'Service namespace must define OpenAPI info.contact metadata.',
  },
  create: (context) => ({
    namespace: (ns) => {
      if (!isService(context.program, ns)) return;
      const info = resolveInfo(context.program, ns);
      if (!info?.contact) {
        context.reportDiagnostic({
          target: ns,
        });
      }
    },
  }),
});
