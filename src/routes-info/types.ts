export interface IRoute {
    name: string;
    route: string;
    path: string;
    template: any;
}

export interface IRouteDefinition {
    name: string;
    path: string;
    routes?: IRouteDefinition[];
}
