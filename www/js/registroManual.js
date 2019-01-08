
var imgDatos = null;


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



app.views.create(".view-registroManual",{

     on:{
pageInit:function () {



    $$("#GuardarUsuario").click(function (evt) {

  evt.preventDefault();


  app.input.validateInputs(".list-form");

  GuardarDatos();


      });





  }

     }
});









 function GuardarDatos() {
     app.preloader.show();
 

   
     var params = {
      NombreUsuario:$$("#nombreUser").val()+" "+ $$("#apellido").val(),
      TelefonoUsuario:$$("#telefotoUser").val(),
      CorreoUsuario:$$("#correoUser").val(),
      ImagenUsuario:"",
      TipoUsuarios_idTipoUsuario:1

    }

    app.request.post(
"https://suritag.com/WebServiceSuritag/public/RegistrarUsuario",
params,
function (data) { 
app.preloader.hide();

app.dialog.alert("Usuario registrado Correctamente","Estado",function(){
  window.location = "./index.html";
});


},
function(error){
   app.preloader.hide();
   app.dialog.aler("Error al tratar de registrar el Usuario","Estado");

},"json"


    );






  }