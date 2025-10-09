function sheetToMobileHTML() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getDataRange();
  const html = [];

  // CSS responsivo y estilos para móviles
  html.push(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 10px;
        }
        .table-container {
          overflow-x: auto;
          max-width: 100%;
        }
        table {
          border-collapse: collapse;
          width: 100%;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
          min-width: 60px;
        }
        th {
          background-color: #f2f2f2;
          position: sticky;
          top: 0;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .search-box {
          margin-bottom: 10px;
          width: 100%;
          max-width: 300px;
        }
        @media (max-width: 600px) {
          th, td {
            padding: 6px;
            font-size: 12px;
          }
        }
      </style>
    </head>
    <body>
      <div class="table-container">
        <input type="text" class="search-box" id="searchInput" placeholder="Buscar...">
        <table id="dataTable">
  `);

  // Generar tabla HTML
  const values = range.getValues();
  const numRows = values.length;
  const numCols = values[0].length;

  // Encabezados
  html.push('<thead><tr>');
  for (let j = 0; j < numCols; j++) {
    html.push(`<th>${values[0][j]}</th>`);
  }
  html.push('</tr></thead><tbody>');

  // Datos
  for (let i = 1; i < numRows; i++) {
    html.push('<tr>');
    for (let j = 0; j < numCols; j++) {
      const cell = range.getCell(i + 1, j + 1);
      const style = `
        background-color: ${cell.getBackground()};
        color: ${cell.getFontColor()};
        font-weight: ${cell.isBold() ? 'bold' : 'normal'};
      `;
      html.push(`<td style="${style}">${values[i][j]}</td>`);
    }
    html.push('</tr>');
  }

  html.push('</tbody></table></div>');

  // JavaScript para interactividad
  html.push(`
    <script>
      document.getElementById('searchInput').addEventListener('keyup', function() {
        const input = this.value.toLowerCase();
        const rows = document.querySelectorAll('#dataTable tbody tr');
        rows.forEach(row => {
          const text = row.textContent.toLowerCase();
          row.style.display = text.includes(input) ? '' : 'none';
        });
      });

      // Ordenar columnas al hacer clic en los encabezados
      document.querySelectorAll('#dataTable th').forEach((th, index) => {
        th.addEventListener('click', () => {
          sortTable(index);
        });
      });

      function sortTable(columnIndex) {
        const table = document.getElementById('dataTable');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((a, b) => {
          const aValue = a.cells[columnIndex].textContent;
          const bValue = b.cells[columnIndex].textContent;
          return aValue.localeCompare(bValue);
        });

        // Limpiar y reinsertar filas ordenadas
        rows.forEach(row => tbody.appendChild(row));
      }
    </script>
    </body>
    </html>
  `);

  // Guardar como archivo HTML
  const blob = Utilities.newBlob(html.join(''), 'text/html').setName('sheet_mobile.html');
  DriveApp.createFile(blob);

  // Abrir el archivo generado (opcional)
  const fileUrl = `https://drive.google.com/file/d/${blob.getId()}/view?usp=sharing`;
  Logger.log('Archivo HTML generado: ' + fileUrl);
}
