document.addEventListener("DOMContentLoaded", function () {
    const limpiarBtn = document.getElementById("limpiar");
    const convertirBtn = document.getElementById("convertir");
    const copiarBtn = document.getElementById("copiar");
    const textArea = document.getElementById("texto");
    
    //funtion de limpiar
    limpiarBtn.addEventListener("click", function () {
        textArea.value ="";
    });

    // Función para convertir a mayúsculas
    convertirBtn.addEventListener("click", function () {
        textArea.value = textArea.value.toUpperCase();
    });
    // Funcion copiar
   /* copiarBtn.addEventListener("click", function(){
        const texto = textArea.value;
        navigator.clipboard.writeText(texto).then(()=>{
            alert("Texto copiado!");})
            .catch(err =>{
                alert("error" +err)   
            })
    }); */
    copiarBtn.addEventListener("click", function(){
        const texto = textArea.value.trim(); // Eliminar espacios en blanco
        if (texto === "") {
            popup.textContent = "No hay texto para copiar.";  // Mostrar mensaje
            popup.style.backgroundColor = "#f44336"; // Color rojo para error
        } else {
            navigator.clipboard.writeText(texto)
                .then(() => {
                    popup.textContent = "¡Texto copiado!";  // Mensaje de éxito
                    popup.style.backgroundColor = "#4caf50"; // Color verde para éxito
                })
                .catch(err => {
                    alert("Error al copiar: " + err);
                });
        }
    
        popup.style.display = "block"; // Mostrar el popup
        setTimeout(() => {
            popup.style.display = "none"; // Ocultar después de 3 segundos
        }, 3000);
    });
    
    // Función para limpiar el textarea
    copiarBtn.addEventListener("click", function () {
        textArea.value = "";
    });
});
