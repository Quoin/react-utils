import generateClassname from './generate-classname';

export default (...prefix) => (...suffix) => generateClassname(...prefix, ...suffix);
