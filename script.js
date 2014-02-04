function drawBoxes() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var context = canvas.getContext("2d");
        var width = canvas.width;
        var height = canvas.height;
        
        for (var x = 0; x < boxArray.length; x++) {
            for (var y = 0; y < boxArray[x].length; y++) {
                if (!boxArray[x][y].hidden) {
                    context.beginPath();
                    context.rect(boxArray[x][y].x, boxArray[x][y].y, boxArray[x][y].width, boxArray[x][y].height);
                    context.stroke();
                }
            }
        }
    }
}

var len = 1;

function joinBoxes() {
    var x = Math.floor(Math.random() * size);
    var y = Math.floor(Math.random() * size);
    
    var direction = Math.floor(Math.random() * 4);
    while ((x == 0 && direction == 2) || (x == size - 1 && direction == 0) || (y == 0 && direction == 1) || (y == size - 1 && direction == 3)) {
        direction = Math.floor(Math.random() * 4);
    }
    
    boxArray[x][y].hidden = true;
    
    switch(direction) {
        case 0: //right
            boxArray[x + 1][y].x = boxArray[x][y].x;
            boxArray[x + 1][y].width = boxArray[x][y].width + boxArray[x + 1][y].width;
            break;
        case 1:
            boxArray[x][y - 1].height = boxArray[x][y].height + boxArray[x][y - 1].height;
            break;
        case 2:
            boxArray[x - 1][y].x = boxArray[x][y].x;
            break;
        case 3:
            boxArray[x][y + 1].x = boxArray[x][y].x;
            break;
    }
}

function box(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hidden = false;
}

var boxArray;
var size = Math.floor(700 / len);

$(document).ready(function() {
    boxArray = new Array(size);
    for (var x = 0; x < size; x++) {
        boxArray[x] = new Array(size);
        for (var y = 0; y < size; y++) {
            boxArray[x][y] = new box(x * len, y * len, len, len);
        }
    }

    for (var i = 0; i < 4000600; i++) {
        joinBoxes();
    }
    drawBoxes();
});