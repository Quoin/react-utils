const namespace = (key) => (key || '').replace(/@/g, '').replace(/[/_]/g, '-').toUpperCase();

export default namespace;
