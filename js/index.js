const keyboard = document.querySelector('.keyboard');
const keyboardContainer = document.querySelector('.keyboard-container');
const keyboardWidth = 1018;

const updateScale = () => {
  const newScale = keyboardContainer.offsetWidth / keyboardWidth;
  
  keyboard.setAttribute('style', `transform:scale(${
    newScale > 1 ? 1 : newScale
  })`);
}

window.addEventListener('resize', updateScale);
updateScale();