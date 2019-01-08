
var loginView = app.views.create('.view-principal',{
    on:{
       pageInit:function () { 
  // ActionsMenu();
  ActionsItems();
 
     console.log("init");
        }
   
   }
   
   });


   $$('.panel-left').on('panel:open', function () {
    console.log('Panel left: open');
  });
  

  //Items


  
  function ActionsItems() {
    $$("#baresItem").click(function (evt) {

          window.location = "SearchSite.html?type=BAR";
      });
      $$("#discotecasItem").click(function (evt) {
        window.location = "SearchSite.html?type=DISCO";
      
      });
      $$("#restaurantesItem").click(function (evt) {
        window.location = "SearchSite.html?type=RES";
      
      });
      $$("#hotelesItem").click(function (evt) {
        window.location = "SearchSite.html?type=HOTELES";
      
      });
    
  }