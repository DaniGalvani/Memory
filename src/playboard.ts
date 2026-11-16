import "./styles/pages/playboard.scss";

const cardImages = [
  "angular-card.svg",
  "bs-card.svg",
  "css-card.svg",
  "db-card.svg",
  "dj-card.svg",
  "fire-card.svg",
  "git-card.svg",
  "github-card.svg",
  "html-card.svg",
  "js-card.svg",
  "node-card.svg",
  "py-card.svg",
  "react-card.svg",
  "sass-card.svg",
  "trm-card.svg",
  "ts-card.svg",
  "vsc-card.svg",
  "vue-card.svg",
].map((filename) => new URL(`../assets/img/cards/theme1/${filename}`, import.meta.url).href);

const playcards = document.getElementById("playcards");
const playerpoints = document.getElementById("playerpoints");
const currentplayer = document.getElementById("currentplayer");
const gameexit = document.querySelector(".game-exit");

init();

function shuffleCards<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex]!, shuffled[index]!];
  }

  return shuffled;
}

function createCardPairs(cardCount: number): string[] {
  if (!Number.isInteger(cardCount) || cardCount < 2 || cardCount % 2 !== 0 || cardCount > cardImages.length * 2) {
    throw new Error("Die Kartenanzahl muss gerade sein und es müssen genügend Motive vorhanden sein.");
  }
  const selectedImages = shuffleCards(cardImages).slice(0, cardCount / 2);
  return shuffleCards([...selectedImages, ...selectedImages]);
}

function init() {
  if (playcards) {
    const parameters = new URLSearchParams(window.location.search);
    if (parameters.get("cards") === "32") {
      parameters.set("cards", "36");
      window.history.replaceState(null, "", `${window.location.pathname}?${parameters}${window.location.hash}`);
    }
    const requestedCount = Number(parameters.get("cards"));
    const cardCount = [16, 24, 36].includes(requestedCount) ? requestedCount : 16;
    const columns = cardCount === 16 ? 4 : 6;
    const cards = createCardPairs(cardCount);

    playcards.style.setProperty("--columns", String(columns));
    playcards.style.setProperty("--board-width", `${columns * 120 + (columns - 1) * 16}px`);
    playcards.innerHTML = cards.map((image, index) => `
      <button class="card" type="button" aria-label="Karte ${index + 1}">
        <div class="card__inner">
          <div class="card__face"></div>
          <div class="card__face card__face--back" style="background-image: url('${image}')"></div>
        </div>
      </button>
    `).join("");

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
