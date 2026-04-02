import { Composition } from "remotion";
import { BifasePromo } from "./BifasePromo";

// 6 scenes: 160+260+300+300+210+240 = 1470, minus 5 transitions * 30 = 150 → 1320 frames = 44s at 30fps
export const RemotionRoot = () => (
  <Composition
    id="main"
    component={BifasePromo}
    durationInFrames={1320}
    fps={30}
    width={1920}
    height={1080}
  />
);
