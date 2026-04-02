import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });
const { fontFamily: bodyFont } = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";
const MUTED = "#6B8AAD";
const GREEN = "#34D399";

export const Scene5_Stats = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: "500+", label: "Professionisti", color: PRIMARY },
    { value: "10k+", label: "Prenotazioni", color: GREEN },
    { value: "98%", label: "Soddisfazione", color: "#F59E0B" },
  ];

  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* Gradient rings */}
      {[0, 1, 2].map((i) => {
        const size = 300 + i * 200;
        const ringOp = interpolate(frame, [i * 10, i * 10 + 30], [0, 0.06], { extrapolateRight: "clamp" });
        const ringScale = interpolate(frame, [i * 10, i * 10 + 60], [0.8, 1], { extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            position: "absolute", left: "50%", top: "50%",
            width: size, height: size, borderRadius: "50%",
            border: `1px solid ${PRIMARY}`,
            transform: `translate(-50%, -50%) scale(${ringScale})`,
            opacity: ringOp,
          }} />
        );
      })}

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        {/* Title */}
        <div style={{
          fontFamily: displayFont, fontSize: 52, fontWeight: 800,
          color: WHITE, marginBottom: 80, textAlign: "center",
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [0, 20], [30, 0], { extrapolateRight: "clamp" })}px)`,
        }}>
          I numeri parlano chiaro
        </div>

        <div style={{ display: "flex", gap: 120 }}>
          {stats.map((stat, i) => {
            const delay = 20 + i * 12;
            const s = spring({ frame: frame - delay, fps, config: { damping: 10, stiffness: 80, mass: 1.5 } });
            
            // Counter animation
            const numStr = stat.value.replace(/[^0-9]/g, "");
            const targetNum = parseInt(numStr);
            const progress = interpolate(frame - delay, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const currentNum = Math.round(progress * targetNum);
            const suffix = stat.value.replace(/[0-9]/g, "");
            const displayValue = currentNum + suffix;

            // Subtle float
            const float = Math.sin((frame - delay) * 0.04) * 4;

            return (
              <div key={i} style={{
                display: "flex", flexDirection: "column",
                alignItems: "center",
                transform: `scale(${s}) translateY(${float}px)`,
                opacity: s,
              }}>
                <div style={{
                  fontFamily: displayFont, fontSize: 100, fontWeight: 800,
                  color: stat.color, lineHeight: 1,
                  textShadow: `0 0 60px ${stat.color}30`,
                }}>
                  {displayValue}
                </div>
                <div style={{
                  fontFamily: bodyFont, fontSize: 22, fontWeight: 500,
                  color: MUTED, marginTop: 16, letterSpacing: 2,
                  textTransform: "uppercase",
                }}>
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
