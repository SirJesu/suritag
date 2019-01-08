


 app.views.create(".view-configuracion",{

    on:{
        pageInit:function () {
                SetDataUser();
$$("#GuardarUsuario").click(function (evt) {
evt.preventDefault();






  });




          }

    }

 });


 function SetDataUser() { 
 var usuario = JSON.parse(localStorage.getItem("config")).Usuario;

$$("#nombre").val(usuario.NombreUsuario); 
$$("#correo").val(usuario.CorreoUsuario);
$$("#telefono").val(usuario.TelefonoUsuario);



  }