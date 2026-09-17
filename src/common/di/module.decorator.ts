import { METADATA_KEYS } from "../constants/metadata.keys";
import { Constructor, Provider, InjectionToken } from "./provider.interface";

export interface ModuleMetadata {
  imports?: Constructor[];
  controllers?: Constructor[];
  providers?: Provider[];
  exports?: (Provider | InjectionToken)[];
}

export function Module(metadata: ModuleMetadata): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata(METADATA_KEYS.MODULE, metadata, target);
  }
}