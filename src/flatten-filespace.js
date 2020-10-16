import path from 'path';

const flattenFilespace = (filespace) => {
  if (Array.isArray(filespace)) {
    const [folder, subFilespace] = filespace;
    return path.join(path.basename(folder), flattenFilespace(subFilespace));
  }

  if (typeof filespace === 'string') {
    return path.basename(filespace);
  }

  return '';
};

export default flattenFilespace;
