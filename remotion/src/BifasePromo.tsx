import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Scene1_Intro } from "./scenes/Scene1_Intro";
import { Scene2_Problem } from "./scenes/Scene2_Problem";
import { Scene3_Solution } from "./scenes/Scene3_Solution";
import { Scene4_Features } from "./scenes/Scene4_Features";
import { Scene5_Stats } from "./scenes/Scene5_Stats";
import { Scene6_CTA } from "./scenes/Scene6_CTA";

const T = 20; // transition duration

export const BifasePromo = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene1_Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={110}>
          <Scene2_Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={140}>
          <Scene3_Solution />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={130}>
          <Scene4_Features />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={110}>
          <Scene5_Stats />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={140}>
          <Scene6_CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
