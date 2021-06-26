export default (filename, rootPath) => (rootPath && (filename || '').startsWith(rootPath))
  ? filename.substr(rootPath.length + 1)
  : filename;
