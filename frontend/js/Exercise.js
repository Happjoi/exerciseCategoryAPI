document.addEventListener("DOMContentLoaded", () => {
    const exerciseForm = document.getElementById("exerciseForm");
    const exerciseList = document.getElementById("exerciseList");
  
    // Carrega exercícios ao iniciar
    fetch("http://localhost:5000/api/exercises")
      .then((res) => res.json())
      .then((exercises) => {
        exerciseList.innerHTML = "";
        exercises.forEach((exercise) => {
          const div = document.createElement("div");
          div.classList.add("exercise-card");
  
          div.innerHTML = `
            <img src="${exercise.image}" alt="${exercise.name}" />
            <h3>${exercise.name}</h3>
            <p>${exercise.description}</p>
            <p><strong>Repetições:</strong> ${exercise.repetitions}</p>
            <p><strong>Categoria:</strong> ${exercise.category?.category || "-"} - ${exercise.category?.exerciseType || "-"}</p>
            <button onclick="deleteExercise('${exercise._id}')">Excluir</button>
          `;
  
          exerciseList.appendChild(div);
        });
      })
      .catch((err) => console.error("Erro ao carregar exercícios:", err));
  
    // Cadastrar exercício
    exerciseForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;
      const category = document.getElementById("categorySelect").value;
      const image = document.getElementById("image").value;
      const repetitions = document.getElementById("repetitions").value;
  
      fetch("http://localhost:5000/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description, category, image, repetitions }),
      })
        .then((res) => res.json())
        .then(() => {
          alert("Exercício cadastrado com sucesso!");
          location.reload();
        })
        .catch((err) => console.error("Erro ao cadastrar exercício:", err));
    });
  });
  
  function deleteExercise(id) {
    fetch(`http://localhost:5000/api/exercises/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Exercício excluído com sucesso!");
        location.reload();
      })
      .catch((err) => console.error("Erro ao excluir exercício:", err));
  }
  