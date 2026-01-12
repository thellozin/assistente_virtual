const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("header nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

let editandoItem = null;

/* ===============================
   CONFIGURAÇÃO DO AUTO RESET
================================ */
const LIMITE_HORAS = 12;
const LIMITE_MS = LIMITE_HORAS * 60 * 60 * 1000;

/* Verifica se já passou 12h desde o último uso */
function verificarExpiracaoCompras() {
  const ultimo = localStorage.getItem("ultimoRegistroCompras");
  if (!ultimo) return;

  const agora = Date.now();
  const diff = agora - Number(ultimo);

  if (diff >= LIMITE_MS) {
    localStorage.removeItem("listaCompras");
    localStorage.removeItem("ultimoRegistroCompras");
  }
}

/* Atualiza o horário sempre que algo muda */
function atualizarHorarioCompras() {
  localStorage.setItem("ultimoRegistroCompras", Date.now());
}

/* ===============================
   FUNÇÕES DA LISTA DE COMPRAS
================================ */

function adicionarItem() {
  let nome = document.getElementById("itemNome").value;
  let quantidade = parseInt(document.getElementById("itemQuantidade").value);
  let preco = parseFloat(document.getElementById("itemPreco").value);

  if (!nome || isNaN(quantidade) || isNaN(preco)) return;

  let lista = JSON.parse(localStorage.getItem("listaCompras")) || [];

  if (editandoItem !== null) {
    lista[editandoItem] = { nome, quantidade, preco, comprado: false };
    editandoItem = null;
  } else {
    lista.push({ nome, quantidade, preco, comprado: false });
  }

  localStorage.setItem("listaCompras", JSON.stringify(lista));
  atualizarHorarioCompras();

  document.getElementById("itemNome").value = "";
  document.getElementById("itemQuantidade").value = "";
  document.getElementById("itemPreco").value = "";

  mostrarListaCompras();
}

function mostrarListaCompras() {
  let lista = JSON.parse(localStorage.getItem("listaCompras")) || [];
  let ul = document.getElementById("listaCompras");
  ul.innerHTML = "";

  let total = 0;

  lista.forEach((item, i) => {
    total += item.quantidade * item.preco;
    ul.innerHTML += `
      <li>
        <input type="checkbox" ${item.comprado ? "checked" : ""} onclick="marcarComprado(${i})">
        ${item.nome} - ${item.quantidade} x R$ ${item.preco.toFixed(2)} = 
        R$ ${(item.quantidade * item.preco).toFixed(2)}
        <div class="botoes-item">
          <button onclick="editarItem(${i})">✏️</button>
          <button onclick="removerItem(${i})">❌</button>
        </div>
      </li>
    `;
  });

  document.getElementById("totalCompras").innerHTML = `<b>Total:</b> R$ ${total.toFixed(2)}`;
}

function marcarComprado(i) {
  let lista = JSON.parse(localStorage.getItem("listaCompras")) || [];
  lista[i].comprado = !lista[i].comprado;
  localStorage.setItem("listaCompras", JSON.stringify(lista));
  atualizarHorarioCompras();
  mostrarListaCompras();
}

function editarItem(i) {
  let lista = JSON.parse(localStorage.getItem("listaCompras")) || [];
  document.getElementById("itemNome").value = lista[i].nome;
  document.getElementById("itemQuantidade").value = lista[i].quantidade;
  document.getElementById("itemPreco").value = lista[i].preco;
  editandoItem = i;
  atualizarHorarioCompras();
}

function removerItem(i) {
  if (!confirm("Tem certeza que deseja remover este item da lista de compras?")) return;

  let lista = JSON.parse(localStorage.getItem("listaCompras")) || [];
  lista.splice(i, 1);
  localStorage.setItem("listaCompras", JSON.stringify(lista));
  atualizarHorarioCompras();
  mostrarListaCompras();
}

/* ===============================
   AO ABRIR A PÁGINA
================================ */
window.onload = () => {
  verificarExpiracaoCompras();
  mostrarListaCompras();
};
