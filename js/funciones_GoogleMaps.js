function mostrarTemperaturas(){
		var ciudad=document.getElementById("ciudad").value;//Coge el valor de lo que seleccione en el select
		var url="http://api.openweathermap.org/data/2.5/weather?q="+ciudad+"&units=metric&appid=57703a7a9ab7b873a99116a3ea379748";
		var peticion_http=new XMLHttpRequest();
		peticion_http.onreadystatechange=function()//Lo que se queda esperando la respuesta
		{
			if(this.readyState==4 && this.status==200)
			{
				tratarRespuesta(this.responseText);
				console.log(this.responseText);
			}
		};
		peticion_http.open("GET",url,true);
		peticion_http.send();
}
function tratarRespuesta(texto_respuesta){
	var obj_json=JSON.parse(texto_respuesta);
	var ciudad=obj_json.name;
	var latitud=obj_json.coord.lat;
	var longitud=obj_json.coord.lon;
	var posicion={lat:latitud*1, lng:longitud*1}
	//Creamos el mapa
	var map = new google.maps.Map(document.getElementById('mapa'), {zoom: 12, center: posicion});
	//Creamos en marcador
	var marker = new google.maps.Marker({position: posicion, map: map, title: ciudad});
	//Añadir temperaturas al marcador
	var t_min=obj_json.main.temp_min;
	//t_min_nueva=Math.round(t_min-273);
	var t_max=obj_json.main.temp_max;
	//t_max_nueva=Math.round(t_max-273);
	var texto='<div id="content"><h1 "firstHeading" class="firstHeading">'+ciudad+'</h1><p>T.mínima: '+t_min+'ºC </p><p>T.máxima: '+t_max+'ºC</p></div>';
	var infowindow=new google.maps.InfoWindow({content: texto});
	marker.addListener('click', function() {infowindow.open(map, marker);});

}