import { Router } from "express";
import drugstore from "./drugstore.js";
import product from "./product.js"

let router = Router();

router.use("/drugstores", drugstore);
router.use("/products", product);

export default router;
