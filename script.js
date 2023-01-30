const visualizer = document.querySelector(".visualizer");
const shuffleBtn = document.querySelector("#shuffle");
const sortBtn = document.querySelector("#sort");

let heights = [];
let bars = [];

let sorting = false;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (let i = 1; i <= 50; i++) {
  heights.push(i * 10);
}

for (const height of heights) {
  const bar = document.createElement("div");
  bar.classList.add("bar");
  bar.style.height = `${height}px`;
  bars.push(bar);
  visualizer.appendChild(bar);
}

function shuffle() {
  for (let i = heights.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [heights[i], heights[j]] = [heights[j], heights[i]];
  }
}

function update() {
  for (let i = 0; i < heights.length; i++) {
    bars[i].style.height = `${heights[i]}px`;
  }
}

shuffleBtn.addEventListener("click", () => {
  if (sorting) return;
  shuffle();
  update();
});

sortBtn.addEventListener("click", async () => {
  if (sorting) return;
  sorting = true;
  for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights.length - i - 1; j++) {
      if (heights[j] > heights[j + 1]) {
        [heights[j], heights[j + 1]] = [heights[j + 1], heights[j]];
        update();
        await sleep(10);
      }
    }
  }
  sorting = false;
});
