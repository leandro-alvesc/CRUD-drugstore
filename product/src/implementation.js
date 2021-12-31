import * as grpc from "@grpc/grpc-js";
import { v4 as uuidv4 } from "uuid";

const products = [
  {
    id: uuidv4(),
    thumbnail: "https://image.shutterstock.com/image-photo/paulo-brazil-august-24-2021-600w-2030992343.jpg",
    name: "Dorflex UNO",
    price: 3.55,
    ingredients: ["dipirona sódica monoidratada 1mg"],
    availability: 300,
    volume: 0.5,
  },
  {
    id: uuidv4(),
    thumbnail: "https://image.shutterstock.com/image-photo/huelva-spain-march-6-2021-600w-1930584752.jpg",
    name: "Paracetamol",
    price: 5.93,
    ingredients: ["paracetamol 750mg"],
    availability: 500,
    volume: 0.8,
  },
  {
    id: uuidv4(),
    thumbnail: "https://image.shutterstock.com/image-photo/cassilandia-mato-grosso-do-sul-600w-2078785111.jpg",
    name: "Cimegripe",
    price: 13.79,
    ingredients: ["cloridrato de fenilefrina 4mg", "paracetamol 400mg", "maleato de clorfeniramina 4mg"],
    availability: 245,
    volume: 1.2,
  },
];

const findProduct = (id) => {
  return products.find((p) => p.id === id);
};

const findProductIndex = (id) => {
  return products.findIndex((p) => p.id === id);
};

const implementation = {
  getAll: (_, callback) => {
    callback(null, { products });
  },

  getById: (call, callback) => {
    let product = findProduct(call.request.id);

    product
      ? callback(null, product)
      : callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
  },

  insert: (call, callback) => {
    let product = call.request;

    product.id = uuidv4();
    products.push(product);
    callback(null, product);
  },

  update: (call, callback) => {
    let request = call.request;
    let currentProduct = findProduct(request.id);

    if (currentProduct) {
      currentProduct.logo = request.logo || currentProduct.logo;
      currentProduct.name = request.name || currentProduct.name;
      currentProduct.cnpj = request.cnpj || currentProduct.cnpj;
      currentProduct.address = request.address || currentProduct.address;
      currentProduct.business_hours = request.business_hours || currentProduct.business_hours;
      currentProduct.manager = request.manager || currentProduct.manager;
      currentProduct.phone_number = request.phone_number || currentProduct.phone_number;
      callback(null, currentProduct);
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
    }
  },

  remove: (call, callback) => {
    let currentProductIndex = findProductIndex(call.request.id);

    if (currentProductIndex != -1) {
      products.splice(currentProductIndex, 1);
      callback(null, {});
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
    }
  },
};

export default implementation;
