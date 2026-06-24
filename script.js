function generarMasivo() {
    const input = document.getElementById("massiveInput").value;
    const grid = document.getElementById("barcodeGrid");
    
    // Limpiar cuadrícula
    grid.innerHTML = "";

    // Separar por líneas
    const lineas = input.split('\n').filter(l => l.trim() !== "");

    lineas.forEach((linea, index) => {
        // Dividir por la coma: [0] es el Código, [1] es la Descripción
        const partes = linea.split(',');
        const codigoBarras = partes[0] ? partes[0].trim() : "000";
        const descripcion = partes[1] ? partes[1].trim() : "SIN NOMBRE";

        // Crear la estructura de la etiqueta
        const label = document.createElement("div");
        label.className = "barcode-item";

        // Crear el SVG para las barras
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.id = "barcode-" + index;
        label.appendChild(svg);

        // Crear la fila de detalles (Descripción centrada y Código pequeño)
        const details = document.createElement("div");
        details.className = "details-row";
        details.innerHTML = `
            <span class="desc-text">${descripcion}</span>
            <span class="code-small">${codigoBarras}</span>
        `;
        
        label.appendChild(details);
        grid.appendChild(label);

        // Generar las barras (displayValue: false para que no salga el número grande)
        JsBarcode("#barcode-" + index, codigoBarras, {
            format: "CODE128",
            width: 12,
            height: 400,
            displayValue: false,
            margin: 0
        });
    });
}