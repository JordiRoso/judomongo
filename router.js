import {Router} from "express";
const router = Router();

import indexRouter from"./routes/index.js";
import resultsRouter from "./routes/result.js";
import usersRouter from "./routes/user.js";


//routes
router.use("/", indexRouter);
router.use("/results",resultsRouter);
router.use("/users",usersRouter);


export default router;