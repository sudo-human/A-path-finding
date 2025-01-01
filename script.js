"use strict";

const [cols, rows] = [60, 60]; // Number of rows and coloumns in the grid

const grid = [];
let start;
let end;
let path = [];
const openSet = new Heap((a, b) => a.f < b.f);

const isValidCell = function (x, y) {
  return x >= 0 && y >= 0 && x < cols && y < rows;
};

const dist = function (a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};

const heuristic = function (c) {
  return dist(c, end);
};

class Cell {
  constructor(i, j) {
    this.x = i;
    this.y = j;

    // Width and Height of each cell in the grid
    this.wd = width / cols;
    this.hg = height / rows;

    this.g = Infinity;
    this.h = 0;
    this.f = this.g + this.h;
    this.n = [];
    this.previous = undefined;
    this.wall;

    if (random(1) < 0.3) this.wall = true;
  }
  show(c) {
    fill(c);
    noStroke();
    if (this.wall) fill(100);
    rect(this.x * this.wd, this.y * this.hg, this.wd, this.hg);
  }
  genNeighbours() {
    for (let x = this.x - 1; x <= this.x + 1; x++)
      if (isValidCell(x, this.y - 1))
        !this.wall && this.n.push(grid[x][this.y - 1]);
    for (let y = this.y; y <= this.y + 1; y++)
      if (isValidCell(this.x + 1, y))
        !this.wall && this.n.push(grid[this.x + 1][y]);
    for (let x = this.x; x >= this.x - 1; x--)
      if (isValidCell(x, this.y + 1))
        !this.wall && this.n.push(grid[x][this.y + 1]);
    if (isValidCell(this.x - 1, this.y))
      !this.wall && this.n.push(grid[this.x - 1][this.y]);
  }
}

function setup() {
  const cnv = createCanvas(600, 600);
  cnv.parent("grid");
  for (let i = 0; i < cols; i++) {
    grid.push(new Array());
    for (let j = 0; j < rows; j++) {
      grid[i].push(new Cell(i, j));
      grid[i][j].show(color(240));
    }
  }

  //console.log(closedSet);

  //start = grid[0][0];
  start = random(random(grid));
  start.wall = false;
  //end = grid[cols - 1][rows - 1];
  end = random(random(grid));
  end.wall = false;
  start.g = 0;
  start.f = start.g + heuristic(start);
  start.show(color(255, 0, 0));
  end.show(color(0, 0, 255));
  openSet.insert(start);
}

function draw() {
  let current;
  if (openSet.size) {
    current = openSet.poll();
    if (current === end) {
      console.log("Path Found");
      let t = current;
      while (t?.previous) {
        path.push(t);
        t = t?.previous;
      }
      path.push(start);
      for (let c of path) {
        c.show(color(255, 255, 0));
      }
      document.querySelector("#msg").textContent = "Hurreyy!!! Path Found";
      noLoop();
      setTimeout(() => {
        location.reload(true)
      }, 500)
    }
    current.genNeighbours();
    for (let neighbour of current.n) {
      let temp_g = current.g + 1;
      if (temp_g < neighbour.g) {
        neighbour.g = temp_g;
        neighbour.previous = current;
        neighbour.f = neighbour.g + heuristic(neighbour);
        if (openSet.has(neighbour) == false) {
          openSet.insert(neighbour);
        }
      }
    }
  } else {
    console.log("No Path");
    document.querySelector("#msg").textContent = "No Path Found!!!";
    noLoop();
  }
  for (let c of openSet.arr) {
    c.show(color(0, 255, 0));
  }
}
