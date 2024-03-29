import Order from "../models/OrderModel.js";
import Cart from "../models/CartModel.js";
import Product from "../models/ProductModel.js";

const getOrders = async (req, res) => {
    if (req.user.role === 'admin')
        var orders = await Order.find().populate('user').populate('product')
    else {
        const products = await Product.find({ 'vendor': req.user._id });
        const productIds = products.map(product => product._id);
        var orders = await Order.find({ 'product': { $in: productIds } }).populate('user').populate('product')
    }

    return res.status(200).json({
        status: 200,
        data: { orders }
    });
}

const getCustomerOrders = async (req, res) => {
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
                quantity: cart.quantity,
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

const updateOrder = async (req, res) => {
    try {
        let order = await Order.findById(req.params.id)
        order.status = req.body.status
        await order.save()

        const updatedOrder = await Order.findById(req.params.id).populate('user').populate('product')

        return res.status(200).json({
            status: 200,
            data: { order: updatedOrder },
            message: "Order has been updated successfully."
        })
    }
    catch (error) {
        return res.status(400).json({ status: 400, error: "Something went wrong. Try again later." })
    }
}

export {
    getOrders,
    getCustomerOrders,
    createOrder,
    updateOrder
}