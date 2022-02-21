let currentLength = 1;
const meridians = 18; // vertical
const parallels = 20; // horizontal
const earth = document.querySelector(".earth");

const handleChange = (e) => {
  const newValue = e.target.value;

  while (newValue > currentLength) {
    addBlock();
  }

  while (newValue < currentLength) {
    removeBlock();
  }
};

const addBlock = () => {
  const allBlocks = earth.querySelectorAll(".block");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1];

  const newBlock = document.createElement("div");
  newBlock.className = "block";
  newBlock.setAttribute("data-index", numberOfBlocks + 1);
  lastBlock.appendChild(newBlock);

  currentLength++;
};

const removeBlock = () => {
  const allBlocks = earth.querySelectorAll(".block");
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1];

  if (numberOfBlocks > 1) {
    lastBlock.remove();
    currentLength--;
  }
};
