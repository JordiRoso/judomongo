import {Router} from "express";
const router = Router();

import indexRouter from"./routes/index.js";


//routes
router.use("/", indexRouter);


export default router;