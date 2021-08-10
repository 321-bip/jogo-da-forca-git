 let mensagem = document.getElementById("h1")
 let letra = document.getElementsByClassName("alfabeto")
 let dica = document.getElementById("dica")
 let palavrasorteada = document.getElementById("palavra")
 let fruta = ["abacate","abacaxi","açai","amora","cacau","caju","damasco","figo","goiaba","graviola","jabuticaba"]
 let legume = ["abobora","chuchu","pimentao","pepino","abobrinha","quiabo","berinjela","jilo","maxixe","beterraba","ervilha"]
 let palavra, letrasselecionadas, criatagp, arraypalavrasorteada, pos, reinicia, idx;
 let numacertos = 0
 let numerros = 0
 let indicepalavrasorteada = 0
 let posimg = 1
 let vital = 100
 let estado = true

  function jogar()
    {
              arraypalavrasorteada = []
      for(let i = 0; i < palavra.length; i++)
       {
         let procuraletra = palavra.substr(i,1)
             arraypalavrasorteada.push(procuraletra)
       }
          let indice = []   
          let idx = arraypalavrasorteada.indexOf(letrasselecionadas)
          if(idx != -1)
          {
            numacertos++ 
         
              while(idx != -1)
                {
                  indice.push(idx)
                  indicepalavrasorteada++
                  idx = arraypalavrasorteada.indexOf(letrasselecionadas, idx +1)
                  for(let para in indice)
                   {
                    let indicetagp = document.getElementsByClassName("in")
                        indicetagp[indice[para]].innerHTML = letrasselecionadas
                   }
                  
                }
          }    
          else 
          {
              numerros++
              vital = vital - 16.666
              posimg++
             
          }      
          if(arraypalavrasorteada.length == indicepalavrasorteada || posimg == 7)
            {
                let mensagem_fim_de_jogo = arraypalavrasorteada.length == indicepalavrasorteada ? "ganho" : "perdeu"
                    mensagem.innerHTML = `voce ${mensagem_fim_de_jogo} a palavra sorteada e ${arraypalavrasorteada.join('')}`
                let botaostart = document.getElementById("start").disabled = false
                    botaostart = document.getElementById("start").style.backgroundColor="white"
                    estado = true
                    reinicia = true
                    broqueio_letras()
            } 
      console.log(idx)
      img_forca_pontuaçao() 
    }   
            
             
    
  function letras(posisao)
    {
      pos = posisao
      letra[pos].style.backgroundColor="#ff8c2a"
      letrasselecionadas = letra[pos].value
      letra[pos].disabled = true
      jogar()
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
           botaostart = document.getElementById("start").style.backgroundColor="#ff8c2a"
      
            if(posdica <= 2)
             {
               sorteado.push(dicas[0])
               dica.innerText = "fruta"
               estado = false
             }
            else
             {
                sorteado.push(dicas[1])
                dica.innerText = "legume" 
                estado = false
             }
             
               palavra = sorteado[0][pospalavra]
             
            if(reinicia == true)
             {
               estado = false
               mensagem.innerHTML = "jogo da forca"
               reinicia_jogo()
             }
           console.log(palavra)
      create_tag()
      broqueio_letras()
    } 

  function broqueio_letras()
   {
      for(let i = 0; i <= 26; i++)
       {
         letra[i].disabled = estado
         letra[i].style.backgroundColor="#9cd33b"
         letra[i].style.fontSize= 30 + "px"
         letra[i].style.color= "brown"
       }
   }  
   
  function img_forca_pontuaçao()
    {
      let forca = document.getElementById("dv1")
          forca.setAttribute("class","img" + posimg)
      let barra = document.getElementById("barra").style.width = vital + "%"
      let erros = document.getElementById("erros")
          erros.innerHTML = numerros
      let acertos = document.getElementById("acertos")
          acertos.innerHTML = numacertos  
         
         
    }
    
  function reinicia_jogo()
   {
       if(arraypalavrasorteada.length == indicepalavrasorteada || posimg == 7)
        {
             numacertos = 0
             numerros = 0
             posimg = 1
             vital = 100
             indicepalavrasorteada = 0
             img_forca_pontuaçao()
             broqueio_letras()

            while(palavrasorteada.firstChild)
              {
                palavrasorteada.removeChild(palavrasorteada.firstChild)
              }
        } 
   }
  
  
  function main()
   {
     broqueio_letras()
     img_forca_pontuaçao()
   }   
   main()   