
var refCheckIn;


var view = app.views.create(".view-chat-checkIn-privado",{

on:{
    pageInit:function () { 

var params = app.utils.parseUrlQuery(location.href);        
IniciarChat(params);
    
    }

}

});

function IniciarChat(params) { 
    
 var refCheckIn  = db.ref("Social/ChatPrivado/Salas/"+params.chatKey);
 var usuario = JSON.parse(  localStorage.getItem("config")  ).Usuario;

     db.ref("Social/Usuarios/"+params.PersonaId).once("value",function (snapshot) { 
 var Usuario = snapshot.val();

 $$("#NombrePersona").text( Usuario.NombreUsuario );


 console.log("Init");

InitMessages( params.token  );


$$("#first").text("Chat privado");

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


        



      });

    



function InitMessages(token) { 

    var messages = app.messages.create({
        el: '.messages',
        autoLayout:true,
        scrollMessages:true,
      });






if(usuario.imgPerfil == undefined){
    usuario.imgPerfil = "";
}
console.log(usuario);

$$("#checK-out").click(function () { 

    var data = {
        type:"text",
        idUsuario:usuario.idUsuario,
        fotoPerfil:usuario.imgPerfil,
        img:"",
        text:"Ha salido del chat",
        Nombre:usuario.NombreUsuario,
        date:dateFormatExtended()
     
     
     }
     SendMsg(data);
     setTimeout(() => {
        HidePage("back",null);
     }, 1000);




 });



refCheckIn.on("child_added",function (snapshot) { 
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


    refCheckIn.push().set(Data);


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


 



}






