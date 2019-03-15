var mainView = app.views.create(".view-main");
var datosUsuario = JSON.parse( localStorage.getItem("config")  );
var contenidoSocial = JSON.parse(  localStorage.getItem("ContenidoSocial")  );

var stories ;
stories = new Zuck('stories', {
  backNative: false,
            previousTap: true,
  autoFullScreen: false,
  skin: "Snapgram",
  avatars: true,
  list: false,
            cubeEffect: true,
  localStorage: true,
  stories: [
  
  ]
});
LoadHistorias();
GetAllAccountCoins();
ObtenerActividades();
LoadPublicaciones();
Sugeridos();
//SubirHistoriaImagen();
GotHistorias(4);

var ActividadPublicacion;



$$(".prt-principal").on("ptr:refresh",function () { 

  //app.ptr.done(".prt-principal");

  app.request.post(configApp.uri+"Social/InitSocialRed",{
    usuarioId:datosUsuario.Usuario.idUsuario
  },function (data) {
    app.ptr.done(".prt-principal");
  
    console.log(data); 
    localStorage.setItem("ContenidoSocial",JSON.stringify(data));
    contenidoSocial = data;
    LoadPublicaciones();

   
  

   },function (error) {
 alert("error");
 app.ptr.done(".prt-principal");
    



  },"json");


 });





 var dialogTransfer = app.dialog.create({
title:"Transferir Coins",
content:`
<div class='moda-content-coin' >
<h5>UUI</h5>
<input id='indentificadorUsuario' class='input-modal'  >
<h5>coins a Transferir</h5>
<input type='number' id='coins-to-tranfer' class='input-modal'  >
</div>
`,
buttons:[
  {
    text:"Cancelar",
    onClick:function () { 
  $$("#coins-to-tranfer").val("");
  $$("#indentificadorUsuario").val("");

     }
  },
   {
    text:"Aceptar",
    onClick:function () { 
  var coins =  $$("#coins-to-tranfer").val();
  var idUsuario = $$("#indentificadorUsuario").val();

 if( coins == "" || idUsuario == "" ){
alert("los datos son requeridos");
 }else{
app.progressbar.show("multi");
app.request.post("https://www.suritag.com/GrapheneBlockChain/public/MobileApi/transferUserToUser",{
  senderKey:cuenta.publicKey,
  UUI:idUsuario,
  ValueToTransfer: coins
},function (data) {
  app.progressbar.hide();
alert("transferencia Completa");


  },function(error){
alert("Error al realizar la transferencia");
app.progressbar.hide();
  },"json");



 }


     }
  },
  {
    text:"Cerrar",
    onClick:function () { 
      
     }
  }
]

});
//app.popup.open(".popup-publicaciones",true);
//console.log( new Zuck({}) );





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

function cameraCallback(imageData) {



   //console.log(publicacion);


   



  var image = document.getElementById('imgPulibcacion');
  image.src = "data:image/jpeg;base64," + imageData;
  app.popup.open(".popup-publicaciones",true);
$$("#cerrar-pop-publicaciones").off("click");
$$("#descripcion-publicacion").val("");
$$("#textUbicacion").val("");
$$("#compartir-publicacion-pop").off("click");

  $$("#cerrar-pop-publicaciones").click(function () {

    app.popup.close(".popup-publicaciones",true);
    });


  $$("#compartir-publicacion-pop").click(function (evt) { 
  evt.preventDefault();
  app.dialog.progress();


var params ;
  if(publicacionType == "ACTIVIDAD"){
    var cuenta =  localStorage.getItem("chainData");
    cuenta = JSON.parse(cuenta);
    params = {
     ActividadId:ActividadPublicacion.ActividadesId,
     Descripcion:$$("#descripcion-publicacion").val(),
     hashtag:ActividadPublicacion.Hash,
     Imagen: $$("#imgPulibcacion").attr("src"),
     NameSHared:"",
     idUsuario:datosUsuario.Usuario.idUsuario,
     TIpo:"Actividad",
     PublicKey:cuenta.publicKey,
     Lugar:$$("#textUbicacion").val()

    };



 }else{
  $$(".Hashtag-text").text("");

   params = {
     Descripcion:$$("#descripcion-publicacion").val(),
    Imagen:$$("#imgPulibcacion").attr("src"),
    idUsuario:datosUsuario.Usuario.idUsuario,
     TIpo:"Propia",
     Lugar:$$("#textUbicacion").val()

    };


 }

 app.request.post(configApp.uri+"Social/SubirPublicacion",params,function (data) {
  app.dialog.close(); 
 $$("#imgPulibcacion").attr("src","");
 $$("#textUbicacion").val("");
  $$("#descripcion-publicacion").val("");
  alert("Publicacion enviada Con exito");

if(data.status == false ){
  app.dialog.alert("Imagen no valida","Estado");
  app.popup.close(".popup-publicaciones",true);
}else{

  SocialCard(data.value,[],[]);

}

 app.popup.close(".popup-publicaciones",true);
 alert(JSON.stringify(data.value));


  },function (error) { 
    app.dialog.close();
    alert("Error al tratar de realizar la publicacion");

  },"json");








   });


}
function onFail(message) {
  alert('Failed because: ' + message);
}





////Acciones para subir Una Publicacion
$$("#img-examinar").click(function (evt) { 
  publicacionType = "NORMAL";
  $$(".Hashtag-text").text("");

 
   var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
   var options = setOptions(srcType);
 
   navigator.camera.getPicture(cameraCallback,onFail, options);
 
  });
  $$("#camara").click(function (evt) { 
 publicacionType = "NORMAL";
 $$(".Hashtag-text").text("");
 $$(".hast-content").hide();

   var srcType = Camera.PictureSourceType.CAMERA;
   var options = setOptions(srcType);
 
   
   navigator.camera.getPicture(cameraCallback,onFail, options);
 
 
   
 });
//end Accion


function LoadPublicaciones() {  

$$("#social-Content").empty();
 if( contenidoSocial.publicaciones == null ){
 
 }else{
  contenidoSocial.publicaciones.forEach(element=>{
    SocialCard(element.publicaciones,element.eventos,contenidoSocial);
    
    });
 }






}
































ProfileItemActions();
 var publicacionType = "";


 //console.log(mainView);

function getBase64(file) {
   var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function () {
     console.log(reader.result);
   };
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
}

var cuenta =  localStorage.getItem("chainData");
 if(cuenta != null){
   cuenta = JSON.parse(cuenta);
 }

//OpenProfileUser(datosUsuario.Usuario.idUsuario);





document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
 // SubirHistoriaImagen();
}


$$("#profileUser-Social-own").click(function (evt) { 
$$(".popover-backdrop").click();

 });
//Subir Historia Imagen 

$$("#addHistoriaImg").click(function (evt) {
  $$(".popover-backdrop").click();
  SubirHistoriaImagen();
  
  
});

//$$("#addHistoriaImg").click();


//InitSearch();
Publicar();



Profile();
//Amigos();
$$("#listaMeGusta").hide();
$$("#listaComentario").show();

$$(".tab-actividad").click(function (evt) { 
 // LoadEventsActividades();
 ObtenerActividades();
 });

function ObtenerActividades() { 

app.request.get("https://www.suritag.com/GrapheneBlockChain/public/MobileApi/ObtenerActividades",null,function (data) {  

  $$("#lista-actividades").empty();



data.value.forEach(element=>{
 
     
  $$("#lista-actividades").prepend(` <li>
  <a  id="accion`+element.ActividadesId+`" href="#" class="item-link item-content"  >
    <div class="item-media"><img src="`+element.ImagenMarca+`" width="42" height="42"/></div>
    <div class="item-inner">
      <div class="item-title-row">
        <div class="title-list-activity item-title" >`+element.NombreActividad+`</div>
        <div class="item-after pricebit-coin badge color-blue">`+element.CanttidadCoins*0.1+` STC</div>
      </div>
      <div class="item-subtitle item-subtitle-coins">`+element.Hash+`</div>
      <div class="item-text">`+element.Descripcion+`</div>
    </div></a></li>`);

$$("#accion"+element.ActividadesId).click(function () { 
  PublicarInNameActivity(element);



 });


});



},function (error) {  

},"json");

$$("#lista-actividades").append();
  
 }

$$("#closeSocial").click(function (evt) {
evt.preventDefault();
 window.location = "View_Principal.html";
  });


$$(".btn-action-pop").click(function (evt) {
  $$(".btn-action-pop").removeClass("theming");
$$(this).addClass("theming");
var action = $$(this).val();

if(action == "coment")
{
$$("#listaMeGusta").hide();
$$("#listaComentario").show();


}
if(action == "like"){

  $$("#listaMeGusta").show();
  $$("#listaComentario").hide();

}




  });




function InitSearch(){


   db.ref("Social/Usuarios").on("child_added",function (snapshot) { 
  var value = snapshot.val();

  if(value.ImagenUsuario == null || value.ImagenUsuario == "" || value.ImagenUsuario == undefined ){

   $$(".liist-search-Usuarios").append(`
   <li>
   <a href="#" class="item-link item-content">
     <div class="item-media"><img src="img/iconos/user_defaultProfile.png" width="44"/></div>
     <div class="item-inner">
       <div class="item-title-row">
         <div class="item-title">`+value.NombreUsuario+`</div>
       </div>
       <div class="item-subtitle">`+value.CorreoUsuario+`</div>
       <div class="item-text" >
                          <button class="button button-small" onclick="EnviarSolicitud(`+value.idUsuario+`)"  >Enviar solicitud</button>

                        </div>
     </div>
   </a>
 </li>
   `);


  }else{

   $$(".liist-search-Usuarios").append(`
   <li>
   <a href="#" class="item-link item-content">
     <div class="item-media"><img src="`+value.ImagenUsuario+`" width="44"/></div>
     <div class="item-inner">
       <div class="item-title-row">
         <div class="item-title">`+value.NombreUsuario+`</div>
       </div>
       <div class="item-subtitle">`+value.CorreoUsuario+`</div>
       <div class="item-text" >
       <button class="button button-small" onclick="EnviarSolicitud(`+value.idUsuario+`)"  >Enviar solicitud</button>

     </div>
     </div>
   </a>
 </li>
   `);





  }




      


    });



    var searchbar = app.searchbar.create({
      el: '.searchbar-usuarios',
      searchContainer: '.list-userTo-Search',
      searchIn: '.item-title',
      on: {
        search(sb, query, previousQuery) {
          console.log(query, previousQuery);
        }
      }
    });



};

function Sugeridos() { 
  console.log("sugeridos");
 $$("#listaSugeridos").empty();
 var coincidencias = JSON.parse( localStorage.getItem("ContenidoSocial") ).coincidencias;

 coincidencias.forEach(element=>{
   var img = "img/iconos/user_defaultProfile.png";
   if(element.ImagenUsuario == undefined || element.ImagenUsuario == null){


   }else{

    img= element.ImagenUsuario;

   }

   $$("#listaSugeridos").append(`
   <li>
   <a href="#" class="item-link item-content">
     <div class="item-media"><img width="24" height="24" src="`+img+`" ></div>
     <div class="item-inner">
       <div class="item-title">`+element.NombreUsuario+`</div>
       <div class="item-after"><button value="`+element.idUsuario+`" onclick="Addfriend(this)" class="button-seguir-sm theming">Seguir</button></div>
     </div>
   </a>
 </li>
   
   
   `);


 });  


};

function Publicar() {
   var type ="";
  
 

 
    
 //  app.popup.open(".popupPublicar",true);
/*
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
}  */












 


   

 }//Fin publicar

 function PerfilSocial() {
var contAmigos = 0 ;
var countPublicaciones = 0;
var count
db.ref("Social/Usuarios/"+datosUsuario.Usuario.idUsuario).on("value",function (snapshot) {
var usuario  = snapshot.val();

 if(usuario.ImagenUsuario == null || usuario.ImagenUsuario ==undefined || usuario.ImagenUsuario == ""  ){


 }else{
$$(".img-Perfil-social").attr("src",usuario.ImagenUsuario);


 }



  });





 


   }

function EnviarSolicitud(id) { 

  app.dialog.progress();
 db.ref("Social/solicitudes/"+datosUsuario.Usuario.idUsuario+"/"+id).set({
idUsuario:datosUsuario.Usuario.idUsuario,
state:"sended",
date:dateFormatExtended()

 },function (error) { 
app.dialog.close();

  });



 }







    function DysplaySeguidores() { 




     }


function Addfriend(element) {  
 // app.dialog.progress();
 var idFriend = $$(element).val();
 var idUsuario = datosUsuario.Usuario.idUsuario;
 $$(element).text("siguiendo");
app.request.post(configApp.uri+"Social/SeguirAlguien",{
  Emisor:idUsuario,
  Receptor:idFriend
},function (data) {


  },function (error) { 

   },"json");

}


function Amigos() { 
 var refAmigos =  db.ref("Social/amigos/"+datosUsuario.Usuario.idUsuario+"");

var conntFriends = 0;



/*

$$("#totalSolicitudes").click(function (evt) { 
  app.popup.open(".popup-solicitudes",true);
 });

$$("#closeSolicitudes").click(function () { 

app.popup.close(".popup-solicitudes",true);
  
 });  */

 refAmigos.on("child_added",function (snapshot) { 
conntFriends  =+ 1;
  var value = snapshot.val();
console.log(value);


  db.ref("Social/Usuarios/"+value.id).once("value",function (snapshot) { 

var friend = snapshot.val();
console.log(friend);
var img = "img/iconos/ic_logoApp.png";

if(friend.ImagenUsuario == undefined || friend.ImagenUsuario == null){

  
}else{
img = friend.ImagenUsuario;
}


    $$("#listaAmigos").append(`<li>
    <div class="item-content">
      <div class="item-media"><img src="`+img+`" width="44"/></div>
      <div class="item-inner">
        <div class="item-title-row">
          <div class="item-title">`+friend.NombreUsuario+`</div>
        </div>
      <!-- <div class="item-subtitle">Beatles</div> -->
      </div>
    </div>
  </li>`);


   });




  $$("#amigosTotal").text(conntFriends);

  });


  

/*
  refSolicitudes.orderByChild("state").equalTo("sended").on("child_added",function (snapshot) { 

var  solicitud =   snapshot.val();
 countSolicitud += 1;
 console.log(solicitud);
 console.log(countSolicitud);

 $$("#totalSolicitudes").text(countSolicitud);


 db.ref("Social/Usuarios/"+solicitud.idUsuario).once("value",function (snapshot) { 

var user = snapshot.val();


var img = "";

if(user.ImagenUsuario == undefined || user.ImagenUsuario == null ){
 img="img/iconos/ic_logoApp.png";

}


  var content = ` <li>
  <a href="#" class="item-link item-content">
    <div class="item-media"><img src="`+img+`" width="44"/></div>
    <div class="item-inner">
      <div class="item-title-row">
        <div class="item-title">`+user.NombreUsuario+`</div>
      </div>
      <div class="item-subtitle"><button class="button button-small color-orange" onclick='Addfriend(`+user.idUsuario+`)' >Agregar</button></div>
    </div>
  </a>
 </li>`;
 
 $$("#lista-solicitudes").append(content);


  });






   });  */






   




 }


 function OpenProfileUser(idUsuario) {
   console.log(idUsuario); 
   $$("#Img-other-prifile").attr("src","img/icons-social/perfil.png");
   $$("#btn-seguir-other").text("");
   $$("#btn-seguir-other").val("");
   $$("#publicacion-other-profile").text("");
   $$("#seguidores-other-profile").text("");
   $$("#restaurantes-other-profile").text("");
  $$(".title-profile-other").text("");



  if(idUsuario != datosUsuario.Usuario.idUsuario){
    console.log("igual");
    $$("#profileUser-Social-own").click();

  }else{

app.request.post(configApp.uri,{
  usuarioId:idUsuario
},function (data) { 

  var user = data.usuario;
  var seguidores = data.seguidores;
  var seguidos = data.seguidos;
  var archivos = data.archivos;
  var publicaciones = data.publicaciones;
  $$("#seguidores-other-profile").text(seguidores.length);
  $$(".title-profile-other").text(user.NombreUsuario);
  $$("#publicacion-other-profile").text(publicaciones.length);

  if(user.ImagenUsuario != undefined){
    $$("#Img-other-prifile").attr("src", user.ImagenUsuario );
    ;
    }
    app.popup.open(".popup-perfil-other",true); 
    db.ref("Usuarios/"+idUsuario+"/history").once("value",function (snapshot) { 
      $$("#restaurantes-other-profile").text(snapshot.numChildren());
  
     }); 

 },function (error) { 

 },"json");
     




 db.ref("Social/Usuarios/"+idUsuario).once("value",function (snapshot) { 
var usuario = snapshot.val();



//$$("#seguidores-other-profile").text(snapshot.numChildren());
  });
  console.log(idUsuario);

  

db.ref("Social/Amigos/"+datosUsuario.Usuario.idUsuario+"/"+idUsuario).once("value",function (snapshot) { 

if(snapshot.val() == null ){
  $$("#btn-seguir-other").text("Seguir");
  $$("#btn-seguir-other").val(idUsuario);
  $$("#btn-seguir-other").off("click");
  $$("#btn-seguir-other").attr("onclick","Addfriend(this)");

}else{
  $$("#btn-seguir-other").text("Siguiendo");
}

 });


  }



  }

  function EnviarAccion(params) { 

    app.request.post(configApp.uri+"Social/PublicacionEventosDo",params,function (data) { 
    
            
            },function (error) { 
      
            },"json");

   }

 function SocialCard(publicacion,eventos,seguidos) {

 var img = "img/icons-social/perfil.png";
 
 if( publicacion.ImagenUsuario != ""  && publicacion.ImagenUsuario != null   ){
  img = publicacion.ImagenUsuario

 }
var has  ="";

 if(publicacion.hashtag != null){
  has = publicacion.hashtag; 
 }

var likes = [];
var coments = [];
var shared = [];
var selfLike = false;
eventos.forEach(element=>{

 if( element.Tipo== "LIKE" ){
 likes.push(element);
console.log(datosUsuario);
 if(element.Emisor == datosUsuario.Usuario.idUsuario){
       
  selfLike = true;
}


 }
 if( element.Tipo== "COMENTARIO" ){
 coments.push(element);
}
if( element.Tipo== "COMPARTIDO" ){
  shared.push(element);
}

});



  $$("#social-Content").prepend(` <div id="publicacion`+publicacion.idPublicacion+`" class="card demo-facebook-card" style="margin: 0px;">
 <div class="card-header">
   <div class="demo-facebook-avatar"><img src="`+img+`" width="34" height="34"/></div>
   <div  onclick="OpenProfileUser('`+publicacion.idUsuario+`')" class="demo-facebook-name">`+publicacion.NombreUsuario+`</div>
   <div class="demo-facebook-date">`+valueFormat( publicacion.Lugar )+`</div>
 </div>

 <div class="card-content ">
   <img id='imgPublicacion`+publicacion.idPublicacion+`' src="`+publicacion.Imagen+`" width="100%"/>
      <div style="padding: 10px;">
      <a href='' >`+ valueFormat(has )+`</a>
        <p>`+valueFormat( publicacion.Descripcion )+`</p>
        <p class="likes" id='likes`+publicacion.idPublicacion+`'  >Me gusta: `+likes.length+` &nbsp;&nbsp; Comentarios: `+coments.length+` &nbsp;&nbsp; compartido: `+shared.length+`  </p>
      </div>
 </div>
 <div class="card-footer"><a href="#" id='btnMegusta`+publicacion.idPublicacion+`'  class="link">Me gusta</a><a  id="btnComentar`+publicacion.idPublicacion+`"  href="#" class="link">Comentar</a><a href="#" id="btncompartir`+publicacion.idPublicacion+`"  class="link">compartir</a></div>
 
 <div class="panelComent"  id="panel-coment`+publicacion.idPublicacion+`"  >
 <div class="row">
   <div class="col-15">
  <img  id="close-coments-floated`+publicacion.idPublicacion+`" src="img/iconos/cancel.png" width="24" height="24" >
   </div>
<div class="col-65">
<textarea id="comenttext`+publicacion.idPublicacion+`" rows="2" type="text" placeholder="escriba aqui su comentario" ></textarea>

</div>
<div class="col-20">
<img  id="btnSendComent`+publicacion.idPublicacion+`"   width="32" height="32"  src="img/icons-social/comentarios.png" >
</div>
   
 </div> 
</div>
 
 
 </div>`);


 if(selfLike == true){
  $$("#btnMegusta"+publicacion.idPublicacion).off("click");
  $$("#btnMegusta"+publicacion.idPublicacion).css({
    "color":"blue",
    "background":"#CB4309 !important"
  });
 }

 $$(".panelComent").hide();
 //Panel de comentarios
$$("#close-coments-floated"+publicacion.idPublicacion).click(function (evt) { 

  $$(".panelComent").hide();

 });

 $$("#btnSendComent"+publicacion.idPublicacion).click(function (evt) {
 

  var text = $$("#comenttext"+publicacion.idPublicacion).val();
  $$("#comenttext"+publicacion.idPublicacion).val("");
  $$("#panel-coment"+publicacion.idPublicacion).hide();  
   if(text == "" || text == null){
   
   $$("#panel-coment"+publicacion.idPublicacion).hide();  
   }else{
    
    var parms = {
      tipo:"comentario",
      emisor:datosUsuario.Usuario.idUsuario,
      receptor:publicacion.idUsuario,
      publicacionId:publicacion.idPublicacion,
      contenido:text
     }
  EnviarAccion(parms);
  //$$("#btnMegusta"+publicacion.idPublicacion).css("color","blue");
  
  UpdateMarkes(publicacion.idPublicacion,coments.length+1,likes.length,shared.length);


   


   }
  
   
  
  
   });

 //fin panel de comentarios


 ///Zoom Image

 $$("#imgPublicacion"+publicacion.idPublicacion).click(function (evt) { 

var img =  $$(this).attr("src");
 
  var myPhotoBrowserDark = app.photoBrowser.create({
   photos : [
       img,
      
   ] ,theme: 'dark'
 });
 myPhotoBrowserDark.open();
 
 
  });

//Cartagar Me gustas y COMENTARIOS
  $$("#likes"+publicacion.idPublicacion).click(function (evt) {
    $$("#raw-coments").empty();
    $$("#rawList-megusta").empty();
    
    likes.forEach(element=>{

      var foto = "img/iconos/user_defaultProfile.png";
      if( element.ImagenUsuario  != undefined){
        foto = element.ImagenUsuario;
      }

      if(element.Emisor == datosUsuario.Usuario.idUsuario){
       
      $$("#btnMegusta"+publicacion.idPublicacion).off("click");
      $$("#btnMegusta"+publicacion.idPublicacion).css({
        "color":"blue",
        "background":"#CB4309 !important"
      });
    }
    
    
      $$("#rawList-megusta").append(` <li>
      <a href="#" class="item-link item-content">
        <div class="item-media"><img width="24" height="24" src="`+foto+`" ></div>
        <div class="item-inner">
          <div class="item-title">`+element.NombreUsuario+`</div>
         <!-- <div class="item-after"><button class="button-seguir-sm theming" >Seguir</button></div> -->
        </div>
      </a>
      </li>`);


      

    });
    coments.forEach(element=>{

      var img = "img/iconos/user_defaultProfile.png";
  if(element.ImagenUsuario  != null){
    img = element.ImagenUsuario;
  }
  
  
  $$("#raw-coments").append(` <li>
  <div class="item-content">
    <div class="item-media"><img src="`+img+`" width="44"  /></div>
    <div class="item-inner">
      <div class="item-title-row">
        <div class="item-title">`+element.NombreUsuario+`</div>
      </div>
      <div class="item-text">`+element.contenido+`</div>
    </div>
  </div>
  </li>`);
      
    });

    app.popup.open(".popup-actiosn");



    });


  //acciones en la publicacion
  
  $$("#btnMegusta"+publicacion.idPublicacion).click(function () {
    console.log("Me gusta");
    var parms = {
      tipo:"like",
      emisor:datosUsuario.Usuario.idUsuario,
      receptor:publicacion.idUsuario,
      publicacionId:publicacion.idPublicacion,
      contenido:""
     }
     EnviarAccion(parms);

     UpdateMarkes(publicacion.idPublicacion,coments.length,likes.length+1,shared.length);


  
  $$("#btnMegusta"+publicacion.idPublicacion).off("click");
  $$("#btnMegusta"+publicacion.idPublicacion).css({
    "color":"blue",
    "background":"#CB4309 !important"
  });

  if(publicacion.TIpo == "Actividad"){
    SendCoinsFromActivityToUser(publicacion.PublicKey,publicacion.ActividadId); 
    }

  
  
  
   });
  $$("#btnComentar"+publicacion.idPublicacion).click(function () { 
  console.log("comentar");
  
  $$("#panel-coment"+publicacion.idPublicacion).show();
  
  $$("#close-coments-floated"+publicacion.idPublicacion).click(function (evt) { 
    $$("#comenttext"+publicacion.idPublicacion).val("");
    $$("#panel-coment"+publicacion.idPublicacion).hide();  
  
  
   });
  
  
   
  
  
  
   });

   $$("#btncompartir"+publicacion.idPublicacion).click(function (evt) { 
    evt.preventDefault();

    var parms = {
      tipo:"like",
      emisorId:datosUsuario.Usuario.idUsuario,
      Receptor:publicacion.idUsuario,
      publicacionId:publicacion.idPublicacion,
      contenido:""
     }
  app.progressbar.show("multi");
     app.request.post(configApp.uri+"Social/CompartirPublicacion",
     parms,
     function (data) { 
      app.progressbar.hide();
      UpdateMarkes(publicacion.idPublicacion,coments.length,likes.length,shared.length+1);
      data.value.NombreUsuario = datosUsuario.Usuario.NombreUsuario;
      data.value.ImagenUsuario = datosUsuario.Usuario.ImagenUsuario;
      SocialCard( data.value,[],null);

  

      },function (error) { 
        app.progressbar.hide();
      app.dialog.alert("publicacion no enviada").show();


      },"json");


    
     });





  


     }
     function UpdateMarkes(key,Coment,like,shared) {
      //console.log( $$("#likes"+key) );
      $$("#likes"+key).empty();
          $$("#likes"+key).append("Me gusta: "+like+" &nbsp;&nbsp; Comentarios: "+Coment+" &nbsp;&nbsp; Compartido: "+shared);
      
          }



     function LoadEventsActividades(){
console.log( datosUsuario.Usuario.idUsuario  );
db.ref("Social/Eventos/"+datosUsuario.Usuario.idUsuario).off();
$$("#lista-Usuarios").empty();

       db.ref("Social/Eventos/"+datosUsuario.Usuario.idUsuario).on("child_added",function (snapshot) { 

 var event = snapshot.val();

 if(event.user.idUser != datosUsuario.Usuario.idUsuario)
{
 console.log(event );
 var img = "img/iconos/user_defaultProfile.png";
var text = "";
 if(event.user.foto  != undefined && event.user.foto  != null ){

   img = event.user.foto;
 }

 if(event.type== "follow"){
text = "comenzo a seguirte";
 }
 if(event.type== "like"){
text =  "le gusta tu publicacion";
}
if(event.type== "coment"){
text = "comento tu publicacion";
}

$$("#lista-Usuarios").prepend(`
<li >
<a href="#" class="item-link item-content">
  <div class="item-media"><img  class="img-rounded" src="`+img+`" width="28" height="28"/></div>
  <div class="item-inner">
    <div class="item-title-row">
      <div class="item-title">`+event.user.nombre+`</div>
    </div>
    <div class="item-subtitle text-social">`+text+`</div>
  </div>
</a>
</li>`);



       }


       });

     }



     function Profile() { 

      $$("#nombreUsuario-profile").text(datosUsuario.Usuario.NombreUsuario);

$$("#btn-uppdate-foto-perfil-profile").click(function (evt) { 
evt.preventDefault();

app.dialog.create({
 text:"Seleccionar desde",
 title:"foto de perfil",
 buttons:[
 {
   text:"galeria",
   onClick:function () { 
    var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    var options = setOptions(srcType);
  
    navigator.camera.getPicture(cameraCallback,onFail, options);
  


    }
 },
 {
  text:"Camara",
  onClick:function () { 

    var srcType = Camera.PictureSourceType.CAMERA;
    var options = setOptions(srcType);
  
    
    navigator.camera.getPicture(cameraCallback,onFail, options);
  
    
   }
},{
  text:"Cerrar",
  onClick:function () { 

   }
}


 ]


}).open();








 });

if(   datosUsuario.Usuario.ImagenUsuario == "" ||  datosUsuario.Usuario.ImagenUsuario == null ){

}else{
  $$("#img-foto-perfil-profile").attr("src",datosUsuario.Usuario.ImagenUsuario);
}



function cameraCallback(imageData) {
  var image = document.getElementById('img-foto-perfil-profile');
  image.src = "data:image/jpeg;base64," + imageData;
  app.preloader.show();

datosUsuario.Usuario.ImagenUsuario = "data:image/jpeg;base64," + imageData;
 
localStorage.setItem("config",JSON.stringify( datosUsuario  ));

app.preloader.show();
app.request.post(configApp.uri+"Social/UpdateImagten",{
  idUsuario:datosUsuario.Usuario.idUsuario,
  ImagenUsuario:datosUsuario.Usuario.ImagenUsuario
},function (data) {
  app.preloader.hide();



  },function (error) { 
    app.preloader.hide();
    alert("error al tratar de Actualizar la foto");

 },"json");




}
function onFail(message) {
  alert('Failed because: ' + message);
}


      }//fin perfil



  

function SubirHistoriaImagen() { 

  
  function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: false,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
  }


app.dialog.create({
    title:"Subir Historia",
    text:"seleccionar desde",
    buttons:[
      {
        text:"Galeria",
        onClick:function () {

          var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
          var options = setOptions(srcType);

          navigator.camera.getPicture(function (imagen) { 
            app.progressbar.show('multi');

             app.request.post(configApp.uri+"Social/SubirHistoria",{
              idUsuario:datosUsuario.Usuario.idUsuario,
              Img:"data:image/jpeg;base64," + imagen,
             },function (data) { 
              app.progressbar.hide();


              },function (error) { 
                app.progressbar.hide();
               },"json");
        
          
         
         
            },function (error) { 
              app.progressbar.hide();
              alert("error al seleccionar el archivo");
            }, options);


          
        }
      },
      {
        text:"Camara",
        onClick:function () { 
          var srcType = Camera.PictureSourceType.CAMERA;
          var options = setOptions(srcType);
        
          navigator.camera.getPicture(function (imagen) { 
            app.progressbar.show('multi');
         

            app.request.post(configApp+"Social/SubirHistoria",{
              idUsuario:datosUsuario.Usuario.idUsuario,
              Img:"data:image/jpeg;base64," + imagen,
             },function (data) { 
              app.progressbar.hide();


              },function (error) { 
                app.progressbar.hide();
               },"json");
          
         
         
            },function (error) { 
              app.progressbar.hide();
            app.dialog.alert("error al seleccionar la Imagen");
            }, options);
         



         }
      },
      {
        text:"Cerrar",
        onClick:function () { 
          
         }
      }
    ]
  }).open();


  




 }




 function SubirHistoria(historia) {
  var img = "img/iconos/user_defaultProfile.png";

  if(historia.usuario.ImagenUsuario != undefined){
    img = historia.usuario.ImagenUsuario;
    }
    
  
    stories.update({
      id:  historia.usuario.idUsuario,               // story id
      photo: img,            // story photo (or user photo)
      name: historia.usuario.NombreUsuario.substring(0,6),             // story name (or user name)
      seen: false,
      items:[] 

    });
    var objs = historia.historia;

    objs.forEach(element=>{

      var item = {
        id: element.idHistorias,       // item id
        type: "photo",     // photo or video
        length: 3,    // photo timeout or video length in seconds - uses 3 seconds timeout for images if not set
        src: element.Img,      // photo or video src
        preview: "",  // optional - item thumbnail to show in the story carousel instead of the story defined image
        link: "",     // a link to click on story
        linkText: "", // link text
        time: (element.time /1000),     // optional a date to display with the story item. unix timestamp are converted to "time ago" format
        seen: false   // set true if current user was read - if local storage is used, you don't need to care about this
      
      };
      
        stories.addItem(historia.usuario.idUsuario, item);
      

    });
    

    
  
}


      function LoadHistorias() {
  var historias = [];
        var seguidores = contenidoSocial.seguidos;
    var user =JSON.parse( localStorage.getItem("config")  ).Usuario;
    user.NombreUsuario = "historia";
   var myHistoria = GotHistorias( user.idUsuario );
   console.log(myHistoria);
    if(  myHistoria  != undefined){
 historias.push( {
usuario: user,
historia:myHistoria
 });
    }else{
      historias.push( {
        usuario: user,
        historia:[]
         });


    }

seguidores.forEach(element=>{
 var historia =  GotHistorias( element.Receptor );
 if(historia != undefined){
  historias.push( {
    usuario: element,
    historia:historia
  });
 }

});

historias.forEach(element=>{
SubirHistoria(element);

});








        }


     function ZoonFile(foto) { 
      

      var myPhotoBrowserDark = app.photoBrowser.create({
       photos : [
           foto,
          
       ] ,theme: 'dark'
     });
     myPhotoBrowserDark.open();
     


      }   

function chargeHistory(idUsuario,nombre) {
  app.preloader.show(); 
var countTotalHistory = 0;
var countRound = 0;

  $$("#slidersHistoryLoad").empty();
  app.progressbar.set('#demo-inline-progressbar', "0"  );
db.ref("Social/Historias/"+dateFormat()+"/"+idUsuario).once("value",function (snapshot) { 

  countTotalHistory = snapshot.numChildren();
if(snapshot.val() == null){
  app.preloader.hide();
  alert("no hay contenido para mostrar");
}else{
  $$(".nombreInHistori").text( nombre.substring(0, 7) );
  app.preloader.hide();
  app.popup.open(".popup-historias",true);
  db.ref("Social/Historias/"+dateFormat()+"/"+idUsuario).limitToLast(5).once("child_added",function (snapshot) { 
    var slider  = snapshot.val();
    countRound = countRound + 1;
 $$("#slidersHistoryLoad").append(` <div class="sp-slide">
 <img class="sp-image" src="`+slider.img+`"/>
</div>`);


 if(countRound == countTotalHistory){

  $( '#sliderHiSTORY' ).sliderPro({
    // height: screen.availHeight* 1.5 ,
     forceSize:"fullWindow"
   });


  var count = 0;
  var intervar = setInterval(function () { 
  
  count  = count + 1 ;
  
  app.progressbar.set('#demo-inline-progressbar', ((count*100)/20)+""  );
  console.log(count);
  console.log( ((count*100)/20)  );
  if(count == 20){
    clearInterval(intervar);
   app.popup.close(".popup-historias",true);
  }
  
   },125);



 }



   });

}

 });







  


 




 }


 function ProfileItemActions() { 
//$$(".content-default-profile").hide();


$$("#GaleriaPerfilItem").click(function (evt) {
  app.progressbar.show("multi");
$$("#archivos-perfill").show();
$$("#listas-Perfil").hide();
console.log("galeria");

$$("#rawArchivos").empty();
contenidoSocial.galeria.forEach(element=>{

  $$("#rawArchivos").prepend(` <div  onclick="ZoonFile('`+element.Base64+`')" class='container-archivo' >
  <img src="`+element.Base64+`" class="imgArchivoperfil" >
  
  </div>`);

});

app.progressbar.hide();



  });
  $$("#AmigosItemPerfil").click(function (evt) {
    app.progressbar.show("multi");
    console.log("amigos");
    $$("#archivos-perfill").hide();
    $$("#listas-Perfil").show();

    $$("#lista-Usuarios-profile").empty();
    db.ref("Social/Amigos/"+datosUsuario.Usuario.idUsuario).off();
    db.ref("Social/Amigos/"+datosUsuario.Usuario.idUsuario).on("child_added",function (snapshot) { 

      var friend = snapshot.val();
    
      db.ref("Social/Usuarios/"+friend.idUsuario).once("value",function (snapshot) { 
        app.progressbar.hide();
var usuario = snapshot.val();
var img = "img/iconos/user_defaultProfile.png";

 if(usuario.ImagenUsuario != null && usuario.ImagenUsuario != undefined ){
img = usuario.ImagenUsuario;
 }


$$("#lista-Usuarios-profile").append(` <li >
<a href="#" class="item-link item-content">
      <div class="item-media"><img  class="img-rounded" src="`+img+`" width="28" height="28"/></div>
      <div class="item-inner">
        <div class="item-title-row">
          <div class="item-title">`+usuario.NombreUsuario+`</div>
        </div>
       
      </div>
    </a>
  </li> `);


       });



     


     });

  
  
  });
  $$("#LugaresItemPerfil").click(function (evt) {
    app.progressbar.show("multi");
   $$("#archivos-perfill").hide();
   $$("#listas-Perfil").show();
   $$("#lista-Usuarios-profile").empty();
   db.ref("Usuarios/"+datosUsuario.Usuario.idUsuario+"/history").off();
   db.ref("Usuarios/"+datosUsuario.Usuario.idUsuario+"/history").on("child_added",function (snapshot) { 
    app.progressbar.hide();
    var historial = snapshot.val();

    $$("#lista-Usuarios-profile").append(` <li >
    <a href="#" class="item-link item-content">
          <div class="item-media"><img  class="img-rounded" src="`+historial.icon+`" width="28" height="28"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">`+historial.namePlace+`</div>
            </div>
           
          </div>
        </a>
      </li> `);



    });

  
  });




  }



/*
  function OnOutLine() { 

  ObtenerPublicaciones(localDatabase);
  ObtenerPublicacionesPrueba(localDatabase);
console.log("db datos");
console.log(datos);



   }   */

   //OnOutLine();





function AddToHistory(object){
  stories.update(object);

}



   function comprobeItem(id) { 
  
 if( parseInt(id) == datosUsuario.Usuario.idUsuario){
console.log("IdUsuario");

 }


    }





    function GetAllAccountCoins() { 
      var coindata =  localStorage.getItem("chainData");


 if(coindata == null){
  $$(".content-coins").hide();
  $$("#btnEmpezarCoinsActiviate").click(function (evt) { 

    app.preloader.show();

app.request.post("https://www.suritag.com/GrapheneBlockChain/public/MobileApi/ActivateAcount",{
usuarioId:datosUsuario.Usuario.idUsuario,
NombreUsuario:datosUsuario.Usuario.NombreUsuario
},function (data) { 
console.log(data);
    app.preloader.show();
localStorage.setItem("chainData", JSON.stringify( data.value ) );
cuenta = data.value;
ContenidoInicialCoins(data.value.publicKey);



    



    

},function (error) { 
      app.preloader.hide();
alert("error al tratar de Activar su Wallet");

},"json");


   });

 }else{
 coindata = JSON.parse(coindata);

 ContenidoInicialCoins(coindata.publicKey);


 }

    

     


      $$("#content-enviadas-transaccion").hide();
      $$("#content-recibidad-transaccion").hide();
       $$(".btn-coins-list").click(function () { 
        $$(".btn-coins-list").removeClass("button-active");
        $$(this).addClass("button-active");

         switch ( $$(this).val() ) {
           case "ALL":
             $(".content-table-transaccion").hide();
             $$("#content-todas-transaccion").show();
             $$("#content-recibidas-transaccion").hide();
             break;
             case "SEND":
             $(".content-table-transaccion").hide();
             $$("#content-enviadas-transaccion").show();
             
             break;

             case "RECEIVED":
             $(".content-table-transaccion").hide();
             $$("#content-recibidad-transaccion").show();
             
             break;
         
           default:
             break;
         }



        });



      
     }

     function ContenidoInicialCoins(key ) {
     
      app.request.get("https://www.suritag.com/GrapheneBlockChain/public/MobileApi/AcceountInfo",{
        key:key
      },function (data) {
        console.log(data);
         app.preloader.hide();
        $$(".content-coins").show();
        $$(".initalContent-coins").hide();
       HistorialTransfer(data.transaccions);
        $$("#coinsTotal").text( (data.coins * 0.1).toFixed(1)   +" STC");
       $$("#valueCoins").text((data.coins * data.config.ValorMonetario )+ " COP" );
       $$("#PublicKey").text("Cuenta ID: "+key);
       $$("#UU-ID").text("IUU: "+datosUsuario.Usuario.idUsuario);
       ActiviarPagosByCoins();

       app.progressbar.hide();
       app.ptr.done(".ptr-content");
    


       },function (error) {
        app.ptr.done(".ptr-content");
        app.preloader.hide();
        app.progressbar.hide();
         },"json");


      }

      function RawTransfers(element) {
         var key = cuenta.publicKey;
      
   //Recibed
      if(element.SenderKey == key ){
       
        $("#table-todas-transfer").prepend(`<tr>
        <th class="label-cell acount-cel" >`+element.RecivedKey.substring(0,6)+`</th>
        <th class="" >`+element.Tipo+`</th>
        <th class="numeric-cell" >`+element.Valor+` STC</th>
      </tr>`);
      $("#table-enviadas-transaccion").prepend(`<tr>
      <th class="label-cell acount-cel" >`+element.RecivedKey.substring(0,6)+`</th>
      <th class="" >`+element.Tipo+`</th>
      <th class="numeric-cell" >`+element.Valor+` STC</th>
    </tr>`);

      }
   //Sender
      if(element.RecivedKey == key ){
       
      
        $("#table-todas-recibidas").prepend(`<tr>
        <th class="label-cell acount-cel" >`+element.SenderKey.substring(0,6)+`</th>
        <th class="" >`+element.Tipo+`</th>
        <th class="numeric-cell" >`+element.Valor+` STC</th>
      </tr>`);
      $("#table-todas-transfer").prepend(`<tr>
      <th class="label-cell acount-cel" >`+element.SenderKey.substring(0,6)+`</th>
      <th class="" >`+element.Tipo+`</th>
      <th class="numeric-cell" >`+element.Valor+` STC</th>
    </tr>`);

      }

      


       }


      function PublicarInNameActivity(actividad){
      var cuentaData = localStorage.getItem("chainData");

      if(cuentaData == null){
 alert("Usted debe activar su Wallet para poder participar");
 
 
      }else{

        ActividadPublicacion = actividad;
        publicacionType = "ACTIVIDAD";
        $$(".hast-content").show();
    
        $$(".Hashtag-text").text(actividad.Hash);
       //$$("#hashPublicacion").text();

      app.dialog.create({
             text:"Subir Imagen",
             title:"Seleccionar desde",
             buttons:[
               {
                 text:"Galeria",
                 onClick:function () {
                   
                  var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
                  var options = setOptions(srcType);
                
                  navigator.camera.getPicture(cameraCallback,onFail, options);
                

                  }
               },
               {
                text:"Camara",
                onClick:function () { 

                  var srcType = Camera.PictureSourceType.CAMERA;
                  var options = setOptions(srcType);
                
                  
                  navigator.camera.getPicture(cameraCallback,onFail, options);
                


                 }
              },
              {
                text:"Cerrar",
                onClick:function () { 
                  
                 }
              }

             ]

      }).open();

   


      }
    
    }

      function SendCoinsFromActivityToUser(cuenta,actividad) { 

        app.request.post("https://www.suritag.com/GrapheneBlockChain/public/MobileApi/GetCoinActivity",{
          UserKey:cuenta,
          idActividad:actividad
        },function (data) { 
         alert(data.msg);
         },function (error) {
  alert("error");

          },"json");


       }
       var ptr = app.ptr.create('.ptr-content');
      
 $$(".ptr-content").on("ptr:refresh",function () { 
   
   ContenidoInicialCoins(cuenta.publicKey);
  });

  $$("#btnTransferirUsuarios").click(function (btn) {
    dialogTransfer.open();
    });
      function HistorialTransfer(transferencias) {
         
        $$(".table-t").empty();

        transferencias.forEach(element=>{
      RawTransfers(element);
          
        });

    

        


       }  
   
     
        

 

function ActiviarPagosByCoins() { 

 var ref= db.ref("blockChain/PayComers/Users/"+datosUsuario.Usuario.idUsuario);

ref.off();
ref.orderByChild("status").equalTo("ESPERANDO").on("child_added",function (snapshot) {
var cuentaPago = snapshot.val();
console.log("factura");
alert("factura");
$$("#ValorPagar").text( cuentaPago.Valor );
$$("#TotalCoins").text( cuentaPago.Coins );

app.sheet.open(".my-sheet");
$$("#RealizarPagoCoinsToRes").off("click");
$$("#RealizarPagoCoinsToRes").click(function (evt) { 

app.progressbar.show("multi");

  app.request.post("https://www.suritag.com/GrapheneBlockChain/public/MobileApi/transferUserToUser",{
    UUI:cuentaPago.keyAcount,
    senderKey:cuenta.publicKey,
    ValueToTransfer:cuentaPago.Coins
  },function (data) { 
    app.progressbar.hide();


ref.child(snapshot.key).update({
  status:"PAGADO"
},function () { 
  alert("Transaccion Finalizada");
 });


app.sheet.close(".my-sheet");
   },function (error) { 

    ref.child(snapshot.key).update({
      status:"CANCELADO"
    },function () { 
      alert("Transaccion Finalizada");
     });
    

    app.progressbar.hide();
alert("error al realizar la transferencia");
app.sheet.close(".my-sheet");
   },"json");

 });

 $$("#RechazarPagoCuenta").click(function (evt) { 
   ref.child(snapshot.key).update({
    status:"CANCELADO"
   },function (error) { 
     if(error){
 alert("error al tratar de rechazar la cuenta");
     }else{

      app.sheet.close(".my-sheet");

     }

    });


  });


  });



 }
