export default (path: string): string => path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
