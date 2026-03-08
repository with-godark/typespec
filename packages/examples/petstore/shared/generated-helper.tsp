import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

using Http;
using OpenAPI;

namespace GeneratedHelpers {
  @doc(Description)
  @error
  model DefaultResponse<
    Description extends valueof string = "",
    Body = void,
    Headers extends {} = {}
  > {
    @body body: Body;
    ...Headers;
  }
}
