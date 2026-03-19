import { createRule, isService } from '@typespec/compiler';
import { getServers } from '@typespec/http';

export const serverHttpsRequiredRule = createRule({
  name: 'server-https-required',
  severity: 'warning',
  description: 'Enforce HTTPS server URLs.',
  messages: {
    default: 'Server URL must use HTTPS.',
  },
  create: (context) => ({
    namespace: (ns) => {
      if (!isService(context.program, ns)) return;
      const servers = getServers(context.program, ns) ?? [];
      if (servers.some((s) => !s.url.toLowerCase().startsWith('https://'))) {
        context.reportDiagnostic({
          target: ns,
        });
      }
    },
  }),
});
