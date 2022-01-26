import { Application, NextFunction, Request, Response } from "express";
import express = require("express");
import cors = require("cors");
import regionsRoute from "./routes/regions";
import { ApiError } from "./controllers/regions";

const app: Application = express();

app.use(cors());

require("dotenv").config();

app.use(express.json());
app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  if (err.statusCode) {
    res.status(err.statusCode).send(err.message);
  } else {
    console.log(err);
    res.status(500).send("Something unexpected happened");
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Started on port: ${PORT}`);
});

app.use("/api", regionsRoute);
