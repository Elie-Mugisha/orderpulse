import { METADATA_KEYS } from "../constants/metadata.keys";
import { Container } from "./container";
import { Constructor, Provider, InjectionToken } from "./provider.interface";
import { ModuleMetadata } from './module.decorator';

export class ModuleCompiler {
  private readonly container = new Container();
  private readonly controllers = new Set<Constructor>();

  public async compile(rootModule: Constructor): Promise<{
    container: Container;
    controllers: Constructor[];
  }> {
    await this.processModule(rootModule);

    return {
      container: this.container,
      controllers: Array.from(this.controllers),
    }
  }

  private async processModule(moduleClass: Constructor): Promise<void> {
    const metadata: ModuleMetadata | undefined = Reflect.getMetadata(METADATA_KEYS.MODULE, moduleClass)

    if (!metadata) {
      throw new Error(`Target class ${moduleClass.name} is not decorated with @Module()`);
    }

    if (metadata.imports) {
      for (const importedModule of metadata.imports) {
        await this.processModule(importedModule)
      }
    }

    if (metadata.providers) {
      this.container.registerAll(metadata.providers);
    }

    if (metadata.controllers) {
      for (const controller of metadata.controllers) {
        this.controllers.add(controller);
        this.container.register(controller);
      }
    }
  }
  
}