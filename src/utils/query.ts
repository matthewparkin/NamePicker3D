import { stringify } from 'qs';

type QueryValue = string | string[] | null | undefined;

const normalizeValue = (value: string | null): string | null => {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  const unquoted = trimmed.replace(/^(['"])(.*)\1$/, '$2').trim();
  if (!unquoted) return null;

  const lowered = unquoted.toLowerCase();
  if (lowered === 'undefined' || lowered === 'null') return null;

  return unquoted;
};

const cleanStringItem = (item: string): string | null => normalizeValue(item);

const valueToString = (value: QueryValue): string | null => {
  if (!value) return null;
  if (Array.isArray(value)) {
    return value.length > 0 ? normalizeValue(value[0]) : null;
  }

  return normalizeValue(value);
};

const valueToArray = (value: QueryValue): string[] => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map(cleanStringItem).filter((item): item is string => Boolean(item));
  }

  const normalized = normalizeValue(value);
  if (!normalized) return [];

  return normalized
    .split(/[\n,;]+/)
    .map(cleanStringItem)
    .filter((item): item is string => Boolean(item));
};

export const parseJsonArray = (param: QueryValue): string[] => valueToArray(param);

export const parseWinner = (value: QueryValue): string | null => valueToString(value);

export const updateUrl = (newWinner: string | null, newLosers: string[], names: string[]) => {
  const cleanLosers = newLosers
    .map(cleanStringItem)
    .filter((item): item is string => Boolean(item));
  const cleanNames = names.map(cleanStringItem).filter((item): item is string => Boolean(item));
  const cleanWinner = normalizeValue(newWinner);

  const params = {
    winner: cleanWinner ?? undefined,
    losers: cleanLosers.length > 0 ? cleanLosers : undefined,
    names: cleanNames.length > 0 ? cleanNames : undefined,
  };

  const query = stringify(params, {
    arrayFormat: 'brackets',
    skipNulls: true,
    encode: true,
  });

  const url = new URL(window.location.href);
  url.search = query;
  window.history.pushState({}, '', url.toString());
};
