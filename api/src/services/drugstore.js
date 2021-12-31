import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import loaderConfig from "../config/proto.js";
import path from "path";

const __dirname = path.resolve();

const drugstoreDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "./src/pb/drugstore.proto"),
  loaderConfig
);

const DrugstoreService = grpc.loadPackageDefinition(drugstoreDefinition).DrugstoreService;

const drugstoreClient = new DrugstoreService(
  "localhost:3334",
  grpc.credentials.createInsecure()
);

export default drugstoreClient;
