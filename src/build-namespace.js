export default (namespace, name, path) => namespace(path ? `${name}.${path}` : name);
