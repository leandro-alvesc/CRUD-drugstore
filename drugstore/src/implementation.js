import * as grpc from "@grpc/grpc-js";
import { v4 as uuidv4 } from "uuid";

const drugstores = [
  {
    id: uuidv4(),
    logo: "https://image.shutterstock.com/image-vector/pharmacy-logo-design-drugstore-pill-600w-1913369134.jpg",
    name: "FarmaSampa",
    cnpj: "04.111.795/0001-66",
    address: "Rua Patrocínio 673, Jardim Centro Oeste",
    business_hours: "07:00-23:00",
    manager: "Patrícia Betina Letícia Carvalho",
    phone_number: "(11) 3807-9445",
  },
  {
    id: uuidv4(),
    logo: "https://image.shutterstock.com/image-vector/cross-drugstore-medical-pharmacy-logo-600w-706509610.jpg",
    name: "DrogaHenri",
    cnpj: "80.274.558/0001-02",
    address: "Alameda Raimundo Dantas 882, Cariri",
    business_hours: "08:00-22:00",
    manager: "Sophia Maitê Brito",
    phone_number: "(91) 3741-8368",
  },
  {
    id: uuidv4(),
    logo: "https://image.shutterstock.com/image-vector/drug-choicedrugstore-logovector-logo-template-600w-328275176.jpg",
    name: "Drogaria da Cidade",
    cnpj: "47.247.785/0001-65",
    address: "Avenida Machadinho 55, Setor 06",
    business_hours: "00:00-23:59",
    manager: "Manuel Cláudio Gomes",
    phone_number: "(69) 2776-2417",
  },
];

const findDrugstore = (id) => {
  return drugstores.find((d) => d.id === id);
};

const findDrugstoreIndex = (id) => {
  return drugstores.findIndex((d) => d.id === id);
};

const implementation = {
  getAll: (_, callback) => {
    callback(null, { drugstores });
  },

  getById: (call, callback) => {
    let drugstore = findDrugstore(call.request.id);

    drugstore
      ? callback(null, drugstore)
      : callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
  },

  insert: (call, callback) => {
    let drugstore = call.request;

    drugstore.id = uuidv4();
    drugstores.push(drugstore);
    callback(null, drugstore);
  },

  update: (call, callback) => {
    let request = call.request;
    let currentDrugstore = findDrugstore(request.id);

    if (currentDrugstore) {
      currentDrugstore.logo = request.logo || currentDrugstore.logo;
      currentDrugstore.name = request.name || currentDrugstore.name;
      currentDrugstore.cnpj = request.cnpj || currentDrugstore.cnpj;
      currentDrugstore.address = request.address || currentDrugstore.address;
      currentDrugstore.business_hours = request.business_hours || currentDrugstore.business_hours;
      currentDrugstore.manager = request.manager || currentDrugstore.manager;
      currentDrugstore.phone_number = request.phone_number || currentDrugstore.phone_number;
      callback(null, currentDrugstore);
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
    }
  },

  remove: (call, callback) => {
    let currentDrugstoreIndex = findDrugstoreIndex(call.request.id);

    if (currentDrugstoreIndex != -1) {
      drugstores.splice(currentDrugstoreIndex, 1);
      callback(null, {});
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
    }
  },
};

export default implementation;
