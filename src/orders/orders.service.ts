import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";

export interface Order {
  id: string;
  item: string;
  amount: number;
  status: 'PENDING' | 'PAID';
  createdAt: Date;
}

@Injectable()
export class OrdersService {
  private readonly orders = new Map<string, Order>();

  create(dto: CreateOrderDto): Order {
    const id = `ord_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newOrder: Order = {
      id,
      item: dto.item,
      amount: dto.amount,
      status: 'PENDING',
      createdAt: new Date()
    }

    this.orders.set(id, newOrder);
    return newOrder;
  }

  findById(id: string): Order {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException(`Order with ID "${id}" not found`) 
    }
    return order;
  }
}