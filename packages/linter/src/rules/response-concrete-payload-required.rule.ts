import { createRule } from '@typespec/compiler';
import { getHttpOperation } from '@typespec/http';

function isUnknownLike(type: { kind?: string; name?: string } | undefined): boolean {
  if (!type) return false;
  const kind = type.kind?.toLowerCase();
  const name = type.name?.toLowerCase();
  return (kind === 'scalar' || kind === 'intrinsic' || kind === 'intrinsictype') &&
    (name === 'unknown' || name === 'any');
}

export const responseConcretePayloadRequiredRule = createRule({
  name: 'response-concrete-payload-required',
  severity: 'warning',
  description:
    'Enforce concrete response payload contracts and resolvable content types.',
  messages: {
    default: 'Response payload must be concrete and resolve at least one content type.',
  },
  create: (context) => ({
    operation: (op) => {
      const [httpOperation] = getHttpOperation(context.program, op);

      const hasInvalidResponse = httpOperation.responses.some((r) =>
        r.responses.some((content) => {
          if (!content.body) return false;
          const bodyType = content.body.type as { kind?: string; name?: string };
          const isUnknownBodyType = isUnknownLike(bodyType);
          return content.body.contentTypes.length === 0 || isUnknownBodyType;
        })
      );

      if (hasInvalidResponse) {
        context.reportDiagnostic({
          target: op,
        });
      }
    },
  }),
});