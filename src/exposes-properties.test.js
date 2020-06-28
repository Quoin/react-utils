import exposesProperty from './exposes-property.test';

export default (clone, properties, propertyType) => {
  properties.forEach((property) => exposesProperty(clone, property, propertyType));
};
