import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: displayFont } = loadFont("normal", {
  weights: ["700", "800"],
  subsets: ["latin"],
});
const { fontFamily: bodyFont } = loadInter("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

const PRIMARY = "#00B5C8";
const BG_DARK = "#0B1426";
const BG_GRADIENT_1 = "#0D1B2A";
const BG_GRADIENT_2 = "#1B2D4A";
const WHITE = "#FFFFFF";
const MUTED = "#8BA2C0";
const ACCENT_GREEN = "#34D399";

// ===== SCENE 1: Logo Reveal =====
const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 15, stiffness: 80, mass: 1.5 } });
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [30, 50], [30, 0], { extrapolateRight: "clamp" });

  const bgPulse = interpolate(frame, [0, 120], [0, 1]);
  const circleRadius = interpolate(frame, [0, 90], [0, 800], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      {/* Animated circle */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: circleRadius,
          height: circleRadius,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${PRIMARY}15, transparent)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Floating orbs */}
      {[0, 1, 2].map((i) => {
        const delay = i * 20;
        const x = interpolate(frame - delay, [0, 120], [0, 30 * (i + 1)], { extrapolateRight: "clamp" });
        const y = Math.sin((frame - delay) * 0.03) * 20;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${30 + i * 25}%`,
              top: `${40 + i * 10}%`,
              width: 120 - i * 30,
              height: 120 - i * 30,
              borderRadius: "50%",
              background: i === 0 ? `${PRIMARY}20` : i === 1 ? `${ACCENT_GREEN}15` : `${PRIMARY}10`,
              transform: `translate(${x}px, ${y}px)`,
              opacity: interpolate(frame, [0, 30], [0, 0.8], { extrapolateRight: "clamp" }),
            }}
          />
        );
      })}

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 120,
            fontWeight: 800,
            color: PRIMARY,
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            letterSpacing: -3,
          }}
        >
          Bifase.
        </div>
        <div
          style={{
            fontFamily: bodyFont,
            fontSize: 32,
            color: MUTED,
            fontWeight: 500,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            marginTop: 20,
          }}
        >
          La salute, a portata di clic
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ===== SCENE 2: Problem Statement =====
const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problems = [
    { text: "Ore in coda dal medico", icon: "⏰", delay: 0 },
    { text: "Telefonate senza risposta", icon: "📞", delay: 12 },
    { text: "Slot cancellati e persi", icon: "❌", delay: 24 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BG_GRADIENT_1}, ${BG_GRADIENT_2})`,
      }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 64,
            fontWeight: 800,
            color: WHITE,
            marginBottom: 60,
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Basta attese inutili
        </div>

        <div style={{ display: "flex", gap: 50 }}>
          {problems.map((p, i) => {
            const s = spring({ frame: frame - p.delay, fps, config: { damping: 12 } });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                  transform: `scale(${s}) translateY(${interpolate(s, [0, 1], [50, 0])}px)`,
                  opacity: s,
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 28,
                    background: `${PRIMARY}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 48,
                    border: `2px solid ${PRIMARY}30`,
                  }}
                >
                  {p.icon}
                </div>
                <span
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 24,
                    color: MUTED,
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  {p.text}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ===== SCENE 3: Solution =====
const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    { title: "Cerca", desc: "Trova servizi nella tua zona", icon: "🔍" },
    { title: "Prenota", desc: "Scegli data e orario in tempo reale", icon: "📅" },
    { title: "Paga", desc: "Pagamento sicuro e immediato", icon: "💳" },
  ];

  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      {/* Gradient accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: `linear-gradient(180deg, ${PRIMARY}08, transparent)`,
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 120px",
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 72,
            fontWeight: 800,
            color: WHITE,
            marginBottom: 16,
            opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [0, 15], [-40, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          Con <span style={{ color: PRIMARY }}>Bifase</span>,
        </div>
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 72,
            fontWeight: 800,
            color: WHITE,
            marginBottom: 60,
            opacity: interpolate(frame, [8, 25], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateX(${interpolate(frame, [8, 25], [-40, 0], { extrapolateRight: "clamp" })}px)`,
          }}
        >
          tutto cambia.
        </div>

        <div style={{ display: "flex", gap: 40 }}>
          {features.map((f, i) => {
            const delay = 25 + i * 15;
            const s = spring({ frame: frame - delay, fps, config: { damping: 15, stiffness: 120 } });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: 40,
                  borderRadius: 24,
                  background: `linear-gradient(135deg, ${WHITE}08, ${WHITE}03)`,
                  border: `1px solid ${WHITE}12`,
                  transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
                  opacity: s,
                }}
              >
                <div style={{ fontSize: 52, marginBottom: 16 }}>{f.icon}</div>
                <div
                  style={{
                    fontFamily: displayFont,
                    fontSize: 32,
                    fontWeight: 700,
                    color: PRIMARY,
                    marginBottom: 8,
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 20,
                    color: MUTED,
                    fontWeight: 400,
                    lineHeight: 1.5,
                  }}
                >
                  {f.desc}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ===== SCENE 4: Stats =====
const Scene4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: "500+", label: "Professionisti", color: PRIMARY },
    { value: "10k+", label: "Prenotazioni", color: ACCENT_GREEN },
    { value: "98%", label: "Soddisfazione", color: PRIMARY },
  ];

  return (
    <AbsoluteFill
      style={{ background: `linear-gradient(135deg, ${BG_GRADIENT_2}, ${BG_DARK})` }}
    >
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 56,
            fontWeight: 800,
            color: WHITE,
            marginBottom: 80,
            opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          I numeri parlano chiaro
        </div>

        <div style={{ display: "flex", gap: 100 }}>
          {stats.map((stat, i) => {
            const delay = 15 + i * 12;
            const s = spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 100 } });
            const pulse = Math.sin((frame - delay) * 0.05) * 3;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transform: `scale(${s}) translateY(${pulse}px)`,
                  opacity: s,
                }}
              >
                <div
                  style={{
                    fontFamily: displayFont,
                    fontSize: 96,
                    fontWeight: 800,
                    color: stat.color,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: bodyFont,
                    fontSize: 24,
                    color: MUTED,
                    fontWeight: 500,
                    marginTop: 12,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ===== SCENE 5: CTA =====
const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, config: { damping: 15, stiffness: 80, mass: 1.5 } });
  const btnPulse = Math.sin(frame * 0.08) * 4;
  const glowSize = interpolate(frame, [0, 120], [200, 600], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG_DARK }}>
      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${PRIMARY}20, transparent)`,
          transform: "translate(-50%, -50%)",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 80,
            fontWeight: 800,
            color: WHITE,
            textAlign: "center",
            lineHeight: 1.15,
            transform: `scale(${s})`,
            opacity: s,
          }}
        >
          La tua salute.
          <br />
          <span style={{ color: PRIMARY }}>Senza attese.</span>
        </div>

        <div
          style={{
            marginTop: 50,
            padding: "20px 60px",
            borderRadius: 50,
            background: PRIMARY,
            fontFamily: displayFont,
            fontSize: 28,
            fontWeight: 700,
            color: WHITE,
            opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
            transform: `translateY(${interpolate(frame, [20, 40], [20, 0], { extrapolateRight: "clamp" }) + btnPulse}px)`,
            boxShadow: `0 10px 40px ${PRIMARY}40`,
          }}
        >
          bifase.it
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ===== MAIN COMPOSITION =====
export const BifasePromo = () => {
  const TRANSITION_DURATION = 25;

  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene1 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene2 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene3 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={120}>
          <Scene4 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_DURATION })}
        />
        <TransitionSeries.Sequence durationInFrames={150}>
          <Scene5 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
