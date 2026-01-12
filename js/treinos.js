let planilhas = JSON.parse(localStorage.getItem("planilhas")) || [];
let treinos = JSON.parse(localStorage.getItem("treinos")) || [];

const select = document.getElementById("selectPlanilha");

planilhas.forEach(p => {
  const option = document.createElement("option");
  option.value = p.id;
  option.textContent = p.nome;
  select.appendChild(option);
});

// Carrega automaticamente a primeira planilha
if (planilhas.length > 0) carregarExercicios();

function carregarExercicios() {
  const id = Number(select.value);
  const planilha = planilhas.find(p => p.id === id);
  const div = document.getElementById("exercicios");

  div.innerHTML = "";

  planilha.exercicios.forEach(ex => {
    const safe = ex.replaceAll(" ", "_");

    div.innerHTML += `
      <div class="planilha">
        <h3>${ex}</h3>

        Séries:
        <input type="number" min="1" value="3" 
               onchange="atualizarSeries('${safe}', this.value)">

        <div id="series_${safe}"></div>
      </div>
    `;

    // cria 3 séries por padrão
    atualizarSeries(safe, 3);
  });
}

function atualizarSeries(exSafe, qtd) {
  const div = document.getElementById("series_" + exSafe);
  div.innerHTML = "";

  for (let i = 1; i <= qtd; i++) {
    div.innerHTML += `
      <div>
        Série ${i} →
        Reps: <input type="number" class="reps">
        Peso: <input type="number" class="peso">
      </div>
    `;
  }
}

function salvarTreino() {
  const planilhaId = Number(select.value);
  const data = document.getElementById("dataTreino").value;
  if (!data) return alert("Escolha a data");

  const registros = [];

  document.querySelectorAll(".planilha").forEach(div => {
    const nome = div.querySelector("h3").innerText;
    const seriesDiv = div.querySelectorAll("#" + div.querySelector("div").id + " > div");

    const series = [];
    div.querySelectorAll(".series div").forEach(s => {
      series.push({
        reps: s.querySelector(".reps").value,
        peso: s.querySelector(".peso").value
      });
    });

    registros.push({ exercicio: nome, series });
  });

  treinos.push({ planilhaId, data, registros });
  localStorage.setItem("treinos", JSON.stringify(treinos));

  alert("Treino salvo com sucesso!");
}
