document.addEventListener("DOMContentLoaded", () => {
  const botao = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (botao && menu) {
    botao.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }
});
