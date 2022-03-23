// Rotation by dragging
const dragArea = document.querySelector("body");
const sphereElement = document.querySelector(".sphere");
const rotation = {
  x: 0,
  y: 0,
};

dragArea.onmousedown = function (e) {
  var dragging = true;
  var prevXRotation = e.pageX;
  var prevYRotation = e.pageY;

  dragArea.onmousemove = function (e) {
    if (!dragging) return false;

    var yRotation = e.pageX - prevXRotation;
    var xRotation = e.pageY - prevYRotation;

    prevXRotation = e.pageX;
    prevYRotation = e.pageY;

    rotation.x -= xRotation / 5;
    rotation.y += yRotation / 5;

    applyRotatiton();
  };

  dragArea.onmouseup = function (e) {
    dragging = false;
  };
};

var applyRotatiton = function () {
  const transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

  sphereElement.style.transform = transform;
};
