import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrdersService, Order } from "./orders.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  create(@Body() dto: CreateOrderDto): Order {
    return this.ordersService.create(dto)
  }

  @Get(':id')
  findById(@Param('id') id: string): Order {
    return this.findById(id)
  }
}