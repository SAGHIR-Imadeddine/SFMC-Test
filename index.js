import express from "express";
import conf from "./config/appConfig.js";
import router from "./routes/appRoutes.js";
import authRouter from "./routes/authRoutes.js";
import automationRouter from "./routes/automationRoutes.js";
import session from "express-session";

const app = express();
const port = conf.port || 3000;

app.use(
  session({
    secret: conf.sessionSecret,
    resave: true,
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
