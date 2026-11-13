import "./styles/pages/playboard.scss";

const playcards = document.getElementById("playcards");
const playerpoints = document.getElementById("playerpoints");
const currentplayer = document.getElementById("currentplayer");
const gameexit = document.querySelector(".game-exit");

const savedCardCount = Number(localStorage.getItem("cardCount"));
const cardCount = [16, 24, 36].includes(savedCardCount) ? savedCardCount : 16;

init();
createCards(cardCount);

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

function createCards(cardCount: number) {
  if (!playcards) return;

  playcards.dataset.cardCount = String(cardCount);
  playcards.innerHTML = "";

  for (let i = 0; i < cardCount; i++) {
    playcards.innerHTML += `
    <button class="card" type="button" aria-label="Karte ${i + 1} umdrehen">
        <div class="card__inner">
            <div class="card__face"></div>
            <div class="card__face card__face--back"></div>
        </div>
    </button>
`;
  }
}
