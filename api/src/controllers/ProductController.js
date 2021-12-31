import ProductClient from "../services/product.js";

class ProductController {
  async index(_, res) {
    ProductClient.getAll(null, (err, data) => {
      if (err) console.error(err);

      console.info("All products", data);
      res.json(data);
    });
  }

  async show(req, res) {
    const { id } = req.params;

    ProductClient.getById({ id: id }, (err, data) => {
      if (err) res.status(404).json({error: err.details});
      else res.json({ product: data });

      console.info("Product", data);
    });
  }

  async store(req, res) {
    const body = req.body;
    const newProduct = {
      thumbnail: body.thumbnail,
      name: body.name,
      price: body.price,
      ingredients: body.ingredients,
      availability: body.availability,
      volume: body.volume,
    };

    ProductClient.insert(newProduct, (err, data) => {
      if (err) res.status(400).json({error: err.details});
      else res.json({ product: data });

      console.info("Product created", data);
    });
  }

  async update(req, res) {
    const { id } = req.params;
    const body = req.body;
    const updateProduct = {
      id: id,
      thumbnail: body.thumbnail,
      name: body.name,
      price: body.price,
      ingredients: body.ingredients,
      availability: body.availability,
      volume: body.volume,
    };

    ProductClient.update(updateProduct, (err, data) => {
      if (err) res.status(404).json({error: err.details});
      else res.json({ product: data });

      console.info("Product", data);
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    ProductClient.remove({ id: id }, (err, data) => {
      if (err) res.status(404).json({error: err.details});
      else res.json();

      console.info("Product deleted:", id);
    });
  }
}

export default new ProductController();
