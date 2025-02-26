import { useEffect } from "react";
import { ColorPicker, useColor, type IColor } from "react-color-palette";
import "react-color-palette/css";
import { useSelectItem } from "../utils/contexts/ItemSelectContext";

function PickColor() {
  const [color, setColor] = useColor("rgb(86 30 203)");
  const { setPickColor } = useSelectItem();
  useEffect(() => {
    setPickColor(color.hex);
  }, [color]);

  return <ColorPicker color={color} onChange={setColor} />;
}
export default PickColor;
