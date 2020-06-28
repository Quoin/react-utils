export default (clone, properties) => {
  properties.forEach((property) => {
    it(`exposes non-empty string '${property}'`, () => {
      expect(clone[property]).to.be.a('string');
      expect(clone[property]).not.to.be.empty();
      // eslint-disable-next-line no-param-reassign
      delete clone[property];
    });
  });
};
