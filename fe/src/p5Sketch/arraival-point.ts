import { DrawableObject } from "./drawable-object";
import { PlaneCoordinates } from "./types";

export class ArraivalPoint extends DrawableObject {
  private color: string;
  private readonly offset = 1;

  constructor(startPosition: PlaneCoordinates, color: string, length: number) {
    super(startPosition, length);
    this.color = color;
  }

  draw(p5: any): void {
    p5.fill(this.color);
    p5.noStroke();
    p5.rect(
      this.position.x + this.offset,
      this.position.y + this.offset,
      this.length - this.offset,
      this.length - this.offset
    );
  }
}
