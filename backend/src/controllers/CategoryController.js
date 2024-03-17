import Category from '../models/CategoryModel.js'

const getCategories = async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const perPage = parseInt(req.query.perPage) || 10
    const skip = (page - 1) * perPage;

    const categories = await Category.find().skip(skip).limit(perPage)
    const totalRecords = await Category.countDocuments()

    return res.status(200).json({
        status: 200,
        data: { categories, totalRecords, page, perPage }
    })
}

const createCategory = async (req, res) => {
    let existCategory = await Category.findOne({ name: req.body.name });

    if (existCategory) {
        return res.status(400).json({ error: "Category already exist" })
    }

    let category = await Category.create({
        name: req.body.name,
        image: req.file?.path
    })

    if (!category) {
        return res.status(400).json({ status: 400, error: "Something went wrong" })
    }
    
    return res.status(200).json({
        status: 200,
        data: { category },
        message: "Category created successfully"
    })
}

export {
    getCategories,
    createCategory
}