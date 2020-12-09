"use strict";
const [cols, rows] = [30, 30]; // Number of rows and coloumns in the grid

const grid = [];
let start;
let end;
const openSet = [];
const closedSet = [];
const path = [];

const findMinF = function () {
  let win = 0;
  for (let i = 0; i < openSet.length; i++) {
    if (openSet[win].f > openSet[i].f) win = i;
  }
  return win;
};

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

    this.f = 0;
    this.g = 0;
    this.f = 0;
    this.n = [];
    this.previous = undefined;
    this.wall;

    if (random(1) < 0.4) this.wall = true;
  }
  show(c) {
    fill(c);
    if (this.wall) fill(0);
    rect(this.x * this.wd, this.y * this.hg, this.wd, this.hg);
  }
  genNeighbours() {
    for (let x = this.x - 1; x <= this.x + 1; x++)
      if (isValidCell(x, this.y - 1)) this.n.push(grid[x][this.y - 1]);
    for (let y = this.y - 1; y <= this.y + 1; y++)
      if (isValidCell(this.x + 1, y)) this.n.push(grid[this.x + 1][y]);
    for (let x = this.x + 1; x >= this.x - 1; x--)
      if (isValidCell(x, this.y + 1)) this.n.push(grid[x][this.y + 1]);
    for (let y = this.y + 1; y >= this.y - 1; y--)
      if (isValidCell(this.x - 1, y)) this.n.push(grid[this.x - 1][y]);
  }
}

function setup() {
  let cnv = createCanvas(600, 600);
  cnv.parent("grid");

  for (let i = 0; i < cols; i++) {
    grid.push(new Array());
    for (let j = 0; j < rows; j++) {
      grid[i].push(new Cell(i, j));
      grid[i][j].show(color(240));
    }
  }

  start = grid[0][0];
  start.wall = false;
  start.show(color(255, 0, 0));
  end = grid[cols - 1][rows - 1];
  end.wall = false;
  end.show(color(0, 255, 0));
  openSet.push(start);
}

function draw() {
  let current;
  if (openSet.length > 0) {
    let m = findMinF();
    current = openSet[m];
    if (current === end) {
      console.log("Done");
      document.querySelector("#msg").textContent = "Path Found!!!";
      noLoop();
    }
    openSet.splice(m, 1);
    closedSet.push(current);
    current.genNeighbours();
    let n = current.n;
    for (let i = 0; i < n.length; i++) {
      if (!closedSet.includes(n[i]) && !n[i].wall) {
        let tg = n[i].g + 1;
        let newPath = false;
        if (!openSet.includes(n[i])) {
          n[i].g = tg;
          openSet.push(n[i]);
          newPath = true;
        } else if (tg < n[i].g) {
          n[i].g = tg;
          newPath = true;
        }
        if (newPath) {
          n[i].h = heuristic(n[i]);
          n[i].f = n[i].g + n[i].h;
          n[i].previous = current;
        }
      }
    }
  } else {
    console.log("No Path");
    document.querySelector("#msg").textContent = "No Path Found!!!";
    noLoop();
  }
  for (let i = 0; i < openSet.length; i++) {
    openSet[i].show(color(0, 255, 0));
  }
  for (let i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(255, 0, 0));
  }
  let t = current;
  path.push(t);
  while (t?.previous) {
    path.push(t.previous);
    t = t.previous;
  }
  for (let i of path) {
    i?.show(color(0, 0, 255));
  }
}
