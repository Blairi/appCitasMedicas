pagina = 1;

document.addEventListener('DOMContentLoaded', function(){
	iniciarApp();
});

function iniciarApp(){
	mostrarServicios();

	//Mostramos la seccion ssegun el tab
	mostrarSeccion();

	//Cambiamos la seccion
	cambiarSeccion();
}



async function mostrarServicios(){
	try{
		const resultado = await fetch('./servicios.json');
		const db = await resultado.json();

		const {servicios} = db;

		//Generar Servicios
		servicios.forEach(servicio => {
			//Extraemos los campos del json
			const {id, nombre, precio} = servicio;

			//Contruir HTML

			//Generar nombre de servicio
			//Creamos etiqueta P
			const nombreServicio = document.createElement('P');
			//Inyectamos el valor nombre en la etiqueta
			nombreServicio.textContent = nombre;
			//Añadimos clase al P
			nombreServicio.classList.add('nombre-servicio');

			//Generar precio servicio
			//Creamos etiqueta P
			const precioServicio = document.createElement('P');
			//Inyectamos el valor precio en la etiqueta
			precioServicio.textContent = '$ ' + precio;
			//Añadimos clase al P
			precioServicio.classList.add('precio-servicio');

			//Generar div
			//Creamos etiqueta DIV
			const servicioDiv = document.createElement('DIV');
			//Añadimos la clase servicio a todos los DIV
			servicioDiv.classList.add('servicio');
			//Inyectamos el dataset ID para seleccionarlo
			servicioDiv.dataset.idServicio = id;

			//inyectar precio y servicio al DIV
			servicioDiv.appendChild(nombreServicio);
			servicioDiv.appendChild(precioServicio);

			//Inyecarle todo al HTML
			document.querySelector('#servicios').appendChild(servicioDiv);
		});

	}catch(error){
		console.log(error);
	}
}




function mostrarSeccion(){

	//guarda la seccion anterior
	const seccionAnterior = document.querySelector('.mostrar-seccion');
	//Comprueba si la seccionAnterior existe para quitarle la clase
	if(seccionAnterior){
		//si existe elimina la clase de mostrar-seccion
		seccionAnterior.classList.remove('mostrar-seccion');
	}

	//Selecciona la seccion Actual
	const seccionActual = document.querySelector(`#paso-${pagina}`);
	//Agrega la clase para mostrarla
	seccionActual.classList.add('mostrar-seccion');

	//TABS

	//Guarda el tab anterior
	const tabAnterior = document.querySelector('.tabs .actual');
	//Comprueba si el tabAnterior existe para quitarle la clase
	if(tabAnterior){
		//Si existe elimina la clase del tab anterior
		tabAnterior.classList.remove('actual');
	}
	

	//RESALTAR TAB


	//Selecciona el tab actual
	const tab = document.querySelector(`[data-paso="${pagina}"]`);
	//Añade clase para resaltar tab actual
	tab.classList.add('actual');
}



function cambiarSeccion(){
	const enlaces = document.querySelectorAll('.tabs button');
	//iteramos para acceder a todos los tabs
	enlaces.forEach(enlace => {
		//añadimos evento para el click en el tab
		enlace.addEventListener('click', e => {
			e.preventDefault();
			//asignamos el numero de pagina segun el tab presionado
			pagina = parseInt(e.target.dataset.paso);

			//Llamar la funcion mostar seccion
			mostrarSeccion();
		});
	});
}