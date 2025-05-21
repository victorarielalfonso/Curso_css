function limpiar (){
document.getElementById("entrada").value = "";
document.getElementById("resultado").innerHTML = "";
}


function procesar() {
    let valor = document.getElementById("entrada").value.trim().toLowerCase();
    let salida = "";

    switch (valor) {
        case "1":
            salida = "Existe";
            break;
        case "2":
            salida = "Existe";
            break;
        case "3":
        case "tres":
            salida = "Existe";
            break;
        case "4":
            salida = "Existe";
            break;
        case "5":
            salida = "Existe";
            break;
        case "uno":
            salida = "1";
            break;
        case "dos":
            salida = "2";
            break;
        case "cuatro":
            salida = "4";
            break;
        case "cinco":
            salida = "5";
            break;
        default:
            if(valor ===""){
                salida = '<span class="rojo">No se ha ingresado nada</span>'
            }else{
                salida = `No existe el<span class="rojo">${valor}</span>`;
            }
            
            
    }

    document.getElementById("resultado").innerHTML = salida;
}