import { Router } from "express";
const router = Router();

import UserController from "../controllers/UserController.js";
import isSuperAdmin from "../middelwares/isSuperAdmin.js";
import verifyToken from "../middelwares/verifyToken.js";


router.get("/users", verifyToken, isSuperAdmin, UserController.getAll);
router.get("/",UserController.getAll);
router.get("/:name",UserController.getByName);
router.delete("/delete/:id",UserController.deleteById);



export default router;