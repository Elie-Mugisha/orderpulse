class CreateOrderDto {
  amount: number = 0;
}

function Entity(): ClassDecorator {
  return () => {}
}

@Entity()
class OrderHarness {
  constructor(public readonly dto: CreateOrderDto) { }
}

describe('Runtime Reflection Plumbin', () => {
  it('should capture constructor parameter types via emitDecoratorMetadata', () => {
    const paramTypes = Reflect.getMetadata('design:paramtypes', OrderHarness);

    expect(paramTypes).toBeDefined();
    expect(paramTypes).toHaveLength(1);
    expect(paramTypes[0]).toBe(CreateOrderDto)
  })
})