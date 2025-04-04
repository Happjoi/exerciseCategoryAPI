document.addEventListener("DOMContentLoaded", () => {
    const categoryForm = document.getElementById("categoryForm");
    const categorySelect = document.getElementById("categorySelect");
  
    // Carrega categorias ao iniciar
    fetch("http://localhost:5000/api/categoryExercise")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((category) => {
          const option = document.createElement("option");
          option.value = category._id;
          option.textContent = `${category.category} - ${category.exerciseType}`;
          categorySelect.appendChild(option);
        });
      })
      .catch((err) => console.error("Erro ao buscar categorias:", err));
  
    // Cadastro de categoria
    categoryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const category = document.getElementById("category").value;
      const exerciseType = document.getElementById("exerciseType").value;
  
      fetch("http://localhost:5000/api/categoryExercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, exerciseType }),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Categoria cadastrada com sucesso!");
          location.reload();
        })
        .catch((err) => console.error("Erro ao cadastrar categoria:", err));
    });
  });