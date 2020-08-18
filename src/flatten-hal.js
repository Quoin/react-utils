import cloneDeep from 'lodash/cloneDeep';

const flatten = ({
  _links: links,
  _embedded: embedded,
  ...data
}) => {
  const clone = cloneDeep(data);

  Object.entries(clone).forEach(([key, value]) => {
    // eslint-disable-next-line no-underscore-dangle
    if (value && (value._links || value._embedded)) {
      clone[key] = flatten(value);
    }
  });

  if (links) {
    if (clone.links) {
      throw new Error("Duplicate key 'links'.");
    }
    clone.links = cloneDeep(links);
  }

  if (embedded) {
    Object.keys(embedded).forEach((key) => {
      if (clone[key]) {
        throw new Error(`Duplicate key '_embedded.${key}'.`);
      }
      clone[key] = embedded[key].map(flatten);
    });
  }

  return clone;
};

export default flatten;
