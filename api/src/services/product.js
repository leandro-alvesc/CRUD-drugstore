import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import loaderConfig from "../config/proto.js";
import path from "path";

const __dirname = path.resolve();

const productDefinition = protoLoader.loadSync(
  path.resolve(__dirname, "./src/pb/product.proto"),
  loaderConfig
);

const ProductService = grpc.loadPackageDefinition(productDefinition).ProductService;

const ProductClient = new ProductService(
  "localhost:3335",
  grpc.credentials.createInsecure()
);

export default ProductClient;
