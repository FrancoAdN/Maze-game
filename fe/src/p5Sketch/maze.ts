import { Cell } from "./cell";
import { CANVAS_DIMMENTIONS } from "./constants";
import { DrawableObject } from "./drawable-object";
import { Player } from "./player";
import { Difficulty, Neighbors, PlaneCoordinates } from "./types";

export class Maze extends DrawableObject {
  scale: number;
  grid: Cell[][];
  cantCols: number;
  cantRows: number;

  constructor(difficulty: Difficulty) {
    super();
    this.scale = difficulty;
    this.grid = [];
    this.cantCols = Math.floor(CANVAS_DIMMENTIONS.width / this.scale);
    this.cantRows = Math.floor(CANVAS_DIMMENTIONS.height / this.scale);
  }
  draw(p5: any, player: Player): void {
    for (let i = 0; i < this.cantCols; i++) {
      for (let cell of this.grid[i]) {
        cell.draw(p5);
        if (player.hasCollided(cell)) {
          player.updateToStart();
        }
      }
    }
  }

  create() {
    let created = false;

    let count: number = 0;
    this.createGrid();

    let current: Cell = this.grid[0][0];
    const stack: Cell[] = [];

    while (!created) {
      for (let i = 0; i < this.cantCols; i++) {
        for (let j = 0; j < this.cantRows; j++) {
          if (this.grid[i][j].visited) count++;
          else count = 0;
        }
      }

      if (count > this.cantRows * this.cantCols) {
        created = true;
      } else {
        current.visited = true;

        const next = current.checkNeighbors(this.getCellNeighbors(current));
        if (next) {
          next.visited = true;
          stack.push(current);
          this.removeWalls(current, next);

          current = next;
        } else if (stack.length > 0) {
          current = new Cell(
            stack.pop()?.position || { x: 0, y: 0 },
            this.scale
          );
        }
      }
    }
  }

  private createGrid() {
    let grid = new Array(this.cantCols);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(this.cantRows);
    }

    for (let i = 0; i < this.cantCols; i++) {
      for (let j = 0; j < this.cantRows; j++) {
        grid[i][j] = new Cell(
          {
            x: i * this.scale,
            y: j * this.scale,
          },
          this.scale
        );
      }
    }

    this.grid = grid;
  }

  private removeWalls(a: Cell, b: Cell) {
    const x = a.position.x / this.scale - b.position.x / this.scale;
    if (x === 1) {
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (x === -1) {
      a.walls[1] = false;
      b.walls[3] = false;
    }
    const y = a.position.y / this.scale - b.position.y / this.scale;
    if (y === 1) {
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (y === -1) {
      a.walls[2] = false;
      b.walls[0] = false;
    }
  }

  private getCellNeighbors(cell: Cell): Neighbors {
    const cellCords: PlaneCoordinates = {
      x: cell.position.x / this.scale,
      y: cell.position.y / this.scale,
    };

    const topCoords = {
      x: cellCords.x - 1,
      y: cellCords.y,
    };
    const rightCoords = {
      x: cellCords.x,
      y: cellCords.y + 1,
    };
    const botCoords = {
      x: cellCords.x + 1,
      y: cellCords.y,
    };
    const leftCoords = {
      x: cellCords.x,
      y: cellCords.y - 1,
    };
    return {
      top: this.doesCellExist(topCoords)
        ? this.grid[topCoords.x][topCoords.y]
        : null,
      right: this.doesCellExist(rightCoords)
        ? this.grid[rightCoords.x][rightCoords.y]
        : null,
      bot: this.doesCellExist(botCoords)
        ? this.grid[botCoords.x][botCoords.y]
        : null,
      left: this.doesCellExist(leftCoords)
        ? this.grid[leftCoords.x][leftCoords.y]
        : null,
    };
  }

  private doesCellExist(coords: PlaneCoordinates): boolean {
    return !(
      coords.x < 0 ||
      coords.y < 0 ||
      coords.x > this.cantCols - 1 ||
      coords.y > this.cantCols - 1
    );
  }
}
