export default (clone, moduleName, importedModule, properties) => {
  describe(moduleName, () => {
    if (Array.isArray(properties)) {
      properties.forEach((property) => {
        if (Array.isArray(property)) {
          const [asProperty, moduleProperty] = property;
          it(`export { ${moduleProperty} as ${asProperty} } from '${moduleName}'`, () => {
            expect(clone, `Property '${asProperty}'`).to.have.property(asProperty);
            expect(clone[asProperty]).to.equal(importedModule[moduleProperty]);
            // eslint-disable-next-line no-param-reassign
            delete clone[asProperty];
          });
        } else {
          it(`export { ${property} } from '${moduleName}'`, () => {
            expect(clone, `Property '${property}'`).to.have.property(property);
            expect(clone[property]).to.equal(importedModule[property]);
            // eslint-disable-next-line no-param-reassign
            delete clone[property];
          });
        }
      });
    } else {
      it(`export { default as ${properties} } from '${moduleName}'`, () => {
        expect(clone).to.have.property(properties);
        expect(clone[properties]).to.equal(importedModule);
        // eslint-disable-next-line no-param-reassign
        delete clone[properties];
      });
    }
  });
};
