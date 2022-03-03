const SLICES = 24;
const SPHERE_CIRCUMFERENCE = 942;
const SPHERE_HEIGHT = 476;
const BLOCKS_BY_SLICE = 20;

const earth = document.querySelector(".earth");

let blockWidth;
let blockHeight;

const handleChange = () => {
  renderSphere();
};

const renderSphere = () => {
  blockWidth = SPHERE_CIRCUMFERENCE / SLICES;
  blockHeight = SPHERE_HEIGHT / 2 / BLOCKS_BY_SLICE;

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

  for (let currentSlice = 0; currentSlice < SLICES; currentSlice++) {
    addSlice({ currentSlice, element, hemisphere });
  }
};

const resetBlocks = () => {
  earth.querySelectorAll(".earth > div").forEach((element) => element.remove());
};

const updateBlockStyle = () => {
  const styleElement = document.querySelector("style");
  const earthWidth = (SPHERE_CIRCUMFERENCE / 100) * 31.5;

  styleElement.innerHTML = `
    .earth { 
      width: ${earthWidth}px;
      height: ${earthWidth}px;
      transform-origin: center center -${earthWidth / 2}px;
    }
    .circle {
      width: ${earthWidth}px;
      height: ${earthWidth}px;
      transform: translateZ(-${earthWidth / 2}px);
    }
    .hemisphere {
      width: ${blockWidth}px;
    }
    .northern-hemisphere .block {
      transform: rotateX(${90 / BLOCKS_BY_SLICE}deg);
    }
    .southern-hemisphere .block {
      transform: rotateX(-${90 / BLOCKS_BY_SLICE}deg);
    }
    .slice {
      width: ${blockWidth}px;
      transform: rotateY(${360 / SLICES}deg);
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

  for (let currentBlock = 0; currentBlock < BLOCKS_BY_SLICE; currentBlock++) {
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
  let yIndex = parseInt(currentBlock + BLOCKS_BY_SLICE);

  if (hemisphere === "northern") {
    yIndex = parseInt(Math.abs(currentBlock - BLOCKS_BY_SLICE + 1));
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
