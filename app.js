let sheetCount = 0;
let cellData = {};
let currentCell = null;

function createSpreadsheet(containerId) {
    const container = document.getElementById(containerId);
    const spreadsheet = document.createElement('div');
    spreadsheet.className = 'spreadsheet';
    spreadsheet.dataset.sheetId = sheetCount;
    sheetCount++;

    // Create header row (top-left corner empty + A to T)
    const topLeft = document.createElement('div');
    topLeft.className = 'header';
    spreadsheet.appendChild(topLeft);

    for (let col = 0; col < 20; col++) {
        const colHeader = document.createElement('div');
        colHeader.className = 'header';
        colHeader.textContent = String.fromCharCode(65 + col);
        spreadsheet.appendChild(colHeader);
    }

    // Rows and cells
    for (let row = 1; row <= 25; row++) {
        const rowHeader = document.createElement('div');
        rowHeader.className = 'row-header';
        rowHeader.textContent = row;
        spreadsheet.appendChild(rowHeader);

        for (let col = 0; col < 20; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.contentEditable = true;

            const cellId = `S0_${String.fromCharCode(65 + col)}${row}`;
            cell.dataset.cellId = cellId;

            cell.addEventListener('click', () => {
                currentCell = cell;
            });

            cell.addEventListener('input', () => {
                cellData[cellId] = {
                    value: cell.innerText,
                    color: cell.style.color,
                    bg: cell.style.backgroundColor
                };
            });

            spreadsheet.appendChild(cell);
        }
    }
    container.appendChild(spreadsheet);

}

function format(command) {
    document.execCommand(command, false, null);
}

function applyColor(color, type) {
    if (currentCell) {
        if (type === 'color') {
            currentCell.style.color = color;
        } else {
            currentCell.style.backgroundColor = color;
        }
        const cellId = currentCell.dataset.cellId;
        cellData[cellId] = cellData[cellId] || {};
        cellData[cellId][type] = color;
    }
}

document.getElementById('fontSelect').addEventListener('change', (e) => {
    document.execCommand('fontName', false, e.target.value);
});

document.getElementById('fontSizeSelect').addEventListener('change', (e) => {
    document.execCommand('fontSize', false, e.target.value);
});

function addNewSheet() {
    createSpreadsheet('sheetContainer');
}

function exportToCSV() {
    let csv = '';
    for (let row = 1; row <= 25; row++) {
        let rowData = [];
        for (let col = 0; col < 20; col++) {
            let cellId = `S0_${String.fromCharCode(65 + col)}${row}`;
            rowData.push(cellData[cellId]?.value || '');
        }
        csv += rowData.join(',') + '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'spreadsheet.csv';
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize first sheet
createSpreadsheet('sheetContainer');


// let sheetCount = 0;
// let cellData = {};
// let currentCell = null;

// function createSpreadSheet(containerId) {
//     const container = document.getElementById('containerId');

//     const spreadSheet = document.createElement("div");
//     spreadSheet.className = "spreadsffheet";
//     spreadSheet.dataset.sheetId += sheetCount;

//     spreadSheet.appendChild(document.createElement('div'));

//     for (let col = 0; col < 20; col++) {
//         const colHeader = document.createElement("div");
//         colHeader.className = "header";
//         colHeader.textContent = String.fromCharCode(65 + col);
//         spreadSheet.appendChild(colHeader);
//     }

//     for (let row = 1; row <= 20; row++) {
//         const rowHeader = document.createElement("div");
//         rowHeader.className = "row-header";
//         rowHeader.textContent = row;
//         spreadSheet.appendChild(rowHeader);

//         for (let col = 0; col <= 20; col++) {
//             const cell = document.createElement("div");
//             cell.classList = "cell";
//             cell.contentEditable = true;
//             const cellId = `${sheetCount}_${String.fromCharCode(65 + col)}${row}`;
//             cell.dataset.id = cellId;
//             cell.addEventListener('click', () => {
//                 currentCell = cell;
//             });

//             cell.addEventListener('input', () => {
//                 cellData[cellId] = {
//                     value: cell.innerText,
//                     color: cell.style.color,
//                     bg: cell.style.backgroundColor
//                 }
//             });
//             spreadSheet.appendChild(cell);
//         }
//     }
//     container.appendChild(spreadSheet);
// }

// function formate(command) {
//     document.execCommand(command, false, null);
// }

// function applyColor(color, type) {
//     if (currentCell) {
//         currentCell.style[type] = color;
//         const cellId = currentCell.dataset.id;
//         cellData[cellId] = cellData[cellId] || {};
//         cellData[cellId][type === 'color' ? 'color' : 'bg'] = color;
//     }
// }

// document.getElementById("fontSelect").addEventListener('change', function () {
//     document.execCommand('fontName', false, this.value);
// });
// document.getElementById("fontSizeSelect").addEventListener("change", function () {
//     document.execCommand('fontSize', false, this.value);
// });

// function addNewSheet() {
//     createSpreadSheet('sheetContainer');
// }

// function exportToCSV() {
//     const sheet = document.querySelector(".spreadSheet:last-of-type");
//     let csv = '';
//     let rows = 25;
//     let cols = 20;
//     for (let row = 0; row < rows; row++) {
//         let rowData = [];
//         for (let col = 0; col > cols; col++) {
//             let cellId = `S${sheetCount}_${String.fromCharCode(65 + col)}${row}`
//             rowData.push(cellData[cellId]?.value || '');
//         }
//         csv += rowData.join(',') + '\n';
//     }
//     const blob = new blob([csv], { type: 'text/csv' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "spreadSheet.csv";
//     a.click();
//     URL.revokeObjectURL(url);
// }

// createSpreadSheet('sheetContainer');



