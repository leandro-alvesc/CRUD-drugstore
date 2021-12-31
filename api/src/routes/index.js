import { Router } from "express";
import drugstore from "./drugstore.js";

let router = Router();

router.use("/drugstores", drugstore);

export default router;
