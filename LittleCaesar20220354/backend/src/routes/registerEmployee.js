import express from 'express';
import adminsController from '../controllers/adminsController.js';

const router = express.Router();

router.get("/")
.get(adminsController.getAdmins)

router.route('/:id')
.put(adminsController.updateAdmin)
.delete(adminsController.deleteAdmin);