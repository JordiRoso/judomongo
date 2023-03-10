import { Router } from "express";
const router = Router();

import CompetitionMenController from "../controllers/CompetitionMenController.js";
import verifyToken from "../middelwares/verifyToken.js";

router.post("/men", CompetitionMenController.create);

router.get("/nombre/:name", CompetitionMenController.getByName);
router.get("/buscar/search", CompetitionMenController.search);
router.delete("/:id", CompetitionMenController.deleteResult);
router.delete("/competition/:id", CompetitionMenController.deleteCompetition);
router.patch("/:id", CompetitionMenController.update);
router.get("/", verifyToken, CompetitionMenController.getAll);
// router.get("/", CompetitionMenController.getAll);
router.get("/judo", CompetitionMenController.ByGetAll);
router.get("/:_id", CompetitionMenController.getByMyId);
router.post("/competitor/:_id", CompetitionMenController.CreateCompetitors);
export default router;
