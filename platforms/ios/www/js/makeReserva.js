
var siteToken = (app.utils.parseUrlQuery( window.location.href )).tokenSite;
var SitioDatos ;

var reservaObj = {
fechaReserva: "",
horaReserva:"",
cantidadPersonas:0,
idMesa:null,
idSitios:0,
idOferta:null,
idUsuario:null
};

$$("#scrrollSection").click(function () {  

  var dest = $("#mesasDisponiblesContent").offset().top;
  $("body, html, .page-content").animate({scrollTop: dest});


});




function Hours() {
var hours = [];
    for( var i = 0;i<=23;i++){
       

if( i <=9 ){
  hours.push("0"+i+":00:00");


}else{
    hours.push(i+":00:00");

}


    }

    return hours;


  }




  var makeReservasView = app.views.create(".view-makereservas",{
      on:{
          pageInit:function () { 
            $$("#recursoPrincipal").hide();
              $$("#mesasDisponiblesContent").hide();
            app.dialog.preloader('Comprobando reservas');
          GetSitio();


var calendarModal = app.calendar.create({
    inputEl: '#demo-calendar-modal',
    openIn: 'customModal',
    header: true,
    footer: true,
    dateFormat: 'yyyy-mm-dd',
    minDate:new Date()
  });


  var pickerDevice = app.picker.create({
    inputEl: '#demo-picker-device',
    cols: [
      {
        textAlign: 'center',
        values: Hours()
      }
    ]
  });












           }
      }

  });



  function GetSitio() { 

app.request.post(
  "https://suritag.com/WebServiceSuritag/public/GetSitioByIden",
  {identificador:siteToken},
  function (data) {
    app.dialog.close();
 
 
    if(data == null){
      app.dialog.create({ title:'El sitio no se encuetra registrado \n ',function () {
        window.history.back();
        },
        buttons:[
          {
            text:"Regresar",
            onClick:function (Dialog,e) { 
              window.history.back();
             }
          }
        ],
       
       } ).open();

 }else{
  $$("#recursoPrincipal").show();
  $$("#btnBuscarMesas").off("click");
$$("#btnBuscarMesas").click(function (evt) { 
evt.preventDefault();
app.preloader.show("multi");
MesasAvailables(data.idSitos);

 });



 }



    },
    function (error) {
alert("Error al tratar de comprobar el estado del sitio");
window.history.back();
      },
      "json"
  );


   }





   function MesasAvailables(idSite) {
var datosU = JSON.parse( localStorage.getItem("config")).Usuario;


    var params = {
      idSitio:idSite,
      Npersonas:$$("#Npersonas").val(),
      fecha:$$("#demo-calendar-modal").val(),
      hora:$$("#demo-picker-device").val()

    }

reservaObj.fechaReserva = params.fecha;
reservaObj.horaReserva =params.hora;
reservaObj.cantidadPersonas = params.Npersonas;
reservaObj.idSitios = idSite;
reservaObj.idUsuario =datosU.idUsuario ;


app.request.post("https://suritag.com/WebServiceSuritag/public/GetMesasToReserve",
params,
function (data) {
  console.log(data);
  app.preloader.hide();

if(data.count == 0){

  alert("No hay mesas disponibles con esas caracteristicas");

}else{
  
  var arrayMesas = [];

data.lista.forEach(mesasAlv => {
arrayMesas.push( mesasAlv.Nombre +"-"+mesasAlv.NombreMesa  );
  
});

var pickerMesas = app.picker.create({
  inputEl: '#picker-listado',
  cols: [
    {
      textAlign: 'center',
      values: arrayMesas,
      onChange:function (picker, values, displayValue) {
    
   reservaObj.idMesa = data.lista[arrayMesas.indexOf(displayValue)].idMesas;


        
      }
    }
  ]
});

$$("#NmesasD").val( ""+data.count );



  $$("#mesasDisponiblesContent").show();
  $$("#scrrollSection").click();
  $$("#btnCancel").off("click");
  $$("#btnCancel").click(function (evt) { 
evt.preventDefault();
 window.history.back();


   });
   $$("#btnReservar").off("click");
      $$("#btnReservar").click(function (evt) { 
        $$('#btnReservar').attr("disabled", true);
   evt.preventDefault();

console.log(reservaObj);

app.preloader.show();


 app.request.post(
"https://suritag.com/WebServiceSuritag/public/MakeReserva",
reservaObj,
function (data) {
  app.preloader.hide();
alert("Su reserva Ha sido enviada con exito");
window.location = "./Reservas.html";

  },
  function (error) {
    app.preloader.hide();
    $$('#btnReservar').attr("disabled", true);
    alert("Error al trar de hacer la reserva ");
    }

 );


    });







}


  },
  function (error) {
    app.preloader.hide();
    alert("error al consultar la disponibilidad de la reserva");
    },
    "json"
);



     }
