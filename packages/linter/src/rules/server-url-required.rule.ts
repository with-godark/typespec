import { createRule, isService } from '@typespec/compiler';
import { getServers } from '@typespec/http';

export const serverUrlRequiredRule = createRule({
  name: 'server-url-required',
  severity: 'warning',
  description: 'Enforce at least one non-empty server URL on service namespaces.',
  messages: {
    default: 'Service namespace must define at least one non-empty server URL.',
  },
  create: (context) => ({
    namespace: (ns) => {
      if (!isService(context.program, ns)) return;
      const servers = getServers(context.program, ns) ?? [];
      if (servers.length === 0 || servers.some((s) => !s.url || s.url.trim() === '')) {
        context.reportDiagnostic({
          target: ns,
        });
      }
    },
  }),
});
