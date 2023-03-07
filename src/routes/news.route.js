import { Router } from "express";
const router = Router();

import {create, findAll} from "../controllers/news.controller.js";
import { authMiddlware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddlware, create);
router.get("/", authMiddlware, findAll);

export default router;