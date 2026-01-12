const treinos = JSON.parse(localStorage.getItem("treinos")) || [];
const planilhas = JSON.parse(localStorage.getItem("planilhas")) || [];

const div = document.getElementById("historico");

const treinosValidos = treinos.filter(t =>
  planilhas.some(p => p.id === t.planilhaId)
);

if (treinosValidos.length === 0) {
  div.innerHTML = "<p>Nenhum treino registrado.</p>";
}

treinosValidos.forEach(t => {
  const planilha = planilhas.find(p => p.id === t.planilhaId);

  div.innerHTML += `
    <div class="planilha">
      <h2>${planilha.nome}</h2>
      <strong>Data:</strong> ${t.data}

      ${t.registros.map(r => `
        <h3>${r.exercicio}</h3>
        <ul>
          ${r.series.map((s, i) => `
            <li>Série ${i+1}: ${s.reps} reps | ${s.peso} kg</li>
          `).join("")}
        </ul>
      `).join("")}
    </div>
  `;
});
