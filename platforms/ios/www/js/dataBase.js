
 var localDatabase =   CreateDb();
 //console.log(localDatabase);
 ObtenerPublicaciones(localDatabase);
 //CreateTables(localDatabase);
 //InsertardatoPrueba(localDatabase);
function CreateDb() { 

   var db = null;
    var version = 1.0;
    var dbName = "suritagApp";
    var dbDisplayName = "suritagApp";
    var dbSize =2 * 1024 * 1024;

  //  var databaseSync = null;

    if (window.openDatabase) {

        db =openDatabase(dbName, version, dbDisplayName, dbSize);
        CreateTableLike(db);
        CreateTablePublicacion(db);
        
           CreateTableComents(db);
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
     created TEXT, 
     date TEXT,
     name TEXT,
     img TEXT,
     peopleId TEXT,
     placeId TEXT,
     placeName TEXT
)


`, [],function(transaction,resul){
    console.log("success:: "+JSON.stringify(resul));
},function (transaction,error) { 
    console.log("errror:: "+JSON.stringify(error));
 });  


    }, function() 
    {
     //  alert("SQL statements were executed successfully.");
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
       idPublicacion TEXT
      
   )
   
   `,[],function (transaction,resul) {
       console.log("success like table");
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
           idPublicacion TEXT
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
console.log(database);

try{
    database.transaction(function (sqlTransactionSync) { 
        sqlTransactionSync.executeSql("INSERT INTO publicaciones (key, created, date,name,img,peopleId,placeName) VALUES(?,?,?,?,?,?,?)"
      ,[object.key,"",object.fechaPublicacion,object.nombrePersona,object.imgPublicacion,object.peopleId,object.placeName]  );
    
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

    });



});


}



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