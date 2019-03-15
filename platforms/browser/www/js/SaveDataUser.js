var imgUser = "" ;
var confg = JSON.parse(localStorage.getItem("config"));


$$("#saveData").click(function (evt) {

    app.preloader.show();


   app.input.validate(".list");

var param = {
  NombreUsuario:$$("#nombre").val(),
  ImagenUsuario:"",
  TelefonoUsuario:$$("#Telefono").val(),
  CorreoUsuario:$$("#Correo").val(),
  direccionFisicaUsuario:"N/A",
  TipoUsuarios_idTipoUsuario:1
};

app.request.post(
  configApp.uri+"RegistrarUsuario",
  param,
function (data, status, xhr) {

  localStorage.setItem("estado","LOGEADO");
confg.logged =true;
confg.Usuario = data.obj;
  


  localStorage.setItem("config",JSON.stringify(confg)  );


  app.request.post(configApp.uri+"Social/InitSocialRed",{
    usuarioId:data.obj.idUsuario
  },function (data) {
    app.preloader.hide();
    console.log(data); 
    localStorage.setItem("ContenidoSocial",JSON.stringify(data));
    HidePage("location","IntroOpciones.html");
   },function (error) {
    app.preloader.hide();
    console.log(data); 
  HidePage("location","IntroOpciones.html");
  },"json");





  },function (xhr, status) {
console.log("Error");
app.preloader.hide();

  },
  "json",
  )



 

  });







  function DysplayData() { 
    var query = app.utils.parseUrlQuery(location.href);
    console.log(query); // { id: 5, foo: 'bar' }
 /* */
    $$("#nombre").val(query.name);
    $$("#Correo").val(query.email);
    $$("#phoneNumber").val(query.telefono);

  
  
   };

   DysplayData();