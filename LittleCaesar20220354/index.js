import app from "./backend/app.js";
import "./backend/database.js"

//Creo una funcion para ejecutar el servidor
async function main() {
    app.listen(4000)
    console.log("Server on port 4000")
}

main()