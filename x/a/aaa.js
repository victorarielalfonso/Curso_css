document.addEventListener("DOMContentLoaded", function(){
    const limpiarBtn = document.getElementById("limpiar");
    const inputValor = document.getElementById("valor")


    limpiarBtn.addEventListener("click", function(){
        inputValor.value = "";
    })
})

