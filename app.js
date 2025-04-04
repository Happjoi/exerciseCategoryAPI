const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const exerciseRoutes = require('./routes/exerciseRoutes');
const categoryExerciseRoutes = require('./routes/categoryExerciseRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API está funcionando!');
});


app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017")
  .then(() => console.log('Conectado ao MongoDB!'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

app.use('/api/exercises', exerciseRoutes); // Rota para exercícios
app.use('/api/categoryExercise', categoryExerciseRoutes); // Rota para categorias de exercícios

app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 5000}`);
  });