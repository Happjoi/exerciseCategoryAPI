const CategoryExercise = require('../models/categoryExercise');

exports.createCategoryExercise = async (req, res) => {
    try {
        const { category, exerciseType } = req.body;
        const categoryExercise = new CategoryExercise({ category, exerciseType });
        await categoryExercise.save();
        res.status(201).json(categoryExercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar as categorias dentro do Tipo de exercicio
exports.getCategoryExercise = async (req, res) => {
    try {
        const categories = await CategoryExercise.find();

        // Agrupar por exerciseType
        const grouped = categories.reduce((acc, category) => {
            const type = category.exerciseType;
            if (!acc[type]) acc[type] = [];
            acc[type].push(category);
            return acc;
        }, {});

        res.status(200).json(grouped);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//pegar a categoria pelo ID
exports.getCategoryExerciseById = async (req, res) => {
    try {
        const categoryExercise = await CategoryExercise.findById(req.params.id);;
        if (!categoryExercise) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }
        res.status(200).json(categoryExercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar a categoria
exports.updateCategoryExercise = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // isso inclui category e/ou exerciseType

        const updatedCategoryExercise = await CategoryExercise.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // garante retorno atualizado e validação
        );

        if (!updatedCategoryExercise) {
            return res.status(404).json({ message: 'Categoria não encontrada' });
        }

        res.status(200).json(updatedCategoryExercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir a categoria
exports.deleteCategoryExercise = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategoryExercise = await CategoryExercise.findByIdAndDelete(id);
        if (!deletedCategoryExercise) return res.status(404).json({ message: 'Categoria não encontrada' });

        res.status(200).json({ message: 'Categoria excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};