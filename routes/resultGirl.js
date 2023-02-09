import { Router } from "express";
const router = Router();


import CompetitionGirlController from"../controllers/CompetitionGirlController.js";

//Routes para Chicas

// router.get("/competition/:_id",ResultCrontollerGirl.getAllByCompetition);
router.post("/girl",CompetitionGirlController.create);
// router.get("/:name/:year",CompetitionGirlController.getByNameAndYear);
router.get("/:_id",CompetitionGirlController.getById);
// router.get("/nombre/:name",CompetitionGirlController.getByName);
router.get("/buscar/search", CompetitionGirlController.search);
router.delete("/:id", CompetitionGirlController.deleteResult);
router.patch("/:id", CompetitionGirlController.update);

export default router;