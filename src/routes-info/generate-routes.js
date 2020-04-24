import urlTemplate from 'url-template';

import simpleClean from './simple-clean';
import urlTemplatePath from './url-template-path';

const generateRoutes = (
  definitions,
  routes,
  parentPath = '/',
) => definitions.reduce(
  (cumulator, definition) => {
    if (!definition.name) {
      throw new Error('Route definition missing \'name\'.');
    } else if (!definition.path) {
      throw new Error('Route definition missing \'path\'.');
    }

    const path = `${parentPath}/${definition.path}`;
    const route = simpleClean(path);

    const foundName = cumulator.find((aRoute) => aRoute.name === definition.name);
    if (foundName) {
      throw new Error(`Route name '${definition.name}' already in use.`);
    }

    const foundRoute = cumulator.find((r) => r.route === route);
    if (foundRoute) {
      throw new Error(`Route path '${route}' already in use.`);
    }

    const routeInfo = {
      name: definition.name,
      route,
      path: urlTemplatePath(route),
      template: urlTemplate.parse(urlTemplatePath(route)),
    };

    if (definition.routes) {
      return generateRoutes(definition.routes, cumulator.concat(routeInfo), path);
    }
    return cumulator.concat(routeInfo);
  },
  routes,
);

export default generateRoutes;
