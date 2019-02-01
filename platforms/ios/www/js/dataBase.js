var model = PublicacionModel();


model.nombrePersona = "manuel ";
model.fechaPublicacion= "2007";
model.imagenUsuario="imagen Usuariio";
model.imgPublicacion = "imagen Publicacion";
model.peopleId= "2";
model.type="own";
model.text ="publicacion  reemplazada";
model.placeName="turbana";
model.sharedPeopleId="10";
model.key= "130A";

//GuardarPublicaciones(model);
 model = PublicacionModel();


model.nombrePersona = "francisco ";
model.fechaPublicacion= "20010";
model.imagenUsuario="imagen Usuariio";
model.imgPublicacion = "imagen Publicacion";
model.peopleId= "3";
model.type="own";
model.placeName="turbana";
model.sharedPeopleId="10";
model.key= "131A";
//GuardarPublicaciones(model);


function PublicacionModel() { 


var obj = {
 created:new Date(),
 nombrePersona:"",
 fechaPublicacion:"",
 imgPublicacion:"",
 imagenUsuario:"",
 peopleId:"",
 text:"",
 likes:[],
 coments:[],
 type:"",
 placeName:"",
 sharedPeopleId:"",
 key:""


     
}

return obj;

 }

 function HistoriasModel(){
     var obj = {
     key :"",
     imgUsuarios :"",
     NombreUsuario:""
     


     };

     return obj;
 }

function ObtenerHistorias() { 
    var arrayHistorias = localStorage.getItem("HistoriasSocial");
  if(arrayHistorias !=null){
    arrayHistorias = JSON.parse( arrayHistorias );

    arrayHistorias.forEach(element=>{

        $$(".wr-historia-wrap").append(`  <div id="historyItem`+element.key+`"  onclick="chargeHistory('`+snapshot.key+`','`+nombreUsuario+`')"  class="swiper-slide">
<div style="display: block">
<div id='miHistoria'  >
<img src="`+element.imgUsuarios+`" width="35" height="35"  class="historia-img" >
</div>
<label style="color: #C13008;font-size: 3vw"    >`+element.NombreUsuario+`</label>
</div>
</div>`);


    });



  }


 }


 function GetHistorias() { 
    var arrayHistorias = localStorage.getItem("HistoriasSocial");

 if(arrayHistorias != null){
arrayHistorias = JSON.parse(arrayHistorias);
 arrayHistorias.forEach(element=>{

    $$(".wr-historia-wrap").append(`  <div id="historyItem`+element.key+`"  onclick="NoNetwork()"  class="swiper-slide">
    <div style="display: block">
    <div id='miHistoria'  >
    <img src="`+element.imgUsuarios+`" width="35" height="35"  class="historia-img" >
    </div>
    <label style="color: #C13008;font-size: 3vw"    >`+element.NombreUsuario+`</label>
    </div>
    </div>`);


 });
 }



  }

function GuardarHistoria(objeto) { 
   
     var arrayHistorias = localStorage.getItem("HistoriasSocial");
 if( arrayHistorias == null ){
 arrayHistorias = [];

 arrayHistorias.push(objeto);
 localStorage.setItem("HistoriasSocial",JSON.stringify(arrayHistorias));

 }else{
arrayHistorias = JSON.parse( arrayHistorias );
console.log("elements");
//Cantidad de dastos
if(arrayHistorias.length <=5){
    console.log("menor a 5");
     var status = true;
     var momento = 0;
     var count= 0;

     
  //  arrayHistorias.push(objeto);
    
   // localStorage.setItem("HistoriasSocial",JSON.stringify(arrayHistorias));

   // arrayHistorias = JSON.parse(arrayHistorias);
    arrayHistorias.forEach(element=>{
        console.log();
  if(element.key ==objeto.key ){
      status = false;
      momento =  count;

      console.log("Flase");
 
 
  }else{
     console.log("No Flase");
     
 }
 
 
 count =count+ 1;
 
    });
    
    if(status == false ){
        arrayHistorias[momento] = objeto;
        localStorage.setItem("HistoriasSocial",JSON.stringify(arrayHistorias));
        
     }else{
    
        arrayHistorias.push(objeto);
         localStorage.setItem("HistoriasSocial",JSON.stringify(arrayHistorias));
     
    
     }


    }else{
        console.log("mayor a 5");
        var id = getRandomArbitrary(0,arrayHistorias.length);
        arrayHistorias[id]  = objeto;
        localStorage.setItem("HistoriasSocial",JSON.stringify(arrayHistorias)); 
    }


//end cantidad









 }
      





 }



function GuardarPublicaciones(modelo) { 
var max  = 5
    var  arrayPublicaciones = localStorage.getItem("PublicacionesSocial");


 if(  arrayPublicaciones  == null){


    var publicacion = [];
   publicacion.push(modelo);
   localStorage.setItem("PublicacionesSocial", JSON.stringify(publicacion) );

 
 }else{
arrayPublicaciones = JSON.parse( arrayPublicaciones );

if(arrayPublicaciones.length  <= max){
var countPrint = 0;
   // arrayPublicaciones.push( modelo  );
  
var status= true;
    arrayPublicaciones.forEach(element=>{
        if(element.key == modelo.key   ){
         status = false;
         countPrint = count;
        }else{
            
            
        }
        count = count+ 1;

      });

      if(status == false){
          arrayPublicaciones[countPrint] = model;
          localStorage.setItem("PublicacionesSocial", JSON.stringify(arrayPublicaciones) );

      }else{
        arrayPublicaciones.push( modelo  );  
        localStorage.setItem("PublicacionesSocial", JSON.stringify(arrayPublicaciones) );
      }


    


}else{
var count = 0;
arrayPublicaciones.forEach(element=>{
 if(element.key == modelo.key   ){
    console.log("iguales");
    arrayPublicaciones[count] = modelo;
    localStorage.setItem("PublicacionesSocial", JSON.stringify(arrayPublicaciones) );
 }else{
     console.log("diferentes");
  var aletario =   getRandomArbitrary();
  arrayPublicaciones[aletario] = modelo;
  localStorage.setItem("PublicacionesSocial", JSON.stringify(arrayPublicaciones) );



 }
count = count+ 1;


});




}


 }




 }

function NoNetwork(){
    alert("Cargando datos");
}

 function GetPublicaciones() {
    var  arrayPublicaciones = localStorage.getItem("PublicacionesSocial");
    
     if(arrayPublicaciones == null){


     }else{
         arrayPublicaciones=  JSON.parse( arrayPublicaciones );
           
         arrayPublicaciones.forEach(element =>{

            $$("#social-Content").prepend(` <div id="publicacion`+element.key+`" class="card demo-facebook-card">
            <div class="card-header">
              <div class="demo-facebook-avatar"><img src="`+element.imagenUsuario+`" width="34" height="34"/></div>
              <div   onclick="NoNetwork()" class="demo-facebook-name">`+element.nombrePersona+`</div>
              <div class="demo-facebook-date">`+element.placeName+`</div>
            </div>
            <div class="card-content card-content-padding">
              <p>`+element.text+`</p>
              <img id='imgPublicacion`+element.key+`' src="`+element.imgPublicacion+`" width="100%"/>
              <p class="likes" id='likes`+element.key+`' onclick="NoNetwork()"   >Me gusta: 0 &nbsp;&nbsp; Comentarios: 0 &nbsp;&nbsp; compartido: 0  </p>
            </div>
            <div class="card-footer"><a href="#" onclick="NoNetwork()"  id='btnMegusta`+element.key+`'   class="link">Me gusta</a><a onclick="NoNetwork()"   id="btnComentar`+element.key+`"  href="#"    class="link">Comentar</a><a href="#"   onclick="NoNetwork()"   id="btncompartir`+element.key+`"  class="link">compartir</a></div>
            </div>`);



         });

 




     }


    


  };






/*
function ObtenerPublicaciones(database){
 
    database.transaction(function(sqlTransactionSync) 
{
    var sqlResultSet = sqlTransactionSync.executeSql(`
   SELECT * FROM publicaciones ORDER BY rowid DESC LIMIT 10
    `,[], function(sqlTransaction, sqlResultSet) {
     console.log(sqlResultSet);

     for(var i = 0; i< sqlResultSet.rows.length;i++){
var element =  sqlResultSet.rows.item(i);

 } 
 
     
  
    });


//return res;
});  


} */

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }