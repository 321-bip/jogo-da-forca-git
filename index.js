// funsao retorna um array com minha node list
function getNodeLIst() {
  const elems = document.querySelectorAll(".alfabeto");
  const arrayFromList = [].map.call(elems, (element) => element);
  return { arrayFromList };
}
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
  //console.log(listArray[tipPosition]);
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
//deleta tags p
function deleteTagP() {
  const elementWordDraw = document.getElementById("palavra");

  while (elementWordDraw.firstChild) {
    elementWordDraw.removeChild(elementWordDraw.firstChild);
  }
}
// capitura o caracter clicado
function getValue() {
  const { arrayFromList } = getNodeLIst();
  const character = arrayFromList.map((element) => element.value);
  console.log(character);
}

// verifiva se esiste o caracter na palavra sorteada
function checkCharacter() {
  const { word } = drawWord();

  console.log(word);
}

// escrever letra na tela

// funsao de eventos
function events() {
  const { arrayFromList } = getNodeLIst();

  arrayFromList.forEach((element) => {
    element.addEventListener("click", () => {
      getValue();
    });
  });

  const botaostart = document.getElementById("start");
  botaostart.addEventListener("click", () => {
    checkCharacter();
    // drawWord();
  });
}

// funsao prinsipal
function main() {
  events();
}
main();
