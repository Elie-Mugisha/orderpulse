import { METADATA_KEYS } from "../constants/metadata.keys";

export function Injectable(): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata(METADATA_KEYS.INJECTABLE, true, target)
  }
}