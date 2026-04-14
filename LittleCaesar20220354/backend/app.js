import express from "express"
import pizzaRoutes from "./src/routes/pizza.js"
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js"
import customersRoutes from "./src/routes/customers.js";
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import cookieParser from "cookie-parser";


//Creo una constante que es igual a la libreria Express
const app = express();

app.use(cookieParser());

//Para que la API acepte json
app.use(express.json());

app.use("/api/pizzas", pizzaRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/employees", employeesRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/registerCustomer", registerCustomerRoutes)
app.use("/api/registerEmployee")

export default app;