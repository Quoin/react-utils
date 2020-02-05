import generateRoutes from './generate-routes';

class RoutesInfo {
    constructor() {
        this._routes = [];
    }

    configure(definitions) {
        this._routes = generateRoutes(definitions, []);
    }

    register(app, controller) {
        this._routes.forEach((route) => {
            app.get(route.route, controller);
        });
    }

    to(name, params) {
        const foundRoute = this._routes.find((route) => route.name === name);
        if (foundRoute) {
            return foundRoute.template.expand(params);
        } else {
            return '';
        }
    }

    path(name) {
        const foundRoute = this._routes.find((route) => route.name === name);
        return foundRoute ? foundRoute.route : '';
    }
}

export default RoutesInfo;
