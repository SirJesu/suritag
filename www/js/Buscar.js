

var buscarView  =app.views.create(".view-buscar",{
  on:{
      pageInit:function () {
 console.log("Init");
LoadSites();
ActionsDefault();



        }
  }

});




function LoadSites() { 
  var datos = JSON.parse(  localStorage.getItem("DataUser") );
var ref = db.ref("Usuarios/"+datos.idUsuario+"/history");


ref.once("value",function (snapshot) {

if(snapshot.val() == null){

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


}else{

  ref.on("child_added",function (snapshot) {

var valueHistory  = snapshot.val();
var keyItem = snapshot.key;
console.log(valueHistory);


$$("#listaItemsSearch").append(` <li>
<div id="`+keyItem+`" class="item-content">
  <div class="item-media"> <img src='`+valueHistory.icon+`' width='24'  height='24' >  </div>
  <div class="item-inner">
    <div class="item-title">`+valueHistory.namePlace+`</div>
    <!--<div class="item-after">CEO</div> -->
  </div>
</div>
</li>`);

$$("#"+keyItem).click(function (evt) {
  
alert(""+valueHistory.namePlace);
window.location = "./SearchSite.html?sitioName="+valueHistory.namePlace+"&type=filter";


});



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


  
  });





}



  });

 }



 function ActionsDefault() {

$$(".item-positicionP").click(function (evt) {
  window.location = "./SearchSite.html?type=All";

  });
  
  $$(".item-restaurantes").click(function (evt) {
  window.location = "./SearchSite.html?type=RES";
    
      });
   
      $$(".item-bares").click(function (evt) {
        window.location = "./SearchSite.html?type=BAR";
        
          });
          
          $$(".item-discotecas").click(function (evt) {
            window.location = "./SearchSite.html?type=DISCO";
            
              });
              
              $$(".item-hoteles").click(function (evt) {
                window.location = "./SearchSite.html?type=HOTELES";
                
                });
                  
                    






   }