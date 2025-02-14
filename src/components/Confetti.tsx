// 'use client';

// import React, { useCallback, useRef, useEffect } from 'react';
// import ReactCanvasConfetti, { ConfettiInstance } from 'react-canvas-confetti';

// const Confetti = ({ isActive }: { isActive: boolean }) => {
//   // Save our confetti instance here
//   const refAnimationInstance = useRef<ConfettiInstance | null>(null);

//   // This callback will receive the instance via the refConfetti prop
//   const getInstance = useCallback((instance: ConfettiInstance | null) => {
//     refAnimationInstance.current = instance;
//   }, []);

//   // A helper function to shoot confetti
//   const makeShot = useCallback(
//     (particleRatio: number, opts: Partial<Parameters<ConfettiInstance>[0]>) => {
//       if (refAnimationInstance.current) {
//         refAnimationInstance.current({
//           ...opts,
//           origin: { y: 0.7 },
//           particleCount: Math.floor(200 * particleRatio),
//         });
//       }
//     },
//     []
//   );

//   const fire = useCallback(() => {
//     makeShot(0.25, { spread: 26, startVelocity: 55 });
//     makeShot(0.2, { spread: 60 });
//     makeShot(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
//     makeShot(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
//     makeShot(0.1, { spread: 120, startVelocity: 45 });
//   }, [makeShot]);

//   useEffect(() => {
//     if (isActive) {
//       fire();
//     }
//   }, [isActive, fire]);

//   return (
//     <ReactCanvasConfetti
//       refConfetti={getInstance}
//       style={{
//         position: 'fixed',
//         pointerEvents: 'none',
//         width: '100%',
//         height: '100%',
//         top: 0,
//         left: 0,
//         zIndex: 100,
//       }}
//     />
//   );
// };

// export default Confetti;
