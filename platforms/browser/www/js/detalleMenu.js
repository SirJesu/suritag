



app.views.create(".view-detallemenu",{

     on:{
         pageInit:function () {

  
var typeRest = getParameterByName("type");

var idSitio =   getParameterByName("tokenSite"); 




switch (typeRest) {
    
    case "comida":
    params.filter ="comida";
    $$(".title-header").text("Comida");


        
        break;

        case "bebida":
        params.filter ="bebida";
 $$(".title-header").text("Bebidas");


        app.request.post(
            "https://suritag.com/WebServiceSuritag/public/filterMenuTypeFoodSite",
              params,
              function (data) {
                  console.log(data);
                  
                  DsyplayList(data);
        
              },
              function (error) {
        
                  
              },"json"
        
        );




   
        
        break;

        case "todo":
        params.filter ="all";
        $$(".title-header").text("Menu Completo");
        app.request.post(
            "https://suritag.com/WebServiceSuritag/public/filterMenuTypeFoodSite",
              params,
              function (data) {
                  console.log(data);
                  
        
        DsyplayList(data);
              },
              function (error) {
        
                  
              },"json"
        
        );


        
        break;

    default:
        break;
}






           }
     }
});


function DsyplayList(data) {





if(data.count == 0){
    



}else{

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

}

    
  }