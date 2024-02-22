function countCheckedCells() {
    var table = document.getElementById("userdata"); // Замените "your-table-id" на id вашей таблицы
    var rowCount = table.rows.length;
    var columnCount = table.rows[0].cells.length;
    var checkedCells = [];

    for (var j = 3; j < columnCount; j++) {
        var columnCells = [];
        var columnHeader = table.rows[0].cells[j].firstChild.value; // Заголовок столбца
        var proizvedCell = table.rows[rowCount-1].cells[j].firstChild.value;

        columnCells.push({ row: 0, column: j, value: columnHeader, proizved: proizvedCell });
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

    fetch("/dataHandler", {
        method: "POST",
        body: JSON.stringify(checkedCells),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then((response) => response.json())
    .then((json) => console.log(json));

    setTimeout(
        updateData(), 500
    );

}

function updateData() {
    setTimeout(() => {
        $.getJSON('../json/history.json', function(data) {
            //console.log(data.length);
            var table = document.getElementById("userdata"); // Замените "your-table-id" на id вашей таблицы
            var rowCount = table.rows.length;
            var columnCount = table.rows[0].cells.length;
            
            for (var j = 3; j < columnCount; j++) {
                for (var i = 1; i < rowCount; i++) {
                    var cell = table.rows[i].cells[j];
                    var checkbox = cell.querySelector('input[type="checkbox"]');
                    for(let k=0; k<data[j-3].workersArr.length; k++) {
                        if(table.rows[i].cells[0].innerText == data[j-3].workersArr[k].id && table.rows[rowCount-1].cells[j].firstChild.value == data[j-3].proizved && checkbox.checked) {
                            cell.firstChild.innerText = data[j-3].workersArr[k].proizved.toFixed(4); 
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
        });
    }, 1000);
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

}


