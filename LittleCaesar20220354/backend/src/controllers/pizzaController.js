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