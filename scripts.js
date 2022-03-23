const sphereElement = document.querySelector(".sphere");
const rotationElement = document.querySelector(".rotation");
const dragArea = document.querySelector("body");

const sphere = {
  segments: 24,
  rings: 19,
  circumference: 942,
  height: 476,
  plan: false,
  grid: false,
  scale: 1,
  rotation: {
    x: 0,
    y: 247,
  },
};

const handleChange = () => {
  renderSphere();
};

const gui = new dat.GUI();
gui.add(sphere, "segments", 0, 30).step(1).onChange(handleChange);
gui.add(sphere, "rings", 0, 60).step(1).onChange(handleChange);
gui.add(sphere, "circumference", 0, 4000).step(1).onChange(handleChange);
gui.add(sphere, "height", 0, 4000).step(1).onChange(handleChange);
gui.add(sphere, "scale", 0, 5).onChange(handleChange);
gui.add(sphere, "plan").onChange((plan) => {
  if (plan) {
    sphereElement.classList.add("plan");
    sphereElement.style.width = `${sphere.circumference}px`;
  } else {
    sphereElement.classList.remove("plan");
    sphereElement.style.width = null;
  }
});
gui.add(sphere, "grid").onChange(() => {
  sphereElement.classList.toggle("grid");
});

let blockWidth;
let blockHeight;
let ringsByHemisphere;

const renderSphere = () => {
  ringsByHemisphere = sphere.rings / 2;
  blockWidth = sphere.circumference / sphere.segments;
  blockHeight = sphere.height / 2 / ringsByHemisphere;

  resetBlocks();

  // northern hemisphere
  createHemisphere("northern");

  // southern hemisphere
  createHemisphere("southern");

  updateStyles();
};

const createHemisphere = (hemisphere) => {
  const element = document.createElement("div");
  element.className = `${hemisphere}-hemisphere hemisphere`;
  sphereElement.appendChild(element);

  for (let currentSlice = 0; currentSlice < sphere.segments; currentSlice++) {
    addSlice({ currentSlice, element, hemisphere });
  }
};

const resetBlocks = () => {
  sphereElement
    .querySelectorAll(".sphere > div")
    .forEach((element) => element.remove());
};

const updateStyles = () => {
  const styleElement = document.querySelector("#style-sphere");
  const sphereWidth = (sphere.circumference / 100) * 31.5;

  styleElement.innerHTML = `
    .sphere { 
      width: ${sphereWidth}px;
      height: ${sphereWidth}px;
      transform-origin: center center -${sphereWidth / 2}px;
      transform: 
        rotateX(${sphere.rotation.x}deg)
        rotateY(${sphere.rotation.y}deg)
        scale3d(${sphere.scale}, ${sphere.scale}, ${sphere.scale});
    }
    .circle {
      width: ${sphereWidth}px;
      height: ${sphereWidth}px;
      transform: translateZ(-${sphereWidth / 2}px);
    }
    .hemisphere {
      width: ${blockWidth}px;
    }
    .northern-hemisphere .block {
      transform: translateY(0.2px) rotateX(${90 / ringsByHemisphere}deg);
    }
    .southern-hemisphere .block {
      transform: translateY(-0.2px) rotateX(-${90 / ringsByHemisphere}deg);
    }
    .slice {
      width: ${blockWidth}px;
      transform: translateX(-0.2px) rotateY(${360 / sphere.segments}deg);
    }
    .block {
      height: ${blockHeight}px;
    }
  `;
};

const addSlice = ({ currentSlice, element, hemisphere }) => {
  const allBlocks = element.querySelectorAll(".slice");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1] || element;

  const slice = document.createElement("div");
  slice.className = "slice";
  lastBlock.appendChild(slice);

  for (let currentBlock = 0; currentBlock < ringsByHemisphere; currentBlock++) {
    addBlock({ slice, currentSlice, currentBlock, hemisphere });
  }
};

const addBlock = ({ slice, currentSlice, currentBlock, hemisphere }) => {
  const allBlocks = slice.querySelectorAll(".block");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1] || slice;

  const newBlock = document.createElement("div");
  newBlock.className = "block";

  const xIndex = currentSlice;
  let yIndex = parseInt(currentBlock + ringsByHemisphere);

  if (hemisphere === "northern") {
    yIndex = parseInt(Math.abs(currentBlock - ringsByHemisphere + 1));
  }

  newBlock.style.backgroundPosition = `-${xIndex * blockWidth}px -${
    yIndex * blockHeight
  }px`;

  lastBlock.appendChild(newBlock);
};

const createStyle = () => {
  const style = document.createElement("style");
  style.setAttribute("id", "style-sphere");
  document.head.appendChild(style);
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

    sphere.rotation.x -= xRotation / 5;
    sphere.rotation.y += yRotation / 5;

    updateStyles();
  };

  dragArea.onmouseup = function (e) {
    dragging = false;
  };
};

window.onload = () => {
  createStyle();
  renderSphere();
};
