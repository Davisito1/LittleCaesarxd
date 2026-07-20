import express from "express"
import pizzaRoutes from "./src/routes/pizza.js"
import branchesRoutes from "./src/routes/branches.js";
import employeesRoutes from "./src/routes/employees.js"
import customersRoutes from "./src/routes/customers.js";
import registerCustomerRoutes from "./src/routes/registerCustomer.js"
import cookieParser from "cookie-parser";
import loginCustomerRoutes from "./src/routes/loginCustomer.js"
import logoutRoutes from "./src/routes/logout.js";
import providersRoutes from "./src/routes/providers.js";
import cartRoutes from "./src/routes/cart.js"
import wompiRoutes from "./src/routes/wompi.js"
import deliveriesRoutes from "./src/routes/deliveries.js"
import cors from "cors"
import { validateAuthCookie } from "./src/middlewares/authMiddleware.js";
import adminRoutes from "./src/routes/admins.js"
import registerAdminRoutes from "./src/routes/registerAdmin.js";
import loginAdminRoutes from "./src/routes/loginAdmin.js"
import limiter from "./src/middlewares/limiter.js";
import swaggerUI from "swagger-ui-express"

//Creo una constante que es igual a la libreria Express
const app = express();

app.use(cors({
    origin: ["https://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.use(cookieParser());

//Para que la API acepte json
app.use(express.json());

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup())

app.use("/api/pizzas", pizzaRoutes)
app.use("/api/branches", branchesRoutes)
app.use("/api/employees", validateAuthCookie(["admin"]), employeesRoutes)
app.use("/api/customers", customersRoutes)
app.use("/api/registerCustomer", registerCustomerRoutes)
app.use("/api/loginCustomer", loginCustomerRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/providers", providersRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/wompi", wompiRoutes)
app.use("/api/deliveries", deliveriesRoutes)
app.use("/api/admins", adminRoutes)
app.use("/api/registerAdmin", registerAdminRoutes)
app.use("/api/loginAdmin", loginAdminRoutes)

export default app;