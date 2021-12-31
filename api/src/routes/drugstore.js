import { Router } from "express";
import DrugstoreController from "../controllers/DrugstoreController.js";

const router = Router();

router.get("/", DrugstoreController.index);
router.get("/:id", DrugstoreController.show);
router.post("/", DrugstoreController.store);
router.patch("/:id", DrugstoreController.update);
router.delete("/:id", DrugstoreController.destroy);

export default router;
