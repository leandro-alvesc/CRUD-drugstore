import express from "express";
import router from "./routes/index.js";

const app = express();

app.use(express.json());
app.use("/", router);

console.info("Server running at port 3333");
app.listen(3333);
