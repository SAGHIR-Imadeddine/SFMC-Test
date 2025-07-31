import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";
import { createServer } from "https";
import conf from "./config/appConfig.js";
import router from "./routes/appRoutes.js";
import authRouter from "./routes/authRoutes.js";
import automationRouter from "./routes/automationRoutes.js";
import session from "express-session";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = conf.port || 3000;

const options = {
  key: readFileSync(path.join(__dirname, "cert", "key.pem")),
  cert: readFileSync(path.join(__dirname, "cert", "cert.pem")),
};
app.use(
  session({
    secret: conf.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);
app.set("view engine", "ejs");

app.use("/", router);
app.use("/auth", authRouter);
app.use("/automations", automationRouter);

const server = createServer(options, app);
server.listen(port, () =>
  console.log(`App listening on https://127.0.0.1:${port}/`)
);
