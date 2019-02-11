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
  app.preloader.hide();
  localStorage.setItem("estado","LOGEADO");
confg.logged =true;
confg.Usuario = data.obj;
  


  localStorage.setItem("config",JSON.stringify(confg)  );


  db.ref("Social/Usuarios/"+data.obj.idUsuario).set(data.obj,function (errr) { 
    HidePage("location","IntroOpciones.html");
    //window.location = "View_Principal.html";
  
    });



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