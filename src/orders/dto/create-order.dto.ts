import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateOrderDto{
  @IsString()
  @IsNotEmpty()
  item: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}

