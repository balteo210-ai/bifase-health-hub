import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Scene1_Intro } from "./scenes/Scene1_Intro";
import { Scene2_Problem } from "./scenes/Scene2_Problem";
import { Scene3_CitizenServices } from "./scenes/Scene3_CitizenServices";
import { Scene4_ProServices } from "./scenes/Scene4_ProServices";
import { Scene5_Stats } from "./scenes/Scene5_Stats";
import { Scene6_CTA } from "./scenes/Scene6_CTA";

const T = 30; // longer transition duration for smoother pacing

export const BifasePromo = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={160}>
          <Scene1_Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={260}>
          <Scene2_Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene3_CitizenServices />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={300}>
          <Scene4_ProServices />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={210}>
          <Scene5_Stats />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: T })}
        />
        <TransitionSeries.Sequence durationInFrames={240}>
          <Scene6_CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
