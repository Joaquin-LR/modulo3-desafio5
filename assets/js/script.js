const descripciones = [
    { id: Date.now(), nombre: "Sumergirme en mi propia miseria", estado: false },
    { id: Date.now() + 1, nombre: "Contemplar el abismo", estado: false },
    { id: Date.now() + 2, nombre: "Solucionar la hambruna mundial sin decírselo a nadie", estado: false }
];
const botonAgregar = document.querySelector(".boton-agregar");
const descripcion = document.querySelector(".descripcion");
const listaTareas = document.getElementById("lista-tareas");
const totalSpan = document.querySelector(".total-span");
const realizadasSpan = document.querySelector(".realizadas-span");

const actualizarLista = () => {
    let template = "";
    descripciones.forEach((tarea, index) => {
        template += `
            <tr>
                <td class="id-generada" style="color: ${tarea.estado ? 'green' : 'black'};"><p>${tarea.id}</p></td>
                <td class="tarea-ingresada" style="color: ${tarea.estado ? 'green' : 'black'}; max-width: 600px;">${tarea.nombre}</td>
                <td><input type="checkbox" ${tarea.estado ? 'checked' : ''} onclick="cambiarEstado(${index})"></td>
                <td><img src="./assets/img/ekis.png" class="eliminar" onclick="eliminarTarea(${index})" style="cursor: pointer; width: 20px; height: 20px;"></td>
            </tr>
        `;
    });
    listaTareas.innerHTML = template;
    totalSpan.innerHTML = " " + descripciones.length;
    realizadasSpan.innerHTML = " " + descripciones.filter(tarea => tarea.estado).length;
    descripcion.value = "";
};

const eliminarTarea = (index) => {
    descripciones.splice(index, 1);
    actualizarLista();
};

const cambiarEstado = (index) => {
    descripciones[index].estado = !descripciones[index].estado;
    actualizarLista();
};

botonAgregar.addEventListener("click", () => {
    if (descripcion.value.trim() !== "") {
        descripcion.style.border = "solid 2px rgb(190, 190, 190)";
        const nuevaTarea = {
            id: Date.now(),
            nombre: descripcion.value,
            estado: false
        };
        descripciones.push(nuevaTarea);
        actualizarLista();
    } else {
        descripcion.style.border = "solid 2px red";
    }
});

actualizarLista();

