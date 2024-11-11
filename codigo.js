console.log("MM21011 - ULISES ISMAEL MEJIA MORALES")
/*
MM21011
ULISES ISMAEL MEJIA MORALES
*/
var fila="<tr><td class='id'></td><td class='foto'></td><td class='price'></td><td class='title'></td><td class='description'></td><td class='category'></td><td class='accion'></td></tr>";
	 var productos=null;
  function codigoCat(catstr) {
	var code="null";
	switch(catstr) {
		case "electronicos":code="c1";break;
	    case "joyeria":code="c2";break;
		case "caballeros":code="c3";break;
		case "damas":code="c4";break;
	}
	return code;
}   
	  var orden=0;
	  
	  
	function listarProductos(productos) {
	  var precio=document.getElementById("price"); 
	  precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
	  var num=productos.length;
	  var listado=document.getElementById("listado");
	  var ids,titles,prices,descriptions,categories,fotos;
	  var tbody=document.getElementById("tbody"),nfila=0;
	  tbody.innerHTML="";
	  var catcode;
	  for(i=0;i<num;i++) tbody.innerHTML+=fila;
	  var tr; 
	  ids=document.getElementsByClassName("id");
	  titles=document.getElementsByClassName("title");
	  descriptions=document.getElementsByClassName("description");
	  categories=document.getElementsByClassName("category");   
	  fotos=document.getElementsByClassName("foto");   
	  prices=document.getElementsByClassName("price");   
	  accion = document.getElementsByClassName("accion");
	  if(orden===0) {orden=-1;precio.innerHTML="Precio"}
	  else
	     if(orden==1) {ordenarAsc(productos,"price");precio.innerHTML="Precio A";precio.style.color="darkgreen"}
	     else 
	       if(orden==-1) {ordenarDesc(productos,"price");precio.innerHTML="Precio D";precio.style.color="blue"}
	
		  
	  	  listado.style.display="block";
	  for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
		titles[nfila].innerHTML=productos[nfila].title;
		descriptions[nfila].innerHTML=productos[nfila].description;
		categories[nfila].innerHTML=productos[nfila].category;
		catcode=codigoCat(productos[nfila].category);
		tr=categories[nfila].parentElement;
		tr.setAttribute("class",catcode);
		prices[nfila].innerHTML="$"+productos[nfila].price;
		fotos[nfila].innerHTML="<img src='"+productos[nfila].image+"'>";
		fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
		accion[nfila].innerHTML= `<button type="button"  data-value="${productos[nfila].id}" onclick=eliminarProducto(this)>Eliminar</button>`
		}
	}

function obtenerProductos() {
	  fetch('https://api-generator.retool.com/xrnwgq/productos')
            .then(res=>res.json())
            .then(data=>{
				productos=data;
				productos.forEach(
					function(producto){
						producto.price = parseFloat(producto.price)
					});
					listarProductos(data)
			})
}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}

const agregarProducto = async() =>{
	const titulo = document.getElementById('titulo')
	const precioProducto = document.getElementById('precioProducto')
	const descripcion = document.getElementById('descripcion')
	const imagen = document.getElementById('imagen')
	const categoria = document.getElementById('categoria')

	const data = {
		"image": imagen.value,
		"price": precioProducto.value,
		"title": titulo.value,
		"category": categoria.value,
		"description": descripcion.value
	}
	const response = await fetch('https://api-generator.retool.com/xrnwgq/productos',{
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Accept': 'application/json',
			'Content-type': 'application/json; charset=UTF-8'
		}
	})
	if(response.status === 500)
		alert('Error Al Registrar El Producto')
	else 
		alert('Producto Registrado')
	
	window.location.reload();
	limpiarCampos();
}

const eliminarProducto = async(button) => {
	const id = button.getAttribute("data-value")
    const response = await fetch('https://api-generator.retool.com/xrnwgq/productos/'+id,{
    	method: 'DELETE'
	})
	if(response.status === 200)
		alert('Producto Eliminado')
	else
		alert('Error Al Elminar Producto')
	
		window.location.reload();
}

const limpiarCampos = () =>{
	const titulo = document.getElementById('titulo')
	const precioProducto = document.getElementById('precioProducto')
	const descripcion = document.getElementById('descripcion')
	const imagen = document.getElementById('imagen')
	const categoria = document.getElementById('categoria')

	titulo.value = '';
	precioProducto.value = '';
	descripcion.value = '';
	imagen.value = '';
	categoria.value = '';
}