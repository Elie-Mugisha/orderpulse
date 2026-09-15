import { METADATA_KEYS } from "../constants/metadata.keys";

export function Body(): ParameterDecorator {
  return (
    target: Object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ) => {
    if (!propertyKey) {
      throw new Error(`@Body() can only be applied to method parameters.`);
    }

    Reflect.defineMetadata(METADATA_KEYS.ROUTE_BODY_PARAM_INDEX, parameterIndex, target, propertyKey)
  }
}