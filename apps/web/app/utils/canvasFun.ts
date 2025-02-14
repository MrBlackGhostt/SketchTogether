import { Dispatch, SetStateAction } from "react";

export const handleWheel = (
  event: React.WheelEvent<HTMLCanvasElement>,
  current: HTMLCanvasElement | null,
  setTranslateX: Dispatch<SetStateAction<number>>,
  setTranslateY: Dispatch<SetStateAction<number>>,
  translateX: number,
  translateY: number,
  scale: number,
  setScale: Dispatch<SetStateAction<number>>
) => {
  event.preventDefault();
  const zoomIntensity = 0.1;
  if (!current) return;
  const mouseX = event.clientX - current.offsetLeft;
  const mouseY = event.clientY - current.offsetTop;
  const zoomFactor = 1 + event.deltaY * -zoomIntensity;

  const newScale = Math.min(Math.max(0.5, scale * zoomFactor), 5); // Limit zoom scale

  setTranslateX(translateX - (mouseX / scale) * (newScale - scale));
  setTranslateY(translateY - (mouseY / scale) * (newScale - scale));
  setScale(newScale);
};

export const handleMouseDown = (
  event: React.MouseEvent<HTMLCanvasElement>,
  setIsPanning: Dispatch<SetStateAction<boolean>>,
  setStartX: Dispatch<SetStateAction<number>>,
  setStartY: Dispatch<SetStateAction<number>>,
  translateX: number,
  translateY: number
) => {
  setIsPanning(true);
  setStartX(event.clientX - translateX);
  setStartY(event.clientY - translateY);
};

export const handleMouseMove = (
  event: React.MouseEvent<HTMLCanvasElement>,
  isPanning: boolean,
  startX: number,
  startY: number,
  setTranslateX: Dispatch<SetStateAction<number>>,
  setTranslateY: Dispatch<SetStateAction<number>>
) => {
  if (!isPanning) return;
  setTranslateX(event.clientX - startX);
  setTranslateY(event.clientY - startY);
};

export const handleMouseUp = (
  setIsPanning: Dispatch<SetStateAction<boolean>>
) => {
  setIsPanning(false);
};

export const handleMouseLeave = (
  setIsPanning: Dispatch<SetStateAction<boolean>>
) => {
  setIsPanning(false);
};
