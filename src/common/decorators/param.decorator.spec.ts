import { Post } from "./route.decorator";
import { Body, Headers, Param } from "./param.decorator";
import { METADATA_KEYS, RouteParamMetadata } from "../constants/metadata.keys";

class CreateOrderDto {
  itemId: string = '';
  quantity: number = 0;
}

class OrderController {
  @Post('/checkout')
  createOrder(
    @Headers('x-tenant-id') tenantId: string,
    @Param('orderId') orderId: string,
    @Body() dto: CreateOrderDto
  ) {
    return {tenantId, orderId, dto};
  }
}


describe("Parameter Metadata Collection", () => {
  it('should collect all parameter descriptors without overwriting', () => {
    const proto = OrderController.prototype;
    const params: RouteParamMetadata[] = Reflect.getOwnMetadata(
      METADATA_KEYS.ROUTE_PARAMS,
      proto,
      'createOrder'
    );

    expect(params).toBeDefined();
    expect(params).toHaveLength(3);
    expect(params[0]).toEqual({ index: 2, source: 'body', data: undefined });
    expect(params[1]).toEqual({ index: 1, source: 'param', data: 'orderId' });
    expect(params[2]).toEqual({ index: 0, source: 'headers', data: 'x-tenant-id' });
  })

  it('should preserve concrete types in design:paramtypes for all 3 arguments', () => {
    const proto = OrderController.prototype;
    const paramTypes = Reflect.getMetadata('design:paramtypes', proto, 'createOrder');

    expect(paramTypes).toHaveLength(3);
    expect(paramTypes[0]).toBe(String);
    expect(paramTypes[1]).toBe(String);
    expect(paramTypes[2]).toBe(CreateOrderDto);
  })
})