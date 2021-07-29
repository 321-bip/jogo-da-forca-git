let letra = document.getElementsByClassName("alfabeto")
let dica = document.getElementById("dica")
let letrasselecionadas = ""
let fruta = ["abacate", "abacaxi", "aÃ§ai", "amora", "cacau", "caju", "damasco", "figo", "goiaba", "graviola", "jabuticaba"]
let legume = ["abobora", "chuchu", "pimentao", "pepino", "abobrinha", "quiabo", "berinjela", "jilo", "maxixe", "beterraba", "ervilha"]
let palavra;
let palavrasorteada = document.getElementById("palavra")
let criatagp;
let arraypalavrasorteada = []
let butao = document.getElementsByTagName("button")
let position;

let $start_button = document.getElementById("start");

let numacertos, numerros, posimg, vital, indicepalavrasorteada;
let reset = () => {
    numacertos = 0
    numerros = 0
    posimg = 1
    vital = 100
    indicepalavrasorteada = 0

    $start_button.disabled = false
    $start_button.style.backgroundColor = "white"

    let elements = document.getElementsByClassName("alfabeto");
    for (let i = 0; i <= 26; i++) {
        elements[i].disabled = false
        letra[i].style.backgroundColor = "white"
    }

    while (palavrasorteada.firstChild) {
        palavrasorteada.removeChild(palavrasorteada.firstChild)
    }
}; reset();

function letras(position) {

    letra[position].style.backgroundColor = "blue"
    letra[position].disabled = true

    letrasselecionadas = letra[position].value
    jogar()

    if (arraypalavrasorteada.length == indicepalavrasorteada) {
        
        alert(`voce ganho a palavra sorteada e ${arraypalavrasorteada.join('')}`)
        reset();

        update_status()

    } else if (posimg == 7) {

        alert(`voce perdeu a palavra sorteada e ${arraypalavrasorteada.join('')}`)
        reset();

        update_status()

    }
}

function sorteo() {
    let dicas = [fruta, legume]
    let sorteado = []
    let posdica = Math.floor(Math.random() * 10 / 2)
    let pospalavra = Math.floor(Math.random() * 10)
    let listajasorteada = []


    if (posdica <= 2) {
        sorteado.push(dicas[0])
        dica.innerText = "fruta"

    } else {
        sorteado.push(dicas[1])
        dica.innerText = "legume"
    }
    palavra = sorteado[0][pospalavra]



    start()
    console.log(pospalavra)
    console.log(palavra)
    console.log(listajasorteada)
}

function start() {

    $start_button.disabled = true
    $start_button.style.backgroundColor = "red"

    for (let i = 0; i < palavra.length; i++) {
        criatagp = document.createElement('p')
        criatagp.innerHTML = "-" + "  "
        palavrasorteada.appendChild(criatagp)
        criatagp.setAttribute('class', 'in')
        
    }
}

function jogar() {
    arraypalavrasorteada = []

    for (let i = 0; i < palavra.length; i++) {
        let procuraletra = palavra.substr(i, 1)

        arraypalavrasorteada.push(procuraletra)
    }
    let indice = []
    let idx = arraypalavrasorteada.indexOf(letrasselecionadas)

    if (idx == -1) {

        vital = vital - 16.666
        numerros++
        posimg++
        update_status()
        update_erros()

    } else if (idx != -1) {
        while (idx != -1) {
            let indicetagp = document.getElementsByClassName("in")
            indice.push(idx)
            indicepalavrasorteada++
            idx = arraypalavrasorteada.indexOf(letrasselecionadas, idx + 1)

            for (let para in indice) {
                indicetagp[indice[para]].innerHTML = letrasselecionadas
            }

        }
        numacertos++
        update_acertos()
    }
}

function update_status() {
    document.getElementById("barra").style.width = vital + "%"
    document.getElementById("dv1").setAttribute("class", "img" + posimg)
}; update_status();

function update_erros() {
    let erros = document.getElementById("erros")
    erros.innerHTML = numerros
}

function update_acertos() {
    let acertos = document.getElementById("acertos")
    acertos.innerHTML = numacertos
}

