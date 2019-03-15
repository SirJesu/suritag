
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }


  function SaveHistory(historiaId) { 

   }

   function GotHistorias(idUsuario) { 
   var historias = contenidoSocial.historias;

    return historias["Usuario"+idUsuario];

 

    }

    function valueFormat(data) { 
   var  res = "";

    if(data != null && data != undefined ){
      res = data; 
    } 

    return res;
     }
