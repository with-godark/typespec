import { createRule } from '@typespec/compiler';

export const enumValueTypeConsistentRule = createRule({
  name: 'enum-value-type-consistent',
  severity: 'warning',
  description: 'Enforce a consistent literal value type across enum members.',
  messages: {
    default: 'Enum members must use a consistent literal value type.',
  },
  create: (context) => ({
    enum: (type) => {
      let expected: 'string' | 'number' | undefined;
      for (const member of type.members.values()) {
        if (member.value === undefined) continue;
        const current = typeof member.value;
        if (current !== 'string' && current !== 'number') continue;

        if (!expected) {
          expected = current;
          continue;
        }

        if (expected !== current) {
          context.reportDiagnostic({
            target: member,
          });
        }
      }
    },
  }),
});
