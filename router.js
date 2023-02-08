import {Router} from "express";
const router = Router();

import indexRouter from"./routes/index.js";
import resultsRouter from "./routes/result.js";
import usersRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";


//routes
router.use("/", indexRouter);
router.use("/results",resultsRouter);
router.use("/users",usersRouter);

//auth
router.use("/auth",authRouter);


export default router;