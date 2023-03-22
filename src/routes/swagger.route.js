import { Router } from "express";
const router = Router();

import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../swagger.json";

router.use("/", swaggerUI.serve);
router.use("/", swaggerUI.setup(swaggerDocument))


export default router