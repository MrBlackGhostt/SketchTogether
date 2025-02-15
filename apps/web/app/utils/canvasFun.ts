import { Dispatch, SetStateAction } from "react";

type Item = {
  type: "rectangle" | "circle";
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
};

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
  setIsDrawing: Dispatch<SetStateAction<boolean>>,
  setStartX: Dispatch<SetStateAction<number>>,
  setStartY: Dispatch<SetStateAction<number>>,
  translateX: number,
  translateY: number
) => {
  setIsDrawing(true);
  setStartX(event.clientX - translateX);
  setStartY(event.clientY - translateY);
};

export const handleMouseMove = (
  event: React.MouseEvent<HTMLCanvasElement>,
  isDrawing: boolean,
  startX: number,
  startY: number,
  setTranslateX: Dispatch<SetStateAction<number>>,
  setTranslateY: Dispatch<SetStateAction<number>>
) => {
  if (!isDrawing) return;
  setTranslateX(event.clientX - startX);
  setTranslateY(event.clientY - startY);
};

export const handleMouseUp = (
  setItems: Dispatch<SetStateAction<Item[]>>,
  addItem: "rectangle" | "circle",
  startX: number,
  startY: number,
  translateX: number,
  translateY: number,
  setIsDrawing: Dispatch<SetStateAction<boolean>>
) => {
  setItems((prev) => [
    ...prev,
    {
      type: addItem,
      x: startX,
      y: startY,
      width: translateX,
      height: translateY,
    },
  ]);

  setIsDrawing(false);
};

export const handleMouseLeave = (
  setIsDrawing: Dispatch<SetStateAction<boolean>>
) => {
  setIsDrawing(false);
};
