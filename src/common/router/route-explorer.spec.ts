import { Controller } from "../decorators/controller.decorator";
import { Get, Post } from "../decorators/route.decorator";
import { RouteExplorer } from "./route-explorer";

@Controller('/orders')
class OrderController{
  @Get()
  listOrders() { }

  @Post(':id')
  createOrder() { }

  calculateTax() {}
}

describe('RouteExplorer', () => {
  it('should scan a controller and return all registered route definition', () => {
    const routes = RouteExplorer.explore(OrderController);

    expect(routes).toHaveLength(2);

    expect(routes).toContainEqual({
      httpMethod: 'GET',
      path: '/orders',
      methodName: 'listOrders'
    });

    expect(routes).toContainEqual({
      httpMethod: 'POST',
      path: '/orders/:id',
      methodName: 'createOrder'
    });
  });

  it('should return an empty array if a class has no decorated route methods', () => {
    @Controller('/empty')
    class EmptyController { }

    const routes = RouteExplorer.explore(EmptyController);
    expect(routes).toEqual([]);
  })
})