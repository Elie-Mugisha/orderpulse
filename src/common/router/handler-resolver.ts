import { METADATA_KEYS, RouteParamMetadata } from "../constants/metadata.keys";
import { HttpRequestContext } from "./http-context";

export class HandlerResolver {
  public static async resolveAndExecute(instance: any, methodName: string, request: HttpRequestContext): Promise<any> {
    const prototype = Object.getPrototypeOf(instance);

    const paramMetadata: RouteParamMetadata[] =
      Reflect.getMetadata(METADATA_KEYS.ROUTE_PARAMS, prototype, methodName) || [];

    const paramTypes: Function[] =
      Reflect.getMetadata('design:paramtypes', prototype, methodName) || [];

    const args: any[] = [];   

    for (const param of paramMetadata) {
      let value: any = undefined;

      switch (param.source) {
        case 'body': {
          const TargetType = paramTypes[param.index];

          if (
            TargetType &&
            typeof TargetType === 'function' &&
            TargetType !== Object
          ) {
            value = Object.assign(new (TargetType as any)(), request.body);
          } else {
            value = request.body;
          }
          break;
        }
        case 'param': {
          value = param.data ? request.params[param.data] : request.params
          break;
        }

        case 'query': {
          value = param.data ? request.query[param.data] : request.query
          break;
        }

        case 'headers': {
          const headerKey = param.data ? param.data.toLowerCase() : undefined;
          value = headerKey ? request.headers[headerKey] : request.headers;
          break;
        }
      }
      args[param.index] = value;
    }
    return instance[methodName](...args);
  }
}