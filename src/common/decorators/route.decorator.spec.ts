import { Get, Post } from "./route.decorator";
import { METADATA_KEYS } from "../constants/metadata.keys";

class OrderController {
  @Get()
  findAll() {
    return [];
  }

  @Post('/checkout')
  createOrder() {
    return {status: 'created'}
  }
}


describe('Route Method Decorators', () => {
  it('should attach HTTP method and sub-path metadata to class methods', () => {
    const proto = OrderController.prototype;

    const findAllMethod = Reflect.getMetadata(METADATA_KEYS.ROUTE_METHOD, proto, 'findAll');
    const findAllPath = Reflect.getMetadata(METADATA_KEYS.ROUTE_PATH, proto, 'findAll');

    expect(findAllMethod).toBe('GET');
    expect(findAllPath).toBe('');

    const createMethod = Reflect.getMetadata(METADATA_KEYS.ROUTE_METHOD, proto, 'createOrder');
    const createPath = Reflect.getMetadata(METADATA_KEYS.ROUTE_PATH, proto, 'createOrder');

    expect(createMethod).toBe('POST');
    expect(createPath).toBe('/checkout');
  })
})