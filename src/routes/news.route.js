import { Router } from "express";
const router = Router();

import {
    create,
    findAll, 
    topNews, 
    findById, 
    searchByTitle,
    byUser,
    update,
    erase,
    likeNews,

} from "../controllers/news.controller.js";
import { authMiddlware } from "../middlewares/auth.middleware.js";

router.post("/", authMiddlware, create);
router.get("/", findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddlware, byUser);

router.get("/:id", authMiddlware, findById);
router.patch("/:id", authMiddlware, update);
router.delete("/:id", authMiddlware, erase);
router.patch("/like/:id", authMiddlware, likeNews);

export default router;