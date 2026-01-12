let palavras = JSON.parse(localStorage.getItem("palavras")) || [];

function salvar() {
  localStorage.setItem("palavras", JSON.stringify(palavras));
}

function adicionar() {
  const idioma = document.getElementById("idioma").value;
  const palavra = document.getElementById("palavra").value;
  const traducao = document.getElementById("traducao").value;
  const frase = document.getElementById("frase").value;
  const fraseTraducao = document.getElementById("fraseTraducao").value;

  if (!palavra || !traducao) return alert("Preencha a palavra e a tradução");

  palavras.push({
    idioma,
    palavra,
    traducao,
    frase,
    fraseTraducao
  });

  salvar();

  document.getElementById("palavra").value = "";
  document.getElementById("traducao").value = "";
  document.getElementById("frase").value = "";
  document.getElementById("fraseTraducao").value = "";

  mostrar();
}

function mostrar() {
  const filtro = document.getElementById("filtroIdioma").value;
  const div = document.getElementById("lista");
  div.innerHTML = "";

  palavras
    .filter(p => filtro === "" || p.idioma === filtro)
    .forEach((p, i) => {
      div.innerHTML += `
        <div class="planilha">
          <strong>${p.idioma}</strong><br>
          <b>${p.palavra}</b> = ${p.traducao}<br>
          <i>${p.frase || ""}</i><br>
          <span style="color:#555">${p.fraseTraducao || ""}</span><br>
          <button class="danger" onclick="remover(${i})">Excluir</button>
        </div>
      `;
    });
}

function remover(i) {
  if (!confirm("Remover esta palavra?")) return;
  palavras.splice(i, 1);
  salvar();
  mostrar();
}

mostrar();
