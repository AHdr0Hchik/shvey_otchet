$(function() {
    $.getJSON('../json/workers.json', function(data) {
        const tblHeader = `<tr><td>№</td><td>Имя работника</td><td class="coef">Коэффициент</td></tr>`;
        $(tblHeader).appendTo('#userdata');
        $.each(data, function(i, f) {
            const tblRow = `<tr><td>${f.id}</td><td>${f.name}</td><td width="50px"><input type="number" class="coef" value="${f.coef}"/></td></tr>`;
            $(tblRow).appendTo("#userdata");
        });
        const tblAddWorker = `<tr><td><button class="btn btn-add-worker" onclick="addWorker()" name="addWorkerBtn">+</button></td><td><input type="text" placeholder="Введите имя..." id="addWorkerName"></td><td><input type="number" class="coef" id="addWorkerCoef" placeholder="Введите процент..." value=""/></td></tr>`
        const tblFooter = `<tr><td>-</td><td>Произведено</td><td>----</td></tr>`;
        $(tblAddWorker).appendTo("#userdata");
        $(tblFooter).appendTo("#userdata");
    });
 });

 $(function() {
    var myform = $('#userdata'),
    iter = 0;

    $('#btn_add_column').click(function () {
        myform.find('tr').each(function(iter){
            var trow = $(this);
            if(trow.index() === 0){
                var prevCellValue = trow.find('td:last-child input[type="date"]').val();
                var incrementedValue = getNextDateValue(prevCellValue);
                trow.append(`<td><input type="date" value="${incrementedValue}" name="date${iter}"/></td>`);
            }else{
                if(iter===$('#userdata tr').length-1) {
                    trow.append('<td><input type="number" name="count'+iter+'"/></td>');
                } else if(iter===$('#userdata tr').length-2) {
                    trow.append('<td><div></div></td>');
                } else {
                    trow.append('<td><div class="proizved">-</div><input onclick="" type="checkbox" name="'+ parseInt(iter) +'" checked/>&nbsp;</td>');
                }
            }
        });
    });
    
    function getNextDateValue(dateString) {
        var currentDate = new Date(dateString);
        currentDate.setDate(currentDate.getDate() + 1);
        var year = currentDate.getFullYear();
        var month = String(currentDate.getMonth() + 1).padStart(2, '0');
        var day = String(currentDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    $('#btn_remove_column').click(function() {
        myform.find('tr').each(function() {
            var lastCell = $(this).find('td:last-child');
            var firstChild = lastCell[0].firstChild;

            if (firstChild && !firstChild.classList.contains('coef')) {
            lastCell.remove();
            }
        });
    });
 });
 