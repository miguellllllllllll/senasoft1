// script.js
const piezasIzquierdo = document.querySelectorAll('#panel-izquierdo .pieza');
const piezasDerecho = document.querySelectorAll('#panel-derecho .pieza-destino');

// Función para arrastrar y soltar
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    const target = event.target;

    // Verificar si la pieza coincide con la imagen de fondo (implementación simplificada)
    if (/* condición para verificar la coincidencia */) {
        target.appendChild(document.getElementById(data));
    } else {
        // Devolver la pieza a su posición original
    }
}

// Función para reorganizar las piezas aleatoriamente
function mezclarPiezas() {
    // Implementar la lógica para mezclar las piezas
}

// Agregar los event listeners
piezasIzquierdo.forEach(pieza => {
    pieza.addEventListener('dragstart', dragStart);
});

piezasDerecho.forEach(pieza => {
    pieza.addEventListener('dragover', allowDrop);
    pieza.addEventListener('drop', drop);
});

// Mezclar las piezas al cargar la página
mezclarPiezas();
