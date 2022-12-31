import express from "express";
import TollCalculationController from "controllers/TollCalculationController";
import "express-group-routes";

const router = express.Router();

router.post("/tollEntry", TollCalculationController.TollEntry);
router.post("/tollExit/:id", TollCalculationController.TollExist);

module.exports = router;
