import { PlaneCoordinates } from "./types";

export abstract class DrawableObject {
  position: PlaneCoordinates;
  length: number;
  constructor(position?: PlaneCoordinates, length?: number) {
    this.position = position || { x: 0, y: 0 };
    this.length = length || 0;
  }

  abstract draw(p5: any, [...args]?: any): void;
}
