import express from "express"
import pizzaRoutes from "./src/routes/pizza.js"
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js"
import customersRoutes from "./src/routes/customers.js";


//Creo una constante que es igual a la libreria Express
const app = express();

//Para que la API acepte json
app.use(express.json());

app.use("/api/pizzas", pizzaRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/registerCustomer")

export default app;