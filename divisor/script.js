function procesarCSV() {
    const input = document.getElementById("csvFile");
    if (!input.files.length) {
        alert("Por favor, selecciona un archivo CSV.");
        return;
    }
    
    const file = input.files[0];
    const fileName = file.name.replace(/\.csv$/, ""); // Nombre sin extensión
    const reader = new FileReader();
    
    reader.onload = function (e) {
        const lines = e.target.result.split(/\r?\n/);
        if (lines.length < 2) {
            alert("El archivo CSV no tiene suficientes datos.");
            return;
        }
        
        const header = lines[0];
        const records = lines.slice(1);
        const minSize = 915 * 1024; // 915 KB
        const maxSize = 1024 * 1000; // Menos de 1MB
        let currentSize = header.length + 2;
        let part = [];
        let fileCount = 1;
        
        function savePart(force = false) {
            if (part.length > 0 && (force || currentSize >= minSize)) {
                const content = [header, ...part].join("\n");
                descargarArchivo(content, `${fileName}(${fileCount}).csv`);
                fileCount++;
                part = [];
                currentSize = header.length + 2;
            }
        }
        
        for (let i = 0; i < records.length; i++) {
            const line = records[i];
            const lineSize = new Blob([line]).size;
            
            part.push(line);
            currentSize += lineSize + 1;
            
            if (line.trim().endsWith(';"1"')) {
                savePart();
            }
            
            if (i === records.length - 1) {
                savePart(true);
            }
        }
    };
    
    reader.readAsText(file);
}

function descargarArchivo(contenido, nombre) {
    const blob = new Blob([contenido], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
