import { METADATA_KEYS, RouteParamMetadata, RouteParamSource } from "../constants/metadata.keys";

export function createParamDecorators(source: RouteParamSource) {
  return (data?: string): ParameterDecorator => {
    return (
      target: Object,
      propertyKey: string | symbol | undefined,
      parameterIndex: number
    ) => {
      if (!propertyKey) {
        throw new Error(`@${source}() can only be applied to method parameters.`);
      }

      const existingParams: RouteParamMetadata[] =
        Reflect.getOwnMetadata(METADATA_KEYS.ROUTE_PARAMS, target, propertyKey) || [];

      existingParams.push({
        index: parameterIndex,
        source,
        data
      })

      Reflect.defineMetadata(METADATA_KEYS.ROUTE_PARAMS, existingParams, target, propertyKey)
    }
  }
}