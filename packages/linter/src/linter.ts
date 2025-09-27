import { defineLinter } from '@typespec/compiler';
import { casingRule } from './rules/casing.rule.js';
import { docRequiredRule } from './rules/doc-required.rule.js';

export const $linter = defineLinter({
  rules: [casingRule, docRequiredRule],
  ruleSets: {
    recommended: {
      enable: {
        [`@godark/typespec-linter/${casingRule.name}`]: true,
        [`@godark/typespec-linter/${docRequiredRule.name}`]: true,
      },
    },
  },
});
