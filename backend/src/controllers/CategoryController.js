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
        return res.status(409).json({ status: 409, error: "Category already exist" })
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

const updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    let existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
        return res.status(404).json({ status: 404, error: "Category not found" });
    }

    if (req.body.name !== existingCategory.name) {
        const categoryWithSameName = await Category.findOne({ name: req.body.name });
        if (categoryWithSameName) {
            return res.status(409).json({ status: 409, error: "Category with the same name already exists" });
        }
    }

    existingCategory.name = req.body.name;
    existingCategory.image = req.file ? req.file.path : req.body.old_file;

    try {
        const updatedCategory = await existingCategory.save();

        return res.status(200).json({
            status: 200,
            data: { category: updatedCategory },
            message: "Category updated successfully"
        })
    } catch (error) {
        return res.status(500).json({ status: 500, error: "Failed to update category" });
    }
}

export {
    getCategories,
    createCategory,
    updateCategory
}