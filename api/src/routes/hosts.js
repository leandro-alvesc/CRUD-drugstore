import { Router } from "express";
import HostController from "../controllers/HostController.js";

const router = Router();

router.get("/", HostController.index);
router.get("/:id", HostController.show);
router.post("/", HostController.store);
router.patch("/:id", HostController.update);
router.delete("/:id", HostController.destroy);

export default router;
