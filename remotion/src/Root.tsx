import { Composition } from "remotion";
import { BifasePromo } from "./BifasePromo";

// 6 scenes: 120+110+140+130+110+140 = 750, minus 5 transitions * 20 = 100 → 650 frames
export const RemotionRoot = () => (
  <Composition
    id="main"
    component={BifasePromo}
    durationInFrames={650}
    fps={30}
    width={1920}
    height={1080}
  />
);
