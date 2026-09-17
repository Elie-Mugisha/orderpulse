import { METADATA_KEYS } from "../constants/metadata.keys";
import { Constructor, InjectionToken, Provider, ClassProvider, ValueProvider, FactoryProvider, ExistingProvider } from "./provider.interface";
import { ParamInjection } from "./inject.decorator";

export class Container {
  private readonly providers = new Map<InjectionToken, Provider>();
  private readonly instances = new Map<InjectionToken, any>();

  public register(provider: Provider): void {
    if (typeof provider === 'function') {
      this.providers.set(provider, provider)
    } else {
      this.providers.set(provider.provide, provider);
    }
  }

  public registerAll(providers: Provider[]): void {
    for (const provider of providers) {
      this.register(provider)
    }
  }

  public async resolve<T>(token: InjectionToken<T>): Promise<T> {
    if (this.instances.has(token)) {
      return this.instances.get(token)
    }
    
    const recipe = this.providers.get(token) || (typeof token === 'function' ? token : undefined);

    if (!recipe) {
      const tokenName = typeof token === 'function' ? token.name : String(token);
      throw new Error(`No provider registered for token: ${tokenName}`)
    }

    let instance: any;

    if (typeof recipe === 'function') {
      instance = await this.instantiateClass(recipe);
    } else if ('useValue' in recipe){
      instance = (recipe as ValueProvider).useValue;
    } else if ('useClass' in recipe) {
      instance = await this.instantiateClass((recipe as ClassProvider).useClass);
    } else if ('useExisting' in recipe) {
      instance = await this.resolve((recipe as ExistingProvider).useExisting);
    } else if ('useFactory' in recipe) {
      const factoryRecipe = recipe as FactoryProvider;
      const injectedTokens = factoryRecipe.inject || [];
      const dependencies = await Promise.all(
        injectedTokens.map((depToken) => this.resolve(depToken))
      )
      instance = await factoryRecipe.useFactory(...dependencies);
    }

    this.instances.set(token, instance);
    return instance;
  }

  private async instantiateClass<T>(target: Constructor<T>): Promise<T> {
    const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', target) || [];

    const explicitInjections: ParamInjection[] =
      Reflect.getOwnMetadata(METADATA_KEYS.PARAM_INJECTIONS, target) || [];

    const explicitMap = new Map<number, InjectionToken>();
    for (const injection of explicitInjections) {
      explicitMap.set(injection.index, injection.token);
    }

    const dependencies = await Promise.all(
      paramTypes.map((paramType, index) => {
        const tokenToResolve = explicitMap.get(index) || paramType;

        if (!tokenToResolve) {
          throw new Error(
            `Cannot resolve parameter at index [${index}] for class ${target.name}. Verify token registration.`
          );
        }
        return this.resolve(tokenToResolve);
      })
    );
    return new target(...dependencies);
  }

  
}