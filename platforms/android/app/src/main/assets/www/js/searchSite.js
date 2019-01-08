/**
 *Funcion para crear un div google maps
 * 
 */






function EventPriceButton() {


  $$("#buttonS1").hide();
  $$("#buttonS2").hide();
  $$("#buttonS3").hide();
  $$("#buttonS4").hide();
  $("#colBtn").addClass("col-20");
  $("#colBtn").removeClass("col-80");
  var btnEstatePrice = false;
  var count = 1;
  

$("#buttonAll").click(function () { 

if(btnEstatePrice == false){

  for(var i = 1; i<=4 ;i++){
    $$("#buttonS"+i).show();

  }
$("#colBtn").addClass("col-80");
$("#colBtn").removeClass("col-20");


    btnEstatePrice = true;


}else{

  for(var i = 1; i<=4 ;i++){
    $$("#buttonS"+i).hide();

  }
  $("#colBtn").removeClass("col-80");

  $("#colBtn").addClass("col-20");


      btnEstatePrice = false;



}




 });

}




EventPriceButton();



//BOTON Centrado en el mapa
var btnCenter ;



function CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.id= "btnCentrado";
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlUI.paddingTop = "30px";
    controlDiv.appendChild(controlUI);
    
    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.id="idText";
    controlText.style.lineHeight = '20px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.innerHTML = 'Buscar en esta area';
    controlUI.appendChild(controlText);
    
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function() {
    //alert("hola");
    });
    btnCenter = controlUI;
    
   


   DisplayControlCenter();
    
    }




function OpenPlace(idPlace) { 

window.location = "SitioDetalle.html?placeId="+idPlace;

 }






///Variables Globales

var map;
var service;
var arrayMarker = [];
var infoArray = [];


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
     zoom: 13,
     center: {lat: -33, lng: 151},
     disableDefaultUI: true
   });

service = new google.maps.places.PlacesService(map);

// Create the DIV to hold the control and call the CenterControl()
   // constructor passing in this DIV.
 var centerControlDiv = document.createElement('div');
   centerControlDiv.id = "Estate";
   var centerControl = new CenterControl(centerControlDiv, map);

   centerControlDiv.index = 1;
   map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

UbicacionUsuario(map);


 }//INIT Map Fin



 /**
  * Determinar el tipo de filtro
  * 
  * 
  */
 var filtro = "";
var choose = getParameterByName("type");  
//

switch(choose){

case "RES":
filtro = "restaurantes Comida Platos";
$$("#titleCat").text("Restaurantes");
break;

case "BAR":
filtro = "bebidas estadero bar bares licor";
$$("#titleCat").text("Bares");
break;

case "DISCO":
filtro = "club nocturno discotecas beber ";
$$("#titleCat").text("Discotecas");
break;

case "HOTELES":
filtro = "Hoteles";
$$("#titleCat").text("Hoteles");
break;

case "All":
filtro = "Restaurantes,Bares,Discotecas,Hoteles,Comidas,Club nocturno";
break;

case "filter":
filtro = getParameterByName("sitioName");

break;



}


//Este evento Sirve Para Tomar el control sobre el boton flotante del mapa
function DisplayControlCenter() {
  btnCenter.style.display = "none";
 
  map.addListener('center_changed', function() {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
  // alert("changed");
  btnCenter.style.display = "block";
var Center = map.getCenter();


  });

btnCenter.addEventListener("click",function (evt) {

var centro =  map.getCenter();

LimpiarMarcadores();
LooksPlace(centro);



  });

}



function UbicacionUsuario() {
  if(navigator.geolocation){
  
  navigator.geolocation.getCurrentPosition(function (coordenadas) {
   var pos = {
       lat: coordenadas.coords.latitude,
       lng: coordenadas.coords.longitude
     };


var marker = new google.maps.Marker({
   position: pos,
   map: map,
   title: 'Mi Posicion',
 //  icon: "img/UbUser.png"
 });
 map.setCenter(pos);
 DisplayControlCenter();

   LooksPlace(pos);


    },function (error) {
    alert("Error al Obtener Su Posicion");
    });
    

  
  }else{


  }


 }

 
//Limpia Todos los marcadores del mapa 
function LimpiarMarcadores() { 
  arrayMarker.forEach(element => {
    element.setMap(null);
  });
  
  
   }
  
  
  
  
          //Efectuar Busqueda de Lugares dependiendo de la ubicacion y el tipo de filtro
          function LooksPlace(location) { 
            app.progressbar.show('multi');
  var request = {
      location: location,
      radius: '200',
      query: filtro
    };
  
    service.textSearch(request, ShowResult);
  
 };

        //Efectuar Busqueda de Lugares dependiendo de la ubicacion y el tipo de filtro
        function LooksPlacePrice(location,values) { 
          app.progressbar.show('multi');
var request = {
    location: location,
    radius: '200',
    query: filtro,
    minPriceLevel:values.min,
    maxPriceLevel:values.max 
  };

  service.textSearch(request, ShowResult);

}



  
           function ShowResult(results, status){
            app.progressbar.hide();
  if (status === google.maps.places.PlacesServiceStatus.OK) {
     $$("#ListaSitios").empty();
    btnCenter.style.display = "none";
  
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
              DisplayListSitios( results[i] );
            }
          }
          else{
            alert("No Se Encontraron Lugares en la Zona");
          }
  
  
  
           }
  
  
          /**
          **Este Metodo Crea los Marcados en el mapa Dependiendo del Resultado
          **Recibe un Array de Resultados
          **/ 
  
                function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
           arrayMarker.push(marker);
          
          DisplayWindows(marker,place);
     /*      google.maps.event.addListener(marker, 'click', function() {
           // infowindow.setContent(place.name);
          //  infowindow.open(map, this);
          });  */
        };
  
           
  var countDisplay = 1000;
          function DisplayWindows(marker,place) {
            countDisplay =countDisplay +1;
        

var objeto = {
  id :"",
  nombre:"",
  foto:"",
  status:false,
  calificacion:0


}

//Set Values
objeto.id = place.place_id;
objeto.nombre = place.name;
objeto.calificacion = place.rating;
if( place.photos  == null || place.photos.length == 0){

}
else{
var icon = place.photos[0].getUrl({'maxWidth': 80, 'maxHeight': 70});
objeto.foto = icon;

} ;


if(place.opening_hours  == null || place.opening_hours == undefined  ){
objeto.status = undefined;
//  status = "<font style='color=orange'  >No Disponible</font>";

}else{
 if(place.opening_hours.open_now){
   objeto.status = true;

}else{
objeto.status = false;
}

}




var element  = "<li  class='card' id='Item"+countDisplay+"' >";

element = element +" <a href='#' class='item-link item-content'>";

element = element +"<div class='item-media' style='' ><img class='imgContent' src='"+objeto.foto+"' width='80' heigth='80' /></div>";

element = element +" <div class='item-inner'>";

element = element +"  <div class='item-title-row'>";

element = element +" <div class='item-title'>"+objeto.nombre+"</div>";

if(objeto.status == true){
  element = element +" <div class='item-after'><i style='color:green'  class='fas fa-unlock'></i>  </div>";
}else if(objeto.status == false){
  element = element +" <div class='item-after'><i style='color:red'  class='fas fa-lock'></i>  </div>";
}else
{
  element = element +" <div class='item-after'><i style='color:red'  class='fas fa-question-circle'></i>  </div>";
}

element = element +" </div>";

element = element +" <div class='item-subtitle'><div id='rateYo"+countDisplay+"'></div></div>";

element = element +"   <div class='item-text'>Calificacion: "+objeto.calificacion+"</div>";

element = element +"<span class='fas fa-star checked'></span>"
+"<span class='fas fa-star checked'></span>"+
"<span class='fas fa-star checked'></span>"+
"<span class='fas fa-star checked'></span>"+
"<span class='fas fa-star checked'></span>";



element = element + "  </div  ></a></li>";




      var dynamicSheet = app.sheet.create({
        content: '<div class="sheet-modal">'+
                    '<div class="toolbar">'+
                      '<div class="toolbar-inner">'+
                        '<div class="left"></div>'+
                        '<div class="right">'+
                          '<a class="link sheet-close">Cerrar</a>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                    '<div class="sheet-modal-inner">'+
                      '<div >'+
                        `<div onclick="OpenPlace('`+objeto.id+`')"  class='list media-list'>`+
                           element+
                       "</div>"+
                      '</div>'+
                    '</div>'+
                  '</div>',
        // Events
        on: {
          open: function (sheet) {
          
         
          },
          opened: function (sheet) {
           
           },
        }
      });
      // Events also can be assigned on instance later
      dynamicSheet.on('close', function (sheet) {
        console.log('Sheet close');
      });
      dynamicSheet.on('closed', function (sheet) {
        console.log('Sheet closed');
      });
      
    




      ///FinalWidow


  
   infoArray.push(dynamicSheet);
   
  
  
  
    marker.addListener("click",function () {
    //  CloseAllW();
//  infowindow.open(map,marker);




dynamicSheet.open();




  /*
  $("#"+place.place_id).click(function () { 
  
  OpenPlace(place.place_id);
   });  */
  
   
   

   
  
    
  
      });
  
    
    
  
  
            }
  
  //Funcion que cierra todas las ventanas
  function CloseAllW() {
  
  infoArray.forEach(element => {
    element.close();
  
  });
  
  
    }
  
   
  
  
  var countList = 0 ;
      function DisplayListSitios(place) {
       var objeto = {
         id :"",
         nombre:"",
         foto:"",
         status:false,
         calificacion:0


       }

       //Set Values
       objeto.id = place.place_id;
       objeto.nombre = place.name;
       objeto.calificacion = place.rating;
       if( place.photos  == null || place.photos.length == 0){
  
      }
      else{
     var icon = place.photos[0].getUrl({'maxWidth': 80, 'maxHeight': 70});
    objeto.foto = icon;
       
      } ;

     
      if(place.opening_hours  == null || place.opening_hours == undefined  ){
      objeto.status = undefined;
    //  status = "<font style='color=orange'  >No Disponible</font>";
      
      }else{
        if(place.opening_hours.open_now){
          objeto.status = true;
     
      }else{
      objeto.status = false;
      }
      
      }

    



      //End Values

/**
<li>
      <a href="#" class="item-link item-content">
        <div class="item-media"><img src="http://lorempixel.com/160/160/people/1" width="80"/></div>
        <div class="item-inner">
          <div class="item-title-row">
            <div class="item-title">Yellow Submarine</div>
            <div class="item-after">$15</div>
          </div>
          <div class="item-subtitle">Beatles</div>
          <div class="item-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.</div>
        </div></a></li>



*/

var element  = "<li  class='card' id='Item"+countList+"' >";

element = element +" <a href='#' class='item-link item-content'>";

element = element +"<div class='item-media' style='' ><img class='imgContent' src='"+objeto.foto+"' width='80' heigth='80' /></div>";

element = element +" <div class='item-inner'>";

element = element +"  <div class='item-title-row'>";

element = element +" <div class='item-title'>"+objeto.nombre+"</div>";

if(objeto.status == true){
  element = element +" <div class='item-after'><i style='color:green'  class='fas fa-unlock'></i>  </div>";
}else if(objeto.status == false){
  element = element +" <div class='item-after'><i style='color:red'  class='fas fa-lock'></i>  </div>";
}else
{
  element = element +" <div class='item-after'><i style='color:red'  class='fas fa-question-circle'></i>  </div>";
}

element = element +" </div>";

element = element +" <div class='item-subtitle'><div id='rateYo"+countList+"'></div></div>";

element = element +"   <div class='item-text'>Calificacion: "+objeto.calificacion+"</div>";




element = element + "  </div></a></li>";

$$("#ListaSitios").append(element);

  
  
  $$("#Item"+countList).click(function () { 
  OpenPlace(place.place_id);
  
   });
  
  
    $("#rateYo"+countList).rateYo({
      rating: place.rating,
      readOnly: true,
      starWidth: "15px",
     
      multiColor: {
   
   "startColor": "#FF0000", //RED
   "endColor"  : "#00FF00"  //GREEN
  }
  
  
    });
  
  
  countList = countList + 1;
        };

  
  var priceValue = {
    min:2,
    max:3
  };

        function ActionsPrice() {


   $$("#buttonAll").click(function (evt) { 
  if(  $$(this).hasClass("button-active") ){
    $$(this).removeClass("button-active");
  }else{
    $$(this).addClass("button-active");
    dysplayActionsPrice(null);

  }


    });

    $$("#buttonS1").click(function (evt) { 

      if(  $$(this).hasClass("button-active") ){
        $$(this).removeClass("button-active");
      }else{
        $$(this).addClass("button-active");
        dysplayActionsPrice(1);

      }

     
    });
    $$("#buttonS2").click(function (evt) { 

      if(  $$(this).hasClass("button-active") ){
        $$(this).removeClass("button-active");
      }else{
        $$(this).addClass("button-active");
        dysplayActionsPrice(2);
      }
     
    });
    $$("#buttonS3").click(function (evt) { 
     
      if(  $$(this).hasClass("button-active") ){
        $$(this).removeClass("button-active");
      }else{
        $$(this).addClass("button-active");
        dysplayActionsPrice(3);

      }


    });
    $$("#buttonS4").click(function (evt) { 
     
      if(  $$(this).hasClass("button-active") ){
        $$(this).removeClass("button-active");
      }else{
        $$(this).addClass("button-active");
       dysplayActionsPrice(4);
      }

    });


          }
       
ActionsPrice();


function dysplayActionsPrice(num){

if( num  <= 2 ){

 priceValue.min = num;
}else{

if( num > 2){
  priceValue.max = num;
}


}

if(num == null){
priceValue.max = null;
priceValue.min = null;
LooksPlace(map.getCenter());
}else{
  LooksPlacePrice(map.getCenter(),priceValue);



}



}


