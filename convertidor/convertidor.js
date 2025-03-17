document.addEventListener("DOMContentLoaded", function () {
    const limpiarBtn = document.getElementById("limpiar");
    const convertirBtn = document.getElementById("convertir");
    const textArea = document.getElementById("texto");

    // Función para limpiar el textarea
    limpiarBtn.addEventListener("click", function () {
        textArea.value = "";
    });

    // Función para convertir a mayúsculas
    convertirBtn.addEventListener("click", function () {
        textArea.value = textArea.value.toUpperCase();
    });
});
