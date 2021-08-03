let forca = document.getElementById("dv1")
let numacertos = 0
let numerros = 0
let indicepalavrasorteada = 0
let posimg = 1
let vital = 100
let alfabeto = document.getElementById("alfabeto")
let letra = document.getElementsByClassName("alfabeto")
let dica = document.getElementById("dica")
let letrasselecionadas = ""
let fruta = ["abacate","abacaxi","açai","amora","cacau","caju","damasco","figo","goiaba","graviola","jabuticaba"]
let legume = ["abobora","chuchu","pimentao","pepino","abobrinha","quiabo","berinjela","jilo","maxixe","beterraba","ervilha"]
let palavra;
let palavrasorteada = document.getElementById("palavra")
let criatagp;
let arraypalavrasorteada = []
let butao = document.getElementsByTagName("button")
let pos;

  function jogar()
    {  
          let indice = []   
          let idx = arraypalavrasorteada.indexOf(letrasselecionadas)
           if(idx != -1)
            {
              numacertos++
              acerto()

              while(idx != -1)
                {
                    let indicetagp = document.getElementsByClassName("in")
                        indice.push(idx)
                        indicepalavrasorteada++
                        idx = arraypalavrasorteada.indexOf(letrasselecionadas, idx +1)
                    
                  for(let para in indice)
                   {
                     indicetagp[indice[para]].innerHTML = letrasselecionadas
                   }
                 
                }

            }else
              {
                vital = vital - 16.666
                numerros++
                posimg++
                jogoforca()
                erro() 
              }              
    }  
    
  function letras(posisao)
    {
      pos = posisao
      letra[pos].style.backgroundColor="blue"
      letrasselecionadas = letra[pos].value
      document.getElementsByClassName("alfabeto")[pos].disabled = true
      jogar()
      reiniciajogo()
    }

    function create_tag()
    {  
 
      for(let i = 0; i < palavra.length; i++)
         {
                criatagp = document.createElement('p')
                criatagp.innerHTML = "-" + "  "
                palavrasorteada.appendChild(criatagp)
                criatagp.setAttribute('class','in')
           
         }
    }
 
  function sorteo_start()
    {
       let dicas = [fruta,legume]
       let sorteado = []
       let posdica = Math.floor(Math.random()*10 / 2)
       let pospalavra = Math.floor(Math.random()*10)
       let botaostart = document.getElementById("start").disabled = true 
           botaostart = document.getElementById("start").style.backgroundColor="red"
      
           if(posdica <= 2)
             {
               sorteado.push(dicas[0])
               dica.innerText = "fruta"
 
             }else
               {
                 sorteado.push(dicas[1])
                 dica.innerText = "legume"
               }
 
           palavra = sorteado[0][pospalavra]
       
            for(let i = 0; i < palavra.length; i++)
             {
               let procuraletra = palavra.substr(i,1)
                   arraypalavrasorteada.push(procuraletra)
             }
 
          
           
           console.log(pospalavra)
           console.log(palavra)
           create_tag()
    } 
   
   function jogoforca()
    {
     let barra = document.getElementById("barra").style.width = vital + "%"
     forca.setAttribute("class","img" + posimg)
    }
    

  function erro()
    {
       let erros = document.getElementById("erros")
          erros.innerHTML = numerros
    }
  
  function  acerto()
    {
       let acertos = document.getElementById("acertos")
          acertos.innerHTML = numacertos 
    }
     
  function reiniciajogo()
   {
       if(arraypalavrasorteada.length == indicepalavrasorteada || posimg == 7)
        {
          let mensagem_fim_de_jogo = arraypalavrasorteada.length == indicepalavrasorteada ? "ganho" : "perdeu"

             alert(`voce ${mensagem_fim_de_jogo} a palavra sorteada e ${arraypalavrasorteada.join('')}`)
             botaostart = document.getElementById("start").disabled = false
             botaostart = document.getElementById("start").style.backgroundColor="white"
             numacertos = 0
             numerros = 0
             posimg = 1
             vital = 100
             indicepalavrasorteada = 0
             jogoforca()
             erro()
             acerto()
          for(pos = 0; pos <= 26; pos++)
           {
             document.getElementsByClassName("alfabeto")[pos].disabled = false
             letra[pos].style.backgroundColor="white"
           }

             while(palavrasorteada.firstChild)
              {
                palavrasorteada.removeChild(palavrasorteada.firstChild)
              }
        } 
        
   }
 function main()
   {
    jogoforca()
   }   
   main()   