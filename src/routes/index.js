import { Router } from "express";
import { sendMail } from "../services/mailing.js";

export const globalRouter = Router();

globalRouter.post('/sendMail', sendMail)