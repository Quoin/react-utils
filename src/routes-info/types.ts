export type IRoute = {
    name: string;
    route: string;
    path: string;
    template: any;
}

export type IRouteDefinition = {
    name: string;
    path: string;
    routes?: IRouteDefinition[];
}
