import { createRule, isService, paramMessage } from '@typespec/compiler';
import { getServers } from '@typespec/http';

function hasEnumLikeType(type: any): boolean {
  return type.kind === 'Enum' || type.kind === 'Union';
}

export const serverVariableEnumRequiredRule = createRule({
  name: 'server-variable-enum-required',
  severity: 'warning',
  description: 'Enforce enum-like constrained values for server variables.',
  messages: {
    default: paramMessage`Server variable '${'variableName'}' must use an enum-like constrained type.`,
  },
  create: (context) => ({
    namespace: (ns) => {
      if (!isService(context.program, ns)) return;
      const servers = getServers(context.program, ns) ?? [];

      for (const server of servers) {
        for (const [variableName, property] of server.parameters.entries()) {
          if (!hasEnumLikeType(property.type)) {
            context.reportDiagnostic({
              format: { variableName },
              target: property,
            });
          }
        }
      }
    },
  }),
});
