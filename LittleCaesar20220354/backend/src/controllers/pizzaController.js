//Aqui en el controlador vamos a definir las funciones que ejecutaram los metodos

//#1- Creo un array de metodos
const pizzasController = {};

//Importo el Schema que voy a utilizar
import pizzasModel from "../models/pizzas.js"

//SELECT
pizzasController.getPizzas = async (req, res) => {
    const pizzas = await pizzasModel.find();
    res.json(pizzas)
}

pizzasController.getPizzaById = async (req, res) => {
    try {
        const pizza = await pizzasModel.findById(req.params.id)

        if (!pizza) {
            return res.status(404).json({message: "Pizza not found"})
        }

        return res.status(200).json(pizza) 
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

pizzasController.getLowStock = async (req, res) => {
    try {
        const pizzas = await pizzasModel.find({stock: {$lt: 5}})

        if (!pizzas) {
            return res.status(404).json({message: "There are not pizzas with low stock"})
        }

        res.status(200).json(pizzas)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

pizzasController.getPizzaByPriceRange = async (req, res) => {
    try {
        const {min, max} = req.body;

        if (min > max) {
            return res.status(400).json({message: "Invalid range"})
        }

        const pizzas = await pizzasModel.find({
            price: {$gte: min, $lte: max}
        })

        if (!pizzas) {
            return res.status(404).json({message: "No pizzas with this price range"})
        }

        return res.status(200).json(pizzas)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

pizzasController.countPizass = async (req, res) => {
    try {
        const count = await pizzasModel.countDocuments()
        return res.status(200).json(count)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

pizzasController.searchByName = async (req, res) => {
    try {
        const {name} = req.body

        const pizzas = await pizzasModel.find({
            name: {$regex: name, $options: "i"}
        })

        if (!pizzas) {
            return res.status(404).json({message: "Pizzas not found with this name"})
        }

            return res.status(200).json(pizzas)
        } catch (error) {
            console.log("error" + error)
            return res.status(500).json({message: "Internal server error"})
        }
}

//INSERT 
pizzasController.insertPizza = async (req, res) => {
    //Solicitar los datos que se van a guardar
    const {name, description, price, stock} = req.body;
    //Guardo en el model
    const newPizza = new pizzasModel({name, description, price,stock});
    //Guardo todo en la base
    newPizza.save();

    res.json({message: "product saved"})
}

//DELETE
pizzasController.deletePizzas = async (req, res) => {
    await pizzasModel.findByIdAndDelete(req.params.id);
    res.json({message: "pizza deleted"})
}

//UPDATE
pizzasController.updatePizza = async (req, res) => {
    const {name, description, price, stock} = req.body;
    await pizzasModel.findByIdAndUpdate(req.params.id, {name, description, price, stock}, {new: true});
    res.json({message: "pizza updated"})
}

export default pizzasController