import { AsyncLocalStorage } from "node:async_hooks";

export interface RequestStore {
  traceId: string;
  tenantId: string;
}

export class RequestContext {
  private static readonly storage = new AsyncLocalStorage<RequestStore>();

  public static run<T>(store: RequestStore, callback: () => T): T {
    return this.storage.run(store, callback)
  }

  public static current(): RequestStore | undefined {
    return this.storage.getStore();
  }

  public static getTraceId(): string {
    return this.storage.getStore()?.traceId || 'unknown-trace';
  }

  public static getTenantId(): string {
    return this.storage.getStore()?.tenantId || 'unknown-tenant';
  }
}