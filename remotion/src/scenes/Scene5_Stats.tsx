import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: displayFont } = loadFont("normal", { weights: ["700", "800"], subsets: ["latin"] });
const { fontFamily: bodyFont } = loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });

const PRIMARY = "#00B5C8";
const BG = "#0A1628";
const WHITE = "#FFFFFF";
const GREEN = "#34D399";

export const Scene5_Stats = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stats = [
    { value: "500+", label: "Professionisti", color: PRIMARY },
    { value: "10k+", label: "Prenotazioni", color: GREEN },
    { value: "98%", label: "Soddisfazione", color: "#F59E0B" },
  ];

  // Title
  const titleOp = interpolate(frame, [0, 25], [0, 1], { extrapolateRight: "clamp" });
  const titleY = interpolate(frame, [0, 25], [30, 0], { extrapolateRight: "clamp" });

  // Rings
  const rings = [0, 1, 2].map((i) => {
    const size = 300 + i * 200;
    const ringOp = interpolate(frame, [i * 12, i * 12 + 35], [0, 0.06], { extrapolateRight: "clamp" });
    const ringScale = interpolate(frame, [i * 12, i * 12 + 60], [0.8, 1], { extrapolateRight: "clamp" });
    return { size, ringOp, ringScale };
  });

  return (
    <AbsoluteFill style={{ background: BG }}>
      {rings.map((r, i) => (
        <div key={i} style={{
          position: "absolute", left: "50%", top: "50%",
          width: r.size, height: r.size, borderRadius: "50%",
          border: `1px solid ${PRIMARY}`,
          transform: `translate(-50%, -50%) scale(${r.ringScale})`,
          opacity: r.ringOp,
        }} />
      ))}

      <AbsoluteFill style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: displayFont, fontSize: 52, fontWeight: 800,
          color: WHITE, marginBottom: 80, textAlign: "center",
          opacity: titleOp, transform: `translateY(${titleY}px)`,
        }}>
          I numeri parlano chiaro
        </div>

        <div style={{ display: "flex", gap: 120 }}>
          {stats.map((stat, i) => {
            const delay = 25 + i * 15;
            const s = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 60, mass: 1.8 } });

            const numStr = stat.value.replace(/[^0-9]/g, "");
            const targetNum = parseInt(numStr);
            const progress = interpolate(frame - delay, [0, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const currentNum = Math.round(progress * targetNum);
            const suffix = stat.value.replace(/[0-9]/g, "");
            const displayValue = currentNum + suffix;

            const float = Math.sin((frame - delay) * 0.03) * 4;

            return (
              <div key={i} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                transform: `scale(${s}) translateY(${float}px)`, opacity: s,
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
                  color: `${WHITE}60`, marginTop: 16, letterSpacing: 2,
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
