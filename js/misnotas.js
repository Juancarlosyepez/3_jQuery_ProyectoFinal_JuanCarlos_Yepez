$(document).ready(function(){

	window.onload = micontador();
				
		$("#registro").click(function(){				
			var id=$("#id").val();		
			var codigo=$("#codigo").val();
			var nombre=$("#nombre").val();
			var nota=$("#nota").val();

			var nuevoregistro={
				id:id,
				codigo:codigo,
				nombre:nombre,
				nota:nota
			};

			localStorage.setItem(id,JSON.stringify(nuevoregistro));
			micontador();
			
			
			listarNotas();
			restablecer();
		});

		listarNotas();

		function restablecer(){
			$("#id").val(contador);
			$("#codigo").val("");
			$("#nombre").val("");
			$("#nota").val("");
		}

		$("#prom").click(function(){

			calcularNota();
		});

		$("#mayor").click(function(){

			NotaMayor();
		});

		$("#menor").click(function(){
			NotaMenor();
		})

});	

function micontador(){
		var contador;
		var cntMatriz=[];
		var max=0;
        		
		if(localStorage.length>0){
			for (i = 0; i < localStorage.length; i++) {
        	var clave = localStorage.key(i);
    		var contadorid =$.parseJSON(localStorage.getItem(clave));

          	cntMatriz[i]=contadorid.id;
          	
	        }
	         
	          max=Math.max.apply(null,cntMatriz);	       	
	          contador=max+1;
	        	
		}else{
			
			contador=10;
		}		

		$("#id").val(contador);
				
		console.log("contador"+contador);

		}

function editarRegistro(id){
	
	var nuevoregistro;
		
	  for (var i = 0; i<localStorage.length; i++) {
	  	var clave=localStorage.key(i);

	  	if(clave==id){
	  		nuevoregistro=$.parseJSON(localStorage.getItem(clave));
	  		
	  		$("#id").val(nuevoregistro.id);
	  		$("#codigo").val(nuevoregistro.codigo);
	  		$("#nombre").val(nuevoregistro.nombre);
	  		$("#nota").val(nuevoregistro.nota);
	  		 		
	  	}
	} 
}


function listarNotas(){
		var cuerpotabla=$("#tablaalumno");
      	var tablallena="";

		for (var i = 0; i<localStorage.length; i++) {
			var clave  = localStorage.key(i);
			var nuevoregistro =$.parseJSON(localStorage.getItem(clave));

			 tablallena += '<tr>';
			 tablallena += '<td hidden="true">'+nuevoregistro.id+'</td>';
			 tablallena += '<td>'+nuevoregistro.codigo+'</td>';
			 tablallena += '<td>'+nuevoregistro.nombre+'</td>';
			 tablallena += '<td>'+nuevoregistro.nota+'</td>';
			 tablallena += '<td><button id="editar" onclick="editarRegistro(\''+nuevoregistro.id+'\');">Editar</button></td>';
			 tablallena += '<td><button id="eliminar" onclick="eliminarRegistro(\''+nuevoregistro.id+'\');">Eliminar</button></td>';
			 tablallena += '</tr>';
		}

		tablallena+='</table>';
		$(cuerpotabla).html(tablallena);
		

	}


	function eliminarRegistro(id){
			localStorage.removeItem(id);
			listarNotas();
			micontador();
			
		}

function calcularNota(){
    var suma=0;

    for (i = 0; i < localStorage.length; i++) {
    	var clave = localStorage.key(i);
    	var sumanota =$.parseJSON(localStorage.getItem(clave));
      suma+=parseInt(sumanota.nota);

    }
    $("#resultado").html("Nota Promedio="+suma/i);
	alert("Nota Promedio="+suma/i);
    }


    function NotaMayor(){
        var myMatriz=[];
        var my=0;
        for (i = 0; i < localStorage.length; i++) {
        	var clave = localStorage.key(i);
    		var mayornota =$.parseJSON(localStorage.getItem(clave));

          myMatriz[i]=mayornota.nota;
        }
         
         my=Math.max.apply(null,myMatriz);

        $("#resultado").html("Nota Mayor="+my);
	alert("Nota Mayor="+my);
        
    }

function NotaMenor(){
        var mnMatriz=[];
        var mn=0;
        for (i = 0; i < localStorage.length; i++) {
        	var clave = localStorage.key(i);
    		var menornota =$.parseJSON(localStorage.getItem(clave));

          mnMatriz[i]=menornota.nota;
        }
        
        mn=Math.min.apply(null,mnMatriz);
        $("#resultado").html("Nota Menor="+mn);
	alert("Nota Menor="+mn);
    }