document.addEventListener("DOMContentLoaded", function(){
    const limpiarBtn = document.getElementById("limpiar");
    const inputValor = document.getElementById("valor")
    const consulBtn = document.getElementById("consulta")



    limpiarBtn.addEventListener("click", function(){
        inputValor.value = "";
    });
consulBtn.addEventListener("click",function(){
    const ingresado = inputValor.value.trim()
    let valor;
    switch(ingresado){
        case "Casa":
            valor= "house"
            break;
        case "Dog":
            valor = "Perro"
            break
        default:
            valor = "sep"    
    }
})
})

