const Exercise = require('../models/exercise'); // Importa o modelo de exercício


// Criar novo usuário
exports.createExercise = async (req, res) => {
    try {
        const { name, description, category, image, repetitions } = req.body;
        const exercise = new Exercise({ name, description, category, image, repetitions });
        await exercise.save();
        res.status(201).json(exercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todos os usuários
exports.getExerciseByCategory = async (req, res) => {
    try {
        // Busca todos os exercícios e popula as informações da categoria associada
        const exercises = await Exercise.find().populate('category');
        
        // Organiza os exercícios agrupados por categoria
        const exercisesByCategory = exercises.reduce((acc, exercise) => {
            const categoryName = exercise.category.category; // Assumindo que o campo 'category' contém o nome da categoria
            if (!acc[categoryName]) {
                acc[categoryName] = []; // Inicializa a categoria caso ainda não exista no acumulador
            }
            acc[categoryName].push(exercise); // Adiciona o exercício à categoria correspondente
            return acc;
        }, {});
        
        res.status(200).json(exercisesByCategory); // Retorna o agrupamento como resposta
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Buscar um usuário específico por ID
exports.getExerciseById = async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID dos parâmetros da URL (ex: /exercise/:id)
        const exercise = await Exercise.findById(id).populate('category'); // Busca pelo ID e popula os dados da categoria

        if (!exercise) {
            return res.status(404).json({ message: 'Exercício não encontrado!' }); // Caso o exercício não exista
        }

        res.status(200).json(exercise); // Retorna o exercício encontrado
    } catch (err) {
        res.status(400).json({ error: err.message }); // Retorna erro caso algo dê errado
    }
};

// Atualizar usuário
exports.updateExercise = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, image, repetitions } = req.body;

        const updatedExercise = await Exercise.findByIdAndUpdate(
            id,
            { name, description, category, image, repetitions },
            { new: true }
        );

        if (!updatedExercise) {
            return res.status(404).json({ message: 'Exercício não encontrado' });
        }

        res.status(200).json(updatedExercise);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir usuário
exports.deleteExercise = async (req, res) => {
    try {
        const { id } = req.params; // Obtém o ID do exercício a partir dos parâmetros da URL

        // Remove o exercício do banco de dados
        const exercise = await Exercise.findByIdAndDelete(id);

        if (!exercise) {
            return res.status(404).json({ message: 'Exercício não encontrado!' }); // Retorna erro se o exercício não existir
        }

        res.status(200).json({ message: 'Exercício removido com sucesso!', exercise });
    } catch (err) {
        res.status(400).json({ error: err.message }); // Retorna erro caso algo dê errado
    }
};