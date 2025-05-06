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
        const texto = textArea.value;
        navigator.clipboard.writeText(texto)
            .then(() => {
                popup.style.display = "block"; // Mostrar el popup
                setTimeout(() => {
                    popup.style.display = "none"; // Ocultar después de 3 segundos
                }, 3000);
            })
            .catch(err => {
                alert("Error al copiar: " + err);
            });
    });

    // Función para limpiar el textarea
    copiarBtn.addEventListener("click", function () {
        textArea.value = "";
    });
});
