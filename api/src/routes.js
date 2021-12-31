import { Router } from "express";
import DrugstoreController from "./controllers/DrugstoreController.js";

const router = Router();

router.get("/drugstores", DrugstoreController.index);
router.get("/drugstores/:id", DrugstoreController.show);
router.post("/drugstores", DrugstoreController.store);
router.patch("/drugstores/:id", DrugstoreController.update);
router.delete("/drugstores/:id", DrugstoreController.destroy);

export default router;
