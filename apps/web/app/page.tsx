// import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import InfiniteCanvas from "./components/canvas";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <InfiniteCanvas />
    </div>
  );
}
