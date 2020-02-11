export default (path: string) => path.replace(/:([a-zA-Z_][\w]*)/g, '{$1}');
