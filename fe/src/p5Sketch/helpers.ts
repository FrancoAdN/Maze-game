import { DrawableObject } from "./drawable-object";
import { PlaneCoordinates } from "./types";

export function isBetweenBounds<T extends DrawableObject>(
  coords: PlaneCoordinates,
  drawable: T
) {
  return (
    coords.x > drawable.position.x - drawable.length &&
    coords.x < drawable.position.x + drawable.length &&
    coords.y > drawable.position.y - drawable.length &&
    coords.y < drawable.position.y + drawable.length
  );
}

export function distance(pointA: PlaneCoordinates, pointB: PlaneCoordinates) {
  return Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
  );
}
