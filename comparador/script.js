function leerArchivoExcel(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        resolve(jsonData);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }
  
  async function compararArchivos() {
    const file1 = document.getElementById('file1').files[0];
    const file2 = document.getElementById('file2').files[0];
    const resultado = document.getElementById('resultado');
    resultado.textContent = '';
  
    if (!file1 || !file2) {
      alert("Subí ambos archivos primero");
      return;
    }
  
    const datos1 = await leerArchivoExcel(file1);
    const datos2 = await leerArchivoExcel(file2);
  
    // Convertimos el segundo archivo en un mapa por code
    const mapa2 = new Map();
    for (const fila of datos2) {
      if (fila.code !== undefined) {
        mapa2.set(String(fila.code).trim(), fila.description_abrev?.toString().trim() ?? '');
      }
    }
  
    const diferencias = [];
  
    for (const fila of datos1) {
      const codigo = String(fila.MAE_ARTICU).trim();
      const descr1 = fila.MAE_DESCRI?.toString().trim() ?? '';
      const descr2 = mapa2.get(codigo);
  
      if (descr2 !== undefined && descr1 !== descr2) {
        diferencias.push({ code: codigo, MAE_DESCRI: descr1, description_abrev: descr2 });
      }
    }
  
    if (diferencias.length > 0) {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(diferencias);
      XLSX.utils.book_append_sheet(wb, ws, "Diferencias");
      XLSX.writeFile(wb, "diferencias.xlsx");
      resultado.textContent = `Se encontraron ${diferencias.length} diferencias. Archivo descargado.`;
    } else {
      resultado.textContent = "No se encontraron diferencias.";
    }
  }
  