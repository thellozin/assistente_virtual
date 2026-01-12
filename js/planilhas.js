let planilhas = JSON.parse(localStorage.getItem("planilhas")) || [];

function salvar() {
  localStorage.setItem("planilhas", JSON.stringify(planilhas));
}

function criarPlanilha() {
  const nome = document.getElementById("nomePlanilha").value;
  if (!nome) return alert("Digite o nome");

  const nova = {
    id: Date.now(),
    nome: nome,
    exercicios: []
  };

  planilhas.push(nova);
  salvar();
  mostrar();
  document.getElementById("nomePlanilha").value = "";
}

function adicionarExercicio(id) {
  const nome = document.getElementById("ex_" + id).value;
  if (!nome) return;

  const planilha = planilhas.find(p => p.id === id);
  planilha.exercicios.push(nome);

  salvar();
  mostrar();
}

function removerPlanilha(id) {
  if (!confirm("Apagar essa planilha e todo o histórico dela?")) return;

  // Remove a planilha
  planilhas = planilhas.filter(p => p.id !== id);
  localStorage.setItem("planilhas", JSON.stringify(planilhas));

  // Remove todos os treinos ligados a ela
  let treinos = JSON.parse(localStorage.getItem("treinos")) || [];
  treinos = treinos.filter(t => t.planilhaId !== id);
  localStorage.setItem("treinos", JSON.stringify(treinos));

  mostrar();
}


function mostrar() {
  const div = document.getElementById("planilhas");
  div.innerHTML = "";

  planilhas.forEach(p => {
    div.innerHTML += `
      <div class="planilha">
        <h3>${p.nome}</h3>

        <ul>
          ${p.exercicios.map(e => `<li>${e}</li>`).join("")}
        </ul>

        <input id="ex_${p.id}" placeholder="Novo exercício">
        <button onclick="adicionarExercicio(${p.id})">Adicionar</button>
        <button onclick="removerPlanilha(${p.id})" class="danger">Excluir</button>
      </div>
    `;
  });
}

mostrar();
