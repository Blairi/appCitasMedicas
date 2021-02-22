pagina = 1;

const cita = {
	nombre: '',
	fecha: '',
	hora: '',
	servicios: []
}

document.addEventListener('DOMContentLoaded', function(){
	iniciarApp();
});

function iniciarApp(){
	mostrarServicios();

	//Mostramos la seccion ssegun el tab
	mostrarSeccion();

	//Cambiamos la seccion
	cambiarSeccion();

	//Mostramos resumen
	mostrarResumen();

	//Guardar nombre de la cita
	nombreCita();

	//almacena la fecha de la cita en el bojeto xd
	fechaCita();

	//Deshabilita dias pasados
	desabilitarFechaAnterior();

	//Almacena la hr de cita
	horaCita();
}

function mostrarResumen(){
	//aplicamos destructuring para acceder al objeto
	const {nombre, fecha, hora, servicios} = cita;
	console.log(cita)

	//seleccionar div resumen
	const resumenDiv = document.querySelector('.contenido-resumen');

	while(resumenDiv.firstChild){
		resumenDiv.removeChild(resumenDiv.firstChild);
	}

	//validamos el objeto
	if(Object.values(cita).includes('')){
		const noServicios = document.createElement('P');
		noServicios.textContent = 'Faltan datos de Servicios, hora, fecha o nombre';

		noServicios.classList.add('invalidar-cita', 'alerta', 'error');

		//Agregar a resumen DIV
		resumenDiv.appendChild(noServicios);

		return;
	}


	const headingCita = document.createElement('H3');
	headingCita.textContent = 'Resumen de Cita';
	//mostrar Resumen
	const nombreCita = document.createElement('P');
	nombreCita.innerHTML = `<span>Nombre: </span> ${nombre}`;

	const fechaCita = document.createElement('P');
	fechaCita.innerHTML = `<span>Fecha: </span> ${fecha}`;

	const horaCita = document.createElement('P');
	horaCita.innerHTML = `<span>Hora: </span> ${hora} hrs`;


	const serviciosCita = document.createElement('DIV');
	serviciosCita.classList.add('resumen-servicios');


	const headingServicios = document.createElement('H3');
	headingServicios.textContent = 'Resumen de Servicios';

	serviciosCita.appendChild(headingServicios);

	let cantidad = 0;

	//Valida que el usuario haya elegido servicios
	if(servicios.length === 0){
		//Pinta mensaje de que no ha seleccionado servicios
		const noServicios = document.createElement('P');
		noServicios.textContent = 'No has seleccionado ningun Servicio';

		noServicios.classList.add('invalidar-cita', 'alerta', 'error');
		

		//Agregar a resumen DIV
		resumenDiv.appendChild(noServicios);

		return;
	}else{
		//iterar sobre el arreglo de servicios
		servicios.forEach(servicio => {
			const {nombre, precio} = servicio;
			const contenedorServicio = document.createElement('DIV');
			contenedorServicio.classList.add('contenedor-servicio');

			const textoServicio = document.createElement('P');
			textoServicio.textContent = nombre;

			const precioServicio = document.createElement('P');
			precioServicio.textContent = precio;
			precioServicio.classList.add('precio');

			const totalServicio = precio.split('$');
			// console.log(parseInt(totalServicio[1].trim()));

			cantidad += parseInt(totalServicio[1].trim());
			
			//colocar texto y precio en Div
			contenedorServicio.appendChild(textoServicio);
			contenedorServicio.appendChild(precioServicio);

			serviciosCita.appendChild(contenedorServicio);
		});
	}

	const datosDiv = document.createElement('DIV');
	datosDiv.classList.add('datos-resumen');

	resumenDiv.appendChild(headingCita);


	datosDiv.appendChild(nombreCita);
	datosDiv.appendChild(fechaCita);
	datosDiv.appendChild(horaCita);

	resumenDiv.appendChild(datosDiv);

	resumenDiv.appendChild(serviciosCita);

	const cantidadPagar = document.createElement('P');
	cantidadPagar.classList.add('total');
	cantidadPagar.innerHTML = `<span>Total a Pagar: </span>$${cantidad}`;

	resumenDiv.appendChild(cantidadPagar);
}

function fechaCita(){
	const fechaInput = document.querySelector('#fecha');
	fechaInput.addEventListener('input', e =>{
		const dia = new Date(e.target.value).getUTCDay();

		if([0, 6].includes(dia)){
			e.preventDefault;
			fechaInput.value = '';
			mostrarAlerta('Fines de semana no premitidos', 'error');
		}else{
			cita.fecha = fechaInput.value;
			console.log(cita)
		}
	})
}

function desabilitarFechaAnterior(){
	const inputFecha = document.querySelector('#fecha');

	const fechaAhora = new Date();
	const year = fechaAhora.getFullYear();
	const mes = fechaAhora.getMonth() + 1;
	const dia = fechaAhora.getDate() + 1;


	//formato deseado año-mes-dia

	//Modifica formato segun los digitos del mes
	if( mes >= 10){
		//Modifica el formato segun si el dia tiene 2 digitos
		if( dia >=10 ){
			const fechaDeshabilitar = `${year}-${mes}-${dia}`;
			inputFecha.min = fechaDeshabilitar;
			console.log(inputFecha.min);
		}else{
			//Modifica el formato segun si el dia tiene 1 digito
			const fechaDeshabilitar = `${year}-${mes}-0${dia}`;
			inputFecha.min = fechaDeshabilitar;
			console.log(inputFecha.min);
		}
	}else{
		//Modifica el formato segun si el dia tiene 1 digito
		if( dia >=10 ){
			const fechaDeshabilitar = `${year}-0${mes}-${dia}`;
			inputFecha.min = fechaDeshabilitar;
			console.log(inputFecha.min);
		}else{
			//Modifica el formato segun si el dia tiene 2 digitos
			const fechaDeshabilitar = `${year}-0${mes}-0${dia}`;
			inputFecha.min = fechaDeshabilitar;
			console.log(inputFecha.min);
		}
	}

}


function horaCita(){
	const inputHora = document.querySelector('#hora');
	inputHora.addEventListener('input', e => {


		const horaCita = e.target.value;
		const hora = horaCita.split(':');

		if(hora[0] < 10 || hora[0] > 18){
			mostrarAlerta('Hora no valida', 'error');
			setTimeout(()=>{
				inputHora.value = '';
			}, 3000)
		}else{

			cita.hora = horaCita;
	
			console.log(cita);
		}
	})
}



function nombreCita(){
	const nombreInput = document.querySelector('#nombre');

	nombreInput.addEventListener('input', e => {
		const nombreTexto = e.target.value.trim();
		//validar nombre lleno
		if(nombreTexto === '' || nombreTexto.length < 3){
			mostrarAlerta('nombre invalido', 'error');
		}else{

			const alerta = document.querySelector('.alerta');
			if(alerta){
				alerta.remove();
			}
			cita.nombre = nombreTexto;

		}
	})
}

function mostrarAlerta(mensaje, tipo){
	//Si hay alerta previa no crear nd
	const alertaPrevia = document.querySelector('.alerta');
	if(alertaPrevia){
		return;
	}
	const alerta = document.createElement('DIV');
	alerta.textContent = mensaje;
	alerta.classList.add('alerta');
	if(tipo === 'error'){
		alerta.classList.add('error');
	}

	//insertar en el HTML
	const formulario = document.querySelector('.formulario');
	formulario.appendChild(alerta);

	//Eliminar alerte despues de 3 seg
	setTimeout(()=>{
		alerta.remove();
	},3000)
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

			//Seleccionar servicio--Llamamos a la funcion
			servicioDiv.onclick = seleccionarServicio;

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


function seleccionarServicio(e){
	let elemento;
	//forzamos que el click sea al DIV
	if(e.target.tagName === 'P'){
		//selecciona el padre de la etiqueta P
		elemento = e.target.parentElement;
	}else{
		elemento = e.target;
	}

	//eliminar clase de seleccionado en caso de que la tenga
	if(elemento.classList.contains('seleccionado')){
		elemento.classList.remove('seleccionado');

		//Obtenemos el id del DIV para pasarlo a la funcion de eliminar
		const id = parseInt(elemento.dataset.idServicio);


		//le pasamos el id del servicio deseleccionado a la funcion de eliminar
		eliminarServicio(id);


	}else{
		elemento.classList.add('seleccionado');

		//creamos el servicio
		const servicioObj = {
			//Definimos el id en el objeto con referencia al atributo data del DIV
			id: parseInt(elemento.dataset.idServicio),
			//Seleccionamos el nombre del servicio con el primer hijo del DIV
			nombre: elemento.firstElementChild.textContent,
			//Seleccionamos el precio del servicio
			precio: elemento.firstElementChild.nextElementSibling.textContent
		}
		// console.log(servicioObj)

		//Le pasamos el objeto de servicio a la funcion de agregar
		agregarServicio(servicioObj);
	}
}

function agregarServicio(servicioObj){

	//Accede al arreglo servicios
	const {servicios} = cita;

	//Creamos una copia del arreglo servicio y le añadimos el nuevo objeto del servicio
	cita.servicios = [...servicios, servicioObj];

	console.log(cita)
}

function eliminarServicio(id){
	//Extraemos el arreglo de servicios del objeto cita
	const {servicios} = cita;

	//Entramos al objeto y en el arreglo y filtramos los servicios diferentes al id que eliminamos
	cita.servicios = servicios.filter(servicio => servicio.id !== id);

	console.log(cita)
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



			mostrarResumen();
		});
	});
}
