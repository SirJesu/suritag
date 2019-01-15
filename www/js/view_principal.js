//console.log(app);

  var map;
var service;
var DistanceMatrix;
var bares ;
var restaurantes;
var discotecas;
var type = "";
var filtering = "";
var arrayMarker = [];
var autocomplete;
var miPosicion ;
var timerNotifications ;
var datosUsuario = JSON.parse( localStorage.getItem("config")  );



/*



$('.view:not(:first)').hide();
    $('#tabs-nav a').bind('click', function (e) {
        e.preventDefault();
        $this = $(this);
        $target = $(this.hash);
        $('#tabs-nav a.current').removeClass('current');
        $('.view:visible').fadeOut("slow", function () {
            $this.addClass('current');
            $target.fadeIn("slow");
        });
    }).filter(':first').click();


 */








Profile();
Favoritos();
//Actividades();
//LoadOfertas();
$$("#swipeup-img").hide();
$$("#RawList").hide();
$$("#slidersContent").show();
$$("#vistadetalle").hide();
$$("#ReservarButton").hide();

//app.popup.open(".popup-menu",true);
$$("#ver_todos").click(function (evt) { 
evt.preventDefault();

$$(".toolbar_actividad").click();

 });

 $$(".toolbar_actividad").click(function (evt) { 

  LoadOfertas();

  });





 $$(".toolbar_social").click(function (evt) { 
   evt.preventDefault();
window.location = "SocialPrincipal.html";
app.panel.close("left",true);

  });




$$("#btnBuscarPorAhora").click(function (evt) { 
evt.preventDefault();
LimpiarMarcadores();
app.progressbar.show('multi');
Search( map.getCenter() );



 });



function initialize() {

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: -33, lng: 151},
    disableDefaultUI: true
    });
autocomplete =new google.maps.places.AutocompleteService();

  service = new google.maps.places.PlacesService(map);
 DistanceMatrix = new google.maps.DistanceMatrixService();

ActionSearch();



//**Obtener la Posicion */
if(navigator.geolocation){

 navigator.geolocation.getCurrentPosition(function (position) {  

  //Comprobar las notificaciones
  cordova.plugins.notification.local.requestPermission(function (granted) { },function (error) { 

alert("tenga en cuenta que para activar las notificaciones debes hacerlo desde los ajustes del sisitema");

   });
  

map.setCenter({
  lat:position.coords.latitude,
  lng:position.coords.longitude
});

miPosicion = {
  lat:position.coords.latitude,
  lng:position.coords.longitude
};
console.log(miPosicion);
 },function (error) { 
alert("error al obtener la posicion del usuario");

  });



}else{
  alert("Imposible obtener la posicion en su dispositivo ");
  
}

//**Obtener la Posicion */



}

function callbackBares(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
      bares = results;
      console.log(bares);
if(filtering == "bar"){

  $$(".slidersContent").hide();
  $$("#RawList").show();
  
  LimpiarMarcadores();
  
  $$("#listasItem").empty();
  
  if(bares == null){
  
  $$("#baresItem").click();
  
  
  
  }else{
  bares.forEach(element => {
  
    AppendOnview(element);
  
  
  
  });
  
  
  }
  



}

    
 
  }
}
function callbackRestaurantes(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      restaurantes = results;
      console.log(resizeBy);

      if(filtering == "restaurante"){

        $$(".slidersContent").hide();
        $$("#RawList").show();
        filtering = "restaurante";
        
        LimpiarMarcadores();
        
        $$("#listasItem").empty();
        
        if(restaurantes == null){
        Search();
        
        $$("#restaurantesItem").click();
        
        
        }else{
        restaurantes.forEach(element => {
        
          AppendOnview(element);
          
        
        
        
        });
        
        
        }
   
    }
  }
}
  function callbackDiscotecas(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      discotecas = results;
      console.log(discotecas);

      app.progressbar.hide();
      $$("#swipeup-img").show();

      if(filtering == "discoteca"){

        $$(".slidersContent").hide();
        $$("#RawList").show();
        
        filtering = "discoteca";
        LimpiarMarcadores();
        
        $$("#listasItem").empty();
        
        if(discotecas == null){
        //Search();
        
        $$("#discotecasItem").click();
        
        
        }else{
        discotecas.forEach(element => {
           
        AppendOnview(element);
        
        });
        
        
        }
        


      }
      

   
    }
  }

function ActionSearch() { 

    $$("#baresItem").click(function (evt) { 
evt.preventDefault();
filtering = "bar";

$$(".rounded-item-selected").removeClass("rounded-item-selected");
$$(this).addClass("rounded-item-selected");


$$(".slidersContent").hide();
$$("#RawList").show();

LimpiarMarcadores();

$$("#listasItem").empty();

if(bares == null){

$$("#baresItem").click();



}else{
bares.forEach(element => {

  AppendOnview(element);



});


}




     });

     $$("#restaurantesItem").click(function (evt) { 
        evt.preventDefault();
        $$(".rounded-item-selected").removeClass("rounded-item-selected");
$$(this).addClass("rounded-item-selected");
$$(".slidersContent").hide();
$$("#RawList").show();
filtering = "restaurante";

LimpiarMarcadores();

$$("#listasItem").empty();

if(restaurantes == null){
Search();

$$("#restaurantesItem").click();


}else{
restaurantes.forEach(element => {

  AppendOnview(element);
  



});


}




        
        
             });

   

   $$("#discotecasItem").click(function (evt) { 
         evt.preventDefault();
         $$(".rounded-item-selected").removeClass("rounded-item-selected");
$$(this).addClass("rounded-item-selected");
$$(".slidersContent").hide();
$$("#RawList").show();

filtering = "discoteca";
LimpiarMarcadores();

$$("#listasItem").empty();

if(discotecas == null){
//Search();

$$("#discotecasItem").click();


}else{
discotecas.forEach(element => {
   
AppendOnview(element);

});


}


                
                
     });

    $$("#eventosItem").click(function (evt) { 
      console.log("evt");
     evt.preventDefault();
     $$(".rounded-item-selected").removeClass("rounded-item-selected");
$$(this).addClass("rounded-item-selected");
$$(".slidersContent").hide();
$$("#RawList").show();
filtering = "evento";             
                        
     });






 }

 function ClickItem(idsitio) { 
console.log("click"+idsitio);

GetDetails(idsitio);
  }

function ContentWindows(idSitio,num,Nombre) { 

var content = `<div onclick="ClickItem('`+idSitio+`')"  style='display:block; text-align:center'>
<h4>`+Nombre+`</h4>

<!--<p>`+num+`</p> -->
</div>`;

return content;

 }


 //Limpia Todos los marcadores del mapa 
function LimpiarMarcadores() { 
  arrayMarker.forEach(element => {
    element.setMap(null);
  });
  
  
   }

   var infoAnt = null ;
   function createMarker(place) {
  
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon:"../img/marcador.svg"
    });
     arrayMarker.push(marker);

    var refCheckIn = db.ref("checkIn/"+dateFormat()+"/"+place.place_id+"");
 refCheckIn.off();

     var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', function() {
   if(infoAnt != null){
        infoAnt.close();
      }
      refCheckIn.child("Usuarios").once("value",function (snapshot) { 
   var count = 0;
    if(snapshot.val() != null){
      console.log(snapshot.val());
      count = snapshot.numChildren();
      console.log(count);
    }

    

    infowindow.setContent(ContentWindows(place.place_id,count,place.name));
    infoAnt = infowindow;
  
   infowindow.open(map, marker);


       });

       
     

  });
}

 function Search(center) { 
     

    
      var request = {
        location: center,
        radius: '1000',
        query: "bares"
      };
    
      service.textSearch(request, callbackBares);

      var request = {
        location: center,
        radius: '1000',
        query: "restaurantes Comida Platos"
      };
    
      service.textSearch(request, callbackRestaurantes);
      var request = {
        location: center,
        radius: '1000',
        query: "club nocturno discotecas beber "
      };
    
      service.textSearch(request, callbackDiscotecas);
    









  }


  function GetDetails(id) { 

    service.getDetails({
      placeId: id
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
      AppendDetalle(place);

      }
    });





   }




   function AppendOnview(element) { 
    var img = "";

    createMarker(element);


    try{
     img =   element.photos[0].getUrl({'maxWidth': 120, 'maxHeight': 80});
    }catch(error){
    
    img = "";
    }
    
       $$("#listasItem").append(`
       <li  id='`+element.place_id+`' class="">
            <div  class=" item-content">
              <div class="item-media"><img   src="`+img+`" class="img-list lazy" /></div>
              <div class="item-inner">
                <div class="item-title-row">
                  <div class="item-title font-sm-2 transform-list">`+element.name.toLowerCase()+`</div>
                  <div class="item-after" ><img src="img/iconos/speech-bubble.png" style="margin-right: 4px" width="10" height="10" > <span class="badge color-black font-sm-2" >`+element.rating+`</span> </div>
                </div>
                <div class="item-subtitle">
               <div class="row">
                <div class="col-100"><label class="font-sm-2"><img src="img/iconos/map-placeholder.png" >`+element.formatted_address+`</label></div>
               
    
               </div>
    
                </div>
                <div class="item-text font-sm-1">$ Precio</div>
              </div>
            </div>
          </li>
       `); 
    
       $$("#"+element.place_id).click(function () { 
    GetDetails(element.place_id);
    
    
    
        });
    


    }


    function SaveHistory(place) {
      var datos = datosUsuario.Usuario;
     
     
       db.ref("Usuarios/"+datos.idUsuario+"/history/"+place.place_id).set({
       icon:place.icon,
       namePlace:place.name,
       id:place.place_id,
       date:Getdate()
     
       });
     
     
       
     }

function DysplaySiteNotification(SitioLocatio) { 
  
  //calculo de distancias
  console.log(miPosicion);
  console.log(SitioLocatio);

  DistanceMatrix.getDistanceMatrix(
    {
      origins: [miPosicion],
      destinations: [SitioLocatio],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, CallNotification);


    function CallNotification(response, status) { 

      if (status !== 'OK') {
       // alert('Error was: ' + status);
      } else {
        console.log(response);
var distance= response.rows[0].elements[0].distance.value;
  
setTimeout(() => {
       if( distance <=100){
console.log("esta en el sitio");

  //Notificacion
  cordova.plugins.notification.local.hasPermission(function (granted) {
    cordova.plugins.notification.local.getDefaults();

    cordova.plugins.notification.local.schedule({
      title: 'Estas en el sitio',
      text: '¿ Deseas ir al CheckInChat?',
      actions: [{ id: 'si', title: 'SI' },{ id: 'no', title: 'NO' }]

  });


  cordova.plugins.notification.local.on('si', function (notification, eopts){

 $$("#checkInChat").click();

  });



  });



       }else{

        console.log("NO esta en el sitio");

       }  


        }, 5000);




      }



     }




  //






};


function AppendDetalle(place) { 

DysplaySiteNotification( place.geometry.location );

console.log(place);
SaveHistory(place);
  $$("#imgHeart").off("click");
$$("#vistaPrincipal").hide();
$$("#menuItem").off("click");
$$("#ReservarButton").off("click");
$$("#vistadetalle").show();
$("#divTomarControlSitio").attr("hidden",true);
$$("#ReservarButton").show();
$$(".toolbar-principal").hide();
$$("#imgHeart").attr("src","img/iconos/heart.png");
try{
  $$(".sp-slides").empty();
  $$(".sp-thumbnails").empty();
  if( place.photos.length >0){

    place.photos.forEach(element => {
      
var uri =   element.getUrl( {'maxWidth': 612, 'maxHeight': 512} );



$$(".sp-slides").append(`
<div class="sp-slide">
                  <img class="sp-image" src="`+uri+`"/>
                </div>
`);


$$(".sp-thumbnails").append(`
<img class="sp-thumbnail " src="`+uri+`"/>

`);


    });

    $( '#my-slider' ).sliderPro({
      autoplay: false,
      buttons:false,
      height:250
    
    });

   


  }

}catch(error){

}
$$("#mapGoogle").off("click");
$$("#mapGoogle").attr("src",UriMap(place.geometry.location.lat(),place.geometry.location.lng() ) );   
$$("#mapGoogle").click(function (evt) { 
evt.preventDefault();

window.location = place.url;

 });




//Consultar el Sitio
app.preloader.show();

var params ={
  identificador:place.place_id
}
app.request.post(
  configApp.uri+"GetSitioByIden",
  params,
  function (data) { 
    app.preloader.hide();
 if(data == null){
 /* app.dialog.create({
  title:"sitio no registrado",
  text:"Desea registrar este sitio?",
  buttons:[
    {
      text:"No",
      onClick:function () { 

       }
      },
       {
         text:"Registrar",
         onClick:function () {

           }

       }
    
  ]
}).open();  */

$("#divTomarControlSitio").attr("hidden",false);
$$("#tomarControlSitio").off("click");
$$("#tomarControlSitio").click(function (evt) { 
evt.preventDefault();
app.popup.open(".pop-tomar-control-sitio",true);

var swiper = new Swiper('.swiper-container-tomar-control', {
  pagination: {
    el: '.swiper-pagination',
  },
});

$$("#nombreSitioLabel").text(place.name);
$$("#btnRegistrarUsuarioCliente").off("click");
$$("#btnRegistrarUsuarioCliente").click(function (evt) { 
  app.popup.close(".pop-tomar-control-sitio",true);
  HidePage("location","./AddSitio.html");  

 });
$$("#cuentaBeforeCreated").off("click");
$$("#cuentaBeforeCreated").click(function (evt) { 
  window.location = "https://www.suritag.com";
 });



 });

$$("#menuItem").off("click");
$$("#menuItem").click(function (evt) { 
evt.preventDefault();
alert("el sitio no esta registrado");


 });
 $$("#ReservarButton").off("click");
 $$("#ReservarButton").click(function (evt) { 
evt.preventDefault();
alert("el sitio no esta registrado");

  });


 }else{
   //consultarMenu
  $$("#menuItem").off("click");
  $$("#menuItem").click(function () { 


    var param  = {
      idSitio:data.idSitos
     }
  
    app.request.post(
   configApp.uri+"MenuBySitios",
   param,
   function (data) {
   
  $$("#lista-in-menu").empty();
    data.value.forEach(element =>{
  
      $$("#lista-in-menu").append(`<li class='card'>
      <a href="#" class="item-link item-content">
        <div class="item-media"><img src="`+element.Imagen+`" width="50" height='50' /></div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title title-menu-title">`+element.Nombre+`</div>
            <div class="item-after afther-price-menu-item">$ `+Intl.NumberFormat().format(element.Precio)+`</div>
          </div>
          <div class="item-subtitle">`+element.TipoMenu_idTipoMenu+`</div>
          <div class="item-text">`+element.Descripcion+`</div>
        </div></a></li>`);
  
  
    });
    app.preloader.hide();
    app.popup.open(".popup-menu",true);
  
  
    
     },
     function (error) {
  app.preloader.hide();
  
  
       },
       "json"
  
    );


  }); //fin consultar menu 

  $$("#ReservarButton").off("click");
  $$("#ReservarButton").click(function (evt) {
    evt.preventDefault();
    
    
    window.location = "./MakeReserva.html?tokenSite="+place.place_id;
    
    
    
    
      });






 }



   },function (error) {
    app.preloader.hide();
    alert("Error al tratar de consultar el sitio");


     },"json"
  
  );



//Fin consulta el sitio


 $$("#textComentario").off("click");
$$("#textComentario").click(function (evt) { 

evt.preventDefault();
AddComentario(place.place_id);
app.popup.open(".pop-coment",true);


 });

 $$("#btn-detalle-back").click(function (evt) { 
  evt.preventDefault();
  db.ref("Sitios/PlaceIdRef/"+place.place_id+"/coments").off();
  $$("#vistadetalle").hide(3000);
  $$("#vistaPrincipal").show(3000);
  $$("#ReservarButton").hide();
  $$(".toolbar-principal").show();
  
  
   });
$$("#ReservarButton").off("click");



$$("#checkInChat").off("click");

$$("#checkInChat").click(function (evt) {  
evt.preventDefault();

window.location = "./CheckIn-Chat.html?name="+place.name+"&token="+place.place_id;

  
});

db.ref("Usuarios/"+datosUsuario.Usuario.idUsuario+"/history/"+place.place_id).set({
  id:place.place_id,
  icon:place.icon,
  date:MindateFormat(),
  namePlace:place.name

});





$$("#nombreSitio").text(place.name);
$$("#ratingSitio").text(place.rating);
$$("#direccionSitio").empty();
$$("#direccionSitio").append(`<img  src="img/iconos/ubi_c.png" height="16" width="16" style="margin-right: 5px" >`+place.formatted_address);
AllComents(place.reviews,place.place_id);

db.ref("Sitios/"+datosUsuario.Usuario.idUsuario+"/"+place.place_id).once("value",function (snapshot) {

  var snap = snapshot.val();
  //console.log(snap);
 // console.log(favorito);
  if(snap == null){

    $$("#imgHeart").click(function (evt) { 
      evt.preventDefault();
      
      db.ref("Sitios/"+datosUsuario.Usuario.idUsuario+"/"+place.place_id).set({
       name: place.name,
       rating:place.rating,
       placeId:place.place_id,
       icon:place.icon,
        dir:place.formatted_address
      },function (error) { 
      
        $$("#imgHeart").attr("src","img/iconos/like.png");
      
       });
      
      
      
       });


  }else{
    $$("#imgHeart").attr("src","img/iconos/like.png");

    $$("#imgHeart").click(function (evt) { 
      evt.preventDefault();
      
      db.ref("Sitios/"+datosUsuario.Usuario.idUsuario+"/"+place.place_id).remove();
      $$("#imgHeart").attr("src","img/iconos/heart.png");
      
       });




  }


  });






try{

  $$("#SitioAbierto").empty();

 if( place.opening_hours.open_now  == true ){
  $$("#SitioAbierto").append(`<img src="img/iconos/horario.png" style="margin-right: 5px"  height="16" width="16" > Abierto a esta hora`);

 }else{
  $$("#SitioAbierto").append(`<img src="img/iconos/horario.png" style="margin-right: 5px"  height="16" width="16" > Cerrado a esta hora `);

 }





}catch(error){


}







 }


function ComentCard(element,type) { 
if(type == "map"){


  var date = new Date(element.time);
  
  var fecha = ""+date.getUTCDate()+"/0"+(date.getMonth()+1)+"/"+date.getFullYear();


  var obj = `
  <li>

  <a href="#" class="item-link item-content">
  <div class="item-media"><img src='`+element.profile_photo_url+`'  width="46" height="46"/></div>
  <div class="item-inner">
    <div class="item-title-row">
      <div class="item-title font-sm-2">`+element.author_name+`</div>
      <div class="item-after font-sm-1">`+fecha+`</div>
    </div>
    <div class="item-subtitle font-sm-1 "><div class='rateY`+element.time+`' ></div></div>
    <div class="item-text font-sm-1">`+element.text+`</div>
  </div></a></li>


                  
  
  `;
  
  

  $$("#listComents").prepend(obj);

}else{

  var img = "";
if(element.ImagenUsuario ==  undefined || element.ImagenUsuario == null ){
img = "img/iconos/ic_logoApp.png";
}else{
  img = element.ImagenUsuario;
}




  var obj = `
  <li>
  <a href="#" class="item-link item-content">
  <div class="item-media"><img src='`+img+`'  width="46" height="46"/></div>
  <div class="item-inner">
    <div class="item-title-row">
      <div class="item-title font-sm-2">`+element.Usuario.NombreUsuario+`</div>
      <div class="item-after font-sm-1">`+element.fecha+`</div>
    </div>
    <div class="item-subtitle"><div class='rateY`+element.fechaCreacion+`' ></div></div>
    <div class="item-text font-sm-1">`+element.comentario+`</div>
  </div></a></li>
                 
  
  `;
  
  

  $$("#listComents").prepend(obj);










}


 }

 
function AllComents(reviews,place) {
$$("#listComents").empty();

db.ref("Sitios/PlaceIdRef/"+place+"/coments").on("child_added",function (snapshot) { 

var coment = snapshot.val();
//console.log(coment);

ComentCard(coment,"plat");


 });



  reviews.forEach(element => {
  
    ComentCard(element,"map");
  

   /* $(".rateY"+element.time).rateYo({
      starWidth: "20px",
      rating: element.rating,
      readOnly: true
    });  */
  
  });


  


  
  
    }

    

function getFavorito(place) {
  var request = {
    placeId: place,
   
  };

  service.getDetails(request, Mycallback);


  function Mycallback(place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {

      $$(".toolbar_principal").click();
      AppendDetalle(place);



    }
  }


  }


    function Favoritos(){

     // $$(".toolbar_favoritos").off("click");
      $$("#listas-item-favoritos").empty();

     //   $(".page-content").slideDown();
  var refFavoritos =  db.ref("Sitios/"+datosUsuario.Usuario.idUsuario);
     
 
  refFavoritos.once("value",function (snapshot) { 

var val = snapshot.val();


if(val == null){

  $$("#content-list-favoritos").hide();
  $$("#content-presentacionFavoritos").show();

}else{

  $$("#content-list-favoritos").show();
  $$("#content-presentacionFavoritos").hide();
  $$("#listas-item-favoritos").empty();
  refFavoritos.on("child_added",function (snapshot) { 

    var dato = snapshot.val();
    
    
   CardFavorito(dato);
    
    
    
              });


}


   });



    







function CardFavorito(favorito) { 
  console.log(favorito);
  
var element = `<li class="card" onclick="getFavorito('`+favorito.placeId+`')"  >
<div  class=" item-content ">
  <div class="item-media"><img src="`+favorito.icon+`"  width="20" height="20" /></div>
  <div class="item-inner">
    <div class="item-title-row">
      <div class="item-title font-sm-2x1 transform-list ">`+favorito.name.toLowerCase()+`</div>
      <div class="item-after" ><img src="img/iconos/speech-bubble.png" style="margin-right: 4px" width="16" height="16" > <span class="badge color-black" >`+favorito.rating+`</span> </div>
    </div>
    <div class="item-subtitle">
   <div class="row">
    <div class="col-100" style="overflow: scroll;overflow-x: hidden;overflow-y: hidden" ><label class="font_sm1"><img src="img/iconos/map-placeholder.png" >`+favorito.dir+`</label></div>
  
   </div>

    </div>
    <div class="item-text font-sm-1">$$</div>
  </div>
</div>
</li>`;
$$("#listas-item-favoritos").prepend(element);


}



    }


    function DateFormat() {
      var dt = new Date();
  var mes = dt.getMonth() ;
  
  if(mes  < 10){
   mes = "0"+mes;
  }else{
 
  }
 
  return  ""+dt.getFullYear()+"-"+mes+"-"+dt.getDate()+" "+dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()
     
 
 
 
   }


     function AddComentario (placeId) { 





      var $CalificarServicio =  $("#calificacionResena").rateYo({
        starWidth: "40px",
        multiColor: {
       
          "startColor": "#FF0000", //RED
          "endColor"  : "#00FF00"  //GREEN
        }
      });
      
      
         $("#btnEnviarReseña").click(function (evt) { 
         var coment =    $$("#comentResena").val();
         var value =  $CalificarServicio.rateYo("rating");
      
         if(coment  ==  ""){
      alert("Usted debe Añadir un Comentario");
         }else{
          var datos = JSON.parse(  localStorage.getItem("config") );
      
      
          var data  = {
            comentario:coment,
            rate : value,
            Usuario:datos.Usuario,
            fecha:  Getdate()
      
          }
       //   $$(".close-coment-pop").click();
          console.log(data);
      
      db.ref("Sitios/PlaceIdRef/"+placeId+"/coments/"+datos.Usuario.idUsuario).set(data,function (error) {
      
        if(error){
      alert("Error al tratar de enviar tu comentario intenta mas tarde");
      $$(".close-coment-pop").click();
        }else{
   //   alert("Comentario Enviado");
      $$(".close-coment-pop").click();
        }
      
        });
      
             
      
      
      
         }
      
      
      
      
          });


      }

      
    function Getdate() {
      var dt = new Date();
      
      var dia ="";
      var mes = dt.getMonth()+1;
      var anio = dt.getFullYear();
      
      if( dt.getDate() <=9){
      dia = "0"+dt.getDate();
      
      }else{
      dia = dt.getDate();
      }
      if(mes <10){
        mes = "0"+mes;
      }else{
        mes = mes;
      }
      
      
      
      
      return ""+dia+"/"+mes+"/"+anio;
      
      
            }



            
function LoadOfertas() {

  app.preloader.show();

  var toastOfertas = app.toast.create({
    icon:"<i class='f7-icons color-black'>star_half</i>",
    text: 'No hay ofertas disponibles',
    position: 'center',
    closeTimeout: 3200,
  });

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
       $$("#listOfertas").empty();
      data.obj.forEach(element => {
         CardActividades(element);
      //   CardOfertasPrincipales(element);

         });
       

   }

   app.preloader.hide();
   
   },function (error) {
    app.preloader.hide();
      alert("Error al Obtener las Ofertas Contacte al Administrador");
   },"json");

}
      



function CardActividades(element) { 

  var content = `<li  id= '`+element.idOfertas+`'  class='card' >
  <a href="#" class="item-link item-content">
    <div class="item-media"><img src="`+element.ImagenOferta+`" width="80"/></div>
    <div class="item-inner">
      <div class="item-title-row">
        <div class="item-title font-sm-2x1 transform-list">`+element.TituloOferta.toLowerCase()+`</div>
        <div class="item-after font-sm-1">$`+element.DescuentoOfertas+`</div>
      </div>
      <div class="item-subtitle font-sm-1 ">Valida hasta `+element.FechaValidaOferta+`</div>
      <div class="item-text font-sm-2">`+element.DescripcionOferta+`</div>
    </div>
  </a>
</li>`;   

$$("#listOfertas").append(content);

$$("#"+element.idOfertas).click(function (evt) {

var id = $$(this).attr("id");
window.localStorage.setItem("ofertaItem",JSON.stringify(element));

window,location = "./OfertasDetalle.html?idOferta="+id;








});



 }





function CardOfertasPrincipales(element) {  

  var item = ` <div class="card demo-card-header-pic sp-slide">
  <div style="background-image:url(`+element.ImagenOferta+`)" class="card-header align-items-flex-end"><img src="img/icons-social/like.png" ></div>
  <div class="card-content  padding-right padding-bottom" style="padding-left: 5px !important" >
<div class="row" >
<div class="col-100">
  <label class="font_x2 label-min-paddig font-sm-3"  >`+element.NombreSitio+` </label>

</div>
<div class="col-100" >
  <label class="font_sm2 label-min-paddig font-sm-2" ><img src="img/iconos/map-placeholder.png" >`+element.direccionSitio+`</label>

</div>

<div class="col-70">
  <label class="font_x2 label-min-paddig font-sm-1"  >`+element.DescuentoOfertas+`</label>  
</div>
<div class="col-20" >
 <label class="font_x2 recomendado-rating"  >5.0</label>
</div>

</div>

</div>
  
</div>`




$$(".slider-ofertas").append(item);
$( '#slider-oferta' ).sliderPro();


}



function InitSearchBar() { 
//var saludos = ["hola","quemas","oe"];
  var autocompleteDropdownSimple = app.autocomplete.create({
    inputEl: '#inputHeader1',
    openIn: 'dropdown',
    valueProperty:"place_id",
    textProperty:"description",
    source: function (query, render) {
      var results = [];
      if (query.length === 0) {
      //  render(results);
        return;
      }
      console.log(query);
var res = [];
      var displaySuggestions = function(predictions, status) {
     if( predictions != null){

      predictions.forEach(element=>{
        console.log(element);
        res.push( element );
      });
      render(res);

     }

     $$("#buscarDefault").off("click");
      $$("#buscarDefault").click(function () { 
        
        GetDetails( predictions[0].place_id );



       });


      
       };
 console.log(query);
      autocomplete.getQueryPredictions({ input: query+"" }, displaySuggestions);
 




    
    },
  on:{
 change:function (value) 
 
 
 { 

 $$("#inputHeader1").val(value[0].description);
 $$(".toolbar_principal").click();
 GetDetails( value[0].place_id );


  }
  

  }


  });
  var autocompleteDropdownSimple2 = app.autocomplete.create({
    inputEl: '·#inputHeader2',
    openIn: 'dropdown',
    valueProperty:"place_id",
    textProperty:"description",
    source: function (query, render) {
      var results = [];
      if (query.length === 0) {
      //  render(results);
        return;
      }
      console.log(query);
var res = [];
      var displaySuggestions = function(predictions, status) {
     if( predictions != null){

      predictions.forEach(element=>{
        console.log(element);
        res.push( element );
      });
      render(res);

     }
      
       };
 console.log(query);
      autocomplete.getQueryPredictions({ input: query+"" }, displaySuggestions);
     

    
    },
  on:{
 change:function (value) { 

 $$("#inputHeader2").val(value[0].description);
 $$(".toolbar_principal").click();
 GetDetails( value[0].place_id );


  }
  

  }


  });
  var autocompleteDropdownSimple3 = app.autocomplete.create({
    inputEl: '#inputHeader',
    openIn: 'dropdown',
    valueProperty:"place_id",
    textProperty:"description",
    source: function (query, render) {
      var results = [];
      if (query.length === 0) {
      //  render(results);
        return;
      }
      console.log(query);
var res = [];
      var displaySuggestions = function(predictions, status) {
     if( predictions != null){

      predictions.forEach(element=>{
        console.log(element);
        res.push( element );
      });
      render(res);

     }
      
       };
 console.log(query);
      autocomplete.getQueryPredictions({ input: query+"" }, displaySuggestions);
     

    
    },
  on:{
 change:function (value) { 

 $$("#inputHeader").val(value[0].description);
 $$(".toolbar_principal").click();
 GetDetails( value[0].place_id );


  }
  

  }


  });

}

InitSearchBar();




function MindateFormat(){
      
  var fecha = new Date();

  var dia = "";
  var mes ="";
  var anio = fecha.getFullYear();

if(  fecha.getDate() <=9 ){
dia ="0"+fecha.getDate();
}else{
dia = ""+fecha.getDate();
}
if(  (fecha.getMonth()+1) <=9 ){
mes ="0"+(fecha.getMonth()+1);
}else{
  mes =""+(fecha.getMonth()+1);
}

var res = dia+"/"+mes+"/"+anio;

return res;
}


function UriMap(lat,lng) { 
return "https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyD0Bg2YOsO6fxAn5a7rNq9lMb723gEgLK0&center="+lat+","+lng+"&zoom=12&size=500x200&scale=2&markers=color:red%7Clabel:S%7C"+lat+","+lng;


 }