import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

import implementation from "./implementation.js";

const __dirname = path.resolve();

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "./src/pb/product.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const productProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(productProto.ProductService.service, implementation);
server.bindAsync(
  "localhost:3335",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.info("Server running at port 3335");
    server.start();
  }
);

