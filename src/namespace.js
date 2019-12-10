export default (key) => key.replace(/@/g, '').replace(/[/_]/g, '-').toUpperCase();
