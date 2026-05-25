import cart from "../models/cart.js"
import cartModel from "../models/cart.js"
import pizzasModel from "../models/pizzas.js"


const cartController = {}

cartController.getAllCarts = async (req, res) => {
    try {
        const carts = await cartModel.find()
        .populate("customerId", "name email")
        .populate("products.productId", "name")

        return res.status(200).json(carts)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

cartController.insertCart = async (req, res) => {
    try {
        //Solicitar los datos
        const {customerId, products, status} = req.body

        //Variable para guardar el total
        let total = 0

        //Arreglo de productos
        let newProducts = []

        for (let i = 0; i < products.length; i++) {
            const pizzaFound = await pizzasModel.findById(products[i].productId)
            
            const subtotal = pizzaFound.price * products[i].quantity

            total += subtotal

            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

        const newCart  = await cartModel({
            customerId,
            products: newProducts,
            total,
            status
        })

        await newCart.save()

        return res.status(200).json({message: "Cart saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

cartController.updateCart = async (req, res) => {
    try {
        const {customerId, products, status} = req.body

        let total = 0

        let newProducts = []

        for (let i = 0; i < products.length; i++) {
            const pizzaFound = await pizzasModel.findById(products[i].productId)

            const subtotal = pizzaFound.price * products[i].quantity
            
            total += subtotal

            newProducts.push({
                productId: products[i].productId,
                quantity: products[i].quantity,
                subtotal: subtotal
            })
        }

        await cartModel.findByIdAndUpdate(req.params.id, {
            customerId,
            products: newProducts,
            total,
            status
        }, {new: true})

        return res.status(200).json({message: "Cart updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

cartController.deleteCart = async (req, res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id)
        return res.status(200).json({message: "Cart deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default cartController