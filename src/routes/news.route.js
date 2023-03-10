import { Router } from "express";
const router = Router();

import {create, findAll, topNews, findById} from "../controllers/news.controller.js";
import { authMiddlware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddlware, create);
router.get("/", authMiddlware, findAll);
router.get("/top", topNews);
router.get("/:id", findById)
export default router;