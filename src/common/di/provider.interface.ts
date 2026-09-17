export type Constructor<T = any> = new (...args: any[]) => T
export type InjectionToken<T = any> = string | symbol | Constructor<T>

export interface ClassProvider<T = any> {
  provide: InjectionToken<T>;
  useClass: Constructor<T>;
}

export interface ValueProvider<T = any> {
  provide: InjectionToken<T>;
  useValue: T;
}

export interface FactoryProvider<T = any>{
  provide: InjectionToken<T>;
  useFactory: (...args: any[]) => T | Promise<T>;
  inject?: InjectionToken[];
}

export interface ExistingProvider<T = any> {
  provide: InjectionToken<T>;
  useExisting: InjectionToken<T>;
}

export type Provider<T = any> =
  | Constructor<T>
  | ClassProvider<T>
  | ValueProvider<T>
  | FactoryProvider<T>
  | ExistingProvider<T>;