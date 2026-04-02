import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });
const { fontFamily: bodyFont } = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";
const MUTED = "#6B8AAD";
const RED = "#EF4444";

export const Scene2_Problem = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problems = [
    { text: "Ore in coda", sub: "dal medico", icon: "⏰" },
    { text: "Telefonate", sub: "senza risposta", icon: "📞" },
    { text: "Slot cancellati", sub: "e persi", icon: "❌" },
  ];

  // Title cinematic entrance
  const titleX = interpolate(frame, [0, 25], [-100, 0], { extrapolateRight: "clamp" });
  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Red accent line
  const lineW = interpolate(frame, [15, 45], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Dramatic side gradient */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "40%",
        background: `linear-gradient(90deg, ${RED}08, transparent)`,
      }} />

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 140px",
      }}>
        {/* Section label */}
        <div style={{
          fontFamily: bodyFont, fontSize: 16, fontWeight: 600,
          color: RED, letterSpacing: 4, textTransform: "uppercase",
          opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" }),
          marginBottom: 20,
        }}>
          Il problema
        </div>

        {/* Title */}
        <div style={{
          fontFamily: displayFont, fontSize: 76, fontWeight: 800,
          color: WHITE, lineHeight: 1.1, marginBottom: 12,
          opacity: titleOp,
          transform: `translateX(${titleX}px)`,
        }}>
          Basta attese
        </div>
        <div style={{
          fontFamily: displayFont, fontSize: 76, fontWeight: 800,
          color: `${WHITE}40`, lineHeight: 1.1, marginBottom: 40,
          opacity: interpolate(frame, [8, 28], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateX(${interpolate(frame, [8, 28], [-80, 0], { extrapolateRight: "clamp" })}px)`,
        }}>
          inutili.
        </div>

        {/* Red accent line */}
        <div style={{
          height: 3, background: RED, borderRadius: 2,
          width: lineW, marginBottom: 60,
          opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" }),
        }} />

        {/* Problem cards */}
        <div style={{ display: "flex", gap: 40 }}>
          {problems.map((p, i) => {
            const delay = 35 + i * 12;
            const s = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 120 } });
            return (
              <div key={i} style={{
                flex: 1, padding: "36px 32px", borderRadius: 20,
                background: `linear-gradient(145deg, ${WHITE}06, ${WHITE}02)`,
                border: `1px solid ${WHITE}08`,
                transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px)`,
                opacity: s,
              }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>{p.icon}</div>
                <div style={{
                  fontFamily: displayFont, fontSize: 28, fontWeight: 700,
                  color: WHITE, marginBottom: 4,
                }}>{p.text}</div>
                <div style={{
                  fontFamily: bodyFont, fontSize: 20, fontWeight: 400,
                  color: MUTED,
                }}>{p.sub}</div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
