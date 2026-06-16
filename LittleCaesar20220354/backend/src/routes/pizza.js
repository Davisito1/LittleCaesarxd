import express from "express"
import pizzasController from "../controllers/pizzaController.js"
import { validateAuthCookie } from "../middlewares/authMiddleware.js"

//Router() nos ayuda a colocar los metodos  
//qe tendra el endpoint

const router = express.Router()

router.route("/")
.get(validateAuthCookie(["admin", "customer"]),pizzasController.getPizzas)
.post(validateAuthCookie(["admin"]), pizzasController.insertPizza)

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
.put(validateAuthCookie("admin", "repartidores"), pizzasController.updatePizza)
.delete(validateAuthCookie("admin"), pizzasController.deletePizzas)

export default router