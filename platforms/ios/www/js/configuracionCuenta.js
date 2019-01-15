


 app.views.create(".view-configuracion",{

    on:{
        pageInit:function () {
                SetDataUser();
$$("#GuardarUsuario").click(function (evt) {
evt.preventDefault();






  });
  $$("#divChangePass").hide();
  $$("#btnCambiarPass").click(function () { 

    $$("#divChangePass").show();

   });

 

  $$("#guardarCambios").click(function () { 
  app.preloader.show();
  var usuario = JSON.parse(localStorage.getItem("config")).Usuario;
  var pw1 = $$("#nuevaPass").val();
  var pw2 = $$("#repitePass").val();
 
 if( pw2 == ""){
  app.preloader.hide();
//alert();

 }else{


if(pw1 == pw2){

app.request.post("https://suritag.com/WebServiceSuritag/public/CambiarPassUsuario",{
  idUsuario:usuario.idUsuario,
  password:pw1
},function (data) { 
  app.preloader.hide();

alert("Cambio exitoso");


 },function (error) {
  app.preloader.hide();
 alert("error al cambiar su contraseña");
   

},"json");



}else{
  app.preloader.hide();
  alert("las contraseñas no coinciden"); 
}



 }





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