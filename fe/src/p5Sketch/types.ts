import { Cell } from "./cell";

export type PlaneCoordinates = {
  x: number;
  y: number;
};

export type Neighbors = {
  top: Cell | null;
  right: Cell | null;
  bot: Cell | null;
  left: Cell | null;
};

export enum Difficulty {
  Easy = 50,
  Medium = 25,
  Hard = 20,
}
