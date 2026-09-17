import { METADATA_KEYS } from "../constants/metadata.keys";
import { InjectionToken } from "./provider.interface";

export interface ParamInjection {
  index: number;
  token: InjectionToken;
}

export function Inject(token: InjectionToken): ParameterDecorator {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    const existing: ParamInjection[] =
      Reflect.getMetadata(METADATA_KEYS.PARAM_INJECTIONS, target) || [];

    existing.push({ index: parameterIndex, token });

    Reflect.defineMetadata(METADATA_KEYS.PARAM_INJECTIONS, existing, target);
  }
}