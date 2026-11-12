import "./styles/pages/playboard.scss";

const playcards = document.getElementById("playcards");
const playerpoints = document.getElementById("playerpoints");
const currentplayer = document.getElementById("currentplayer");
const gameexit = document.querySelector(".game-exit");

init();

function init() {
  if (playcards) {
    playcards.addEventListener("click", (event) => {
      const card = (event.target as HTMLElement).closest(
        ".card",
      ) as HTMLButtonElement;
      if (card) {
        card.classList.toggle("flipped");
      }
    });
  }
}

for (let i = 0; i < 16; i++) {

document.getElementById("playcards")!.innerHTML += `
    <button class="card">
        <div class="card__inner">
            <div class="card__face"></div>
            <div class="card__face card__face--back"></div>
        </div>
    </button>
`;
}
