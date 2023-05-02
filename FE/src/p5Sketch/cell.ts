import { DrawableObject } from "./drawable-object";
import { Neighbors, PlaneCoordinates } from "./types";

export class Cell extends DrawableObject {
  walls: boolean[];
  visited: boolean;
  scale: number;

  constructor(coordinates: PlaneCoordinates, scale: number) {
    super(coordinates);
    this.walls = [true, true, true, true]; // top, right, bot, left
    this.visited = false;
    this.scale = scale;
  }

  checkNeighbors(neighbors: Neighbors): Cell | null {
    let neighborsNotVisited = [];

    if (neighbors.top && !neighbors.top.visited)
      neighborsNotVisited.push(neighbors.top);

    if (neighbors.right && !neighbors.right.visited)
      neighborsNotVisited.push(neighbors.right);

    if (neighbors.bot && !neighbors.bot.visited)
      neighborsNotVisited.push(neighbors.bot);

    if (neighbors.left && !neighbors.left.visited)
      neighborsNotVisited.push(neighbors.left);

    if (neighborsNotVisited.length > 0) {
      const r = Math.floor(Math.random() * neighborsNotVisited.length);
      return neighborsNotVisited[r];
    }
    return null;
  }

  draw(p5: any): void {
    const x = this.position.x;
    const y = this.position.y;
    p5.stroke(255);
    if (this.walls[0]) p5.line(x, y, x + this.scale, y);
    if (this.walls[1])
      p5.line(x + this.scale, y, x + this.scale, y + this.scale);
    if (this.walls[2])
      p5.line(x + this.scale, y + this.scale, x, y + this.scale);
    if (this.walls[3]) p5.line(x, y + this.scale, x, y);
  }
}
