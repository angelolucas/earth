const sphere = {
  segments: 24,
  rings: 16,
  circumference: 942,
  height: 476,
  plan: false,
};

const handleChange = () => {
  renderSphere();
};

const gui = new dat.GUI();
gui.add(sphere, "segments", 0, 30).step(1).onChange(handleChange);
gui.add(sphere, "rings", 0, 60).step(1).onChange(handleChange);
gui.add(sphere, "circumference", 0, 4000).step(1).onChange(handleChange);
gui.add(sphere, "height", 0, 4000).step(1).onChange(handleChange);
gui.add(sphere, "plan").onChange((plan) => {
  if (plan) {
    sphereElement.classList.add("plan");
    sphereElement.style.width = `${sphere.circumference}px`;
  } else {
    sphereElement.classList.remove("plan");
    sphereElement.style.width = null;
  }
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

  updateBlockStyle();
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

const updateBlockStyle = () => {
  const styleElement = document.querySelector("#style-sphere");
  const sphereWidth = (sphere.circumference / 100) * 31.5;

  styleElement.innerHTML = `
    .sphere { 
      width: ${sphereWidth}px;
      height: ${sphereWidth}px;
      transform-origin: center center -${sphereWidth / 2}px;
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
      transform: rotateX(${90 / ringsByHemisphere}deg);
    }
    .southern-hemisphere .block {
      transform: rotateX(-${90 / ringsByHemisphere}deg);
    }
    .slice {
      width: ${blockWidth}px;
      transform: rotateY(${360 / sphere.segments}deg);
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

window.onload = () => {
  applyRotatiton();
  createStyle();
  renderSphere();
};
