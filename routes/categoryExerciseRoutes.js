const express = require('express');
const router = express.Router();
const {
  createCategoryExercise,
  getCategoryExercise,
  getCategoryExerciseById,
  updateCategoryExercise,
  deleteCategoryExercise
} = require('../controllers/categoryExerciseController');


router.post('/', createCategoryExercise); // Criar nova categoria de exercício
router.get('/', getCategoryExercise); // Listar categorias de exercício
router.get('/:id', getCategoryExerciseById); // Obter categoria de exercício por ID 
router.put('/:id', updateCategoryExercise); // Atualizar categoria de exercício por ID
router.delete('/:id', deleteCategoryExercise); // Excluir categoria de exercício por ID 

module.exports = router;