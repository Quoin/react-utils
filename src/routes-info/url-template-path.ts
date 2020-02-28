export default (path: string): string => path.replace(/:([a-zA-Z_][\w]*)/g, '{$1}');
