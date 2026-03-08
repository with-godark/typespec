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

/** This can only be done by the logged in user. */
@tag("user")
@route("/user")
@post
@summary("Create user")
op createUser(
  /** Created user object */
  @body body: User,
): GeneratedHelpers.DefaultResponse<Description = "successful operation">;

@tag("user")
@route("/user/createWithArray")
@post
@summary("Creates list of users with given input array")
op createUsersWithArrayInput(
  /** List of user object */
  @body body: User[],
): GeneratedHelpers.DefaultResponse<Description = "successful operation">;

@tag("user")
@route("/user/createWithList")
@post
@summary("Creates list of users with given input array")
op createUsersWithListInput(
  /** List of user object */
  @body body: User[],
): GeneratedHelpers.DefaultResponse<Description = "successful operation">;

@tag("user")
@route("/user/login")
@get
@summary("Logs user into the system")
op loginUser(
  /** The user name for login */
  @query(#{ explode: true }) username: string,

  /** The password for login in clear text */
  @query(#{ explode: true }) password: string,
): {
  /** calls per hour allowed by the user */
  @header("X-Rate-Limit") XRateLimit?: int32;

  /** date in UTC when token expires */
  @header("X-Expires-After") XExpiresAfter?: utcDateTime;

  @header contentType: "application/xml";
  @body body: string;
} | {
  /** calls per hour allowed by the user */
  @header("X-Rate-Limit") XRateLimit?: int32;

  /** date in UTC when token expires */
  @header("X-Expires-After") XExpiresAfter?: utcDateTime;

  @body body: string;
} | BadRequestResponse;

@tag("user")
@route("/user/logout")
@get
@summary("Logs out current logged in user session")
op logoutUser(
): GeneratedHelpers.DefaultResponse<Description = "successful operation">;

/** This can only be done by the logged in user. */
@tag("user")
@route("/user/{username}")
@delete
@summary("Delete user")
op deleteUser(
  /** The name that needs to be deleted */
  @path username: string,
): BadRequestResponse | NotFoundResponse;

@tag("user")
@route("/user/{username}")
@get
@summary("Get user by user name")
op getUserByName(
  /** The name that needs to be fetched. Use user1 for testing. */
  @path username: string,
):
  | {
      @header contentType: "application/xml";
      @body body: User;
    }
  | User
  | BadRequestResponse
  | NotFoundResponse;

/** This can only be done by the logged in user. */
@tag("user")
@route("/user/{username}")
@put
@summary("Updated user")
op updateUser(
  /** name that need to be updated */
  @path username: string,

  /** Updated user object */
  @body body: User,
): BadRequestResponse | NotFoundResponse;
