
//AgregarFotoCenter

//Opciones para camara
var tokeSitio = getParameterByName("placeId");
function setOptions(srcType) {
  var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true  //Corrects Android orientation quirks
  }
  return options;
}


app.views.create(".view-detallesSitio",{
 on:{
   pageInit: function () { 
   
console.log("Init");
FotosUsuariosSitio();
LoadUsersImages();
LoadUserComents();


Getdate();




    }
 }

});


function OpenCamera() { 

  var srcType = Camera.PictureSourceType.CAMERA;
  var options = setOptions(srcType);

 
    navigator.camera.getPicture(onSuccessImage, onFailImage, options);
  




 }

 function OpenFileExplorer() {

  
  
  var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
  var options = setOptions(srcType);


  navigator.camera.getPicture(onSuccessImage, onFailImage, options);
  



  }
  function onSuccessImage(imageData) {
 
  var imgData = "data:image/jpeg;base64," + imageData;

var ref =  storage.ref("Sitios/"+tokeSitio+"/UserImage" );




var task =  ref.child(  ""+token()+".jpeg"  ).putString(imgData, 'data_url');

///Change
var progress = 0;
var dialog = app.dialog.progress('Subiendo Imagen', progress);
dialog.setText('Upload is 0% done');

task.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  dialog.setProgress(progress);
  dialog.setText('Upload is ' + progress + '% done');
 
  
}, function(error) {
  dialog.close();
}, function() {

  var dataU = JSON.parse( localStorage.getItem("DataUser")  );
 
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
   

    
var DatosImg= {
  DatosUsuario:dataU,
  urlImage:downloadURL
}


  //Subir La Imagen al Gestor de Sitios

db.ref("Sitios/PlaceIdRef/"+tokeSitio+"/userImage").push().set(DatosImg,function (error) {
  dialog.close();
 if(error){
alert("Error al Guardar la Imagen");
 }else{
  alert("Guardado Satisfactorio");

 }


  });




  });
});




//Change






}

function onFailImage(message) {
    alert('Failed because: ' + message);
}



function FotosUsuariosSitio() { 

 $$("#AgregarFotoCenter").click(function (evt) {
console.log("Agregar");
var diag = app.dialog.create({
  title:"Subir Imagen",
  text:"Opciones para cargar la Imagen",
   buttons:[
     {
       text:"Tomar Foto",
       onClick:function (dialog,e) { 
         OpenCamera();

        }
     },
     {
       text:"Abrir Galeria",
       onClick:function (dialog,e) { 
         OpenFileExplorer();

        }
     }
   ]

}).open();



   });


 }









var idSitio  = getParameterByName("placeId");

  $(".rateYo").rateYo({
    starWidth: "32px"
  });



$$("#listComents").css("width",screen.width);



  ///Google Maps Functions


  var map;

function initMap() {
  // Create a map centered in Pyrmont, Sydney (Australia).
  map = new google.maps.Map(document.getElementById('mapa'), {
    center: {lat: -33.8666, lng: 151.1958},
    zoom: 15
  });


  // Search for Google's office in Australia.
  var request = {
    placeId: idSitio
   
  };

  var service = new google.maps.places.PlacesService(map);
  service.getDetails(request, callback);
}

// Checks that the PlacesServiceStatus is OK, and adds a marker
// using the place ID and location from the PlacesService.
function callback(place, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
 console.log(place);
 DisplayView(place);
 ActionFloating(place);
 ActionsButtomCenter(place);

  }
}



  //End google Maps




//Pasar los datos en la vista

function ViewSlider(fotos) { 

if(fotos == undefined){


}else{

  fotos.forEach(element => {
    var foto = element.getUrl({'maxWidth': $(".swiper-wrapper").width(), 'maxHeight':$(".swiper-wrapper").height()});
   
    var viewElement = "<div class='swiper-slide'>"
    viewElement = viewElement +"<img src='"+foto+"'>";
   
    viewElement = viewElement +"</div>";
   
    $$("#contentHeaderWrap").append(viewElement);
   
   });

}


var swiper = new Swiper('#containerHeaderPage', {
   
  centeredSlides: true,
  pagination: {
    el: '.swiper-pagination',
   type: 'fraction',
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});




 }


function DisplayView(place) { 

 $$("#sitioName").text(place.name); 
 $$("#title").text(place.name);
$$("#direccionSitio").text(place.formatted_address);


if(place.formatted_phone_number == null || place.formatted_phone_number ==""){
$$("#itemTelefono").hide();
}else{
  $$("#telefonoSitio").text(place.formatted_phone_number);
}

$$("#checkInChat").click(function (evt) { 

window.location = "CheckIn-Chat.html?name="+place.name+"&token="+place.place_id;


 });



if(place.website== null || place.website == ""){
 $$("#itemWebPage").hide();
}else{
  $$("#sitioWeb").text(place.website);
}

$$("#direction2").text(place.formatted_address);
ViewSlider(place.photos);
AllComents(place.reviews);
OpenedOur(place.opening_hours.periods);



SaveHistory(place);

 }

function SaveHistory(place) {
 var datos = JSON.parse(  localStorage.getItem("DataUser") );


  db.ref("Usuarios/"+datos.idUsuario+"/history/"+tokeSitio).set({
  icon:place.icon,
  namePlace:place.name,
  id:tokeSitio,
  date:Getdate()

  });


  
}


 function OpenedOur(hour) { 

  var date = new Date();
var dayInidicator = date.getUTCDay() ;
//console.log(dayInidicator-2);
//console.log(hour[1]);


 if(hour == true){

$("#StateSite").text("Abierto");
$("#StateSite").css("color","green");



 }else if(hour ==false){
  $("#StateSite").text("Cerrado");
  $("#StateSite").css("color","red");
 

 }else{
  $("#StateSite").text("No disponible");
  $("#StateSite").css("color","black");
 }


  }

function AllComents(reviews) {

reviews.forEach(element => {

  var date = new Date(element.time);

  var fecha = ""+date.getUTCDate()+"/0"+(date.getMonth()+1)+"/"+date.getFullYear();


  var obj = `
  <li>
                    <a href="#" class="item-link item-content">
                      <div class="item-media"><img src='`+element.profile_photo_url+`'  width="46" height="46"/></div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-title">`+element.author_name+`</div>
                          <div class="item-after">`+fecha+`</div>
                        </div>
                        <div class="item-subtitle"><div class='rateY`+element.time+`' ></div></div>
                        <div class="item-text">`+element.text+`</div>
                      </div></a></li>
  
  `;
  
  

  $("#listComents").append(obj);

  $(".rateY"+element.time).rateYo({
    starWidth: "20px",
    rating: element.rating,
    readOnly: true
  });

});



  }


 

function ActionFloating(lugar) {



$("#floatOptionGuardarSitio").click(function (evt) {
evt.preventDefault();

var dataU = JSON.parse(  localStorage.getItem("DataUser") );
//console.log(lugar.place_id);

db.ref("Usuarios/"+dataU.idUsuario+"/Colecciones/"+lugar.place_id).set({
  "Sitio":lugar.place_id,
  "Nombre":lugar.name,
 "Date": GetDate(),
  "Direccion":lugar.formatted_address,
  "Calificacion":lugar.rating
});




 });

$("#floatReservas").click(function (evt) { 
evt.preventDefault();

window.location = "./MakeReserva.html?tokenSite="+lugar.place_id ;



 });

 $("#floatMenu").click(function (evt) {
window.location = "beforeMenu.html?tokenSitio="+tokeSitio;


   });


  
}


function ActionsButtomCenter(lugar) {

  $("#buttonCenterReservas").click(function (evt) { 
    window.location = "./MakeReserva.html?tokenSite="+lugar.place_id ;

   });

  }


  function LoadUsersImages() { 

 


 







    db.ref("Sitios/PlaceIdRef/"+tokeSitio+"/userImage").once("value",function (snapshot) { 

      var imgUsers = snapshot.val();

   

if(imgUsers == null){
$$("#sectionImgUsers").hide();


}else{

 
db.ref( "Sitios/PlaceIdRef/"+tokeSitio+"/userImage"  ).on("child_added",function (snapshot) { 
var img = snapshot.val();
console.log(img);

var key =snapshot.key;

var content = `<div id="`+key+`" class="swiper-slide">
<img src='`+img.urlImage+`'  width='60' height='60' > </div>
`;


$("#wraperImagesUser").append(content);

var swiper = new Swiper('#pageSliderUserImage', {
  slidesPerView: 3,
  spaceBetween: 5,
  freeMode: true,

});





$$("#"+key).click(function (evt) {

evt.preventDefault();

var dynamicPopup = app.popup.create({
  content: '<div class="popup">'+
              '<div class="block">'+
               '<p><a href="#" class="link popup-close">Close me</a></p>'+
               "<h4>Autor: "+img.DatosUsuario.NombreUsuario+" </h4>"+
               "<img width='100%' height='100%' src='"+img.urlImage+"' >"+
              '</div>'+
            '</div>',
  // Events
  on: {
    open: function (popup) {
      console.log('Popup open');
    },
    opened: function (popup) {
      console.log('Popup opened');
    },
  }
});


dynamicPopup.open();





 });



 });





}



     });





   }//Fin Load Images


//Calificacion


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
    var datos = JSON.parse(  localStorage.getItem("DataUser") );


    var data  = {
      comentario:coment,
      rate : value,
      Usuario:datos,
      fecha:  Getdate()

    }
 //   $$(".close-coment-pop").click();
    console.log(data);

db.ref("Sitios/PlaceIdRef/"+getParameterByName("placeId")+"/coments").push().set(data,function (error) {

  if(error){
alert("Error al tratar de enviar tu comentario intenta mas tarde");
$$(".close-coment-pop").click();
  }else{
alert("Comentario Enviado");
$$(".close-coment-pop").click();
  }

  });

       



   }




    });



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

 
      function LoadUserComents() {

        var ref =db.ref("Sitios/PlaceIdRef/"+getParameterByName("placeId")+"/coments");
   
        ref.once("value",function (snapshot) {

     if( snapshot.val() == null){

     }else{

  ref.on("child_added",function (snapshot) {

    var coment = snapshot.val();
    var llave = snapshot.key;
console.log(coment);
    var obj = `
  <li>
                    <a href="#" class="item-link item-content">
                      <div class="item-media"><img class='rounded' src='`+coment.Usuario.imgPerfil+`'  width="46" height="46"/></div>
                      <div class="item-inner">
                        <div class="item-title-row">
                          <div class="item-title">`+coment.Usuario.NombreUsuario+`</div>
                          <div class="item-after">`+coment.fecha+`</div>
                        </div>
                        <div class="item-subtitle"><div class='rateY`+llave+`' ></div></div>
                        <div class="item-text">`+coment.comentario+`</div>
                      </div></a></li>
  
  `;
  
  

  $("#listComents").append(obj);  

  $(".rateY"+llave).rateYo({
    starWidth: "20px",
    rating: coment.rate,
    readOnly: true
  });



    });

     }


          });

        

      }

 
      $$("#centerButtonMenu").click(function (evt) { 
        window.location = "beforeMenu.html?tokenSitio="+tokeSitio;
       });