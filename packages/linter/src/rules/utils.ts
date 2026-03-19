import type { Namespace, Operation, Program } from '@typespec/compiler';
import { getAllTags, isService } from '@typespec/compiler';
import { getOperationId } from '@typespec/openapi';

export function resolveOperationId(program: Program, op: Operation): string {
  return getOperationId(program, op) ?? op.name;
}

export function findServiceNamespace(program: Program, op: Operation): Namespace | undefined {
  let current: Namespace | undefined = op.interface?.namespace ?? op.namespace;
  while (current) {
    if (isService(program, current)) {
      return current;
    }
    current = current.namespace;
  }
  return undefined;
}

export function getOperationTags(program: Program, op: Operation): string[] {
  return getAllTags(program, op) ?? [];
}

export function splitPathSegments(path: string): string[] {
  return path
    .split('/')
    .map((x) => x.trim())
    .filter((x) => x.length > 0);
}

export function isPathParameterSegment(segment: string): boolean {
  return segment.startsWith('{') && segment.endsWith('}');
}

export function isKebabCase(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

const IRREGULAR_PLURALS = new Set(['people', 'children', 'men', 'women', 'teeth', 'feet', 'geese', 'mice']);
const KNOWN_SINGULAR_ENDING_S = new Set(['news', 'business']);

export function isLikelyPluralWord(word: string): boolean {
  const normalized = word.toLowerCase();
  if (IRREGULAR_PLURALS.has(normalized)) return true;
  if (KNOWN_SINGULAR_ENDING_S.has(normalized)) return false;
  if (normalized.endsWith('ies') && normalized.length > 3) return true;
  if (normalized.endsWith('sses') || normalized.endsWith('shes') || normalized.endsWith('ches') || normalized.endsWith('xes') || normalized.endsWith('zes')) {
    return true;
  }
  if (normalized.endsWith('ss')) return false;
  return normalized.endsWith('s') && normalized.length > 1;
}

export function isCamelCase(name: string): boolean {
  return name === '' || /^[a-z][a-zA-Z0-9]*$/.test(name);
}

export function isKebabCaseOperationId(value: string): boolean {
  return isKebabCase(value);
}