export default (clone, property, propertyType) => {
  it(`exposes property '${property}'`, () => {
    expect(clone, `Property '${property}'`).to.have.property(property);
    if (propertyType) {
      expect(clone[property]).to.be.a(propertyType);
    }

    // eslint-disable-next-line no-param-reassign
    delete clone[property];
  });
};
