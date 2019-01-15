var usuario = JSON.parse(  localStorage.getItem("config")  ).Usuario;
var params=  app.utils.parseUrlQuery(  window.location.href );
var refCheckIn;
LintenChatPrivado();
app.views.create(".view-chat-checkIn",{
 
    on:{

pageInit:function () { 
//Prueba();
console.log("Init");

$$("#NombreSitio").text( params.name );
InitMessages( params.token  );


$$("#first").text("Conversa con personas que estan en este restaurante");

$$("#openImg").click(function (evt) {


 var dialogImg =  app.dialog.create({
 title:"Opciones",
 text:"seleccionar desde",
 buttons:[
{
    text:"Galeria",
    onClick:function (dialog,e) { 

        var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        var op  = setOptionsCamera(srcType);

        navigator.camera.getPicture(onSuccess, onFail, op);


     }
},{
    text:"Camara",
    onClick:function (dialog,e) { 

        var srcType = Camera.PictureSourceType.CAMERA;
        var op  = setOptionsCamera(srcType);

        navigator.camera.getPicture(onSuccess, onFail, op);

     }
}


 ]

 });

 dialogImg.open();



  });



 }

    }


});

function InitMessages(token) { 

    var messages = app.messages.create({
        el: '.messages',
        autoLayout:true,
        scrollMessages:true,
      });

$$("#btnVerUsuariosSitio").click(function (evt) { 
evt.preventDefault();

app.popup.open(".popup-usuarios-in-chat",true);


 });

 
 refCheckIn = db.ref("checkIn/"+dateFormat()+"/"+params.token+"");
LoadUsuarios(refCheckIn);
if(usuario.imgPerfil == undefined){
    usuario.imgPerfil = "";
}
console.log(usuario);

refCheckIn.child("Usuarios/"+usuario.idUsuario).set({
 Nombre:usuario.NombreUsuario,
 foto:usuario.imgPerfil ,
 telefono: usuario.TelefonoUsuario,



},function (error) { 
console.log("Usuario");
if(error){


}else{

$$("#checK-out").click(function (evt) { 
    evt.preventDefault();

    refCheckIn.child("Usuarios/"+usuario.idUsuario).set(null,function (error) { 

        window.history.back();


     });

 });

}



 });


refCheckIn.child("Chat").on("child_added",function (snapshot) { 
console.log("Child");

var mensajeCOntent = new Object();

var msg = snapshot.val()
console.log(msg);
if(msg.type == "text"){


    if(usuario.idUsuario ==  msg.idUsuario){
        mensajeCOntent.text = msg.text ;
        mensajeCOntent.name = msg.Nombre;
        mensajeCOntent.avatar = msg.fotoPerfil;
        mensajeCOntent.type = "sent";
        mensajeCOntent.textHeader = msg.Nombre;
        mensajeCOntent.textFooter = msg.date;

         console.log(mensajeCOntent); 

        messages.addMessage(mensajeCOntent, "append", true); 
            
        
        
        
        }else{

            mensajeCOntent.text = msg.text ;
            mensajeCOntent.name = msg.Nombre;
            mensajeCOntent.avatar = msg.fotoPerfil;
            mensajeCOntent.textHeader = msg.Nombre;
            mensajeCOntent.type = "received";
            mensajeCOntent.textFooter = msg.date;
    
             console.log(mensajeCOntent); 
    
            messages.addMessage(mensajeCOntent, "append", true);  




        
        
        }



}else if(msg.type == "img"){

    if(usuario.idUsuario ==  msg.idUsuario){
     
        mensajeCOntent.imageSrc = msg.img ;
        mensajeCOntent.name = msg.Nombre;
        mensajeCOntent.avatar = msg.fotoPerfil;
        mensajeCOntent.textHeader = msg.Nombre;
        mensajeCOntent.type = "sent";
        mensajeCOntent.textFooter = msg.date;

         console.log(mensajeCOntent); 

        messages.addMessage(mensajeCOntent, "append", true);  

        
        
        
        }else{

            mensajeCOntent.imageSrc = msg.img ;
            mensajeCOntent.name = msg.Nombre;
            mensajeCOntent.avatar = msg.fotoPerfil;
            mensajeCOntent.textHeader = msg.Nombre;
            mensajeCOntent.type = "received";
            mensajeCOntent.textFooter = msg.date;
    
             console.log(mensajeCOntent); 
    
            messages.addMessage(mensajeCOntent, "append", true); 


        
        
        }






}



//$$(".message-avatar").removeClass("message-avatar");



 });


 $$(".send-link").click(function (evt) { 
evt.preventDefault();



if( $$(".msgInclude").val() == "" || $$(".msgInclude").val()  == null ){


}else{
    var data = {
        type:"text",
        idUsuario:usuario.idUsuario,
        fotoPerfil:usuario.imgPerfil,
        img:"",
        text:$$(".msgInclude").val(),
        Nombre:usuario.NombreUsuario,
        date:dateFormatExtended()
     
     
     }
     SendMsg(data);
 $$(".msgInclude").val("");


}



  });













 }


 function SendMsg(Data) {


    refCheckIn.child("Chat").push().set(Data);


   }


   function onSuccess(imageData) {
  //  var image = document.getElementById('myImage');
    var imagenData = "data:image/jpeg;base64," + imageData;
    var date = new Date();

   var refSaveImg =  storage.ref("Chat/"+dateFormat()+"/"+date.getTime()+".jpeg");


   refSaveImg.putString(imagenData, 'data_url').then(function(snapshot) {
   
    snapshot.ref.getDownloadURL().then(function(downloadURL) {


        var data = {
            type:"img",
            idUsuario:usuario.idUsuario,
            fotoPerfil:usuario.imgPerfil,
            img:downloadURL,
            text:"",
            Nombre:usuario.NombreUsuario,
            date:dateFormatExtended()
         
         
         }
         SendMsg(data);
      

        
       



      });

  });


}


function onFail(message) {
    alert('Failed because: ' + message);
}

function setOptionsCamera(srcType) {
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




function Prueba() { 
    var date = new Date();

    var refSaveImg =  storage.ref(+"Chat/"+dateFormat()+"/"+date.getTime()+".jpeg");

    var message = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
    refSaveImg.putString(message, 'data_url').then(function(snapshot) {
    
     snapshot.ref.getDownloadURL().then(function(downloadURL) {
 
 
         var data = {
             type:"img",
             idUsuario:usuario.idUsuario,
             fotoPerfil:usuario.imgPerfil,
             img:downloadURL,
             text:"",
             Nombre:usuario.NombreUsuario,
             date:dateFormatExtended()
          
          
          }
          console.log(data);
        //  SendMsg(data);
         // messages.hideTyping();
 
         
        
 
 
 
       });
 
   });

 }


 function LoadUsuarios(Ref) { 

Ref.child("Usuarios").on("child_added",function (snapshot) { 

    var usuario  = snapshot.val();
    console.log(usuario);
 var img = "img/iconos/user_defaultProfile.png";
 if(usuario.foto.length != 0 ){
img = usuario.foto;
 }

 console.log(img);

$$("#lista-usuarios-chat").prepend(`<li  >
<div class="item-content">
  <div class="item-media"><img src="`+img+`" width="32" height="32" /></div>
  <div class="item-inner">
    <div class="item-title-row">
      <div class="item-title font-sm-4">`+usuario.Nombre+`</div>
    </div>
    <div class="item-subtitle"><button value='`+snapshot.key+`'  onclick="SoliciarChatPrivado(this)"  class="btn-open-chatprivado font-sm-3">Abrir chat privado</button></div>
  </div>
</div>
</li>`);



 });

 $$(".btn-open-chatprivado").off("click");

 $$(".btn-open-chatprivado").click(function (evt) { 
evt.preventDefault();



 var key =  $$(this).val();
 console.log(key);

var refChatPrivado = db.ref("Chatprivado/"+usuario.idUsuario);

var bandejaEntrada = db.ref("bandejaEntrada/"+key);

app.popup.open(".pop-chat-privado",true);





    
  });




  }


  function SoliciarChatPrivado(target) {  
  var indicacion  =    db.ref("Social/ChatPrivado/"+$(target).val()+"/solicitudes").push();
var key =  indicacion.key;
 console.log( indicacion.key );
console.log("preloader");
 indicacion.set({
    nombre:usuario.NombreUsuario,
    imagen:usuario.ImagenUsuario,
    id:usuario.idUsuario,
    estado:"ENVIADO",
    keyChat:key
 });
console.log("enviado");

var dialog = app.dialog.create({
 title:"Solicitandi",
text:"esperando respuesta",
content:` <div class="preloader color-green"></div>`,
buttons:[
{
    text:"Cancelar",
    onClick:function () { 
 indicacion.update({
    estado:"CANCELADO",

 },function () { 
dialog.close();

  });

     },
    
}
    
]



}).open();


indicacion.on("child_changed",function (snapshot) { 

    var state = snapshot.val();

 if(state == "ACEPTADO"){
    HidePage("location","ChatPrivado.html?PersonaId="+target+"&chatKey="+key  );
target
 }

 if(state == "RECHAZADO"){
     dialog.close();
     alert("Su solicitud fue rechazada");

 }
  



 });


    
  }



  function LintenChatPrivado() {  

db.ref("Social/ChatPrivado/"+usuario.idUsuario+"/solicitudes").orderByChild("estado").equalTo("ENVIADO").limitToLast(1).on("child_added",function (snapshot) {

    var solicitud = snapshot.val();
     var SolicicudKey = snapshot.key;
console.log("Solicitud recibida");
console.log("key: "+snapshot.key);
console.log(solicitud);
var img = `<img src="img/icons-social/perfil.png" width="18" height="18" >  `;
if( solicitud.imagen != undefined ){
img = solicitud.imagen;



}


var notificationFull = app.notification.create({
    icon: img,
    title: 'Solicicud',
 titleRightText: 'ahora',
    subtitle: solicitud.nombre,
    text: 'Quiere hablarte en privado ',
    closeTimeout: 5000,
    closeButton: true,
    on:{
        notificationClick:function () { 
       
            app.dialog.create({
  title:"Chat Privado",
  buttons:[
      {
          text:"Aceptar",
          onClick:function () {

            db.ref("Social/ChatPrivado/"+usuario.idUsuario+"/solicitudes/"+SolicicudKey).update({
             estado:"ACEPTADO"

            },function (error) { 
                HidePage("location","ChatPrivado.html?PersonaId="+solicitud.id+"&chatKey="+SolicicudKey  );


             });           

            }
      },
      {
          text:"Rechazar",
          onClick:function () {

            db.ref("Social/ChatPrivado/"+usuario.idUsuario+"/solicitudes/"+SolicicudKey).update({
                estado:"RECHAZADO"
      
            },function () { 
                notificationFull.close();
             });


            }

      }
  ]


            }).open();
            


         }
    }
  });
  notificationFull.open();




  });


  }
