import Cart from "../models/CartModel.js";

const getCarts = async (req, res) => {
    const carts = await Cart.find({ user: req.user._id }).populate('user').populate('product')

    return res.status(200).json({
        status: 200,
        data: { carts }
    });
}

const createCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id, product: req.body.product })

        if (cart) {
            cart.number_of_product = parseInt(cart.number_of_product) + parseInt(req.body.number_of_product)
            await cart.save()
        }
        else {
            cart = await Cart.create({
                user: req.user._id,
                product: req.body.product,
                number_of_product: req.body.number_of_product
            })
        }

        const newCart = await Cart.findById(cart._id).populate('user').populate('product')

        return res.status(200).json({
            status: 200,
            data: { cart: newCart },
            message: "Product added to your cart."
        })
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: "Something went wrong. Try again later." })
    }
}

const updateCart = async (req, res) => {
    try {
        let cart = await Cart.findById(req.params.id)
        cart.number_of_product = req.body.number_of_product
        await cart.save()

        const updatedcart = await Cart.findById(req.params.id).populate('user').populate('product')

        return res.status(200).json({
            status: 200,
            data: { cart: updatedcart }
        })
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: "Something went wrong. Try again later." })
    }
}

const removeCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id)

        if (!cart || cart.deletedCount === 0)
            return res.status(400).json({ status: 400, error: "Something went wrong. Try again later." })

        return res.status(200).json({
            status: 200,
            message: "Product removed form your cart."
        })
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: "Something went wrong. Try again later." })
    }
}

export {
    getCarts,
    createCart,
    updateCart,
    removeCart
}