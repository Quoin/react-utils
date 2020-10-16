import generateClassnameFromPrefix from './generate-classname-from-prefix';

export default (...prefix) => {
  if (!prefix.length) {
    throw new Error('Expects at least one prefix for MODULE.');
  }

  const generateClassname = generateClassnameFromPrefix(...prefix);

  return (...keys) => {
    return Object.freeze(keys.reduce(
      (cumulator, suffix) => {
        const key = suffix.replace(/[^A-Za-z0-9-_]/g, '').replace(/-/g, '_').replace(/__+/g, '_').toUpperCase();

        return {
          ...cumulator,
          [key]: generateClassname(suffix),
        };
      },
      {
        MODULE: generateClassname(),
      }
    ));
  };
};
