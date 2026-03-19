import { createRule, paramMessage } from '@typespec/compiler';

export const enumNoDuplicateValuesRule = createRule({
  name: 'enum-no-duplicate-values',
  severity: 'warning',
  description: 'Enforce unique enum values.',
  messages: {
    default: paramMessage`Enum value '${'value'}' must be unique.`,
  },
  create: (context) => ({
    enum: (type) => {
      const seen = new Set<string>();
      for (const member of type.members.values()) {
        const value = String(member.value ?? member.name);
        if (seen.has(value)) {
          context.reportDiagnostic({
            format: { value },
            target: member,
          });
          continue;
        }
        seen.add(value);
      }
    },
  }),
});
