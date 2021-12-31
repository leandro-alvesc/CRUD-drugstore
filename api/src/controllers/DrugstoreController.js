import DrugstoreClient from "../services/drugstore.js";

class DrugstoreController {
  async index(_, res) {
    DrugstoreClient.getAll(null, (err, data) => {
      if (err) console.error(err);

      console.info("All drugstores", data);
      res.json(data);
    });
  }

  async show(req, res) {
    const { id } = req.params;

    DrugstoreClient.getById({ id: id }, (err, data) => {
      if (err) res.status(404).json({error: err.details});
      else res.json({ drugstore: data });

      console.info("Drugstore", data);
    });
  }

  async store(req, res) {
    const body = req.body;
    const newDrugstore = {
      logo: body.logo,
      name: body.name,
      cnpj: body.cnpj,
      address: body.address,
      business_hours: body.business_hours,
      manager: body.manager,
      phone_number: body.phone_number,
    };

    DrugstoreClient.insert(newDrugstore, (err, data) => {
      if (err) res.status(400).json({error: err.details});
      else res.json({ drugstore: data });

      console.info("Drugstore created", data);
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const body = req.body;
    const updateDrugstore = {
      id: id,
      logo: body.logo,
      name: body.name,
      cnpj: body.cnpj,
      address: body.address,
      business_hours: body.business_hours,
      manager: body.manager,
      phone_number: body.phone_number,
    };

    DrugstoreClient.update(updateDrugstore, (err, data) => {
      if (err) res.status(404).json({error: err.details});
      else res.json({ drugstore: data });

      console.info("Drugstore", data);
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    DrugstoreClient.remove({ id: id }, (err, data) => {
      if (err) res.status(404).json({error: err.details});
      else res.json();

      console.info("Drugstore deleted:", id);
    });
  }
}

export default new DrugstoreController();
