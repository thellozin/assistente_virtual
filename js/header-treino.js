document.addEventListener("DOMContentLoaded", () => {
  const botao = document.querySelector(".botao-menu");
  const menu = document.getElementById("menuTreino");

  if (botao && menu) {
    botao.addEventListener("click", () => {
      menu.classList.toggle("ativo");
    });
  }
});
