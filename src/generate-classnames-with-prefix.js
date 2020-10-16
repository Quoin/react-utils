import generateClassnameFromPrefix from './generate-classname-from-prefix';

/* eslint max-classes-per-file: ["error", 5] */
class EmptyKeys extends Error {}
class EmptyPrefixes extends Error {}
class InvalidKeys extends Error {}
class InvalidPrefixes extends Error {}
class MissingPrefixes extends Error {}

export const ERRORS = Object.freeze({
  EmptyKeys,
  EmptyPrefixes,
  InvalidKeys,
  InvalidPrefixes,
  MissingPrefixes,
});

export default (prefixes, keys) => {
  if (typeof prefixes === 'undefined') {
    throw new MissingPrefixes();
  }

  if (Array.isArray(prefixes)) {
    if (!prefixes.length) {
      throw new EmptyPrefixes();
    }
  } else if (typeof prefixes === 'string') {
    if (!prefixes) {
      throw new EmptyPrefixes();
    }
  } else {
    throw new InvalidPrefixes();
  }

  if (typeof keys !== 'undefined') {
    if (Array.isArray(keys)) {
      if (!keys.length) {
        throw new EmptyKeys();
      }
    } else if (typeof keys === 'string') {
      if (!keys) {
        throw new EmptyKeys();
      }
    } else {
      throw new InvalidKeys();
    }
  }

  const generateClassname = Array.isArray(prefixes)
    ? generateClassnameFromPrefix(...prefixes)
    : generateClassnameFromPrefix(prefixes);

  return Object.freeze((keys || []).reduce(
    (cumulator, suffix) => {
      const key = suffix
        .replace(/[^A-Za-z0-9]/g, '_')
        .replace(/__+/g, '_')
        .replace(/^_/, '')
        .replace(/_$/, '')
        .toUpperCase();

      const value = key.toLowerCase().replace(/_/g, '-');

      return {
        ...cumulator,
        [key]: generateClassname(value),
      };
    },
    {
      MODULE: generateClassname(),
    },
  ));
};
