// import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import InfiniteCanvas from "./components/canvas";
import Signin from "./components/signin";

export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, right: 0 }}>
        <Signin />
      </div>
      <InfiniteCanvas />
    </div>
  );
}
