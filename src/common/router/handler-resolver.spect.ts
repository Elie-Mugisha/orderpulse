import { Post } from "../decorators/route.decorator";
import { Body, Headers, Param } from "../decorators/param.decorator";
import { HandlerResolver } from "./handler-resolver";
import { HttpRequestContext } from "./http-context";

class CreateOrderDto {
  itemId: string = '';
  quantity: number = 0;

  isBulkOrder(): boolean {
    return this.quantity > 10;
  }
}

class OrderController {
  @Post('/:orderId')
  createOrder(
    @Headers('x-tenant-id') tenantId: string,
    @Param('orderId') orderId: string,
    @Body() dto: CreateOrderDto
  ) {
    return {
      tenantId,
      orderId,
      dto,
      isBulk: dto.isBulkOrder()
    };
  }
}

describe('HandlerResolver', () => {
  it('should extract request parameters, instantiate concrete DTOs, and invoke the handler', async () => {
    const controller = new OrderController();

    const mockRequest: HttpRequestContext = {
      headers: { 'x-tenant-id': 'tenant-1' },
      params: { orderId: 'ord_1' },
      query: {},
      body: { itemId: 'item_alpha', quantity: 25 },
    };

    const result = await HandlerResolver.resolveAndExecute(controller, 'createOrder', mockRequest)

    expect(result).toEqual({
      tenantId: 'tenant-1',
      orderId: 'ord_1',
      dto: expect.any(CreateOrderDto),
      isBulk: true,
    });

    expect(result.dto.itemId).toBe('item_alpha');
    expect(result.dto.quantity).toBe(25);
    expect(result.dto.isBulkOrder()).toBe(true);
  })
})