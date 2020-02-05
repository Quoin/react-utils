export default (path) => path.replace(/:([a-zA-Z_][\w]*)/g, '{$1}');
