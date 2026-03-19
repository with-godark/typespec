import { createRule } from '@typespec/compiler';
import { isArrayModelType } from '@typespec/compiler';

function isUnknownLike(type: { kind?: string; name?: string } | undefined): boolean {
  if (!type) return false;
  const kind = type.kind?.toLowerCase();
  const name = type.name?.toLowerCase();
  return (kind === 'scalar' || kind === 'intrinsic' || kind === 'intrinsictype') &&
    (name === 'unknown' || name === 'any');
}

export const arrayItemsConcreteTypeRule = createRule({
  name: 'array-items-concrete-type',
  severity: 'warning',
  description: 'Enforce concrete item types for array model properties.',
  messages: {
    default: 'Array property items must use a concrete type.',
  },
  create: (context) => ({
    model: (model) => {
      for (const property of model.properties.values()) {
        if (property.type.kind !== 'Model') continue;
        if (!isArrayModelType(context.program, property.type)) continue;

        const itemType = property.type.indexer?.value;
        const isUnknownItem = isUnknownLike(itemType as { kind?: string; name?: string } | undefined);

        if (!itemType || isUnknownItem) {
          context.reportDiagnostic({
            target: property,
          });
        }
      }
    },
  }),
});