import { Router } from "express";
import {
  getApplicantStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js";
const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", getApplicantStats);
router.patch("/update-user", updateUser);

export default router;
