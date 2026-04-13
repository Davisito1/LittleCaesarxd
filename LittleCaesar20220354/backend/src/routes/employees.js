import express from "express"
import employeesController from "../controllers/employeesController.js"

const router = express.Router();

router.route("/")
.get(employeesController.getEmployes)
.post(employeesController.insertEmployee);

router.route("/:id")
.put(employeesController.updateEmployee)
.delete(employeesController.deleteEmployee);

export default router;