var db = firebase.database();
var datosU = JSON.parse(  localStorage.getItem("DataUser") );



db.ref("Usuarios/"+datosU.idUsuario+"/Colecciones").on("child_added",function (snapshot) {

var coleccion = snapshot.val();


console.log(coleccion);

var element= ` <li id="`+coleccion.Sitio+`" >
<a href="#" class="item-link item-content">
  <div class="item-media"><img src="./img/online-store.png" width="44"/></div>
  <div class="item-inner">
    <div class="item-title-row">
      <div class="item-title">`+coleccion.Nombre+`</div>
      <div class="item-after">`+coleccion.Date+`</div>
    </div>
    <div class="item-subtitle"><div id="rateYo`+coleccion.Sitio+`" ></div></div>
  </div>
</a>
</li>`;

$("#listaColecciones").append(element);

$("#rateYo"+coleccion.Sitio).rateYo({
    rating: coleccion.Calificacion,
    readOnly: true,
    starWidth: "17px",
    multiColor: {
 
        "startColor": "#FF0000", //RED
        "endColor"  : "#00FF00"  //GREEN
      }
  });

$$("#"+coleccion.Sitio).click(function (evt) {
 
 // console.log("click");
   
  window.location = "./SitioDetalle.html?placeId="+coleccion.Sitio;

  });



  });


//listaColecciones