import express from 'express';
import recoveryPasswordController from '../controllers/recoveryPasswordController.js';

const router = express.Router();

router.route("/requestCode", recoveryPasswordController.requestCode);
router.route("/verifyCode", recoveryPasswordController.verifyCode);
router.route("/newPassword", recoveryPasswordController.newPassword);

export default router;