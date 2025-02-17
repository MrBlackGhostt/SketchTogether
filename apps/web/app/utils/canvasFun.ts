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
  scale: number,
  setIsDrawing: Dispatch<SetStateAction<boolean>>,
  setStartX: Dispatch<SetStateAction<number>>,
  setStartY: Dispatch<SetStateAction<number>>,
  translateX: number,
  translateY: number
) => {
  setIsDrawing(true);
  setStartX((event.clientX - translateX) / scale);
  setStartY((event.clientY - translateY) / scale);
};

export const handleMouseMove = (
  event: React.MouseEvent<HTMLCanvasElement>,
  isDrawing: boolean,
  startX: number,
  startY: number,
  translateX: number,
  translateY: number,
  selectItem: "rectangle" | "circle",
  setTempRect: Dispatch<SetStateAction<Item | null>>,
  setCurrentHeight: Dispatch<SetStateAction<number>>,
  setCurrentWidth: Dispatch<SetStateAction<number>>,
  setCurrentRadius: Dispatch<SetStateAction<number>>,
  scale: number
) => {
  if (!isDrawing) return;
  const currentX = (event.clientX - translateX) / scale;
  const currentY = (event.clientY - translateY) / scale;

  if (selectItem == "rectangle") {
    setCurrentWidth(currentX);
    setCurrentHeight(currentY);

    setTempRect({
      type: "rectangle",
      x: Math.min(startX, currentX),
      y: Math.min(startY, currentY),
      width: Math.abs(currentX - startX),
      height: Math.abs(currentY - startY),
    });
  } else if (selectItem == "circle") {
    const radius = Math.sqrt(
      Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)
    );

    setCurrentRadius(radius);
    setTempRect({
      type: "circle",
      x: startX,
      y: startY,
      radius: Math.abs(radius),
    });
  }
};

export const handleMouseUp = (
  setItems: Dispatch<SetStateAction<Item[]>>,
  selectItem: "rectangle" | "circle",
  startX: number,
  startY: number,
  translateX: number,
  translateY: number,
  currentHeight: number,
  currentWidth: number,
  currentRadius: number,
  setIsDrawing: Dispatch<SetStateAction<boolean>>,
  setTempRect: Dispatch<SetStateAction<Item | null>>,
  tempRect: Item | null,
  setLatestItem: Dispatch<SetStateAction<Item | null>>
) => {
  setItems((prev) => [
    ...prev,
    selectItem == "rectangle"
      ? {
          type: selectItem,
          x: Math.min(startX, currentWidth),
          y: Math.min(startY, currentHeight),
          width: Math.abs(currentWidth - startX),
          height: Math.abs(currentHeight - startY),
        }
      : {
          type: "circle",
          x: startX,
          y: startY,
          radius: Math.abs(currentRadius),
        },
  ]);
  setLatestItem(tempRect);
  setTempRect(null);
  setIsDrawing(false);
};

export const handleMouseLeave = (
  setIsDrawing: Dispatch<SetStateAction<boolean>>
) => {
  setIsDrawing(false);
};
