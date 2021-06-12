//undo and redo on canvas
let undoRedoTracker = [];

let track = -1;

let canvas = document.querySelector("canvas");

// undoRedoTracker.push(canvas.toDataURL());

let tool = canvas.getContext("2d");

let isPressed = false;

let colorArr = document.querySelectorAll(".colors");

let color = "";

let clearCanvas = document.querySelector(".clear");

let penBtn = document.querySelector(".pen");

let eraseBtn = document.querySelector(".eraser");

let isErasePressed = false;

canvas.width = Number(window.innerWidth);

canvas.height = Number(window.innerHeight);

let  x; 

let  y;

canvas.addEventListener("mousedown",brushDown, false);

canvas.addEventListener("mousemove",brushMove, false);

canvas.addEventListener("mouseup",brushUp, false);

let background = new Image();

background.onload = function()
{
    tool.drawImage(background,0,0);
}

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

    tool.closePath();

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

    //canvas.style.cursor = "crosshair";

    //tool.closePath();
    //undo n redo
    undoRedoTracker.push(canvas.toDataURL());

    track = undoRedoTracker.length - 1;

    //historySave();

}

clearCanvas.addEventListener("click", function()
{
    tool.clearRect(0,0,canvas.width,canvas.height);
})

penBtn.addEventListener("click", function()
{

    let penColor = document.querySelector(".randomCol");

    tool.strokeStyle = penColor.value;

    // tool.lineWidth = 10;

   // pen.style.cursor = "https://cliparting.com/wp-content/uploads/2017/03/Fountain-pen-clipart-kid.png";

    // penBtn.style.border = "red";

    // eraseBtn.style.border = "none";

    canvas.addEventListener("mousedown",brushDown, false);

    canvas.addEventListener("mousemove",brushMove, false);

    canvas.addEventListener("mouseup",brushUp, false);


})

eraseBtn.addEventListener("click", function()
{

    
    tool.strokeStyle = 'white';

    // eraseBtn.style.border = "red";
    // penBtn.style.border = "none";
    // tool.lineWidth = 10;

    canvas.addEventListener("mousedown",brushDown, false);

    canvas.addEventListener("mousemove",brushMove, false);

    canvas.addEventListener("mouseup",brushUp, false);

})

//saving the drawn image into gallery

let saveBtn = document.querySelector(".save");

saveBtn.addEventListener("click", function()
{
    tool.drawImage(canvas,0,0);

    addMediaToGallery(canvas.toDataURL(), "img");
})


let undoBtn = document.querySelector(".undo");

let redoBtn = document.querySelector(".redo");

// function historySave()
// {
//     track++;

//     while(undoRedoTracker.length > 10)
//     {
//         undoRedoTracker.shift();

//         track--;
//     }

//     if(track !== 0 && track < undoRedoTracker.length)
//     {
//         undoRedoTracker.length = track;

//         track++;
//     }
//     else
//     {
//         undoRedoTracker.length = track;
//     }

//     undoRedoTracker.push(canvas.toDataURL());
// }

undoBtn.addEventListener("click", (e) =>
{
    //canvas.addEventListener("mouseup",brushUp, false);

    if(track >= 0) track--;
    
    console.log(track);

    console.log(undoRedoTracker);

    tool.clearRect(0,0,canvas.width,canvas.height)

    let img = new Image();

    img.src = undoRedoTracker[track];

    img.onload = (e) =>
    {
        tool.drawImage(img, 0, 0,img.width,img.height);
    }

    
})

redoBtn.addEventListener("click", (e) =>
{
    //canvas.addEventListener("mouseup",brushUp, false);
    
    if(track < undoRedoTracker.length - 1) track++;

    console.log(track);

    console.log(undoRedoTracker);
    

    let img = new Image();

    img.src = undoRedoTracker[track];

    img.onload = (e) =>
    {
        tool.clearRect(0,0,canvas.width,canvas.height);

        tool.drawImage(img, 0, 0,img.width,img.height);
    }

})

//active buttons
let buttons = document.querySelectorAll('button');

buttons.forEach(button =>{
    button.addEventListener('click',function()
    {
        buttons.forEach(btn => btn.classList.remove('active'));

        this.classList.add('active');
    })
})

let input = document.querySelector('input');

input.addEventListener("click",function()
{
    this.classList.toggle('active');
    
})
