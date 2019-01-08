
var view = app.views.create('.view-actividad', {
    on: {
      pageInit: function () {
        console.log('page init')

    LoadOfertas();
 
      }
    }
  })

  var toastOfertas = app.toast.create({
    icon:"<i class='f7-icons color-black'>star_half</i>",
    text: 'No hay ofertas disponibles',
    position: 'center',
    closeTimeout: 3200,
  });


  function DateFormat() {
     var dt = new Date();
 var mes = dt.getMonth() ;
 
 if(mes  < 10){
  mes = "0"+mes;
 }else{

 }

 return  ""+dt.getFullYear()+"-"+mes+"-"+dt.getDate()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()
    



  }






function LoadOfertas() {

    app.preloader.show();

    app.request.post('https://suritag.com/WebServiceSuritag/public/ObtenerOfertas',
    {
        fechaActual:DateFormat(),
      
        EstadoOferta:1
   
     },
     function (data) {
     console.log(data);
 
     if(data.obj.length == 0){
        toastOfertas.open();

      
     


     }else{
         $$(".badge").text( data.obj.length );

        data.obj.forEach(element => {
         
            var content = `<li  id= '`+element.idOfertas+`'  class='card' >
            <a href="#" class="item-link item-content">
              <div class="item-media"><img src="`+element.ImagenOferta+`" width="80"/></div>
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title">`+element.TituloOferta+`</div>
                  <div class="item-after">$`+element.DescuentoOfertas+`</div>
                </div>
                <div class="item-subtitle">Valida hasta `+element.FechaValidaOferta+`</div>
                <div class="item-text">`+element.DescripcionOferta+`</div>
              </div>
            </a>
          </li>`;   
   
   $$("#listOfertas").append(content);

$$("#"+element.idOfertas).click(function (evt) {

  var id = $$(this).attr("id");
  window.localStorage.setItem("ofertaItem",JSON.stringify(element));

  window,location = "./OfertasDetalle.html?idOferta="+id;


  





  });

   
           });
         

     }

     app.preloader.hide();
     
     },function (error) {
        alert("Error al Obtener las Ofertas Contacte al Administrador");
     },"json");

  }





