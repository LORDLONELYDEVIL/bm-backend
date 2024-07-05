import express from 'express';
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModels.js';
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";


const app = express();
app.use(express.json());//middleware for parsing request to body

//middleware for handling cors policy
//option1:Allow all origins with default of cors(*)
app.use(cors());
//option2 :allow custom origins
// app.use(cors({
//     origin: "https://books-store-mini.netlify.app/",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ['Content-Type'],
// }));

app.get("/", (request, response) => {
    //console.log(request);
    return response.status(200).send("Welcome");
})

app.use("/books", bookRoute);



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("connected");
        app.listen(PORT, () => {
            console.log(`app is listening to port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);

    })
