import express from "express";
import { getAutomations } from "../controllers/automationController.js";

const automationRouter = express.Router();

automationRouter.get("/", getAutomations);

export default automationRouter;
