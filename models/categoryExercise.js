const mongoose = require('mongoose');

const categoryExerciseSchema = new mongoose.Schema({
    
    category: {
        type: String, 
        required: true,
        unique: true
    },
    exerciseType: {
        type: String, 
        required: true
    }
});

const CategoryExercise = mongoose.model('CategoryExercise', categoryExerciseSchema);

module.exports = CategoryExercise;