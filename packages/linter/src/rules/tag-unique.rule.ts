import { createRule, paramMessage } from '@typespec/compiler';

export const tagUniqueRule = createRule({
  name: 'tag-unique',
  severity: 'warning',
  description: 'Enforce unique operation tag assignments.',
  messages: {
    default: paramMessage`Tag '${'tagName'}' must not be repeated on the same operation.`,
  },
  create: (context) => ({
    operation: (op) => {
      const seen = new Set<string>();
      for (const decorator of op.decorators) {
        if (decorator.definition?.name !== '@tag') continue;
        const tag = decorator.args[0]?.jsValue;
        if (typeof tag !== 'string') continue;

        if (seen.has(tag)) {
          context.reportDiagnostic({
            format: { tagName: tag },
            target: op,
          });
          continue;
        }
        seen.add(tag);
      }
    },
  }),
});
