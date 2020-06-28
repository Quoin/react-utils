export default (clone, moduleName, importedModule, properties) => {
  describe(moduleName, () => {
    if (Array.isArray(properties)) {
      properties.forEach((property) => {
        it(`exports { ${property} } from '${moduleName}'`, () => {
          expect(clone, `Property '${property}'`).to.have.property(property);
          expect(clone[property]).to.equal(importedModule[property]);
          // eslint-disable-next-line no-param-reassign
          delete clone[property];
        });
      });
    } else {
      it(`exports { default as ${properties} } from '${moduleName}'`, () => {
        expect(clone).to.have.property(properties);
        expect(clone[properties]).to.equal(importedModule);
        // eslint-disable-next-line no-param-reassign
        delete clone[properties];
      });
    }
  });
};
