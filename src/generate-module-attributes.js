import cleanKey from './clean-key';

export default (namespace, attributes) => {
  const prefix = cleanKey(namespace || '');

  return Object.freeze(
    (attributes || []).reduce(
      (ATTRIBUTES, attribute) => {
        const key = cleanKey(attribute);
        const value = cleanKey(`${prefix}__${key}`).toLowerCase().replace(/_/g, '-');
        return {
          ...ATTRIBUTES,
          [key]: value,
        };
      },
      {},
    ),
  );
};
