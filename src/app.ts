import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

// Application routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send(
    `<div style="background: black; border-radius: 15px; width: 700px; height: 200px; margin: auto; margin-top: 50px; display: flex; flex-direction: column; justify-content: center; align-items: center;"><h1 style="color: white; text-align: center;">Welcome to the server of Book Shop!</h1></div>`,
  );
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
