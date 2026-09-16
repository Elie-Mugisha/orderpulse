import { Controller } from "../decorators/controller.decorator";
import { Get, Post } from "../decorators/route.decorator";
import { Body, Headers, Param } from "../decorators/param.decorator";
import { RouteExplorer } from "./route-explorer";
import { HandlerResolver } from "./handler-resolver";
import { HttpRequestContext } from "./http-context";

class PlaceOrderDto {
  sku: string = '';
  quantity: number = 0;

  get totalItems(): number {
    return this.quantity;
  }
}

@Controller('/api/v1/orders')
class OrderController {
  @Get()
  healthCheck() {
    return { status: 'healthy' };
  }

  @Post('/:orderId')
  placeOrder(
    @Headers('x-tenant-id') tenant: string,
    @Param('orderId') id: string,
    @Body() dto: PlaceOrderDto
  ) {
    return {
      message: 'Order accepted',
      tenant,
      id,
      sku: dto.sku,
      count: dto.totalItems,
    }
  }
}

describe('Route Plumbing Integration (Explorer + Resolver)', () => {
  it('should discover routes at boot time and execute matching handler at request time', async () => {
    const routingTable = RouteExplorer.explore(OrderController);

    expect(routingTable).toHaveLength(2)
    expect(routingTable).toContainEqual({
      httpMethod: 'GET',
      path: '/api/v1/orders',
      methodName: 'healthCheck',
    });
    expect(routingTable).toContainEqual({
      httpMethod: 'POST',
      path: '/api/v1/orders/:orderId',
      methodName: 'placeOrder',
    });

    const matchedRoute = routingTable.find(
      r => r.httpMethod === 'POST' && r.path === '/api/v1/orders/:orderId'
    );
    expect(matchedRoute).toBeDefined();

    const incomingRequest: HttpRequestContext = {
      headers: { 'x-tenant-id': 'tenant-1' },
      params: { orderId: 'ord-1' },
      query: {},
      body: { sku: 'LOGITECH-MX-MASTER', quantity: 3 },
    };

    const controllerInstance = new OrderController();
    const response = await HandlerResolver.resolveAndExecute(controllerInstance, matchedRoute!.methodName, incomingRequest);

    expect(response).toEqual({
      message: 'Order accepted',
      tenant: 'tenant-1',
      id: 'ord-1',
      sku: 'LOGITECH-MX-MASTER',
      count: 3,
    })
  })
})