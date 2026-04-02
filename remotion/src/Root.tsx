import { Composition } from "remotion";
import { BifasePromo } from "./BifasePromo";

// 6 scenes: 170+160+180+180+150+180 = 1020, minus 5 transitions * 30 = 150 → 870 frames = 29s at 30fps
export const RemotionRoot = () => (
  <Composition
    id="main"
    component={BifasePromo}
    durationInFrames={870}
    fps={30}
    width={1920}
    height={1080}
  />
);
