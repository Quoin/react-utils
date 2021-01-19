export default (key) => (key || '').toUpperCase()
  .replace(/ /g, '_')
  .replace(/[^0-9A-Z_]/g, '')
  .replace(/^_*/, '')
  .replace(/_*$/, '');
