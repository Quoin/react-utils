import generateRoutes from './generate-routes';

class RoutesInfo {
  constructor() {
    this.routes = [];
  }

  configure(definitions) {
    this.routes = generateRoutes(definitions, []);
  }

  register(app, controller) {
    this.routes.forEach((route) => {
      app.get(route.route, controller);
    });
  }

  to(name, params) {
    const foundRoute = this.routes.find((route) => route.name === name);
    if (foundRoute) {
      return foundRoute.template.expand(params);
    }
    return '';
  }

  path(name) {
    const foundRoute = this.routes.find((route) => route.name === name);
    return foundRoute ? foundRoute.route.replace(/{\?.*}/, '') : '';
  }
}

export default RoutesInfo;
