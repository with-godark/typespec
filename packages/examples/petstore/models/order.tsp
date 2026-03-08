import "../properties/order-status.tsp";

model Order {
  id: int64;
  petId: int64;
  quantity: int32;
  shipDate: utcDateTime;

  /** Order Status */
  status: OrderStatus;

  complete: boolean;
}
