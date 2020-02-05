import urlTemplate from 'url-template';

import simpleClean from './simple-clean';
import urlTemplatePath from './url-template-path';

const generateRoutes = (definitions, routes, parentPath = '/') => definitions.reduce(
    (routes, definition) => {
        if (!definition.name) {
            throw new Error(`Route definition missing 'name'.`);
        } else if (!definition.path) {
            throw new Error(`Route definition missing 'path'.`);
        }

        const path = `${parentPath}/${definition.path}`;
        const route = simpleClean(path);

        const foundName = routes.find((route) => route.name === definition.name);
        if (foundName) {
            throw new Error(`Route name '${definition.name}' already in use.`);
        }

        const foundRoute = routes.find((r) => r.route === route);
        if (foundRoute) {
            throw new Error(`Route path '${route}' already in use.`);
        }

        const routeInfo = {
            name: definition.name,
            route,
            path: urlTemplatePath(route),
            template: urlTemplate.parse(urlTemplatePath(route))
        };

        if (definition.routes) {
            return generateRoutes(definition.routes, routes.concat(routeInfo), path);
        } else {
            return routes.concat(routeInfo);
        }
    },
    routes
);

export default generateRoutes;
