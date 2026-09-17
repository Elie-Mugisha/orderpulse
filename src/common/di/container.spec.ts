import { Container } from "./container";
import { Injectable } from "./injectable.decorator";
import { Inject } from "./inject.decorator";

const APP_CONFIG = Symbol('APP_CONFIG');
const DB_CONNECTION = 'DB_CONNECTION';

interface AppConfig {
  maxOrdersPerBatch: number;
}

@Injectable()
class OrderRepository {
  public getCount() {
    return 42;
  }
}  

@Injectable()
class PaymentService {
  constructor(
    @Inject(APP_CONFIG) public readonly config: AppConfig,
    @Inject(DB_CONNECTION) public readonly connectionString: string,
    public readonly repo: OrderRepository
  ){}
}

describe('Universal IoC Container (All provider Recipes)', () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  })

  it('resolves Class, Value, Factory, and Existing providers with @Inject tokens', async () => {
    container.registerAll([
      { provide: APP_CONFIG, useValue: { maxOrdersPerBatch: 100 } },
      { provide: DB_CONNECTION, useFactory: async (config: AppConfig) => { return `postgres://db:5432/orders?limit=${config.maxOrdersPerBatch}`; }, inject: [APP_CONFIG] },
      OrderRepository,
      PaymentService,
    ])

    const service = await container.resolve(PaymentService);

    expect(service).toBeInstanceOf(PaymentService);
    expect(service.config.maxOrdersPerBatch).toBe(100);
    expect(service.connectionString).toBe('postgres://db:5432/orders?limit=100');
    expect(service.repo.getCount()).toBe(42);

    const serviceSecondCall = await container.resolve(PaymentService);
    expect(serviceSecondCall).toBe(service)
  })
})