const SPHERE_WIDTH = 1000;
const SPHERE_HEIGHT = 1000;

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
  blocksBySlice = parseInt(inputValue) / 2;
  blockWidth = SPHERE_WIDTH / totalSlices;
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
  styleElement.innerHTML = `
    .earth { 
      width: ${SPHERE_WIDTH}px;
      height: ${SPHERE_WIDTH}px;
    }
    .slice {
      width: ${blockWidth}px;
      /*transform: rotateY(${360 / totalSlices}deg);*/
    }

    .block {
      height: ${blockHeight}px;
    }
    
    .northern-hemisphere .block {
      /*transform: rotateX(${90 / blocksBySlice}deg);*/
    }

    .southern-hemisphere .block {
      /*transform: rotateX(-${90 / blocksBySlice}deg);*/
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
  let yIndex = currentBlock + blocksBySlice;

  if (hemisphere === "northern") {
    yIndex = Math.abs(currentBlock - blocksBySlice + 1);
  }

  newBlock.style.backgroundPosition = `${xIndex}% ${yIndex}%`;

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
