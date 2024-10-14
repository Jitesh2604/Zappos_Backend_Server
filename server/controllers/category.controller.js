const Category = require("../models/category.model")

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

exports.addCategories = async (req, res) => {
    try {
        let category;
        if(Array.isArray(req.body)) {
            category = await Category.insertMany(req.body);
        } else {
            category = await Category.create(req.body);
        }
        await categories.save();
        res.status(201).json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
