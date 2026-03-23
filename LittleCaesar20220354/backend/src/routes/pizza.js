import express from "express"
import pizzasController from "../controllers/pizzaController.js"

//Router() nos ayuda a colocar los metodos
//qe tendra el endpoint

const router = express.Router()

router.route("/")
.get(pizzasController.getPizzas)
.post(pizzasController.insertPizza)

router.route("/:id")
.put(pizzasController.updatePizza)
.delete(pizzasController.deletePizzas)

export default router