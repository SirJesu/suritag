var configApp = {
  uri:"https://suritag.com/WebServiceSuritag/public/",
  firstTime:true,
  logged:false,
  Usuario:{}
}

function InititalConfig(){

  screen.orientation.lock('portrait');

  function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
   // states[Connection.UNKNOWN]  = 'Unknown connection';
   // states[Connection.ETHERNET] = 'Ethernet connection';
   /* states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';  */

// alert(   JSON.stringify( networkState  ) );
}

checkConnection();




};

var $$ = Dom7;
//https://suritag.com/WebServiceSuritag/public/
var app = new Framework7({
    // App root element
    root: '#app',
   sheet:{
    closeByOutsideClick:true,
   },
   view: {
    xhrCache: false,
  },
  animate:true,
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
    
    },
    // Add default routes
    routes: [
      {
        path: '/soporte/',
        url: 'soporteTecnico.html',
        name:"soporte"
      },
      {
        path:"/principal/",
        url:"principal.html",
        name:"principal"
      },
      {
        path:"/reservas/",
        url:"./Reservas.html",
        name:"reservas"
      }
    ],
    // ... other parameters
  });
  ShowPage();
function ShowPage() { 


  $$("body").hide();  
$$("body").removeAttr("hidden");
$("body").fadeIn(700,function () { 

  InititalConfig();

 });

 };
 
function HidePage(type,location) { 

 // $$("body").hide();  
//$$("body").removeAttr("hidden");
$("body").fadeOut(700,function () { 

 if(type== "back"){
  window.history.back();
 }else if(type == "location"){
window.location = location
 }

 });

 };




  if (Framework7.device.android) {


   $$(".searchbar").css("margin-top","5%");
   $$(".page-content").css("margin-top","5%");
  



  }  







  $$(".back").click(function (evt) {
HidePage("back",null);


    });


 //**
 //*/Generar Token Aleatorio

 function random() {
  return Math.random().toString(36).substr(2); // Eliminar `0.`
};

function token() {
  return random() + random(); // Para hacer el token más largo
};






$$("#app").css("width",screen.width);


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCIO7dQTTZpYWdsN3qWps74iHfPIMv3Enw",
    authDomain: "suritag-213423.firebaseapp.com",
    databaseURL: "https://suritag-213423.firebaseio.com",
    projectId: "suritag-213423",
    storageBucket: "suritag-213423.appspot.com",
    messagingSenderId: "963368810593"
  };
  firebase.initializeApp(config);


//**Firebase Init */

var db =  firebase.database();
var storage = firebase.storage();
var configAcount = JSON.parse( localStorage.getItem("config") +"" );


/*** */

//$(".page-content").slideUp();




//Acciones generales

function ActionsMenu() {

 $$("#principalAccion").click(function (evt) { 
//  window.location = "./View_Principal.html";
  //app.navbar.hide(".panel",true);
   });

  
   $$("#ReservasAccion").click(function (evt) { 
    HidePage("location","./Reservas.html");


   // location = "./Reservas.html";
    
     });
  
  $$("#actividadAccion").click(function (evt) { 
evt.preventDefault();
HidePage("location","./Actividad.html");

//location = "./Actividad.html";



   });


     $$("#configuracionAccion").click(function (evt) { 
      evt.preventDefault();
      HidePage("location","./ConfiguracionCuenta.html");
    //  location = "./ConfiguracionCuenta.html";
      
       });
  
       $$("#soporteTecnicoAccion").click(function (evt) { 
        HidePage("location","./soporteTecnico.html");
       
      //  window.location = "./soporteTecnico.html";
        
         });
  
         $$("#AddSitio").click(function (evt) { 
           evt.preventDefault();
         //   var datos = JSON.parse(  localStorage.getItem("DataUser") );
         HidePage("location","./AddSitio.html");     
         //  window.location = "./AddSitio.html";
          });

    $$("#salirApp").click(function (evt) { 

          evt.preventDefault();

        
          var user = firebase.auth().currentUser;

        if(user == null){
          localStorage.removeItem("estado");
          localStorage.removeItem("config");
          window.location = "./login_v1.html";


        }else{
          user.delete().then(function() {
            localStorage.removeItem("estado");
            localStorage.removeItem("config");
            window.location = "./login_v1.html";


          }).catch(function(error) {
            localStorage.removeItem("estado");
            localStorage.removeItem("config");
            window.location = "./login_v1.html";


          });




        }

      


           });  
  
  
  
    }

    function ToolbarActions() { 
   
$$("#toolbarItemCercadeMi").click(function (evt) {
  evt.preventDefault();
  });
     
$$("#toolbarItemBuscar").click(function (evt) {
  evt.preventDefault();

window.location = "./Buscar.html";

  });
     
$$("#toolbarItemSocial").click(function (evt) {
  evt.preventDefault();

  window.location = "./SocialPrincipal.html";
  });
     
$$("#toolbarItemActividad").click(function (evt) {
  evt.preventDefault();


  window.location = "./Actividad.html";
  });
     
$$("#toolbarItemColecciones").click(function (evt) {
  evt.preventDefault();
  window.location = "./Colecciones.html";
  });





     };
  
  
    //**** */
  

ToolbarActions()
 ActionsMenu();
 //ConvertReadableDate();
  

//Finalizar
/*
$$(window).on('load', function () {
  setTimeout(function () {
$$(".loader-page").css({visibility:"hidden",opacity:"0"})
}, 2000);
 
}); */




function dateFormat(){
      
  var fecha = new Date();

  var dia = "";
  var mes ="";
  var anio = fecha.getFullYear();

if(  fecha.getDate() <=9 ){
dia ="0"+fecha.getDate();
}else{
dia = ""+fecha.getDate();
}
if(  (fecha.getMonth()+1) <=9 ){
mes ="0"+(fecha.getMonth()+1);
}else{
  mes =""+(fecha.getMonth()+1);
}

var res = dia+""+mes+""+anio;

return res;
}

function dateFormatExtended(){
      
  var fecha = new Date();

  var dia = "";
  var mes ="";
  var anio = fecha.getFullYear();
  var hour = fecha.getHours();
  var minutes = fecha.getUTCMinutes();
  var second = fecha.getUTCSeconds();

if(  fecha.getDate() <=9 ){
dia ="0"+fecha.getDate();
}else{
dia = ""+fecha.getDate();
}
if(  (fecha.getMonth()+1) <=9 ){
mes ="0"+(fecha.getMonth()+1);
}else{
  mes =""+(fecha.getMonth()+1);
}

var res = dia+"/"+mes+"/"+anio+" "+hour+":"+minutes+":"+second;

return res;
}

//console.log( dateFormatExtended() );


function Profile() {

console.log(configAcount);
 
var chatA = configAcount.Usuario.NombreUsuario.indexOf(" ");

  $$(".nombre-content-header").text(configAcount.Usuario.NombreUsuario);
  $$(".correo-info").text(configAcount.Usuario.CorreoUsuario);
  
  if(configAcount.Usuario.ImagenUsuario != null && configAcount.Usuario.ImagenUsuario != ""){
  
    $$(".img-content-header").attr("src",configAcount.Usuario.ImagenUsuario);
    $$("#SelfHistory_img").attr("src",configAcount.Usuario.ImagenUsuario);
  }
  


  }
  