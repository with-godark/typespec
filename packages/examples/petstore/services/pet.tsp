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

@tag("pet")
@route("/pet")
@post
@summary("Add a new pet to the store")
op addPet(
  @header contentType: "application/json" | "application/xml",

  /** Pet object that needs to be added to the store */
  @body body: Pet,
): {
  @statusCode statusCode: 405;
};

@tag("pet")
@route("/pet")
@put
@summary("Update an existing pet")
op updatePet(
  @header contentType: "application/json" | "application/xml",

  /** Pet object that needs to be added to the store */
  @body body: Pet,
): BadRequestResponse | NotFoundResponse | {
  @statusCode statusCode: 405;
};

/** Multiple status values can be provided with comma separated strings */
@tag("pet")
@route("/pet/findByStatus")
@get
@summary("Finds Pets by status")
op findPetsByStatus(
  /** Status values that need to be considered for filter */
  @query(#{ explode: true }) status: Status[],
): {
  @header contentType: "application/xml";
  @body body: Pet[];
} | Body<Pet[]> | BadRequestResponse;

/** Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
@tag("pet")
@route("/pet/findByTags")
@get
@summary("Finds Pets by tags")
op findPetsByTags(
  /** Tags to filter by */
  @query(#{ explode: true }) tags: string[],
): {
  @header contentType: "application/xml";
  @body body: Pet[];
} | Body<Pet[]> | BadRequestResponse;

@tag("pet")
@route("/pet/{petId}")
@delete
@summary("Deletes a pet")
op deletePet(
  @header api_key?: string,

  /** Pet id to delete */
  @path petId: int64,
): BadRequestResponse | NotFoundResponse;

/** Returns a single pet */
@tag("pet")
@route("/pet/{petId}")
@get
@summary("Find pet by ID")
op getPetById(
  /** ID of pet to return */
  @path petId: int64,
):
  | {
      @header contentType: "application/xml";
      @body body: Pet;
    }
  | Pet
  | BadRequestResponse
  | NotFoundResponse
  | GeneratedHelpers.DefaultResponse<Description = "successful response">;

@tag("pet")
@route("/pet/{petId}")
@post
@summary("Updates a pet in the store with form data")
op updatePetWithForm(
  /** ID of pet that needs to be updated */
  @path petId: int64,

  @header contentType: "application/x-www-form-urlencoded",
  @body body: {
    name?: string;
    status?: string;
  },
): {
  @statusCode statusCode: 405;
};

@tag("pet")
@route("/pet/{petId}/uploadImage")
@post
@summary("uploads an image")
op uploadFile(
  /** ID of pet to update */
  @path petId: int64,

  @header contentType: "application/octet-stream",
  @body body: bytes,
): ApiResponse;
