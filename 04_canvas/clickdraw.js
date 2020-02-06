function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return {
        x: canvasX,
        y: canvasY
    };
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

const c = document.getElementById("slate");
const ctx = c.getContext("2d");

let DRAW_MODE = 0;

const draw = (e) => {
    const dat = c.relMouseCoords(e);

    const dx = dat.x;
    const dy = dat.y;

    if (DRAW_MODE == 0) {
        ctx.fillRect(dx, dy, 1, 1);
    } else {
        ctx.fillRect(dx, dy, 50, 40);
    }

};

c.addEventListener("click", draw);

const toggle = () => {
    DRAW_MODE = (1 - DRAW_MODE);
    const label = document.getElementById("current-mode")
    if (DRAW_MODE == 0) {
        label.innerHTML = "Dot"
    } else {
        label.innerHTML = "Rectangle"
    }
};

const clearaaa = () => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 600, 600);
    ctx.fillStyle = "#000000";
};