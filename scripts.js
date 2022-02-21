let currentLength = 2;
const meridians = 18; // vertical
const parallels = 20; // horizontal
const earth = document.querySelector(".earth");

const handleAdd = (e) => {
  addBlock();
};

const handleRemove = (e) => {
  removeBlock();
};

const addBlock = () => {
  const allBlocks = earth.querySelectorAll("[data-index]");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1];

  const newBlock = document.createElement("div");
  newBlock.className = "block";
  newBlock.setAttribute("data-index", numberOfBlocks + 1);
  lastBlock.appendChild(newBlock);
};

const removeBlock = () => {
  const allBlocks = earth.querySelectorAll("[data-index]");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1];

  if (numberOfBlocks > 1) {
    lastBlock.remove();
  }
};
