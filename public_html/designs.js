let height, width, color;
let tableExists = false;
let cellsArray = [];
let rowsArray=[];
let clickedCellsArray = [];
const table = $("#pixelCanvas");
const submitButton = $("#submitButton");
const clearButton = $("#clearButton");
const addRowButton = $("#rowButton");
const addColumnButton = $("#columnButton");

function getTableSize(){
  height = $("#inputHeight").val();
  console.log(height);

  width = $("#inputWeight").val();
  console.log(width);

  if(height > 100 || width >100 || height < 1 || width < 1){
      window.alert("Heigth and weigh can only have values between 1 - 100!");
    return false;
  }
  return true;
}

function addRow(){
    if(tableExists) {
        height++;
        rowId = "row" + height;
        table.append("<tr class='rows' id = '" + rowId + "'></tr>");
        console.log($('#' + rowId));
        rowsArray.push(rowId);
        let row = $('#' + rowId);
        let cellId;
        for (var innerWidth = 1; innerWidth <= width; innerWidth++) {
            cellId = rowId + 'cell' + innerWidth;
            row.append("<td class='cells' id= '" + cellId + "'></td>");
            console.log($('#' + cellId));
            cellsArray.push(cellId);
        }
    }
}

function addColumn(){
    if(tableExists) {
        width++;
        rowsArray.forEach(
            function (rowId) {
                let row = $("#" + rowId);
                let cellId = rowId + 'cell' + width;
                row.append("<td class='cells' id= '" + cellId + "'></td>");
                console.log($('#' + cellId));
                cellsArray.push(cellId);
            }
        );
    }
}

function drawNewTable(){
  console.log(table);

  if(typeof(table.children()==='object')){
    table.children().remove();
  }

  let row;
  let rowId;
  let cellId;
  let innerHeight = 1;

  while(innerHeight <= height){
    rowId = "row"+innerHeight;
    table.append("<tr class='rows' id = '" + rowId + "'></tr>");

    row = $('#'+rowId);
    console.log(row);
    rowsArray.push(rowId);

    for(var innerWidth = 1;innerWidth <= width;innerWidth++){
      cellId = rowId+'cell'+innerWidth;
      row.append("<td class='cells' id= '"+cellId+"'></td>" );

      console.log($('#'+cellId));
      cellsArray.push(cellId);

    }

    innerHeight++;
  }


}

function makeGrid(event) {
  event.preventDefault();
  rowsArray=[];
  cellsArray=[];
  clickedCellsArray=[];
  drawNewTable();

}

submitButton.click(function(event){
  if(getTableSize()){
    event.preventDefault();
    tableExists = true;
    makeGrid(event);
  }
});

function getColor(){
  color = $('#colorPicker').val();
  console.log(color);
}

table.mouseup(function(event){

  if(clickedCellsArray.includes($(event.target).attr('id'))){
    var arrayIndex = clickedCellsArray.indexOf($(event.target).attr('id'));
    clickedCellsArray.splice(arrayIndex,1);
    $(event.target).css('background-color', '#ffffff');
    console.log("Verified in if " + $(event.target).attr('id'));
    console.log("Array length: " + clickedCellsArray.length);

  }else if($(event.target).attr('id')!= "pixelCanvas"){
    clickedCellsArray.push($(event.target).attr('id'));
    getColor();
    $(event.target).css('background-color', color);
    console.log("Passed through else " + $(event.target).attr('id'));
    console.log("Array length: " + clickedCellsArray.length);
  }
});

clearButton.click(
  function (event){
    event.preventDefault();
    console.log(tableExists);
    if(tableExists===true){
      for(var i = 0; i<= cellsArray.length;i++){
        $('#'+cellsArray[i]).css('background-color','#ffffff');
      }

    }
  }
);

addRowButton.click(function(event){
    event.preventDefault();
    if(height >= 100){
      window.alert("Heigth and weigh cannot be greater than 100!");
    }else{
      addRow();
    }
  }
);

addColumnButton.click(function(event){
    event.preventDefault();
    if(width >= 100){
        window.alert("Heigth and weigh cannot be greater than 100!");
    }else{
      addColumn();;
    }

  }
);