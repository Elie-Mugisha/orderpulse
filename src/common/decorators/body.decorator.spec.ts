import { Post } from "./route.decorator";
import { Body } from "./body.decorator";
import { METADATA_KEYS } from "../constants/metadata.keys";

class CreateOrderDto {
  itemId: string = '';
  quantity: number = 0;
}

class OrderController {
  @Post('/checkout')
  createOrder(@Body() dto: CreateOrderDto) {
    return dto;
  }
}


describe('@Body decorator & Runtime Reflection', () => {
  it('should capture the parameter index where @Body() was placed', () => {
    const proto = OrderController.prototype
    const bodyIndex = Reflect.getMetadata(METADATA_KEYS.ROUTE_BODY_PARAM_INDEX, proto, 'createOrder')
    expect(bodyIndex).toBe(0);
  });

  it('should extract the concrete DTO class constructor via design:paramtypes', () => {
    const proto = OrderController.prototype
    const paramtypes = Reflect.getMetadata('design:paramtypes', proto, 'createOrder')
    expect(paramtypes).toBeDefined();
    expect(paramtypes).toHaveLength(1);
    expect(paramtypes[0]).toBe(CreateOrderDto);
  })
})