
  var view = app.views.create('.view-Reservas', {
    on: {
      pageInit: function () {
     //   app.panel.close(".panel-left",true);
      CargarReservas();

$$(".back-reserva").click(function () {  
  HidePage("location","./View_Principal.html");


});

      }
    }
  });

function CancelarReservas(target,idReserva){
 
  app.dialog.create({
    title:"¿ Desea Cancelar la Reserva?",
    buttons:[
{
  text:"SI",
   onClick:function () { 

    app.preloader.show();

    app.request.post(`https://suritag.com/WebServiceSuritag/public/cambiarEstadoReserva`
    ,{
      idReserva:idReserva,
      estadoReserva:"CANCELADO"
    },function (data) { 
      app.preloader.hide();
      $$(target).remove();

     },function (error) { 
      app.preloader.hide();
       alert("error al tratar de cancelar la reserva");
      },"json");
 


    }
},{
  text:"NO",
  onClick:function () { 

   }

}

    ]
  }).open();;


}



  function CargarReservas() {

    app.preloader.show();
    var Usuario = JSON.parse( localStorage.getItem("config") ).Usuario;
    
    app.request.post(
      "https://suritag.com/WebServiceSuritag/public/HistorialReservaUsuario",
      {idUsuario:Usuario.idUsuario},
      function (data) {
        app.preloader.hide();

      if(data.count == 0){
        alert("Usted no tiene reservas disponibles");
      }else{
$$(".timeline").empty();

        data.value.forEach(element => {
       var content = ` <div  onclick="CancelarReservas(this,'`+element.idReserva+`')"  class="timeline-item">
       <div class="timeline-item-date"> <small>`+ConvertReadableDate(""+element.FechaReserva)+`</small></div>
       <div class="timeline-item-divider"></div>
       <div class="timeline-item-content">
         <div class="timeline-item-inner">
           <div class="timeline-item-time">`+element.HoraReserva+`</div>
           <div class="timeline-item-title font-sm-3" style="" >`+element.NombreSitio+`</div>
           
<div class="timeline-item-subtitle font-sm-2"><i class='f7-icons' >persons</i>   `+element.CantidadPersonas+`</div>
<div class="timeline-item-text font-sm-2">`+element.NombreMesa+`</div>.
           
         
         </div>
       </div>
     </div>`;  
    $$(".timeline").append(content);      
          
        });
           
        var calendarDefault = app.calendar.create({
          inputEl: '#demo-calendar-default',
        });
      }

        },
        function (error) {
          app.preloader.hide();
          alert("Error al tratar de consultar las reservas");

          },
          "json"

    );



  }





  function ConvertReadableDate(fecha) { 
    var dt = new Date(fecha);
    console.log(fecha);
    
    var meses = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
  console.log(dt.getMonth());
   
    console.log(   dt.getDate()+" "+(meses[dt.getMonth()]) )   ;
  return  dt.getUTCDate()+" "+(meses[dt.getMonth()]);
   }