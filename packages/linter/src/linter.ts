import { defineLinter } from '@typespec/compiler';
import { arrayItemsConcreteTypeRule } from './rules/array-items-concrete-type.rule.js';
import { booleanParameterPrefixRule } from './rules/boolean-parameter-prefix.rule.js';
import { documentationRequiredRule } from './rules/documentation-required.rule.js';
import { enumNoDuplicateValuesRule } from './rules/enum-no-duplicate-values.rule.js';
import { enumValueTypeConsistentRule } from './rules/enum-value-type-consistent.rule.js';
import { infoContactRequiredRule } from './rules/info-contact-required.rule.js';
import { infoDescriptionRequiredRule } from './rules/info-description-required.rule.js';
import { infoLicenseRequiredRule } from './rules/info-license-required.rule.js';
import { modelNamePascalCaseRule } from './rules/model-name-pascal-case.rule.js';
import { operationHas2xxRule } from './rules/operation-has-2xx.rule.js';
import { operationIdKebabCaseRule } from './rules/operation-id-kebab-case.rule.js';
import { operationIdRequiredRule } from './rules/operation-id-required.rule.js';
import { operationIdUniqueRule } from './rules/operation-id-unique.rule.js';
import { operationSummaryRule } from './rules/operation-summary.rule.js';
import { parameterDescriptionRequiredRule } from './rules/parameter-description-required.rule.js';
import { pathKebabCaseRule } from './rules/path-kebab-case.rule.js';
import { pathNoHttpVerbRule } from './rules/path-no-http-verb.rule.js';
import { pathNoTrailingSlashRule } from './rules/path-no-trailing-slash.rule.js';
import { pathPluralSegmentsRule } from './rules/path-plural-segments.rule.js';
import { responseContainsHeaderRule } from './rules/response-contains-header.rule.js';
import { propertyNameCamelCaseRule } from './rules/property-name-camel-case.rule.js';
import { responseConcretePayloadRequiredRule } from './rules/response-concrete-payload-required.rule.js';
import { securityReferenceDefinedRule } from './rules/security-reference-defined.rule.js';
import { serverHttpsRequiredRule } from './rules/server-https-required.rule.js';
import { serverNoTrailingSlashRule } from './rules/server-no-trailing-slash.rule.js';
import { serverUrlRequiredRule } from './rules/server-url-required.rule.js';
import { serverVariableEnumRequiredRule } from './rules/server-variable-enum-required.rule.js';
import { tagDefinedRule } from './rules/tag-defined.rule.js';
import { tagDescriptionRequiredRule } from './rules/tag-description-required.rule.js';
import { tagLowerKebabCaseRule } from './rules/tag-lower-kebab-case.rule.js';
import { tagSingularRule } from './rules/tag-singular.rule.js';
import { tagUniqueRule } from './rules/tag-unique.rule.js';

export const $linter = defineLinter({
  rules: [
    modelNamePascalCaseRule,
    documentationRequiredRule,
    propertyNameCamelCaseRule,
    arrayItemsConcreteTypeRule,
    booleanParameterPrefixRule,
    enumNoDuplicateValuesRule,
    enumValueTypeConsistentRule,
    infoContactRequiredRule,
    infoDescriptionRequiredRule,
    infoLicenseRequiredRule,
    operationHas2xxRule,
    operationIdKebabCaseRule,
    operationIdRequiredRule,
    operationIdUniqueRule,
    operationSummaryRule,
    parameterDescriptionRequiredRule,
    pathKebabCaseRule,
    pathNoHttpVerbRule,
    pathNoTrailingSlashRule,
    pathPluralSegmentsRule,
    responseContainsHeaderRule,
    responseConcretePayloadRequiredRule,
    securityReferenceDefinedRule,
    serverHttpsRequiredRule,
    serverNoTrailingSlashRule,
    serverUrlRequiredRule,
    serverVariableEnumRequiredRule,
    tagDefinedRule,
    tagDescriptionRequiredRule,
    tagLowerKebabCaseRule,
    tagSingularRule,
    tagUniqueRule,
  ],
  ruleSets: {
    recommended: {
      enable: {
        [`@godark/typespec-linter/${modelNamePascalCaseRule.name}`]: true,
        [`@godark/typespec-linter/${documentationRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${propertyNameCamelCaseRule.name}`]: true,
        [`@godark/typespec-linter/${arrayItemsConcreteTypeRule.name}`]: true,
        [`@godark/typespec-linter/${booleanParameterPrefixRule.name}`]: true,
        [`@godark/typespec-linter/${enumNoDuplicateValuesRule.name}`]: true,
        [`@godark/typespec-linter/${enumValueTypeConsistentRule.name}`]: true,
        [`@godark/typespec-linter/${infoContactRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${infoDescriptionRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${infoLicenseRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${operationHas2xxRule.name}`]: true,
        [`@godark/typespec-linter/${operationIdKebabCaseRule.name}`]: true,
        [`@godark/typespec-linter/${operationIdRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${operationIdUniqueRule.name}`]: true,
        [`@godark/typespec-linter/${operationSummaryRule.name}`]: true,
        [`@godark/typespec-linter/${parameterDescriptionRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${pathKebabCaseRule.name}`]: true,
        [`@godark/typespec-linter/${pathNoHttpVerbRule.name}`]: true,
        [`@godark/typespec-linter/${pathNoTrailingSlashRule.name}`]: true,
        [`@godark/typespec-linter/${pathPluralSegmentsRule.name}`]: true,
        [`@godark/typespec-linter/${responseContainsHeaderRule.name}`]: true,
        [`@godark/typespec-linter/${responseConcretePayloadRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${securityReferenceDefinedRule.name}`]: true,
        [`@godark/typespec-linter/${serverHttpsRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${serverNoTrailingSlashRule.name}`]: true,
        [`@godark/typespec-linter/${serverUrlRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${serverVariableEnumRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${tagDefinedRule.name}`]: true,
        [`@godark/typespec-linter/${tagDescriptionRequiredRule.name}`]: true,
        [`@godark/typespec-linter/${tagLowerKebabCaseRule.name}`]: true,
        [`@godark/typespec-linter/${tagSingularRule.name}`]: true,
        [`@godark/typespec-linter/${tagUniqueRule.name}`]: true,
      },
    },
  },
});
