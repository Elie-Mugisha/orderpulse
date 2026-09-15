import { METADATA_KEYS, HttpMethod } from "../constants/metadata.keys";

function createRouteDecorator(method: HttpMethod) {
  return (path: string = ''): MethodDecorator => {
    return (
      target: Object,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor
    ) => {
      const normalizedPath = path.startsWith('/') || path === '' ? path : `/${path}`;

      // Store Http Method (GET, POSt, ...) on the method
      Reflect.defineMetadata(METADATA_KEYS.ROUTE_METHOD, method, target, propertyKey)

      // Store endpoint path e.g('/:id') on the method
      Reflect.defineMetadata(METADATA_KEYS.ROUTE_PATH, normalizedPath, target, propertyKey)
    }
  }
}

export const Get = createRouteDecorator('GET');
export const Post = createRouteDecorator('POST');