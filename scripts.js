let currentLength = 2;
const meridians = 18; // vertical
const parallels = 20; // horizontal
const earth = document.querySelector('.earth');

const handleChange = (e) => {
  const newLenght = e.target.value;
  const allBlocks = earth.querySelectorAll('[data-index]');
  addBlock();
}

const addBlock = () => {
  const allBlocks = earth.querySelectorAll('[data-index]');
  const numberOfBlocks = allBlocks.length;
  const lastBlock = allBlocks[numberOfBlocks - 1];

  console.log(lastBlock);
  const newBlock = document.createElement('div')
  newBlock.className = "block"
  newBlock.setAttribute('data-index', numberOfBlocks + 1)
  lastBlock.appendChild(newBlock)
}
