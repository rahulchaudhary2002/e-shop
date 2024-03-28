import Order from "../models/OrderModel.js";
import Cart from "../models/CartModel.js";

const getOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('user').populate('product')

    return res.status(200).json({
        status: 200,
        data: { orders }
    });
}

const createOrder = async (req, res) => {
    try {
        await Promise.all(req.body.carts.map(async cart => {
            await Order.create({
                user: req.user._id,
                product: cart.product._id,
                number_of_product: cart.number_of_product,
                address: `${req.body.province}, ${req.body.district}, ${req.body.municipality}, ${req.body.street}`
            });
            await Cart.findByIdAndDelete(cart._id);
        }));

        return res.status(200).json({
            status: 200,
            message: "Your order has been received."
        })
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: "Something went wrong. Try again later." })
    }
}

export {
    getOrders,
    createOrder,
}