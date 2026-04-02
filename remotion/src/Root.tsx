import { Composition } from "remotion";
import { BifasePromo } from "./BifasePromo";

// 6 scenes: 190+340+460+390+310+200 = 1890, minus 5 transitions * 30 = 150 → 1740 frames = 58s at 30fps
export const RemotionRoot = () => (
  <Composition
    id="main"
    component={BifasePromo}
    durationInFrames={1740}
    fps={30}
    width={1920}
    height={1080}
  />
);
