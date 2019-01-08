


app.views.create(".view-detalle-oferta",{
    on:{
        pageInit:function () {
 var oferta =  JSON.parse(  localStorage.getItem("ofertaItem") );

 $$(".title").text(oferta.TituloOferta);  
 $$("#titulo").text(oferta.TituloOferta);   
 $$("#descripcionOfet").text(oferta.DescripcionOferta); 
 $$("#valorOfer").text("$ "+oferta.DescuentoOfertas);  
 $$("#fecha").text(oferta.FechaValidaOferta);
 $$("#imagenOfer").attr("src",oferta.ImagenOferta);

 $$("#imagenOfer").attr("width","300");
$$("#imagenOfer").attr("height","200");


$$("#clickAplicar").click(function (evt) {
evt.preventDefault();

  });


          }
    }
});