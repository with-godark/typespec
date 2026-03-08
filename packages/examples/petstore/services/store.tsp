import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "../models/order.tsp";
import "../models/pet.tsp";
import "../models/user.tsp";
import "../shared/generated-helper.tsp";
import "../shared/response.tsp";
import "../properties/status.tsp";

using Http;

namespace GoDark;

/** Returns a map of status codes to quantities */
@tag("store")
@route("/store/inventory")
@get
@summary("Returns pet inventories by status")
op getInventory(): Body<Record<int32>>;

@tag("store")
@route("/store/order")
@post
@summary("Place an order for a pet")
op placeOrder(
  /** order placed for purchasing the pet */
  @body body: Order,
): {
  @header contentType: "application/xml";
  @body body: Order;
} | Order | BadRequestResponse;

/** For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors */
@tag("store")
@route("/store/order/{orderId}")
@delete
@summary("Delete purchase order by ID")
op deleteOrder(
  /** ID of the order that needs to be deleted */
  @minValue(1) @path orderId: int64,
): BadRequestResponse | NotFoundResponse;

/** For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions */
@tag("store")
@route("/store/order/{orderId}")
@get
@summary("Find purchase order by ID")
op getOrderById(
  /** ID of pet that needs to be fetched */
  @minValue(1)
  @maxValue(10)
  @path
  orderId: int64,
):
  | {
      @header contentType: "application/xml";
      @body body: Order;
    }
  | Order
  | BadRequestResponse
  | NotFoundResponse;
