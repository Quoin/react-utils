export default (path) => path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
