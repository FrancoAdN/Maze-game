import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import { sketch } from './p5Sketch'


export function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}