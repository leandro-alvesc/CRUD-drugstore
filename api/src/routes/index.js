import { Router } from "express";
import drugstore from "./drugstore.js";
import hosts from "./hosts.js";
import product from "./product.js"

let router = Router();

router.use("/drugstores", drugstore);
router.use("/hosts", hosts);
router.use("/products", product);

export default router;
