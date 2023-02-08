import { Router } from "express";
const router = Router();


import CompetitionMenController from"../controllers/CompetitionMenController.js";



// router.get("/competition/:_id",ResultCrontollerMen.getAllByCompetition);
router.post("/men",CompetitionMenController.create);
// router.get("/:name/:year",CompetitionMenController.getByNameAndYear);
router.get("/:_id",CompetitionMenController.getById);
// router.get("/nombre/:name",CompetitionMenController.getByName);
router.get("/buscar/search", CompetitionMenController.search);
router.delete("/:id", CompetitionMenController.deleteResult);
router.patch("/:id", CompetitionMenController.update);

export default router;