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
ProfileItemActions();

 var mainView = app.views.create(".view-main");
 console.log(mainView);

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
var datosUsuario = JSON.parse( localStorage.getItem("config")  );
//OpenProfileUser(datosUsuario.Usuario.idUsuario);


$$('.panelComent').hide();








var swiperP = new Swiper('.swiper-container-pop');
//InitSearch();
Publicar();
LoadContentSocial();
//Historias();

Profile();
//Amigos();
$$("#listaMeGusta").hide();
$$("#listaComentario").show();

$$(".tab-actividad").click(function (evt) { 
  LoadEventsActividades();
 });



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

function Publicar() {
   var type ="";
  
 

   var publicacion = {
     img:"",
     text:"",
     peopleId:0,
     placeId:"",
     placeName:"",
     name:"",
     sharedPeople:[],
     date:"",
     coments:[],
     likes:[]
   }

    publicacion.peopleId = datosUsuario.Usuario.idUsuario;
    publicacion.name = datosUsuario.Usuario.NombreUsuario;
    //console.log(publicacion);

    var publicacionesRef =db.ref("Social/publicaciones/General/"+publicacion.peopleId);
    var archivosRef =db.ref("Social/archivos/"+publicacion.peopleId);
    
 //  app.popup.open(".popupPublicar",true);

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

 try{

  publicacion.date = dateFormatExtended();
  publicacion.text  = $$("#descripcion-publicacion").val();
 publicacion.img =  "data:image/jpeg;base64," + imageData;
 publicacion.placeName = $$("#textUbicacion").val();

publicacionesRef.push().set(publicacion,function (error) { 
  app.dialog.close();
if(error){
 
alert("Error al tratar de realizar la publicacion");

}else{
 // $$("#descripcion-publicacion").val(""); 

archivosRef.push().set({
  type:"img",
  date:dateFormatExtended(),
  data:publicacion.img
},function (error) { 

  image.src = "";
  alert("Publicacion enviada Con exito");
 app.popup.close(".popup-publicaciones",true);


 });


}


 });


 }catch(error){
app.dialog.close();
alert( JSON.stringify(error));
 }






   });


}
function onFail(message) {
  alert('Failed because: ' + message);
}


$$("#img-examinar").click(function (evt) { 

  var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
  var options = setOptions(srcType);

  navigator.camera.getPicture(cameraCallback,onFail, options);

 });
 $$("#camara").click(function (evt) { 

  var srcType = Camera.PictureSourceType.CAMERA;
  var options = setOptions(srcType);

  
  navigator.camera.getPicture(cameraCallback,onFail, options);


  
});








 


   

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




   function LoadContentSocial() { 
  

     var usuario = datosUsuario.Usuario;


/*
Sugeridos
*/

$$("#view-sugerenciaItem").click(function (evt) { 

Sugeridos();


 });


 function Sugeridos() { 
  $$("#listaSugeridos").empty();
  db.ref("Social/Usuarios").on("child_added",function (snapshot) { 
 
    var user = snapshot.val();
  
  
   if(user.idUsuario == usuario.idUsuario ){
  
   }else{
  
   db.ref("Social/Amigos/"+usuario.idUsuario+"/"+user.idUsuario).once("value",function (snapshot) { 

if(snapshot.val() == null){
var img = "img/iconos/user_defaultProfile.png";
   if(user.ImagenUsuario == undefined || user.ImagenUsuario == null){


   }else{

    img= user.ImagenUsuario;

   }


  $$("#listaSugeridos").append(`
  <li>
  <a href="#" class="item-link item-content">
    <div class="item-media"><img width="24" height="24" src="`+img+`" ></div>
    <div class="item-inner">
      <div class="item-title">`+user.NombreUsuario+`</div>
      <div class="item-after"><button value="`+user.idUsuario+`" onclick="Addfriend(this)" class="button-seguir-sm theming">Seguir</button></div>
    </div>
  </a>
</li>
  
  
  `);


  

}else{

}


    })  

  
  
  
  
   }
  
  
   });



 }




/*
Sugerencias

*/

console.log("Social/Amigos/"+usuario.idUsuario);


    db.ref("Social/Amigos/"+usuario.idUsuario).on("child_added",function (snapshot) {

var friend = snapshot.val();
console.log(friend);
LoadHistorias(friend.idUsuario,usuario.NombreUsuario);


db.ref("Social/publicaciones/General/"+friend.idUsuario).limitToLast(1).on("child_added",function (snapshot) { 

  var public = snapshot.val();
  console.log(public);
  SocialCard(public,snapshot.key);
  
    });



 });







  db.ref("Social/publicaciones/General/"+usuario.idUsuario).on("child_added",function (snapshot) { 

    var public = snapshot.val();
    console.log(public);
    SocialCard(public,snapshot.key);
    
      });







    }



function Addfriend(element) {  
 // app.dialog.progress();

var idFriend = $$(element).val();
var idUsuario = datosUsuario.Usuario.idUsuario;
db.ref("Social/Amigos/"+idUsuario+"/"+idFriend).set({
  idUsuario: parseInt(idFriend),
  date:dateFormatExtended()
},function (error) { 

  $$(element).text("siguiendo");

  db.ref("Social/Eventos/"+idFriend).push().set({
    type:"follow",
   // publicacionId:key,
    user:{
     nombre:datosUsuario.Usuario.NombreUsuario,
     idUser:datosUsuario.Usuario.idUsuario,
     foto:datosUsuario.Usuario.ImagenUsuario
    }
 
  });


 });



}


function Amigos() { 
 var refAmigos =  db.ref("Social/amigos/"+datosUsuario.Usuario.idUsuario+"");
 var refSolicitudes = db.ref("Social/solicitudes/"+datosUsuario.Usuario.idUsuario);
var countSolicitud = 0;
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

db.ref("Social/Amigos/"+idUsuario).once("value",function (snapshot) { 
  $$("#seguidores-other-profile").text(snapshot.numChildren());

 });


 db.ref("Social/Usuarios/"+idUsuario).once("value",function (snapshot) { 
var usuario = snapshot.val();
$$(".title-profile-other").text(usuario.NombreUsuario);
app.popup.open(".popup-perfil-other",true);
if(usuario.ImagenUsuario != undefined){
$$("#Img-other-prifile").attr("src", usuario.ImagenUsuario );
;
}

//$$("#seguidores-other-profile").text(snapshot.numChildren());
  });
  console.log(idUsuario);

  db.ref("Social/publicaciones/General/"+idUsuario).once("value",function (snapshot) { 

  console.log(snapshot.val());
 $$("#publicacion-other-profile").text(snapshot.numChildren());

console.log("publicaciones numero::"+snapshot.numChildren());

  });
  db.ref("Usuarios/"+idUsuario+"/history").once("value",function (snapshot) { 
    $$("#restaurantes-other-profile").text(snapshot.numChildren());

   });
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


 function SocialCard(publicacion,key) {

  
   var socialObj = PublicacionModel();
  var coments = 0;
  var likes = 0;
  var shared = 0;
 var vectorLikes = [];
 var vectorComents = [];
 var vectorShred = [];

 //Guardar Publicacion

 //Fin guargar



  $$("#raw-coments").empty();
  $$("#rawList-megusta").empty();

  db.ref("Social/Usuarios/"+publicacion.peopleId).once("value",function (snapshot) { 
var  user = snapshot.val();

var img =  "img/iconos/user_defaultProfile.png";


 if( user.ImagenUsuario  == undefined || user.ImagenUsuario == null ){

 }else{
   img = user.ImagenUsuario;
 }

 socialObj.nombrePersona = publicacion.name +"";
socialObj.fechaPublicacion =publicacion.date +"";
socialObj.imgPublicacion  =publicacion.img +"";
socialObj.imagenUsuario = img;
socialObj.peopleId =publicacion.peopleId +"";
socialObj.text = publicacion.text + "";
socialObj.placeName = publicacion.placeName;
socialObj.key =  key;

SavePublicacionDBQuery(localDatabase,socialObj);

console.log($("#publicacion"+socialObj.key));
$("#publicacion"+socialObj.key).empty();
$("#publicacion"+socialObj.key).remove();

 $$("#social-Content").prepend(` <div id="publicacion`+key+`" class="card demo-facebook-card">
 <div class="card-header">
   <div class="demo-facebook-avatar"><img src="`+img+`" width="34" height="34"/></div>
   <div  onclick="OpenProfileUser('`+user.idUsuario+`')" class="demo-facebook-name">`+user.NombreUsuario+`</div>
   <div class="demo-facebook-date">`+publicacion.placeName+`</div>
 </div>
 <div class="card-content card-content-padding">
   <p>`+publicacion.text+`</p>
   <img id='imgPublicacion`+key+`' src="`+publicacion.img+`" width="100%"/>
   <p class="likes" id='likes`+key+`'  >Me gusta: 0 &nbsp;&nbsp; Comentarios: 0 &nbsp;&nbsp; compartido: 0  </p>
 </div>
 <div class="card-footer"><a href="#" id='btnMegusta`+key+`'  class="link">Me gusta</a><a  id="btnComentar`+key+`"  href="#" class="link">Comentar</a><a href="#" id="btncompartir`+key+`"  class="link">compartir</a></div>
 </div>`);

/*  
**Cargar Contenidos del Me gusta y comentarios
**
*/
$$("#imgPublicacion"+key).click(function (evt) { 

 var img =  $$(this).attr("src");

 var myPhotoBrowserDark = app.photoBrowser.create({
  photos : [
      img,
     
  ] ,theme: 'dark'
});
myPhotoBrowserDark.open();


 });


$$("#likes"+key).click(function (evt) { 
evt.preventDefault();

app.popup.open(".popup-actiosn",true);




//cargar comentarios
$$("#raw-coments").empty();
vectorComents.forEach(element=>{

  var img = "img/iconos/user_defaultProfile.png";
  if(element.user.foto  != null){
    img = element.user.foto;
  }
  
  $$("#raw-coments").append(` <li>
  <div class="item-content">
    <div class="item-media"><img src="`+img+`" width="44"  /></div>
    <div class="item-inner">
      <div class="item-title-row">
        <div class="item-title">`+element.user.nombre+`</div>
      </div>
      <div class="item-text">`+element.text+`</div>
    </div>
  </div>
  </li>`);



});
$$("#rawList-megusta").empty();
vectorLikes.forEach(element=>{

  var foto = "img/iconos/user_defaultProfile.png";
  if( element.user.foto  != undefined){
    foto = element.user.foto;
  }


  
  
  
  $$("#rawList-megusta").append(` <li>
  <a href="#" class="item-link item-content">
    <div class="item-media"><img width="24" height="24" src="`+foto+`" ></div>
    <div class="item-inner">
      <div class="item-title">`+element.user.nombre+`</div>
     <!-- <div class="item-after"><button class="button-seguir-sm theming" >Seguir</button></div> -->
    </div>
  </a>
  </li>`);


})


//coments end

//cargar likes


//end likes



 });



var refActios =  db.ref("Social/publicaciones/Acciones/"+key);
console.log(key);
$$("#btnMegusta"+key).click(function () {
  console.log("Me gusta");
  refActios.child("like/"+datosUsuario.Usuario.idUsuario).set({
    type:"like",
    user:{
      keyAction:key,
      nombre:datosUsuario.Usuario.NombreUsuario,
      idUser:datosUsuario.Usuario.idUsuario,
      foto:datosUsuario.Usuario.ImagenUsuario

    }
  },function (error) { 
    $$("#btnMegusta"+key).off("click");
    $$("#btnMegusta"+key).css({
      "color":"blue",
      "background":"#CB4309 !important"
    });


 db.ref("Social/Eventos/"+publicacion.peopleId).push().set({
   type:"like",
   publicacionId:key,
   user:{
    nombre:datosUsuario.Usuario.NombreUsuario,
    idUser:datosUsuario.Usuario.idUsuario,
    foto:datosUsuario.Usuario.ImagenUsuario
   }

 });


   });



 });
$$("#btnComentar"+key).click(function () { 
console.log("comentar");

$$('.panelComent').show();

$$("#close-coments-floated").click(function (evt) { 
  $$("#comenttext").val("");
  $$('.panelComent').hide();  


 });


 $$("#btnSendComent").off("click");
$$("#btnSendComent").click(function (evt) { 

var text = $$("#comenttext").val();
$$("#comenttext").val("");
$$('.panelComent').hide();  
 if(text == "" || text == null){
 
 $$('.panelComent').hide();  
 }else{

  refActios.child("coment").push().set({
    type:"coment",
     text:text,
    user:{
      keyAction:key,
      nombre:datosUsuario.Usuario.NombreUsuario,
      idUser:datosUsuario.Usuario.idUsuario,
      foto:datosUsuario.Usuario.ImagenUsuario

    }
  },function (error) { 
   
    $$('.panelComent').hide(); 
    
    db.ref("Social/Eventos/"+publicacion.peopleId).push().set({
      type:"coment",
      publicacionId:key,
      user:{
       nombre:datosUsuario.Usuario.NombreUsuario,
       idUser:datosUsuario.Usuario.idUsuario,
       foto:datosUsuario.Usuario.ImagenUsuario
      }
   
    });


   });


 }

 


 });



/*
 $$("#comenttext").focus(function () { 
  //$$('.panelComent').css("bottom","50%");

 // $$('.panelComent').css("bottom","7%");
   // $$('.panelComent').hide();




   });   */
/*
  refActios.child("/coment/"+datosUsuario.Usuario.idUsuario).set({
    type:"coment",
    user:{
      nombre:datosUsuario.Usuario.NombreUsuario,
      idUser:datosUsuario.Usuario.idUsuario,
      foto:datosUsuario.Usuario.ImagenUsuario

    }
  });  */

 });
$$("#btncompartir"+key).click(function (evt) { 
evt.preventDefault();

var SharedPublic = publicacion;
SharedPublic.peopleId = datosUsuario.Usuario.idUsuario;
SharedPublic.name = datosUsuario.Usuario.NombreUsuario;
SharedPublic.date = dateFormatExtended();

var publicacionesRef =db.ref("Social/publicaciones/General/"+SharedPublic.peopleId);

publicacionesRef.push().set(SharedPublic,function (snapshot) { 
  db.ref("Social/Eventos/"+publicacion.peopleId).push().set({
    type:"shared",
    publicacionId:key,
    user:{
     nombre:datosUsuario.Usuario.NombreUsuario,
     idUser:datosUsuario.Usuario.idUsuario,
     foto:datosUsuario.Usuario.ImagenUsuario
    }
  
  },function () { 

    refActios.child("shared/"+datosUsuario.Usuario.idUsuario).set({
      type:"shared",
      user:{
        keyAction:key,
        nombre:datosUsuario.Usuario.NombreUsuario,
        idUser:datosUsuario.Usuario.idUsuario,
        foto:datosUsuario.Usuario.ImagenUsuario
  
      }
    });





   });


 });


//Evento
/*

*/
//



 });





 refActios.child("like").on("child_added",function (snapshot) { 
likes += 1;
var like = snapshot.val();
console.log(snapshot.val());
vectorLikes.push(like);
console.log(likes);
SaveLikesPublicacion(localDatabase,{key:snapshot.key,idPublicacion:key});


/*
var foto = "img/iconos/user_defaultProfile.png";
if( like.user.foto  != undefined){
  foto = like.user.foto;
}  */

if(like.user.idUser == datosUsuario.Usuario.idUsuario){
    console.log("coincide");
    console.log(like);
    console.log( $$("#btnMegusta"+like.user.keyAction) );
  $$("#btnMegusta"+like.user.keyAction).off("click");
  $$("#btnMegusta"+like.user.keyAction).css({
    "color":"blue",
    "background":"#CB4309 !important"
  });
}




UpdateMarkes(like.user.keyAction,coments,likes,shared);




  });
 refActios.child("coment").on("child_added",function (snapshot) { 
//console.log(snapshot.val());
var coment = snapshot.val();
coments += 1;
vectorComents.push(coment);

SaveComentsPublicacion(localDatabase,{key:snapshot.key,idPublicacion:key});



UpdateMarkes(coment.user.keyAction,coments,likes,shared);
//console.log(coment);

/*
var img = "img/iconos/user_defaultProfile.png";
if(coment.user.foto  != null){
  img = coment.user.foto;
}

$$("#raw-coments").append(` <li>
<div class="item-content">
  <div class="item-media"><img src="`+img+`" width="44"  /></div>
  <div class="item-inner">
    <div class="item-title-row">
      <div class="item-title">`+coment.user.nombre+`</div>
    </div>
    <div class="item-text">`+coment.text+`</div>
  </div>
</div>
</li>`); */



  
  });
  refActios.child("shared").on("child_added",function (snapshot) { 
    //console.log(snapshot.val());
    var SharedItem = snapshot.val();
    shared += 1;
    vectorShred.push(SharedItem);
    console.log("shared");
   // SaveComentsPublicacion(localDatabase,{key:snapshot.key,idPublicacion:key});
    
    
    
    UpdateMarkes(SharedItem.user.keyAction,coments,likes,shared);
  
    
      
      });


  function UpdateMarkes(key,Coment,like,shared) {
//console.log( $$("#likes"+key) );
$$("#likes"+key).empty();
    $$("#likes"+key).append("Me gusta: "+like+" &nbsp;&nbsp; Comentarios: "+Coment+" &nbsp;&nbsp; Compartido: "+shared);

    }







   });

  


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

datosUsuario.Usuario.ImagenUsuario = "data:image/jpeg;base64," + imageData;
 
localStorage.setItem("config",JSON.stringify( datosUsuario  ));

db.ref("Social/Usuarios/"+datosUsuario.Usuario.idUsuario).set(datosUsuario);


}
function onFail(message) {
  alert('Failed because: ' + message);
}


      }//fin perfil



      function  Historias(){
//console.log( "Social/Historias/"+dateFormat()+"/"+datosUsuario.Usuario.idUsuario );



 var myhistory = null;
$$("#miHistoria-Content").hide();

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

      
        db.ref("Social/Historias/"+dateFormat()+"/"+datosUsuario.Usuario.idUsuario).once("value",function (snapshot) {
          var historia = snapshot.val();
          $$("#miHistoria-Content").show();
          console.log(historia);
          if(historia == null){
           myhistory = false;
      
      
      
      
         }else{
           myhistory = true;
      
      
      
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
           // app.popup.close(".popup-historias",true);
          }
          
           },125);
          
      
      
      
         }
      
      
          });




          $$("#miHistoria").click(function (evt) {
          console.log(myhistory);
            switch (myhistory) {
             case null:

console.log("null");
             
               
               break;

               case true:
               chargeHistory(datosUsuario.Usuario.idUsuario,datosUsuario.Usuario.NombreUsuario);
               break;
               case false:
     
               var srcType = Camera.PictureSourceType.CAMERA;
               var options = setOptions(srcType);
             
               
               navigator.camera.getPicture(function (imagen) { 
                app.progressbar.show('multi');
              //  image.src = "data:image/jpeg;base64," + imagen;
             //  alert("Imagend Obtenida");
                db.ref("Social/Historias/"+dateFormat()+"/"+datosUsuario.Usuario.idUsuario).push().set({
                  img:"data:image/jpeg;base64," + imagen,
                  date:dateFormatExtended()
                },function (error) { 
                  myhistory = true;
                  app.progressbar.hide();
                
                 });
              


                },function (error) { 
                  app.progressbar.hide();
                }, options);
             


               break;

             default:
               break;
           }


          });
         
        
      }



      function LoadHistorias(idUsuario,nombreUsuario) {
console.log(idUsuario);
db.ref("Social/Usuarios/"+idUsuario).once("value",function (snapshot) { 

//console.log();
//Imagen  de las historias 
var history = snapshot.val();

var img = "img/iconos/user_defaultProfile.png";

 if(history.ImagenUsuario != undefined){
img = history.ImagenUsuario;
 }


$$(".wr-historia-wrap").append(`  <div id="historyItem`+snapshot.key+`"  onclick="chargeHistory('`+snapshot.key+`','`+nombreUsuario+`')"  class="swiper-slide">
<div style="display: block">
<div id='miHistoria'  >
<img src="`+img+`" width="35" height="35"  class="historia-img" >
</div>
<label style="color: #C13008;font-size: 3vw"    >`+history.NombreUsuario.substring(0,history.NombreUsuario.indexOf(" "))+`</label>
</div>
</div>`);


var swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
  spaceBetween: 15,

});  



 });




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
$$(".content-default-profile").hide();


$$("#GaleriaPerfilItem").click(function (evt) {
$$("#archivos-perfill").show();
$$("#listas-Perfil").hide();
console.log("galeria");

$$("#rawArchivos").empty();
$$("#Social/archivos/"+datosUsuario.Usuario.idUsuario).on("child_added",function (snapshot) { 
var archivo = snapshot.val();
console.log("archivo");
console.log(archivo);
  $$("#rawArchivos").prepend(` <div class="col-20">
  <img src="`+archivo+`" width="40" height="40" >
  
  </div>`);



 });





  });
  $$("#AmigosItemPerfil").click(function (evt) {
    $$("#archivos-perfill").hide();
    $$("#listas-Perfil").show();

    $$("#lista-Usuarios").empty();
    db.ref("Social/Amigos/"+datosUsuario.Usuario.idUsuario).on("child_added",function (snapshot) { 

      var friend = snapshot.val();


     });

    $$("#lista-Usuarios").append(` <li >
    <a href="#" class="item-link item-content">
          <div class="item-media"><img  class="img-rounded" src="img/iconos/user_defaultProfile.png" width="28" height="28"/></div>
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">Nombre del Usuario</div>
            </div>
            <div class="item-subtitle text-social">Accio que hizo el usuario</div>
          </div>
        </a>
      </li> `);
  
  });
  $$("#LugaresItemPerfil").click(function (evt) {
    $$("#archivos-perfill").hide();
    $$("#listas-Perfil").show();

  
  });




  }




  function OnOutLine() { 

  var datos =  ObtenerPublicaciones(localDatabase);

console.log("db datos");
console.log(datos);



   }

   OnOutLine();