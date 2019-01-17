
 var localDatabase ;
 //console.log(localDatabase);
 //ObtenerPublicaciones(localDatabase);
 //CreateTables(localDatabase);
 //InsertardatoPrueba(localDatabase);


 document.addEventListener('deviceready', function() {
    localDatabase = window.sqlitePlugin.openDatabase({
      name: 'suritagApp.db',
      location: 'default',
    });

    CreateTableLike(localDatabase);
    CreateTablePublicacion(localDatabase);
    
       CreateTableComents(localDatabase);



  });

function CreateDb() { 

   var db = null;
    var version = 1.0;
    var dbName = "suritagApp";
    var dbDisplayName = "suritagApp";
    var dbSize =2 * 1024 * 1024;

  //  var databaseSync = null;

    if (window.openDatabase) {

        db =openDatabase(dbName, version, dbDisplayName, dbSize);
       
    }else{
        console.log("error");
    }
 



return db;
 }



function CreateTablePublicacion(database) { 
 //console.log(database);

    database.transaction(function(t) 
    {
  t.executeSql(
   `CREATE TABLE IF NOT EXISTS 
   publicaciones(
       key TEXT PRIMARY KEY,
     created VARCHAR(20), 
     dateVARCHAR(20),
     text VARCHAR(200),
     name VARCHAR(100),
     img VARCHAR(200),
     imagenUsuario VARCHAR(200),
     peopleId VARCHAR(15),
     placeId VARCHAR(15),
     placeName VARCHAR(200)
)


`, [],function(transaction,resul){
    alert("success:: "+JSON.stringify(resul));
},function (transaction,error) { 
    error("errror:: "+JSON.stringify(error.message));
 });  


    }, function() 
    {
      alert("SQL statements were executed successfully.");
    });




 }
 function CreateTableLike(database) { 
  //  console.log(database);
   
       database.transaction(function(t) 
       {
   
   t.executeSql(`
   CREATE TABLE IF NOT EXISTS 
   likes(
       keyLike TEXT PRIMARY KEY,
       idPublicacion VARCHAR(200)
      
   )
   
   `,[],function (transaction,resul) {
       alert("success like table");
     });

   
       }, function() 
       {
       //   alert("SQL statements were executed successfully.");
       });
   
   
   
   
    }
    function CreateTableComents(database) { 
      //  console.log(database);
       
           database.transaction(function(t) 
           {
       
     
    
       t.executeSql(`
       CREATE TABLE IF NOT EXISTS 
       Coments (
           keyComent TEXT PRIMARY KEY,
           idPublicacion VARCHAR(200)
          )
       
       `,[]); 
       
       
       
           }, function() 
           {
          //    alert("SQL statements were executed successfully.");
           });
       
       
       
       
        }



function PublicacionModel() { 


var obj = {
 created:new Date(),
 nombrePersona:"",
 fechaPublicacion:"",
 imgPublicacion:"",
 imagenUsuario:"",
 peopleId:"",
 text:"",
 type:"",
 placeName:"",
 sharedPeopleId:"",
 key:""


     
}

return obj;

 }

 function AmigosModel() {  



 }



 function SavePublicacionDBQuery(database,object) { 
//console.log(database);

try{
    database.transaction(function (sqlTransactionSync) { 
        sqlTransactionSync.executeSql("INSERT INTO publicaciones (key, created, date,name,img,peopleId,placeName,text,imagenUsuario) VALUES(?,?,?,?,?,?,?,?,?)"
      ,[object.key,"",object.fechaPublicacion,object.nombrePersona,object.imgPublicacion,object.peopleId,object.placeName,object.text,object.imagenUsuario]  );
    
     });
     console.log("No error");
}catch(error){
console.log(error.message);
}

  }

  function SaveLikesPublicacion(database,object) {
      
    database.transaction(function(sqlTransactionSync) 
{
sqlTransactionSync.executeSql(`
    INSERT INTO likes(keyLike,idPublicacion) VALUES(?,?)
    `,[object.key,object.idPublicacion]);



});



  }
  function SaveComentsPublicacion(database,object) {
      
    database.transaction(function(sqlTransactionSync) 
{
    var sqlResultSet = sqlTransactionSync.executeSql(`
    INSERT INTO Coments (keyComent,idPublicacion) VALUES(?,?)
    `,[object.key,object.idPublicacion]);



}, function() 
{
 //  alert("SQL statements were executed successfully.");
},function (error) { 
    console.log(error);
 });



  }
function ObtenerPublicaciones(database){
 
    database.transaction(function(sqlTransactionSync) 
{
    var sqlResultSet = sqlTransactionSync.executeSql(`
   SELECT * FROM publicaciones ORDER BY rowid DESC LIMIT 10
    `,[], function(sqlTransaction, sqlResultSet) {
     console.log(sqlResultSet);

     for(var i = 0; i< sqlResultSet.rows.length;i++){
var element =  sqlResultSet.rows.item(i);

$$("#social-Content").prepend(` <div id="publicacion`+element.key+`" class="card demo-facebook-card">
<div class="card-header">
  <div class="demo-facebook-avatar"><img src="`+element.imagenUsuario+`" width="34" height="34"/></div>
  <div   onclick="NoNetwork()" class="demo-facebook-name">`+element.name+`</div>
  <div class="demo-facebook-date">`+element.placeName+`</div>
</div>
<div class="card-content card-content-padding">
  <p>`+element.text+`</p>
  <img id='imgPublicacion`+element.key+`' src="`+element.img+`" width="100%"/>
  <p class="likes" id='likes`+element.key+`' onclick="NoNetwork()"   >Me gusta: 0 &nbsp;&nbsp; Comentarios: 0 &nbsp;&nbsp; compartido: 0  </p>
</div>
<div class="card-footer"><a href="#" onclick="NoNetwork()"  id='btnMegusta`+element.key+`'   class="link">Me gusta</a><a onclick="NoNetwork()"   id="btnComentar`+element.key+`"  href="#"    class="link">Comentar</a><a href="#"   onclick="NoNetwork()"   id="btncompartir`+element.key+`"  class="link">compartir</a></div>
</div>`);



     }
 
     
     





    });


//return res;
});


}
function NoNetwork() {  
alert("No conectado");

}


function ObtenerLikes(database,publicacionId) { 

    database.transaction(function (sqlTransaction) {

var resultSet = sqlTransaction.executeSql("SELECT COUNT(*) as totalItems from likes where idpublicacion = ?",[publicacionId],function (sqlTransaction, sqlResultSet) {  
console.log(sqlResultSet);

});
console.log(resultSet);


      });

 }
function ObtenerComentarios(database,publicacionId) { 

    database.transaction(function (sqlTransaction) {

        var resultSet = sqlTransaction.executeSql("SELECT COUNT(*) as totalItems from Coments where idpublicacion = ?",[publicacionId],function (sqlTransaction, sqlResultSet) {  
        console.log(sqlResultSet);
        
        });
        console.log(resultSet);
        
        
              });

 }
function ObtenerCompartidos(database) {  }





  function InsertardatoPrueba(db){
var obj = PublicacionModel();

obj.key = "keyA";
obj.nombrePersona= "manuel";
obj.imgPublicacion= "images";
obj.peopleId= "1";
obj.fechaPublicacion = "2018-01-05";
obj.placeName = "la boquilla";

SavePublicacionDBQuery(db,obj);

SaveLikesPublicacion(db,{key:"keyPropio1",idPublicacion:"keyA"});
SaveComentsPublicacion(db,{key:"keyPropio1",idPublicacion:"keyA"});

  }

  ObtenerLikes(localDatabase,"-LTcGXa9W_t0Ilr5H84s");