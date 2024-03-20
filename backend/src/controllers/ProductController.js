import Product from '../models/ProductModel.js'
import removeFile from '../utils/RemoveFile.js';

const getProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.perPage) || 10
    const skip = (page - 1) * perPage;

    const products = await Product.find().populate('category').skip(skip).limit(perPage)
    const totalRecords = await Product.countDocuments()

    return res.status(200).json({
        status: 200,
        data: { products, totalRecords, page, perPage }
    })
}

const createProduct = async (req, res) => {
    let product = await Product.create({
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        image: req.file?.path,
        description: req.body.description
    })

    if (!product) {
        return res.status(400).json({ status: 400, error: "Something went wrong" })
    }

    product = await Product.findById(product._id).populate('category')

    return res.status(200).json({
        status: 200,
        data: { product },
        message: "Product created successfully"
    })
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    let existingProduct = await Product.findById(productId);

    if (!existingProduct) {
        return res.status(404).json({ status: 404, error: "Product not found" });
    }

    existingProduct.name = req.body.name
    existingProduct.brand = req.body.brand
    existingProduct.category = req.body.category
    existingProduct.price = req.body.price
    existingProduct.image = req.file ? req.file.path : req.body.old_file;
    existingProduct.description = req.body.description

    try {
        await existingProduct.save();
        const product = await Product.findById(productId).populate('category')

        if (req.file)
            removeFile(req.body.old_file)

        return res.status(200).json({
            status: 200,
            data: { product },
            message: "Product updated successfully"
        })
    } catch (error) {
        return res.status(500).json({ status: 500, error: "Failed to update product" });
    }
}

export {
    getProducts,
    createProduct,
    updateProduct
}