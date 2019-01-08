var datosU = JSON.parse(  localStorage.getItem("config") );

SetData();
var Opciones = app.actions.create({
    buttons: [
      {
        text: 'Registro',
        bold: true,
        onClick:function () {

          }
      },
      {
        text: 'Planes ',
        
        onClick:function () {
            
          }
      },
      {
        text: 'Politicas de privacidad',
        color: 'red',
        onClick:function () {
            
          }
      },
    ]
  });



  $$("#opcions").click(function (evt) {  
Opciones.open();



  });

  $$("#button-enviar").click(function (evt) { 
      SendData();
   });


  $$("#buttonEnviarSolicitud").click(function () {




    });


    function SetData() { 
var user = datosU.Usuario;
console.log(user);

$$("#nombreUsuario").val(user.NombreUsuario);
$$("#direccionUsuario").val(user.direccionFisicaUsuario);
$$("#correoUsuario").val(user.CorreoUsuario);
$$("#telefonoUsuario").val(user.TelefonoUsuario);

}



function SendData() { 
app.preloader.show();
    var param = {
        idUsuario:datosU.Usuario.idUsuario,
        NombreUsuario:$$("#nombreUsuario").val(),
        TelefonoUsuario:$$("#direccionUsuario").val(),
        CorreoUsuario:$$("#correoUsuario").val(),
        direccionFisicaUsuario:$$("#telefonoUsuario").val()
      };


      app.request.post(
          "https://suritag.com/WebServiceSuritag/public/sendEmailConfirm",
      param,
      function (data) { 
          app.preloader.hide();
      
       if(data.status == false){
app.dialog.create({
  title:"Usuario Registrado previamente",
  text:"¿ desea acceder a la plataforma?",
  buttons:[
    {
      text:"si",
      onClick:function () { 
window.location = "https://www.suritag.com";
       }
    },{
      text:"No",
      onClick:function () { 
var reg = "";
//regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;

       }
    }
  ]
}).open();
       }else{
        app.dialog.alert("Le hemos enviado un email de confirmacion a su correo","Suritag Admin");
   
       }
      
        },
       function (error) { 
        app.preloader.hide();
alert("Error al tratar de enviar los datos");

        }

      ,"json");


      



 }