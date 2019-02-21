function mostrarTemperaturas(){
		var ciudad=document.getElementById("ciudad").value;//Coge el valor de lo que seleccione en el select
		var url="http://api.openweathermap.org/data/2.5/weather?q="+ciudad+"&appid=57703a7a9ab7b873a99116a3ea379748";
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
	var t_min=obj_json.main.temp_min;
	t_min_nueva=Math.round(t_min-273);
	var t_max=obj_json.main.temp_max;
	t_max_nueva=Math.round(t_max-273);
	//Creamos los elementos de la tabla y lo que vamos a meter dentro
		var tr=document.createElement("tr");
		var td1=document.createElement("td");
		td1.innerHTML=ciudad;
		var td2=document.createElement("td");
		td2.innerHTML=t_min_nueva;
		var td3=document.createElement("td");
		td3.innerHTML=t_max_nueva;
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tabla.appendChild(tr);
	
}