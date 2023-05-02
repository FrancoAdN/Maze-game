import { ArraivalPoint } from "./arraival-point";
import { CANVAS_BACKGROUND, CANVAS_DIMMENTIONS } from "./constants";
import { isBetweenBounds } from "./helpers";
import { Maze } from "./maze";
import { Player } from "./player";
import { Difficulty, PlaneCoordinates } from "./types";

export function sketch(p5: any) {
  const maze = new Maze(Difficulty.Medium);
  const player = new Player(
    maze.scale / 2 - 5,
    {
      x:
        Math.floor(Math.random() * (maze.cantCols - 1)) * maze.scale +
        maze.scale / 2,
      y:
        Math.floor(Math.random() * (maze.cantRows - 1)) * maze.scale +
        maze.scale / 2,
    },
    "#00ff00"
  );

  const arraival = new ArraivalPoint(
    {
      x: Math.floor(Math.random() * (maze.cantCols - 1)) * maze.scale,
      y: Math.floor(Math.random() * (maze.cantRows - 1)) * maze.scale,
    },
    "#ed259d",
    maze.scale
  );

  p5.setup = () => {
    maze.create();
    p5.createCanvas(CANVAS_DIMMENTIONS.width, CANVAS_DIMMENTIONS.height);
  };

  p5.draw = () => {
    p5.background(CANVAS_BACKGROUND);
    maze.draw(p5, player);
    player.draw(p5);
    arraival.draw(p5);

    if (player.isMoving) {
      player.updatePosition({ x: p5.mouseX, y: p5.mouseY });
    }
  };

  p5.mousePressed = () => {
    const mouseCoords: PlaneCoordinates = {
      x: p5.mouseX,
      y: p5.mouseY,
    };
    if (isBetweenBounds(mouseCoords, player)) {
      player.isMoving = !player.isMoving;
    }
  };

  p5.keyPressed = () => {
    if (["j", "J"].includes(p5.key)) {
      player.jump();
    }
  };
}
