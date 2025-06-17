let jugadores = [];
let cronometroInterval = null;

function agregarJugador() {
    const nombreInput = document.getElementById("nombre");
    let nombre = nombreInput.value.trim().toUpperCase();
    if (!nombre) {
        alert("Ingrese un nombre");
        return;
    }
    jugadores.push(nombre);
    actualizarLista();
    nombreInput.value = "";
}

function actualizarLista() {
    const lista = document.getElementById("listaJugadores");
    lista.innerHTML = "";
    jugadores.forEach(j => {
        const li = document.createElement("li");
        li.textContent = j;
        lista.appendChild(li);
    });
}

function iniciarPartida() {
    if (jugadores.length < 3) {
        alert("Debe haber al menos 3 participantes");
        return;
    }
    document.getElementById("acciones").style.display = "block";
}

function autocompletar(inputId, sugerenciasId) {
    const input = document.getElementById(inputId);
    const sugerenciasDiv = document.getElementById(sugerenciasId);
    const filtro = input.value.toUpperCase();

    sugerenciasDiv.innerHTML = "";

    if (filtro.length === 0) return;

    const coincidencias = jugadores.filter(nombre => nombre.startsWith(filtro));
    coincidencias.forEach(nombre => {
        const div = document.createElement("div");
        div.textContent = nombre;
        div.onclick = () => {
            input.value = nombre;
            sugerenciasDiv.innerHTML = "";
        };
        sugerenciasDiv.appendChild(div);
    });
}

function resolverNoche() {
    const victima = document.getElementById("loboInput").value.trim().toUpperCase();
    const salvado = document.getElementById("magoInput").value.trim().toUpperCase();

    if (!jugadores.includes(victima) || !jugadores.includes(salvado)) {
        alert("Debe seleccionar nombres válidos.");
        return;
    }

    if (victima === salvado) {
        document.getElementById("resultado").textContent = "NO hubo asesinato. Paladín puede revivir.";
        document.getElementById("paladinBtn").disabled = false;
    } else {
        document.getElementById("resultado").textContent = `Hubo un asesinato: ${victima}. Comienza el debate.`;
        iniciarCronometro();
    }

    // limpiar inputs
    document.getElementById("loboInput").value = "";
    document.getElementById("magoInput").value = "";
}

function revivir() {
    const nombre = prompt("¿A quién revive el Paladín?").trim().toUpperCase();
    if (!jugadores.includes(nombre)) {
        alert("Participante no encontrado");
        return;
    }
    alert(`${nombre} fue revivido`);
    document.getElementById("paladinBtn").disabled = true;
}

function iniciarCronometro() {
    document.getElementById("cronometro").style.display = "block";
    let tiempo = 180;
    actualizarTiempo(tiempo);

    cronometroInterval = setInterval(() => {
        tiempo--;
        actualizarTiempo(tiempo);
        if (tiempo <= 0) {
            clearInterval(cronometroInterval);
            alert("Fin del debate.");
        }
    }, 1000);
}

function actualizarTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const restante = segundos % 60;
    document.getElementById("tiempo").textContent = `${minutos}:${restante < 10 ? '0' : ''}${restante}`;
}

function nuevaPartida() {
    if (confirm("¿Iniciar nueva partida?")) {
        jugadores = [];
        clearInterval(cronometroInterval);
        document.getElementById("listaJugadores").innerHTML = "";
        document.getElementById("resultado").textContent = "";
        document.getElementById("paladinBtn").disabled = true;
        document.getElementById("cronometro").style.display = "none";
        document.getElementById("acciones").style.display = "none";
    }
}
