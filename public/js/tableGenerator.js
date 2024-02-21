document.addEventListener("DOMContentLoaded", function() {
  var table = document.getElementById("myTable");

  for (var i = 0; i < 3; i++) {
      var row = document.createElement("tr");

      for (var j = 0; j < 3; j++) {
          var cell = document.createElement("td");
          var cellText = document.createTextNode("Row " + (i+1) + ", Col " + (j+1));
          cell.appendChild(cellText);
          row.appendChild(cell);
      }

      table.appendChild(row);
      console.log('yes!!!');
  }
});