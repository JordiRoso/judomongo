import { Router } from "express";
const router = Router();

/*GET home page.*/ 
router.get("/",function (req, res,next){
    return res.send("Bienvenidos a mi aplicacion buscador de resultados de Judo");
});

export default router;