// funsao que retorna lista de array
function returnArray() {
  const fruit = [
    "abacate",
    "abacaxi",
    "amora",
    "cacau",
    "caju",
    "açai",
    "damasco",
    "figo",
    "goiaba",
    "graviola",
    "jabuticaba",
  ];

  const vegetables = [
    "abobora",
    "chuchu",
    "pimentao",
    "pepino",
    "abobrinha",
    "quiabo",
    "berinjela",
    "jilo",
    "maxixe",
    "beterraba",
    "ervilha",
  ];
  const listArray = [fruit, vegetables];
  return { listArray };
}
// sortea a dica da palavra
function drawTip() {
  const { listArray } = returnArray();
  const tipPosition = Math.floor((Math.random() * 4) / 2);
  writeHintOnScreen(tipPosition);
  return listArray[tipPosition];
}
// escreve dica na tela
function writeHintOnScreen(position) {
  const elemtWordTip = document.getElementById("dica");
  let wordtip = position == 0 ? "Fruta" : "vegetal";
  elemtWordTip.innerHTML = wordtip;
}
// sortea a palavra
function drawWord() {
  const listDraw = drawTip();
  const wordPosition = Math.floor(Math.random() * 10);
  const word = listDraw[wordPosition];
  createTagHtml(word);
  return { word };
}
// cria tags p
function createTagHtml(word) {
  const elementWordDraw = document.getElementById("palavra");

  for (let i = 0; i < word.length; i++) {
    createTagP = document.createElement("p");
    createTagP.innerHTML = "-" + "  ";
    elementWordDraw.appendChild(createTagP);
    createTagP.setAttribute("class", "in");
  }
}
/// escreve a letras na tela
function writeCharacter(character, index) {
  const createTagP = document.getElementsByTagName("p");
  createTagP[index].innerHTML = character.value;
}
// decrementa barra de vital na tela
const decreaseLifeBar = () => {
  let life = 100;
  return () => {
    life -= 16.666;
    const bar = document.getElementById("barra");
    bar.style.width = life + "%";
  };
};
//renderiza imagem da forca
function renderStrengthOnScreen() {
  const score = initScore();
  let gallows = document.getElementById("dv1");
  gallows.setAttribute("class", "img" + score.scoreMistake);
}
//inicia a pontuçao
const initScore = (() => {
  const score = {
    scoreMistake: 0,
    scoreHit: 0,
  };
  return () => {
    return score;
  };
})();
// encrementa pontuaçao
function incrementScore(indexCharacter) {
  const score = initScore();
  if (indexCharacter != -1 && indexCharacter != undefined) {
    score.scoreHit++;
  } else if (indexCharacter === -1) {
    score.scoreMistake++;
    decreaseLifeBar();
    renderStrengthOnScreen();
  }
  return { score };
}
// escreve a pontuaçao na tela
function writeScore() {
  let { score } = incrementScore();
  const mistake = document.getElementById("erro");
  const hit = document.getElementById("acerto");
  mistake.innerHTML = `erro: ${score.scoreMistake}`;
  hit.innerHTML = `acerto:${score.scoreHit}`;
}
// verifica se o caracter clicado e existe
function checkCharacter(element, word) {
  let indexCharacter = word.indexOf(element.value);
  // console.log(indexCharacter);
  if (indexCharacter == -1) {
    incrementScore(indexCharacter);
    writeScore();
  }
  while (indexCharacter != -1) {
    incrementScore(indexCharacter);
    writeScore();
    writeCharacter(element, indexCharacter);
    indexCharacter = word.indexOf(element.value, indexCharacter + 1);
  }
}
// finalisa o jogo
function EndOfTheGame(word) {
  const { score } = incrementScore();
  const message = document.getElementById("h1");

  if (score.scoreHit == word.length) {
    message.innerHTML = `Voce acertou a palavra e ${word}`;
    buttonLock();
  } else if (score.scoreMistake == 6) {
    message.innerHTML = `Voce errou a palavra era ${word}`;
    buttonLock();
  }
}
// bloqueia os botoes de caracter no fim do jogo
function buttonLock() {
  const elems = document.querySelectorAll(".alfabeto");
  elems.forEach((element) => {
    element.disabled = true;
  });
}
// funsao de eventos
function initGame() {
  // inicia o jogo
  const botaostart = document.getElementById("start");
  botaostart.addEventListener("click", () => {
    botaostart.disabled = true;
    botaostart.style.background = "#ff8c2a";
    let { word } = drawWord();
    selectCharacter(word);
  });
  // seleciona um caracter
  const selectCharacter = (word) => {
    const elems = document.querySelectorAll(".alfabeto");
    elems.forEach((element) => {
      element.addEventListener("click", () => {
        element.style.background = "#ff8c2a";
        element.disabled = true;
        checkCharacter(element, word);
        EndOfTheGame(word);
      });
    });
  };
  //reinicia o jogo
  const buttonReset = document.getElementById("reset");
  buttonReset.addEventListener("click", () => {
    location.reload();
  });

  writeScore();
  renderStrengthOnScreen();
}
initGame();
