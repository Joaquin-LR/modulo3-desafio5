// Se le dirá "descripciones" a la totalidad de datos de las tareas (el arreglo)
// Entonces una descripción muestra la id de la tarea, su nombre (lo ingresado en input), el estado (realizada o no), y el botón para eliminarla

const descripciones = [ // Se tienen 3 tareas iniciales
    { id: Date.now(), nombre: "Sumergirme en mi propia miseria", estado: false },
    { id: Date.now() + 1, nombre: "Contemplar el abismo", estado: false },
    { id: Date.now() + 2, nombre: "Solucionar la hambruna mundial sin decírselo a nadie", estado: false }
];

// Se trae lo de HTML
const botonAgregar = document.querySelector(".boton-agregar");
const descripcion = document.querySelector(".descripcion");
const listaTareas = document.getElementById("lista-tareas");
const totalSpan = document.querySelector(".total-span");
const realizadasSpan = document.querySelector(".realizadas-span");

const actualizarLista = () => { // Se tiene esta arrow function para actualizar la lista tras las distintas funciones y al final del código
    let template = "";
    descripciones.forEach((tarea, index) => { // Aquí se van incluyendo las tareas
        template += `
            <tr>
                <td class="id-generada" style="color: ${tarea.estado ? 'green' : 'black'};"><p>${tarea.id}</p></td>
                <td class="tarea-ingresada" style="color: ${tarea.estado ? 'green' : 'black'}; max-width: 600px;">${tarea.nombre}</td>
                <td><input type="checkbox" ${tarea.estado ? 'checked' : ''} onclick="cambiarEstado(${index})"></td>
                <td><img src="./assets/img/ekis.png" class="eliminar" onclick="eliminarTarea(${index})" style="cursor: pointer; width: 20px; height: 20px;"></td>
            </tr>
        `;
    });
    listaTareas.innerHTML = template; // Se llevan las tareas al tbody del HTML

    // Contadores de tareas totales y de tareas realizadas
    totalSpan.innerHTML = " " + descripciones.length;
    realizadasSpan.innerHTML = " " + descripciones.filter(tarea => tarea.estado).length;

    // Se limpia el input
    descripcion.value = "";
};

// Esta función simplemente se encarga de eliminar ESA tarea respectivamente deseada
const eliminarTarea = (index) => {
    descripciones.splice(index, 1);
    actualizarLista();
};

// Aquí cambiamos el estado: no realizada -> false | realizada -> true y viceversa
const cambiarEstado = (index) => {
    descripciones[index].estado = !descripciones[index].estado;
    actualizarLista();
};

// Lo deseado es agregar nuevas tareas al presionar el botón "agregar"
botonAgregar.addEventListener("click", () => {
    if (descripcion.value.trim() !== "") { // pero esta condición es importante (hay que ingresar algo)
        descripcion.style.border = "solid 2px rgb(190, 190, 190)";
        const nuevaTarea = {  // Eso se agrega respectivamente...
            id: Date.now(),
            nombre: descripcion.value,
            estado: false
        };
        descripciones.push(nuevaTarea); // ... Al arreglo descripciones
        actualizarLista();
    } else { // En caso contrario, se genera el típico borde rojo en el input, y no efectúa ingreso
        descripcion.style.border = "solid 2px red";
    }
});

actualizarLista();

