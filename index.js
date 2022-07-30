// funsao que retorna lista de array
function returnArray() {
  const fruit = [
    "abacate",
    "abacaxi",
    "açai",
    "amora",
    "cacau",
    "caju",
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
  console.log(word);
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
//deleta tags p
function deleteTagP() {
  const elementWordDraw = document.getElementById("palavra");

  while (elementWordDraw.firstChild) {
    elementWordDraw.removeChild(elementWordDraw.firstChild);
  }
}
// escre a letras na tela
function writeCharacter(character, index) {
  const createTagP = document.getElementsByTagName("p");
  createTagP[index].innerHTML = character.value;
}
// decrementa barra de vital na tela
const decreaseLifeBar = (() => {
  let life = 100;
  return () => {
    life -= 16.666;
    const barra = document.getElementById("barra");
    barra.style.width = life + "%";
  };
})();
//renderiza imagem da forca
function renderStrengthOnScreen() {
  const score = initScore();
  let forca = document.getElementById("dv1");
  forca.setAttribute("class", "img" + score.scoreMistake);
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
  console.log(score.scoreHit);
  const mistake = document.getElementById("erro");
  const hit = document.getElementById("acerto");
  mistake.innerHTML = `erro: ${score.scoreMistake}`;
  hit.innerHTML = `acerto:${score.scoreHit}`;
}
function unlockButton() {
  const elementButton = document.querySelectorAll("button");
  elementButton.forEach((element) => {
    element.disabled = false;
    element.style.background = "rgb(32, 101, 179)";
  });
}
// funsao de eventos
function events() {
  const botaostart = document.getElementById("start");
  botaostart.addEventListener("click", () => {
    checkCharacter();
  });
  // verifica se o caracter clicado e existe
  const checkCharacter = () => {
    const elems = document.querySelectorAll(".alfabeto");
    let { word } = drawWord();
    elems.forEach((element) => {
      element.addEventListener("click", () => {
        let indexCharacter = word.indexOf(element.value);
        incrementScore(indexCharacter);
        writeScore();
        while (indexCharacter != -1) {
          writeCharacter(element, indexCharacter);
          indexCharacter = word.indexOf(element.value, indexCharacter + 1);
        }
      });
    });
  };
  const buttonLock = (() => {
    const elementButton = document.querySelectorAll("button");
    elementButton.forEach((element) => {
      element.addEventListener("click", () => {
        element.style.background = "#ff8c2a";
        element.disabled = true;
      });
    });
  })();
}
// funsao prinsipal
function main() {
  events();
  writeScore();
  renderStrengthOnScreen();
}
main();
//debugger;
