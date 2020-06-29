const cleanClassChunk = (chunk) => chunk.replace(/[.-]+/g, '-');

export default (...chunks) => chunks.map(cleanClassChunk).join('--');
