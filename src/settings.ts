import './styles/pages/settings.scss';

const startButton = document.querySelector<HTMLAnchorElement>(".btn-start");

startButton?.addEventListener("click", () => {
  const selectedSize = document.querySelector<HTMLInputElement>(
    'input[name="board-size"]:checked'
  );

  localStorage.setItem("cardCount", selectedSize?.value ?? "16");
});
