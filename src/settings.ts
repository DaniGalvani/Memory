import './styles/pages/settings.scss';

const settingsOptions = document.querySelectorAll<HTMLInputElement>('input[name="board-size"], input[name="player"]');
const startLink = document.querySelector<HTMLAnchorElement>('.btn-start');
const boardSizeLabel = document.getElementById('board-size');
const playerLabel = document.getElementById('player');
const settingsActions = document.getElementById('set-actions');
let selectionVisible = false;

function updateSettings() {
  const selectedSize = document.querySelector<HTMLInputElement>('input[name="board-size"]:checked');
  const selectedPlayer = document.querySelector<HTMLInputElement>('input[name="player"]:checked');
  const cardCount = selectedSize?.value ?? '16';

  if (startLink) {
    startLink.href = `./playboard.html?cards=${cardCount}`;
  }

  if (boardSizeLabel) {
    boardSizeLabel.textContent = selectionVisible ? `Board-${cardCount} Cards` : 'Board size';
  }

  if (playerLabel) {
    const playerName = selectedPlayer?.id === 'player-orange' ? 'Orange Player' : 'Blue Player';
    playerLabel.textContent = selectionVisible ? playerName : 'Player';
  }
}

settingsActions?.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('.btn-start')) return;

  selectionVisible = true;
  settingsActions.classList.add('is-selected');
  updateSettings();
});

settingsOptions.forEach((option) => {
  option.addEventListener('change', updateSettings);
});

updateSettings();
window.addEventListener('pageshow', updateSettings);
