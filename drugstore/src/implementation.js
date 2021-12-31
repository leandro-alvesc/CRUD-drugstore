import * as grpc from "@grpc/grpc-js";
import { v4 as uuidv4 } from "uuid";

const drugstores = [
  {
    id: "219fbd56-8cf1-4cfb-98f4-6540f35929a6",
    logo: "https://image.shutterstock.com/image-vector/pharmacy-logo-design-drugstore-pill-600w-1913369134.jpg",
    name: "FarmaSampa",
    cnpj: "04.111.795/0001-66",
    address: "Rua Patrocínio 673, Jardim Centro Oeste",
    business_hours: "07:00-23:00",
    manager: "Patrícia Betina Letícia Carvalho",
    phone_number: "(11) 3807-9445",
  },
  {
    id: "6b9887a1-778c-4a8c-884a-fb8276d38d7e",
    logo: "https://image.shutterstock.com/image-vector/cross-drugstore-medical-pharmacy-logo-600w-706509610.jpg",
    name: "DrogaHenri",
    cnpj: "80.274.558/0001-02",
    address: "Alameda Raimundo Dantas 882, Cariri",
    business_hours: "08:00-22:00",
    manager: "Sophia Maitê Brito",
    phone_number: "(91) 3741-8368",
  },
  {
    id: "d7f3041e-2a3a-4fb1-adba-66873d435581",
    logo: "https://image.shutterstock.com/image-vector/drug-choicedrugstore-logovector-logo-template-600w-328275176.jpg",
    name: "Drogaria da Cidade",
    cnpj: "47.247.785/0001-65",
    address: "Avenida Machadinho 55, Setor 06",
    business_hours: "00:00-23:59",
    manager: "Manuel Cláudio Gomes",
    phone_number: "(69) 2776-2417",
  },
];

const hosts = [
  {
    id: "219fbd56-8cf1-4cfb-98f4-6540f35929a6",
    drugstores: ["d7f3041e-2a3a-4fb1-adba-66873d435581"],
  },
];

const findDrugstore = (id) => {
  return drugstores.find((d) => d.id === id);
};

const findDrugstoreIndex = (id) => {
  return drugstores.findIndex((d) => d.id === id);
};

const findHostDrugstore = (id) => {
  return hosts.find((h) => h.id === id);
};

const findHostDrugstoreIndex = (id) => {
  return hosts.findIndex((h) => h.id === id);
};

const findDrugstoreInHostIndex = (drugstores, id) => {
  return drugstores.findIndex((d) => d === id);
};

const invalidDrugstores = (drugstores) => {
  let invalid = [];

  drugstores.forEach((d) => {
    if (!findDrugstore(d)) {
      invalid.push(d);
    }
  });

  return invalid;
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
      currentDrugstore.business_hours =
        request.business_hours || currentDrugstore.business_hours;
      currentDrugstore.manager = request.manager || currentDrugstore.manager;
      currentDrugstore.phone_number =
        request.phone_number || currentDrugstore.phone_number;
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

  getAllHosts: (_, callback) => {
    callback(null, { hosts });
  },

  getHostById: (call, callback) => {
    let hostDrugstore = findHostDrugstore(call.request.id);

    hostDrugstore
      ? callback(null, hostDrugstore)
      : callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
  },

  insertHost: (call, callback) => {
    let hostDrugstore = call.request;
    let drugstores = hostDrugstore.drugstores;

    hostDrugstore.drugstores = drugstores ? drugstores : [];

    let invalid = invalidDrugstores(hostDrugstore.drugstores);

    if (!findDrugstore(hostDrugstore.id)) {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Drugstore not found",
      });
    } else if (invalid.length) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: `${invalid}: not found`,
      });
    } else if (findHostDrugstore(hostDrugstore.id)) {
      callback({
        code: grpc.status.ALREADY_EXISTS,
        details: "Host already exists",
      });
    } else if (hostDrugstore.drugstores.length > 3) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: "Limit: 3 drugstores per host",
      });
    } else {
      hosts.push(hostDrugstore);
      callback(null, hostDrugstore);
    }
  },

  removeHost: (call, callback) => {
    let currentHostIndex = findHostDrugstoreIndex(call.request.id);

    if (currentHostIndex != -1) {
      hosts.splice(currentHostIndex, 1);
      callback(null, {});
    } else {
      callback({ code: grpc.status.NOT_FOUND, details: "Not found" });
    }
  },

  insertDrugstoreToHost: (call, callback) => {
    let request = call.request;
    let currentHost = findHostDrugstore(request.id);

    let invalid = invalidDrugstores([request.drugstore]);

    let drugstoreIndex = findDrugstoreInHostIndex(
      currentHost.drugstores,
      request.drugstore
    );

    if (currentHost.drugstores.length === 3) {
      callback({
        code: grpc.status.FAILED_PRECONDITION,
        details: "Host drugstore limit reached",
      });
    } else if (invalid.length) {
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        details: `${invalid}: not found`,
      });
    } else if (drugstoreIndex != -1) {
      callback({
        code: grpc.status.ALREADY_EXISTS,
        details: `${request.drugstore}: already exists`,
      });
    } else {
      currentHost.drugstores.push(request.drugstore);
      callback(null, currentHost);
    }
  },

  removeDrugstoreFromHost: (call, callback) => {
    let request = call.request;
    let currentHost = findHostDrugstore(request.id);

    let drugstoreIndex = findDrugstoreInHostIndex(
      currentHost.drugstores,
      request.drugstore
    );

    if (drugstoreIndex != -1) {
      currentHost.drugstores.splice(drugstoreIndex, 1);
      callback(null, currentHost);
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Drugstore ID not found in host",
      });
    }
  },
};

export default implementation;
