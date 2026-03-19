import { createRule, isService } from '@typespec/compiler';
import { getServers } from '@typespec/http';

export const serverNoTrailingSlashRule = createRule({
  name: 'server-no-trailing-slash',
  severity: 'warning',
  description: 'Disallow trailing slashes in server URLs.',
  messages: {
    default: 'Server URL must not end with a trailing slash.',
  },
  create: (context) => ({
    namespace: (ns) => {
      if (!isService(context.program, ns)) return;
      const servers = getServers(context.program, ns) ?? [];
      if (servers.some((s) => s.url.length > 1 && s.url.endsWith('/'))) {
        context.reportDiagnostic({
          target: ns,
        });
      }
    },
  }),
});
