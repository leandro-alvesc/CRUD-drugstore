import DrugstoreClient from "../services/drugstore.js";

class HostController {
  async index(_, res) {
    DrugstoreClient.getAllHosts(null, (err, data) => {
      if (err) console.error(err);

      console.info("All hosts", data);
      res.json(data);
    });
  }

  async show(req, res) {
    const { id } = req.params;

    DrugstoreClient.getHostById({ id: id }, (err, data) => {
      if (err) res.status(404).json({error: err.details});
      else res.json({ host: data });

      console.info("Drugstore", data);
    });
  }

  async store(req, res) {
    const body = req.body;
    const newHost = {
      id: body.id,
      drugstores: body.drugstores
    };

    DrugstoreClient.insertHost(newHost, (err, data) => {
      if (err) res.status(400).json({error: err.details});
      else res.json({ drugstore: data });

      console.info("Drugstore created", data);
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const body = req.body;
    const option = body.option;

    body.id = id;

    if (option === "add") {
      DrugstoreClient.InsertDrugstoreToHost(body, (err, data) => {
        if (err) res.status(404).json({error: err.details});
        else res.json({ host: data });
  
        console.info("Host", data);
      });
    } else if (option === "remove") {
      DrugstoreClient.RemoveDrugstoreFromHost(body, (err, data) => {
        if (err) res.status(404).json({error: err.details});
        else res.json({ host: data });
  
        console.info("Host", data);
      });
    } else {
      res.status(400).json({error: "Invalid option"})
    }
  }

  async destroy(req, res) {
    const { id } = req.params;

    DrugstoreClient.removeHost({ id: id }, (err, data) => {
      if (err) res.status(404).json({error: err.details});
      else res.json();

      console.info("Drugstore deleted:", id);
    });
  }
}

export default new HostController();
