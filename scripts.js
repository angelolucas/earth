let currentLength = document.querySelector("input").value;
const earth = document.querySelector(".earth");
const SPHERE_WIDTH = 1439;
const SPHERE_HEIGHT = 360;
const blockWidth = SPHERE_WIDTH / currentLength;
const blockHeight = SPHERE_HEIGHT / currentLength;

const handleChange = (e) => {
  const totalSlices = parseInt(e.target.value);

  renderSphere(totalSlices);
};

const renderSphere = (totalSlices) => {
  resetBlocks();

  for (let currentSlice = 0; currentSlice < totalSlices; currentSlice++) {
    addSlice({ totalSlices, currentSlice });
  }

  updateBlockStyle(totalSlices);

  currentLength = totalSlices;
};

const resetBlocks = () => {
  earth.querySelector(".earth .slice")?.remove();
};

const updateBlockStyle = (totalSlices) => {
  const styleElement = document.querySelector("style");
  const slide = styleElement.sheet.cssRules[0].style;
  const block = styleElement.sheet.cssRules[1].style;
  slide.width = `${SPHERE_WIDTH / totalSlices}px`;
  block.height = `${SPHERE_HEIGHT / totalSlices}px`;

  //slide.transform = `rotateY(${360 / totalSlices}deg)`;
  //block.transform = `rotateX(-${90 / totalSlices}deg)`;
};

const addSlice = ({ totalSlices, currentSlice }) => {
  const allBlocks = earth.querySelectorAll(".slice");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1] || earth;

  const slice = document.createElement("div");
  slice.className = "slice";
  lastBlock.appendChild(slice);

  for (let currentBlock = 0; currentBlock < totalSlices - 1; currentBlock++) {
    addBlock({ slice, currentSlice, currentBlock, totalSlices });
  }
};

const addBlock = ({ slice, currentSlice, currentBlock, totalSlices }) => {
  const allBlocks = slice.querySelectorAll(".block");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1] || slice;

  const newBlock = document.createElement("div");
  newBlock.className = "block";
  const bgXPosition = `-${(SPHERE_WIDTH / totalSlices) * currentSlice}px`;
  const bgYPosition = `-${
    (SPHERE_HEIGHT / totalSlices) * currentBlock + 360
  }px`;
  newBlock.style.backgroundPosition = `${bgXPosition} ${bgYPosition}`;
  lastBlock.appendChild(newBlock);
};

const createStyle = () => {
  const style = document.createElement("style");
  style.innerHTML = `.slice{} .block{}`;
  document.head.appendChild(style);
};

window.onload = () => {
  createStyle();
  renderSphere(currentLength);
};
