let currentLength = document.querySelector("input").value;
const earth = document.querySelector(".earth");
const SPHERE_WIDTH = 1000;
const SPHERE_HEIGHT = 1000;

const handleChange = (e) => {
  const totalSlices = parseInt(e.target.value);
  document.querySelector("label span").innerHTML = totalSlices;

  renderSphere(totalSlices);
};

const renderSphere = (totalSlices) => {
  resetBlocks();

  // northern hemisphere
  createHemisphere({ hemisphere: "northern", totalSlices });

  // southern hemisphere
  createHemisphere({ hemisphere: "southern", totalSlices });

  updateBlockStyle(totalSlices);

  currentLength = totalSlices;
};

const createHemisphere = ({ hemisphere, totalSlices }) => {
  const element = document.createElement("div");
  element.className = `${hemisphere}-hemisphere hemisphere`;
  earth.appendChild(element);

  for (let currentSlice = 0; currentSlice < totalSlices; currentSlice++) {
    addSlice({ totalSlices, currentSlice, element, hemisphere });
  }
};

const resetBlocks = () => {
  earth.querySelectorAll(".earth > div").forEach((element) => element.remove());
};

const updateBlockStyle = (totalSlices) => {
  const styleElement = document.querySelector("style");
  styleElement.innerHTML = `
    .earth { 
      width: ${SPHERE_WIDTH}px;
      height: ${SPHERE_WIDTH}px;
    }
    .slice {
      width: ${SPHERE_WIDTH / totalSlices}px;
      /*transform: rotateY(${360 / totalSlices}deg);*/
    }

    .block {
      height: ${SPHERE_HEIGHT / totalSlices}px;
    }
    
    .northern-hemisphere .block {
      /*transform: rotateX(${90 / (totalSlices / 4)}deg);*/
    }

    .southern-hemisphere .block {
      /*transform: rotateX(-${90 / (totalSlices / 4)}deg);*/
    }
  `;
};

const addSlice = ({ totalSlices, currentSlice, element, hemisphere }) => {
  const allBlocks = element.querySelectorAll(".slice");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1] || element;

  const slice = document.createElement("div");
  slice.className = "slice";
  lastBlock.appendChild(slice);

  for (let currentBlock = 0; currentBlock < totalSlices / 4; currentBlock++) {
    addBlock({ slice, currentSlice, currentBlock, totalSlices, hemisphere });
  }
};

const addBlock = ({
  slice,
  currentSlice,
  currentBlock,
  totalSlices,
  hemisphere,
}) => {
  const allBlocks = slice.querySelectorAll(".block");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1] || slice;

  const newBlock = document.createElement("div");
  newBlock.className = "block";
  const bgXPosition = (100 / (totalSlices - 1)) * currentSlice;
  const bgYPosition = (100 / (totalSlices - 1)) * currentBlock;
  newBlock.style.backgroundPosition = `${bgXPosition}% ${bgYPosition}%`;

  if (hemisphere === "northern") {
    newBlock.innerHTML = `${currentSlice} | ${Math.abs(currentBlock - 4)}`;
  } else {
    newBlock.innerHTML = `${currentSlice} | ${currentBlock + 5}`;
  }

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
