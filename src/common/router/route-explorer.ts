import { METADATA_KEYS, RouteDefinition, HttpMethod } from "../constants/metadata.keys";

export class RouteExplorer {
  public static explore(controllerClass: Function): RouteDefinition[]{
    const prefix: string =
      Reflect.getMetadata(METADATA_KEYS.CONTROLLER_PREFIX, controllerClass) || '';

    const prototype = controllerClass.prototype;
    const propertyNames = Object.getOwnPropertyNames(prototype);

    const routes: RouteDefinition[] = [];

    for (const propertyName of propertyNames) {
      if (propertyName === 'constructor') {
        continue;
      }

      const method = prototype[propertyName];
      
      if (typeof method !== 'function') {
        continue;
      }

      const httpMethod: HttpMethod | undefined = Reflect.getMetadata(METADATA_KEYS.ROUTE_METHOD, prototype, propertyName);

      const routePath: string | undefined = Reflect.getMetadata(METADATA_KEYS.ROUTE_PATH, prototype, propertyName);

      if (httpMethod && routePath !== undefined) {
        const fullPath = this.combinePaths(prefix, routePath);
        routes.push({
          httpMethod,
          path: fullPath,
          methodName: propertyName
        })
      }
    }

    return routes;
  }

  private static combinePaths(prefix: string, path: string): string {
    const cleanPrefix = prefix.replace(/\/+$/, '');

    if (!path || path === '/') {
      return cleanPrefix === '' ? '/' : cleanPrefix
    }
    
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const combined = `${cleanPrefix}${cleanPath}`;

    return combined.replace(/\/+/g, '/');
  }
}