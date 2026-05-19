import express from "express"
import pizzasController from "../controllers/pizzaController.js"

//Router() nos ayuda a colocar los metodos
//qe tendra el endpoint

const router = express.Router()

router.route("/")
.get(pizzasController.getPizzas)
.post(pizzasController.insertPizza)

router.route("/low-stock")
.post(pizzasController.getLowStock)

router.route("/price-range")
.post(pizzasController.getPizzaByPriceRange)

router.route("/count")
.post(pizzasController.countPizass)

router.route("/search-name")
.post(pizzasController.searchByName)

router.route("/:id")
.get(pizzasController.getPizzaById)
.put(pizzasController.updatePizza)
.delete(pizzasController.deletePizzas)

export default router