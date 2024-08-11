import express from "express";
import {
  addBusinesesController,
  Busineses,
  deleteOneBusinesesController,
  getOneBusinesesController,
  updateBusinesesController,


} from "../controllers/BusinesesController";
import { protect } from "../middlewares/protect";
import { optionalProtect } from "../middlewares/optionalprotect";
const router = express.Router();
router.delete("/delete/:id", protect, deleteOneBusinesesController);   
router.post("/add", protect, addBusinesesController);
router.get("/", optionalProtect, Busineses);


router.get("/one/:id", optionalProtect, getOneBusinesesController);
router.put("/update/:id", protect, updateBusinesesController);

export default router;
