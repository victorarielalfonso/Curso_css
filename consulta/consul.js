document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("consultaForm");
    const inputX = document.getElementById("x");
    const inputY = document.getElementById("y");
    const inputA = document.getElementById("a");
    const limpiarBtn = document.getElementById("limpiar");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se recargue

        let x = inputX.value.trim().normalize().toLowerCase();
        let y = inputY.value.trim().normalize().toLowerCase();

        console.log(`x: '${x}'`);
        console.log(`y: '${y}'`);

        if (x === y) {
            inputA.value = "Son iguales";
        } else {
            inputA.value = "No son iguales";
        }
    });

    limpiarBtn.addEventListener("click", function () {
        inputX.value = "";
        inputY.value = "";
        inputA.value = "";
    });
});
