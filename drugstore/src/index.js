import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

import implementation from "./implementation.js";

const __dirname = path.resolve();

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "./src/pb/drugstore.proto"),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  }
);

const drugstoreProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(drugstoreProto.DrugstoreService.service, implementation);
server.bindAsync(
  "localhost:3334",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.info("Server running at port 3334");
    server.start();
  }
);
