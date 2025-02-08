document.addEventListener("DOMContentLoaded", function () {
    const display = document.querySelector(".display"); // Captura el input de la pantalla
    const botones = document.querySelectorAll(".boton"); // Captura todos los botones

    let operacion = ""; // Guarda la operación actual

    botones.forEach(boton => {
        boton.addEventListener("click", function () {
            const valor = boton.value;

            if (valor === "=") {
                calcularResultado();
            } else if (valor === "CE") {
                limpiarDisplay();
            } else if (valor === "Ra") {
                calcularRaiz();
            } else if (valor === "P") {
                operacion += "**"; // Convierte la potencia en JavaScript
                display.value = operacion;
            } else {
                operacion += valor;
                display.value = operacion;
            }
        });
    });

    function calcularResultado() {
        try {
            display.value = eval(operacion);
            operacion = display.value; // Guarda el resultado para continuar operaciones
        } catch {
            display.value = "No debes ingresar letras";
        }
    }

    function limpiarDisplay() {
        operacion = "";
        display.value = "0";
    }

    function calcularRaiz() {
        display.value = Math.sqrt(eval(operacion)).toFixed(2);
        operacion = display.value;
    }
});
