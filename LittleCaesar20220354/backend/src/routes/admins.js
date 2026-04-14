import express from "express";
import adminsController from "../controllers/adminsController.js";

const router = express.router();

router.route("/")
.get(adminsController.getAdmins)

router.route('/:id')
.put(adminsController.updateAdmin)
.delete(adminsController.deleteAdmin);

export default router;