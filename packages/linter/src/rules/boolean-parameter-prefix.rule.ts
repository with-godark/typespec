import { createRule, paramMessage } from '@typespec/compiler';
import { isPathParam, isQueryParam } from '@typespec/http';

const PREFIXES = ['is', 'has', 'can', 'should', 'enable', 'include'];

function hasAllowedPrefix(name: string): boolean {
  return PREFIXES.some((p) => name.startsWith(p));
}

export const booleanParameterPrefixRule = createRule({
  name: 'boolean-parameter-prefix',
  severity: 'warning',
  description: 'Enforce approved prefixes for boolean HTTP parameters.',
  messages: {
    default: paramMessage`Boolean parameter '${'parameterName'}' must start with one of: ${'prefixes'}.`,
  },
  create: (context) => ({
    operation: (op) => {
      for (const param of op.parameters.properties.values()) {
        const isHttpParam =
          isQueryParam(context.program, param) || isPathParam(context.program, param);
        if (!isHttpParam) continue;

        if (param.type.kind === 'Scalar' && param.type.name === 'boolean') {
          if (!hasAllowedPrefix(param.name)) {
            context.reportDiagnostic({
              format: {
                parameterName: param.name,
                prefixes: PREFIXES.join(', '),
              },
              target: param,
            });
          }
        }
      }
    },
  }),
});
