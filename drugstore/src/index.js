import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

import implementation from "./implementation.js";

const __dirname = path.resolve();

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "src", "pb", "drugstore.proto"),
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
server.bindAsync("0.0.0.0:3334", grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
