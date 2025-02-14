// app/types/react-canvas-confetti.d.ts
import * as React from 'react';

export type ConfettiInstance = (options: {
  particleCount: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  origin?: { x?: number; y?: number };
}) => void;

export interface TReactCanvasConfettiProps extends React.HTMLAttributes<HTMLCanvasElement> {
  /**
   * Callback function that receives the confetti instance.
   */
  refConfetti?: (instance: ConfettiInstance | null) => void;
}

// Export the component with the proper props.
declare const ReactCanvasConfetti: React.ForwardRefExoticComponent<TReactCanvasConfettiProps>;
export default ReactCanvasConfetti;
