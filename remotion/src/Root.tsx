import { Composition } from "remotion";
import { BifasePromo } from "./BifasePromo";

export const RemotionRoot = () => (
  <Composition
    id="main"
    component={BifasePromo}
    durationInFrames={600}
    fps={30}
    width={1920}
    height={1080}
  />
);
