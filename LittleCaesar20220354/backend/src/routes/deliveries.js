import express from "express";
import devliveriesController from "../controllers/deliveriesController.js"
import deliveriesController from "../controllers/deliveriesController.js";

const router = express.Router()

router.route("/")
.get(deliveriesController.gtDeliveries)
.post(deliveriesController.insertDeliveries)

router.route("/:id")
.put(deliveriesController.updateDeliveries)
.delete(devliveriesController.deleteDeliveries)

export default router