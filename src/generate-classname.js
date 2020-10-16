const cleanClassChunk = (chunk) => chunk.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-*/, '').replace(/-*$/, '');

export default (...chunks) => chunks.map(cleanClassChunk).join('--');
