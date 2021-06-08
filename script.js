let canvas = document.querySelector("canvas");

let tool = canvas.getContext("2d");

let isPressed = false;

let colorArr = document.querySelectorAll(".colors");

let color = "";

let clearCanvas = document.querySelector(".clear");

let penBtn = document.querySelector(".pen");

let eraseBtn = document.querySelector(".eraser");

let isErasePressed = false;

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

let  x; 

let  y;

canvas.addEventListener("mousedown",brushDown, false);

canvas.addEventListener("mousemove",brushMove, false);

canvas.addEventListener("mouseup",brushUp, false);

// let myColor = color.value;
// penBtn.style.border = "red";
//color
for(let i = 0; i < colorArr.length; i++)
{
    colorArr[i].addEventListener("click", function()
    {
       color = colorArr[i].classList[1];

       tool.strokeStyle = color;
    })
}

//make brush move
function getCoordinates(canvas, e)
{
    return {
        x: e.clientX,

        y: e.clientY
    }
}

function brushDraw(canvas,x,y)
{
    if(isPressed)
    {
        tool.lineTo(x,y);

        tool.stroke();

        canvas.style.cursor = "crosshair";
    }
}


function brushDown(e)
{
    isPressed = true;

    let coordinates = getCoordinates(canvas, e);

    x = coordinates.x;

    y = coordinates.y;

    tool.beginPath();

    tool.moveTo(x,y);

    tool.lineTo(x,y);

    tool.stroke();

}

function brushMove(e)
{
    let coordinates = getCoordinates(canvas , e);

    x = coordinates.x;

    y = coordinates.y;

    brushDraw(canvas,x,y);

}

function brushUp(e)
{
    isPressed = false;

    canvas.style.cursor = "crosshair";

}

clearCanvas.addEventListener("click", function()
{
    tool.clearRect(0,0,canvas.width,canvas.height);
})

penBtn.addEventListener("click", function()
{

    let penColor = document.querySelector(".randomCol");

    tool.strokeStyle = penColor.value;

   // pen.style.cursor = "https://cliparting.com/wp-content/uploads/2017/03/Fountain-pen-clipart-kid.png";

    penBtn.style.border = "red";

    eraseBtn.style.border = "none";

    canvas.addEventListener("mousedown",brushDown, false);

    canvas.addEventListener("mousemove",brushMove, false);

    canvas.addEventListener("mouseup",brushUp, false);

})

eraseBtn.addEventListener("click", function()
{

    tool.strokeStyle = "white";

    eraseBtn.style.border = "red";

    penBtn.style.border = "none";

    
    canvas.addEventListener("mousedown",brushDown, false);

    canvas.addEventListener("mousemove",brushMove, false);

    canvas.addEventListener("mouseup",brushUp, false);

})

let 



