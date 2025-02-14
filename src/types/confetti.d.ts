export type ConfettiInstance = (options: {
    spread: number;
    startVelocity?: number;
    decay?: number;
    scalar?: number;
  }) => void;
  