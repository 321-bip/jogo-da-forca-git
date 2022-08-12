function initGame() {
  const botaostart = document.getElementById("start");

  botaostart.addEventListener("click", () => {
    let { word } = drawWord();
    buttonLockClick(botaostart);
    createTagHtml(word);
    selectCharacter(word);
  });

  const selectCharacter = (word) => {
    const elems = document.querySelectorAll(".alfabeto");

    elems.forEach((element) => {
      element.addEventListener("click", () => {
        buttonLockClick(element);
        checkCharacter(element, word);
        EndOfTheGame(word);
      });
    });
  };

  const buttonReset = document.getElementById("reset");

  buttonReset.addEventListener("click", () => {
    location.reload();
  });

  writeScore();
  renderStrengthOnScreen();
}

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

function drawTip() {
  const { listArray } = returnArray();
  const tipPosition = Math.floor((Math.random() * 4) / 2);
  writeHintOnScreen(tipPosition);
  return listArray[tipPosition];
}

function writeHintOnScreen(position) {
  const elemtWordTip = document.getElementById("dica");
  let wordtip = position == 0 ? "Fruta" : "vegetal";
  elemtWordTip.innerHTML = wordtip;
}

function drawWord() {
  const listDraw = drawTip();
  const wordPosition = Math.floor(Math.random() * 10);
  const word = listDraw[wordPosition];
  return { word };
}

function createTagHtml(word) {
  const elementWordDraw = document.getElementById("palavra");

  for (let i = 0; i < word.length; i++) {
    createTagP = document.createElement("p");
    createTagP.innerHTML = "-" + "  ";
    elementWordDraw.appendChild(createTagP);
    createTagP.setAttribute("class", "in");
  }
}

function writeCharacter(character, index) {
  const createTagP = document.getElementsByTagName("p");
  createTagP[index].innerHTML = character.value;
}

const decreaseLifeBar = (() => {
  let life = 100;
  return () => {
    life -= 16.666;
    const bar = document.getElementById("barra");
    bar.style.width = life + "%";
  };
})();

function renderStrengthOnScreen() {
  const score = initScore();
  let gallows = document.getElementById("dv1");
  gallows.setAttribute("class", "img" + score.scoreMistake);
}

const initScore = (() => {
  const score = {
    scoreMistake: 0,
    scoreHit: 0,
  };
  return () => {
    return score;
  };
})();

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

function writeScore() {
  let { score } = incrementScore();
  const mistake = document.getElementById("erro");
  const hit = document.getElementById("acerto");
  mistake.innerHTML = `erro: ${score.scoreMistake}`;
  hit.innerHTML = `acerto:${score.scoreHit}`;
}

function checkCharacter(element, word) {
  let indexCharacter = word.indexOf(element.value);
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

function buttonLockClick(element) {
  element.disabled = true;
  element.style.background = "#ff8c2a";
}

function buttonLock() {
  const elems = document.querySelectorAll(".alfabeto");
  elems.forEach((element) => {
    element.disabled = true;
  });
}
<<<<<<< HEAD
=======

>>>>>>> refatorando
initGame();
