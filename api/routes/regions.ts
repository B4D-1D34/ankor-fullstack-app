import express = require("express");
const router = express.Router();

import regionsController from "../controllers/regions";

router.get("/regions/:id", regionsController.getRegion);

router.get("/regions", regionsController.getRegions);

router.post("/regions", regionsController.postRegion);

router.put("/regions/:id", regionsController.putRegion);

router.delete("/regions/:id", regionsController.deleteRegion);

export default router;
