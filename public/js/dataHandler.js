function countCheckedCells() {
    var table = document.getElementById("userdata"); // Замените "your-table-id" на id вашей таблицы
    var rowCount = table.rows.length;
    var columnCount = table.rows[0].cells.length;
    var checkedCells = [];

    for (var j = 4; j < columnCount; j++) {
        var columnCells = [];
        if(!table.rows[0].cells[j].firstChild.value || !table.rows[rowCount-1].cells[j].firstChild.value) {
            alert(`Введены не все данные`);
            break;
        } else {
            var columnHeader = table.rows[0].cells[j].firstChild.value; // Заголовок столбца
            var proizvedCell = table.rows[rowCount-1].cells[j].firstChild.value;

            columnCells.push({ row: 0, column: j, value: columnHeader, proizved: proizvedCell });
        }
       
        for (var i = 1; i < rowCount; i++) {
            var cell = table.rows[i].cells[j];
            var checkbox = cell.querySelector('input[type="checkbox"]');
            var idCell = parseInt(table.rows[i].cells[0].lastChild.innerText);
            var valueCell = table.rows[i].cells[1].innerText; // Значение из второго столбца
            var coefCell = parseInt(table.rows[i].cells[2].firstChild.value); // Значение из второго столбца
            
            if (checkbox && checkbox.checked) {
                columnCells.push({ row: i, column: j, value: valueCell , coef : coefCell, id: idCell});
            }
        }
        checkedCells.push(columnCells);
    }
    for(let i=1; i < rowCount-2; i++) {
        let countWDays = 0;
        for(let j=4; j < columnCount; j++) {
            var cell = table.rows[i].cells[j];
            var checkbox = cell.querySelector('input[type="checkbox"]');
            if(checkbox.checked) countWDays+=1;
        }
        checkedCells[0][i].countWDays = countWDays;
    }


    fetch("/dataHandler", {
        method: "POST",
        body: JSON.stringify(checkedCells),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json())
    .then((json) => console.log(json));

    setTimeout(
        updateData(), 200
    );

}

function updateData() {
    setTimeout(() => {
        $.getJSON('../json/history.json', function(data) {
            //console.log(data.length);
            var table = document.getElementById("userdata"); // Замените "your-table-id" на id вашей таблицы
            var rowCount = table.rows.length;
            var columnCount = table.rows[0].cells.length;
            
            for (var j = 4; j < columnCount; j++) {
                for (var i = 1; i < rowCount; i++) {
                    var cell = table.rows[i].cells[j];
                    var checkbox = cell.querySelector('input[type="checkbox"]');
                    for(let k=0; k<data[j-4].workersArr.length; k++) {
                        if(table.rows[i].cells[0].lastChild.innerText == data[j-4].workersArr[k].id && table.rows[rowCount-1].cells[j].firstChild.value == data[j-4].proizved && checkbox.checked) {
                            cell.firstChild.innerText = data[j-4].workersArr[k].proizved.toFixed(4); 
                        }
                    }
                    if(checkbox !== null && !checkbox.checked) {
                        cell.firstChild.innerText = '-';
                    }
                    

    
                    /*if(table.rows[i].cells[0].innerText == WorkersObj[i].id && checkbox.checked) {
                        table.rows[i].cells[j].firstChild.innerText=WorkersObj[i-1].proizved;
                    }*/
                    
                }
            }
            countTotalProizved(table, rowCount, columnCount);
        });
    }, 1000);
}

function countTotalProizved(table, rowCount, columnCount) {
    let totalSum = 0
    for(let i=1; i<rowCount-2;i++) {
        let sumPerRow = 0;
        for(j=4; j<columnCount; j++) {
            var cell = table.rows[i].cells[j];
            console.log(cell.firstChild.innerText);
            if(cell.firstChild.innerText != '-') sumPerRow += parseFloat(cell.firstChild.innerText);
        }
        table.rows[i].cells[3].innerText = parseFloat(sumPerRow.toFixed(4));
        totalSum+=sumPerRow;
    }
    table.rows[rowCount-1].cells[3].innerText = parseFloat(totalSum.toFixed(2));
}

function addWorker() {
    const nWorkerName = document.getElementById('addWorkerName').value;
    const nWorkerCoef = document.getElementById('addWorkerCoef').value;

    fetch("/addWorker", {
        method: "POST",
        body: JSON.stringify(
            {
                "name": nWorkerName,
                "coef": nWorkerCoef
            }
        ),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json())
    .then((json) => console.log(json));

}

function removeWorker(id) {
    fetch("/removeWorker", {
        method: "POST",
        body: JSON.stringify(
            {
                "id": id
            }
        ),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json())
    .then((json) => console.log(json));

}

function excelExport() {
    var table = document.getElementById('userdata'); // Замените 'userdata' на идентификатор вашей таблицы
  
    var columnCount = table.rows[0].cells.length;
    var dataObjects = [];

    // Обрабатываем второй столбец
    var secondColumnArray = [];
    var totalProizvedArray = [];

    for (var row = 0; row < table.rows.length - 2; row++) {
        var cellValue = table.rows[row].cells[1].innerText;
        secondColumnArray.push(cellValue);
    }
    dataObjects.push(secondColumnArray);

    // Проходимся по столбцам таблицы, начиная с 4-го столбца
    for (var col = 4; col < columnCount; col++) {
        var dataArray = [];

        var dateCellValue = table.rows[0].cells[col].firstChild.value;
        dataArray.push(dateCellValue);
        // Проходимся по строкам таблицы, начиная со второй и до предпоследней строки
        for (var row = 1; row < table.rows.length - 2; row++) {
        var cellValue = table.rows[row].cells[col].firstChild.innerText;
        dataArray.push(parseFloat(cellValue));
        }

        var lastRowValue = table.rows[table.rows.length - 1].cells[col].firstChild.value;
        dataArray.push(lastRowValue);
        dataObjects.push(dataArray);
    }

    for (var row = 0; row < table.rows.length-2; row++) {
        var cellValue = table.rows[row].cells[3].innerText;
        if(row > 0) totalProizvedArray.push(parseFloat(cellValue));
        else totalProizvedArray.push(cellValue);
       
    }
    var lastRowValue = table.rows[table.rows.length - 1].cells[3].innerText;
    totalProizvedArray.push(parseFloat(lastRowValue));
    dataObjects.push(totalProizvedArray);

    fetch("/excelExport", {
        method: "POST",
        body: JSON.stringify(dataObjects),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json())
    .then((json) => console.log(json));
  }

