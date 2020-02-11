// Yevgeniy Gorbachev (Team superduperguacamole)
// SoftDev1 pd1
// K06 -- Dot Dot Dot
// 2020-02-11

let lastX = -1;
let lastY = -1;

const canvas = document.getElementById("playground");
const clear_button = document.getElementById("clear");
var ctx = canvas.getContext("2d");
//ctx.fillStyle="#ff0000";
//ctx.fillRect(50, 50, 100, 200);

const clear = function(e){
  // console.log(e);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  lastX = lastY = -1
}

const draw = function(e){
  // gives the mouse's location relative to the target
  let x = e.offsetX;
  let y = e.offsetY;
  // begins drawing path
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, 2 * Math.PI);
  if (lastX != -1){
    ctx.moveTo(x, y);
    ctx.lineTo(lastX, lastY);
  }
  // renders path
  ctx.stroke();
  ctx.fill();
  // store for next
  lastX = x;
  lastY = y;
}

clear_button.addEventListener('click', clear);
canvas.addEventListener('click', draw);