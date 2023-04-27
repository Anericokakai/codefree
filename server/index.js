// ! import of the dependencies

import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { signuproute } from "./routes/registrationroute.js";
import connection from "./database/connection.js";
// !configuration  of the app
const app = express();
dotenv.config();
console.log(process.env.PORT);
const connected=connection()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

connected.then(()=>{
    console.log(' data base connected succsefully  connected')
}).then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`app listenng at http://localhost:${process.env.PORT}`);
      });
})


app.post("/api/signup", signuproute);

