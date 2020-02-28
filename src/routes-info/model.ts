import express from 'express';

import generateRoutes from './generate-routes';
import { IRoute } from './types';

class RoutesInfo {
  _routes: IRoute[];

  constructor() {
      this._routes = [];
  }

  configure(definitions: IRoute[]): void {
      this._routes = generateRoutes(definitions, []);
  }

  register(app: express.Application, controller: express.RequestHandler): void {
      this._routes.forEach((route) => {
          app.get(route.route, controller);
      });
  }

  to(name: string, params: { [index: string]: any }): string {
      const foundRoute = this._routes.find((route) => route.name === name);
      if (foundRoute) {
          return foundRoute.template.expand(params);
      } else {
          return '';
      }
  }

  path(name: string): string {
      const foundRoute = this._routes.find((route) => route.name === name);
      return foundRoute ? foundRoute.route : '';
  }
}

export default RoutesInfo;
