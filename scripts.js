let currentLength = document.querySelector("input").value;
const earth = document.querySelector(".earth");

const handleChange = (e) => {
  const value = parseInt(e.target.value);

  renderSphere(value);
};

const renderSphere = (value) => {
  resetBlocks();

  for (let step = 0; step < value; step++) {
    addSlice(value, step);
  }

  updateBlockStyle(value);

  currentLength = value;
};

window.onload = () => {
  createStyle();
  renderSphere(currentLength);
};

const createStyle = () => {
  const style = document.createElement("style");
  style.innerHTML = `.slice {} .block {}`;
  document.head.appendChild(style);
};

const resetBlocks = () => {
  earth.querySelector(".earth .slice")?.remove();
};

const updateBlockStyle = (value) => {
  const styleElement = document.querySelector("style");
  const slide = styleElement.sheet.cssRules[0].style;
  const block = styleElement.sheet.cssRules[1].style;
  slide.width = `${2000 / value}px`;
  block.height = `${520 / value}px`;

  //slide.transform = `rotateY(${360 / value}deg)`;
  //block.transform = `rotateX(-${90 / value}deg)`;
};

const addSlice = (value, columnIndex) => {
  const allBlocks = earth.querySelectorAll(".slice");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1] || earth;

  const newSlide = document.createElement("div");
  newSlide.className = "slice";
  lastBlock.appendChild(newSlide);

  for (let step = 0; step < value - 1; step++) {
    addBlock(newSlide, columnIndex, step);
  }
};

const addBlock = (element, columnIndex, lineIndex) => {
  const allBlocks = element.querySelectorAll(".block");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1] || element;

  const newBlock = document.createElement("div");
  newBlock.className = "block";
  newBlock.style.backgroundPosition = `-${columnIndex * 66}px -${
    lineIndex * 17
  }px`;
  lastBlock.appendChild(newBlock);
};
