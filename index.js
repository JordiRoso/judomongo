import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import  router from "./router.js";
import routerUser from './routes/user.js';
import routerAuth from './routes/auth.js';
import routerResult from './routes/result.js';
import routerResultGirl from './routes/resultGirl.js';

dotenv.config();



const app = express();

const corsOptions = {
   origin: "*",
   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
   preflightContinue: false,
   optionsSuccessStatus: 204,
   };
   
   
   
   
   

//middelware
app.use(json());
app.use(cors(corsOptions));

// routes
app.use(router);
app.use(routerAuth);
app.use(routerUser);
app.use(routerResult);
app.use(routerResultGirl);

const PORT = process.env.PORT || 3000;

db()
   .then(() => {
      app.listen(PORT, () => {
         console.log("Server is running: " + PORT);
      });
   })
   .catch((error) => {
      console.log("Error Connecting to mongoDB", error);
   });
