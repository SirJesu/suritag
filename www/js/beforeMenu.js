


var beforeMenu = app.views.create(".view-beforeMenu",{
    on:{
        pageInit:function () {

getSitio();

$$("#badgeBebidas").hide(); 
$$("#badgeMenu").hide(); 
$$("#badgeComidas").hide(); 

          }
    }

});





function getSitio() {
    app.dialog.preloader('Consultando el menu');
    app.request.post("https://suritag.com/WebServiceSuritag/public/GetSitioByIden"
    , {
        identificador:getParameterByName("tokenSitio")
    }, function (data) {
        app.dialog.close();

   if( data == null || data =="null" ){

    app.dialog.alert("EL lugar no tiene un menu disponible",
    "Suritag App" ,
     function () { 
        app.dialog.close();
   window.history.back();

      })




   }else{
app.dialog.close();

Actions(data.idSitos);

var searchbar = app.searchbar.create({
    el: '.searchbar',
    searchContainer: '.list',
    searchIn: '.item-title',
    on: {
      search(sb, query, previousQuery) {
        console.log(query, previousQuery);
      }
    }
  });


   }



    }, function (error) {
        app.dialog.close();

        app.dialog.alert("Error al Consultar el Menu",
        "Suritag App" ,
         function () { 
            app.dialog.close();
       window.history.back();
    
          })

      }, "json")



 }




 function Actions(idSitio) {
     
    var params = {
        idSitios:idSitio,
        filter:""
    
    }
    

$$("#menuCompleto").click(function (evt) { 

evt.preventDefault();

app.preloader.show();
params.filter ="all";

app.request.post(
    "https://suritag.com/WebServiceSuritag/public/filterMenuTypeFoodSite",
      params,
      function (data) {
          console.log(data);
           $$("#badgeMenu").text(data.count+""); 
           $$("#badgeMenu").show(); 

DsyplayList(data);
      },
      function (error) {

          
      },"json"

);




 });
 $$("#menuComidas").click(function (evt) { 
    evt.preventDefault();
    app.preloader.show();
    params.filter ="comida";
    app.request.post(
        "https://suritag.com/WebServiceSuritag/public/filterMenuTypeFoodSite",
          params,
          function (data) {
              console.log(data);
              $$("#badgeComidas").text(data.count+""); 
              $$("#badgeComidas").show(); 
              DsyplayList(data);
    
    
    
          },
          function (error) {
    
              
          },"json"
    
    );



     });

     $$("#menuBebidas").click(function (evt) { 
        evt.preventDefault();
        app.preloader.show();
        params.filter ="bebida";
        app.request.post(
            "https://suritag.com/WebServiceSuritag/public/filterMenuTypeFoodSite",
              params,
              function (data) {
                  console.log(data);
                  $$("#badgeBebidas").text(data.count+""); 
                  $$("#badgeBebidas").show(); 
                  
                  DsyplayList(data);
        
              },
              function (error) {
        
                  
              },"json"
        
        );


        
         });


$$("#menuCompleto").click();

 }


 function DsyplayList(data) {





    if(data.count == 0){
        
        app.dialog.alert("No hay Datos disponibles");
    
    
    
    }else{

 $$("#list-display").empty();     
    
    data.value.forEach(element => {
        
    
        $$("#list-display").append(`
        <li>
        <div href="#" class=" item-content card">
          <div class="item-inner">
            <div class="item-title-row">
              <div class="item-title">`+element.Nombre+`</div>
            
            </div>
            <div class="item-subtitle">$ `+element.Precio+`</div>
            <div class="item-text">`+element.Descripcion+`</div>
            <button  class="button button-outline  color-red" style="width: 50% !important;margin-top:10px" >Reservar</button>
          </div>
          <div class="item-media"><img src="`+element.Imagen+`" width="70"/></div>
         
    </div></li>
        
        `);
    
    });

    app.preloader.hide();
    
    }
    
        
      }