


var loginView = app.views.create('.view-login',{
 on:{
    pageInit:function () { 

 
$$("#registrarse").click(function (evt) { 
window.location = "./RegistrarUsuarioManual.html";

 });

$$("#btnIngresa").click(function (evt) {

Login();

  });


     }

}

});

var userData = localStorage.getItem("DataUser");
if(userData == null){
  console.log("Usuario no Guardado");
}else{
  window.location = "./principal.html";
}



var providerGoogle = new firebase.auth.GoogleAuthProvider();
var providerFacebook = new firebase.auth.FacebookAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    window.localStorage.setItem("DataUser",JSON.stringify(user));
    window.location = "./saveDataUser.html";


  } else {
    // No user is signed in.
  }
});



$$("#btnIngresarFacebook").click(function (e) { 
  e.preventDefault();
IntentAuth(providerFacebook);
  
});

$$("#btnIngresarGoogle").click(function (e) { 
  e.preventDefault();
  IntentAuth(providerGoogle);

  
});


function IntentAuth(provider) { 

  firebase.auth().signInWithRedirect(provider).then(function() {
    return firebase.auth().getRedirectResult();
  }).then(function(result) {
    // This gives you a Google Access Token.
    // You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    window.localStorage.setItem("DataUser",JSON.stringify(user));
    window.location = "./saveDataUser.html";

    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });


 }


//**Obtenr Los Resultados de la Auth */
 firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    // This gives you a Google Access Token.
    // You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user);
    console.log(token);

    window.localStorage.setItem("DataUser",JSON.stringify(user));
    window.location = "./saveDataUser.html";


    // ...
  }
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
});



function Login(){
console.log("login");
  app.input.validateInputs(".list-login-in");
app.preloader.show();
var param = {
  Usuario:$$("#correo").val(),
  password:$$("#telefono").val()
};

app.request.post("https://suritag.com/WebServiceSuritag/public/LoginU",
param,
function (data) { 
  app.preloader.hide();
  if(data.Status == false){
 app.dialog.alert(data.Msg,"Estado");
  }else{

    localStorage.setItem("DataUser",JSON.stringify( data.obj)  );
    window.location = "./principal.html";

  }

 },function (error) {
  app.preloader.hide();
   app.dialog.alert("Error al trata de acceder");

  },"json");




}