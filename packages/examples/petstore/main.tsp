import "@typespec/http";
import "@typespec/openapi";
import "@typespec/openapi3";

import "./models/order.tsp";
import "./models/pet.tsp";
import "./models/user.tsp";
import "./shared/generated-helper.tsp";
import "./shared/response.tsp";
import "./properties/status.tsp";

import "./services/pet.tsp";
import "./services/store.tsp";
import "./services/user.tsp";

using Http;
using OpenAPI;

/** This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters. */
@service(#{ title: "Swagger Petstore" })
@info(#{
  version: "1.0.0",
  contact: #{ email: "apiteam@swagger.io" },
  license: #{
    name: "Apache 2.0",
    url: "http://www.apache.org/licenses/LICENSE-2.0.html",
  },
  termsOfService: "http://swagger.io/terms/",
})
@server("http://petstore.swagger.io/v2")
@tagMetadata(
  "pet",
  #{
    description: "Everything about your Pets",
    externalDocs: #{ url: "http://swagger.io", description: "Find out more" },
  }
)
@tagMetadata("store", #{ description: "Access to Petstore orders" })
@tagMetadata(
  "user",
  #{
    description: "Operations about user",
    externalDocs: #{
      url: "http://swagger.io",
      description: "Find out more about our store",
    },
  }
)
namespace GoDark;
