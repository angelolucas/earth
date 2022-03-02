const SPHERE_CIRCUMFERENCE = 2000;
const SPHERE_HEIGHT = 2000;

const earth = document.querySelector(".earth");

let totalSlices;
let blocksBySlice;
let blockWidth;
let blockHeight;

const handleChange = () => {
  renderSphere();
};

const renderSphere = () => {
  const inputValue = document.querySelector("input").value;
  document.querySelector("label span").innerHTML = inputValue;

  totalSlices = parseInt(inputValue);
  blocksBySlice = parseInt(inputValue) / 4;
  blockWidth = SPHERE_CIRCUMFERENCE / totalSlices;
  blockHeight = SPHERE_HEIGHT / totalSlices;

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
  earth.appendChild(element);

  for (let currentSlice = 0; currentSlice < totalSlices; currentSlice++) {
    addSlice({ currentSlice, element, hemisphere });
  }
};

const resetBlocks = () => {
  earth.querySelectorAll(".earth > div").forEach((element) => element.remove());
};

const updateBlockStyle = () => {
  const styleElement = document.querySelector("style");
  const earthWidth = (SPHERE_CIRCUMFERENCE / 100) * 32;

  styleElement.innerHTML = `
    .earth { 
      width: ${earthWidth}px;
      height: ${earthWidth}px;
      transform-origin: center center -${earthWidth / 2}px;
    }
    .hemisphere {
      width: ${blockWidth}px;
    }
    .northern-hemisphere .block {
      transform: rotateX(${90 / blocksBySlice}deg);
    }
    .southern-hemisphere .block {
      transform: rotateX(-${90 / blocksBySlice}deg);
    }
    .slice {
      width: ${blockWidth}px;
      transform: rotateY(${360 / totalSlices}deg);
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

  for (let currentBlock = 0; currentBlock < blocksBySlice; currentBlock++) {
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
  let yIndex = parseInt(currentBlock + blocksBySlice);

  if (hemisphere === "northern") {
    yIndex = parseInt(Math.abs(currentBlock - blocksBySlice + 1));
  }

  newBlock.style.backgroundPosition = `-${xIndex * blockWidth}px -${
    yIndex * blockHeight
  }px`;

  lastBlock.appendChild(newBlock);
};

const createStyle = () => {
  const style = document.createElement("style");
  style.innerHTML = `.slice{} .block{}`;
  document.head.appendChild(style);
};

window.onload = () => {
  createStyle();
  renderSphere();
};
