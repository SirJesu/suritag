
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  function SaveHistory(historiaId) { 

   }

   function GotHistorias(idUsuario) { 
     console.log(idUsuario);
   var historias = contenidoSocial.historias;
  console.log(historias["Usuario"+idUsuario]);
    return historias["Usuario"+idUsuario];

 

    }

    function valueFormat(data) { 
   var  res = "";

    if(data != null && data != undefined ){
      res = data; 
    } 

    return res;
     }
