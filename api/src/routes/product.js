import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const router = Router();

router.get("/", ProductController.index);
router.get("/:id", ProductController.show);
router.post("/", ProductController.store);
router.patch("/:id", ProductController.update);
router.delete("/:id", ProductController.destroy);

export default router;
