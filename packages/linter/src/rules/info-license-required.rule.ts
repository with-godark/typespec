import { createRule, isService } from '@typespec/compiler';
import { resolveInfo } from '@typespec/openapi';

export const infoLicenseRequiredRule = createRule({
  name: 'info-license-required',
  severity: 'warning',
  description: 'Enforce OpenAPI info.license metadata on service namespaces.',
  messages: {
    default: 'Service namespace must define OpenAPI info.license metadata.',
  },
  create: (context) => ({
    namespace: (ns) => {
      if (!isService(context.program, ns)) return;
      const info = resolveInfo(context.program, ns);
      if (!info?.license?.name) {
        context.reportDiagnostic({
          target: ns,
        });
      }
    },
  }),
});
