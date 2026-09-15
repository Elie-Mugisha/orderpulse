import { METADATA_KEYS } from "../constants/metadata.keys";

export function Controller(prefix: string = ''): ClassDecorator {
  return (target: Function) => {
    const normalizedPrefix = prefix.startsWith('/') ? prefix : `/${prefix}`;
    const cleanPrefix = normalizedPrefix.endsWith('/') && normalizedPrefix.length > 1
      ? normalizedPrefix.slice(0, -1)
      : normalizedPrefix;

    Reflect.defineMetadata(METADATA_KEYS.CONTROLLER_PREFIX, cleanPrefix, target);
  };
}