document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("csvFile").addEventListener("change", function (event) {
        // Almacena el archivo seleccionado en una variable global
        window.selectedFile = event.target.files[0];
    });

    document.querySelector("button").addEventListener("click", function () {
        if (window.selectedFile) {
            procesarCSV(window.selectedFile);
        } else {
            alert("Por favor, selecciona un archivo CSV primero.");
        }
    });
});

function procesarCSV(file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = function (event) {
        const csvText = event.target.result;
        dividirCSV(csvText, file.name);
    };

    reader.onerror = function () {
        alert("Error al leer el archivo.");
    };
}

function dividirCSV(csvText, fileName) {
    const lineas = csvText.split("\n").filter(line => line.trim() !== ""); // Evita líneas vacías

    if (lineas.length < 2) {
        alert("El archivo CSV no tiene suficientes datos.");
        return;
    }

    const encabezado = lineas[0]; // Primera línea como encabezado
    const registros = lineas.slice(1); // Resto de las líneas (datos)

    const limiteTamañoMB = 1 * 1024 * 1024; // 1 MB en bytes
    let numArchivo = 1;
    let i = 0;

    while (i < registros.length) {
        let chunk = [];
        let tamañoArchivo = 0;

        while (i < registros.length && tamañoArchivo + new Blob([chunk.join("\n")]).size < limiteTamañoMB) {
            chunk.push(registros[i]);
            tamañoArchivo = new Blob([chunk.join("\n")]).size;
            i++;
        }

        // Asegurar que la última línea sea "1"
        while (chunk.length > 0 && !chunk[chunk.length - 1].includes('"1"')) {
            chunk.pop(); // Eliminar líneas hasta encontrar una que termine en "1"
        }

        if (chunk.length === 0) {
            alert("No se encontró ninguna línea que termine en '1'.");
            return;
        }

        const contenido = [encabezado, ...chunk].join("\n");
        const fecha = new Date().toISOString().split("T")[0];
        const nuevoNombre = `fraccion_${numArchivo}_${fecha}_${fileName}`;

        descargarArchivo(contenido, nuevoNombre);
        numArchivo++;
    }

    document.getElementById("resultado").innerHTML = `<p>Se han generado ${numArchivo - 1} archivos.</p>`;
}

function descargarArchivo(contenido, nombreArchivo) {
    const blob = new Blob([contenido], { type: "text/csv" });
    const enlace = document.createElement("a");

    enlace.href = URL.createObjectURL(blob);
    enlace.download = nombreArchivo;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
}
