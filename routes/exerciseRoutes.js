const express = require('express');
const router = express.Router();
const { createExercise, getExerciseByCategory, getExerciseById, updateExercise, deleteExercise } = require('../controllers/exerciseController');


router.post('/', createExercise); // Criar novo exercício
router.get('/', getExerciseByCategory); // Listar exercícios por categoria
router.get('/:id', getExerciseById); // Obter exercício por ID
router.put('/:id', updateExercise); // Atualizar exercício por ID
router.delete('/:id', deleteExercise); // Excluir exercício por ID

module.exports = router;