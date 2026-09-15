import { Controller } from "./controller.decorator";
import { METADATA_KEYS } from "../constants/metadata.keys";

@Controller('/orders')
class OrderController { }

@Controller('customers/')
class CustomerController { }

describe('@Controller decorator', () => {
  it('should attached normalized prefix metadata to the target class', () => {
    const orderPrefix = Reflect.getMetadata(METADATA_KEYS.CONTROLLER_PREFIX, OrderController)
    expect(orderPrefix).toBe('/orders');

    const customersPrefix = Reflect.getMetadata(METADATA_KEYS.CONTROLLER_PREFIX, CustomerController)
    expect(customersPrefix).toBe('/customers')
  })
})