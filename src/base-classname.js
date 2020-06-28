const cleanClassChunk = (chunk) => chunk.replace(/[.-]+/g, '-');

export default (name, prefix) => {
  if (!name) {
    return '';
  }

  const cleanName = cleanClassChunk(name);

  if (prefix) {
    const cleanPrefix = cleanClassChunk(prefix);
    return [cleanPrefix, cleanName].join('--');
  }

  return cleanName;
};
