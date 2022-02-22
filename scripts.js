let currentLength = 7;
const earth = document.querySelector(".earth");

const handleChange = (e) => {
  const value = parseInt(e.target.value);

  renderSphere(value);
};

const renderSphere = (value) => {
  resetBlocks();

  for (let step = 0; step < value; step++) {
    addBlock(value);
  }

  currentLength = value;
};

window.onload = () => {
  renderSphere(currentLength);
};

const resetBlocks = () => {
  earth.querySelector(".earth .block")?.remove();
};

const addBlock = (value) => {
  const allBlocks = earth.querySelectorAll(".block-x");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1] || earth;

  const newBlock = document.createElement("div");
  newBlock.className = "block block-x";
  lastBlock.appendChild(newBlock);

  for (let step = 0; step < value - 1; step++) {
    addYBlock(newBlock);
  }
};

const addYBlock = (element) => {
  const allBlocks = element.querySelectorAll(".block-y");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1] || element;

  const newBlockY = document.createElement("div");
  newBlockY.className = "block block-y";
  lastBlock.appendChild(newBlockY);
};
