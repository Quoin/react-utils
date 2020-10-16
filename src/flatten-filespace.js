import path from 'path';

const flattenFilespace = (filespace) => {
  if (Array.isArray(filespace)) {
    const [ folder, subFilespace ] = filespace;
    return path.join(path.basename(folder), flattenFilespace(subFilespace));
  } else if (typeof filespace === 'string') {
    return path.basename(filespace);
  } else {
    return '';
  }
};

export default flattenFilespace;
