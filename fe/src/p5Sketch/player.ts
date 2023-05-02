import { Cell } from "./cell";
import { MAX_PLAYER_JUMPS } from "./constants";
import { DrawableObject } from "./drawable-object";
import { distance } from "./helpers";
import { PlaneCoordinates } from "./types";

export class Player extends DrawableObject {
  private radius: number;
  private color: string;
  private jumps: number;
  private isJumping: boolean;
  private startPosition: PlaneCoordinates;
  isMoving: boolean;

  constructor(radius: number, startPosition: PlaneCoordinates, color: string) {
    super(startPosition, radius);
    this.radius = this.length;
    this.color = color;
    this.jumps = MAX_PLAYER_JUMPS;
    this.isJumping = false;
    this.startPosition = startPosition;
    this.isMoving = false;
  }

  draw(p5: any): void {
    p5.noStroke();
    p5.fill(this.color);
    p5.circle(this.position.x, this.position.y, this.radius);
  }

  hasCollided(cell: Cell): boolean {
    let x = cell.position.x;
    let y = cell.position.y;
    let range = this.radius + 1;
    if (cell.walls[0]) {
      if (
        distance(
          {
            x: x + cell.scale / 2,
            y,
          },
          this.position
        ) < range
      ) {
        if (this.isJumping) {
          this.isJumping = false;
          return false;
        }
        return true;
      }
    }

    if (cell.walls[1]) {
      if (
        distance(
          {
            x: x + cell.scale,
            y: y + cell.scale / 2,
          },
          this.position
        ) < range
      ) {
        if (this.isJumping) {
          this.isJumping = false;
          return false;
        }
        return true;
      }
    }

    if (cell.walls[2]) {
      if (
        distance(
          {
            x: x + cell.scale / 2,
            y: y + cell.scale,
          },
          this.position
        ) < range
      ) {
        if (this.isJumping) {
          this.isJumping = false;
          return false;
        }
        return true;
      }
    }

    if (cell.walls[3]) {
      if (
        distance(
          {
            x,
            y: y + cell.scale / 2,
          },
          this.position
        ) < range
      ) {
        if (this.isJumping) {
          this.isJumping = false;
          return false;
        }
        return true;
      }
    }

    return false;
  }

  updateToStart() {
    this.isMoving = false;
    this.updatePosition(this.startPosition);
  }

  updatePosition(coordinates: PlaneCoordinates) {
    this.position = coordinates;
  }

  jump() {
    if (!this.isJumping && this.jumps > 0) {
      this.isJumping = true;
      this.jumps--;
    }
  }
}
