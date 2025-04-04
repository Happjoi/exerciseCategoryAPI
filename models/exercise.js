const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String, 
        required:true,
        unique: true},
    description: {
        type: String,
        required:true, 
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CategoryExercise', 
        required:true},
    image: {
        type: String, 
        required:true},
    repetitions: {
        type: Number, 
        required:true},     
})

const Exercise = mongoose.model('Exercise', exerciseSchema );

module.exports = Exercise;